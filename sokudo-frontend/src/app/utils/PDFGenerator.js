import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import toast from 'react-hot-toast';

const formatPrice = (price) => {
   if (price === null || price === undefined) return 'N/A';
   const numPrice = Number(price);
   return numPrice.toLocaleString('en-IN');
};

const findSpec = (product, sectionName, keyName) => {
   try {
      const section = product.sections?.[sectionName];
      if (!section) return 'N/A';
      const spec = section.find((item) =>
         item.key.toLowerCase().includes(keyName.toLowerCase())
      );
      return spec ? spec.value.trim() : 'N/A';
   } catch {
      return 'N/A';
   }
};

const loadImage = (url) => {
   return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
   });
};

export const generatePdf = async (product) => {
   if (!product) {
      console.error('Product data is not available.');
      return;
   }

   const doc = new jsPDF();
   const brandColor = [255, 178, 0];
   const docWidth = doc.internal.pageSize.getWidth();
   let yPos = 0;

   try {
      const [logoImg, productImg] = await Promise.all([
         loadImage('/logo.png').catch(() => null),
         loadImage(product.images[0]).catch(() => null),
      ]);

      // Header
      doc.setFillColor(...brandColor);
      doc.rect(0, 0, docWidth, 30, 'F');
      if (logoImg) {
         doc.addImage(logoImg, 'PNG', 15, 7, 35, 15);
      }
      doc.setFontSize(20);
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.text(`${product.name} - Brochure`, docWidth / 2, 18, {
         align: 'center',
      });
      yPos = 45;

      if (productImg) {
         doc.addImage(productImg, 'PNG', 18, yPos, 70, 65);
      }

      let initialY = yPos + 5;
      doc.setFontSize(26);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.text(product.name, 105, initialY);

      doc.setFontSize(10);
      doc.setTextColor(102, 102, 102);
      doc.setFont('helvetica', 'normal');
      doc.text('Ex-Showroom Price', 105, initialY + 12);

      doc.setFontSize(22);
      doc.setTextColor(...brandColor);
      doc.setFont('helvetica', 'bold');
      const formattedPrice = formatPrice(product.netExShowroomPrice);
      doc.text(`₹${formattedPrice}`, 105, initialY + 23);

      yPos = initialY + 68;

      // Key Highlights Section
      doc.setFontSize(16);
      doc.setTextColor(...brandColor);
      doc.setFont('helvetica', 'bold');
      doc.text('Key Highlights', 15, yPos);
      yPos += 12;

      const keySpecs = [
         {
            label: 'Range',
            value: findSpec(product, 'engineAndTransmission', 'range'),
         },
         {
            label: 'Top Speed',
            value: findSpec(product, 'electricals', 'top speed'),
         },
         {
            label: 'Battery Type',
            value: findSpec(product, 'electricals', 'battery type'),
         },
         {
            label: 'Charging Time',
            value: findSpec(product, 'electricals', 'charging time'),
         },
      ];

      doc.setFontSize(11);
      doc.setTextColor(51, 51, 51);
      keySpecs.forEach((spec, index) => {
         const xPos = index % 2 === 0 ? 20 : 110;
         if (index % 2 === 0 && index > 0) yPos += 20;

         doc.setFont('helvetica', 'bold');
         doc.text(`${spec.label}:`, xPos, yPos);
         doc.setFont('helvetica', 'normal');
         doc.text(spec.value, xPos + 38, yPos);
      });

      yPos += 35;

      // Technical Specifications
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.text('Technical Specifications', 15, yPos);
      yPos += 10;

      Object.entries(product.sections).forEach(([key, specs]) => {
         const sectionTitle = key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase())
            .replace('And', '&');

         autoTable(doc, {
            startY: yPos,
            head: [[sectionTitle, '']],
            body: specs.map((spec) => [spec.key, spec.value]),
            theme: 'striped',
            styles: { font: 'helvetica', fontSize: 10 },
            headStyles: {
               fillColor: brandColor,
               textColor: [255, 255, 255],
               fontStyle: 'bold',
            },
            columnStyles: {
               0: { fontStyle: 'bold', cellWidth: 80 },
               1: { cellWidth: 'auto' },
            },
         });
         yPos = doc.lastAutoTable.finalY + 10;
      });

      // Footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
         doc.setPage(i);
         doc.setFontSize(10);
         doc.setTextColor(136, 136, 136);

         doc.setDrawColor(...brandColor);
         doc.setLineWidth(0.3);
         doc.line(15, 283, docWidth - 15, 283);

         doc.text(`${product.name} Brochure`, 15, 290);
         doc.text(`Page ${i} of ${pageCount}`, docWidth - 15, 290, {
            align: 'right',
         });
      }

      doc.save(`${product.name}-Brochure.pdf`);
   } catch (error) {
      console.error('Failed to generate PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
   }
};
