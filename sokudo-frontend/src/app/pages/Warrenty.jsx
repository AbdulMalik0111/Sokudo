import Banner from "/videoimage.jpg";

const Warranty = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* ✅ Banner Section */}
      


      <section
        className="relative isolate h-[420px] flex flex-col justify-center items-center text-center transition-all duration-300"
        style={{
          marginTop: "calc(var(--announcement-offset) ",
        }}
      >
              <div
                className="absolute inset-0 -z-10 bg-center bg-cover"
                style={{ backgroundImage: `url(${Banner})` }}
              />
              <div className="absolute inset-0 -z-10 bg-black/40" />
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.20),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.12),transparent_40%)]" />
      
              <div className="page-width mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <h1 className="heading !text-white">Warranty Policy</h1>
              </div>
            </section>


      

      {/* Content Section */}
      <section className="title_container  mt-4 py-5">
        <div className="container text-center mx-auto">
          <h1 className="text-3xl font-bold mb-2">Warranty Policy</h1>
            <div className="h-[3px] w-24 bg-yellow-400 mx-auto rounded-full"></div>

          
        </div>
      </section>

      <section className="content_container py-10 bg-white">
        <div className="container mx-auto max-w-4xl leading-7 text-[17px]">

          <h2 className="font-bold text-xl mb-3">
            Warranty – Sokudo India High-Speed Electric Scooters
          </h2>

          <p>
            Every product, irrespective of its superiority, needs protection. This protection 
            is called warranty, and the period for which it is covered is known as the warranty period.
          </p>

          <p className="mt-3">
            Sokudo Electric India offers warranty on all Acute/Acute+ scooters manufactured and distributed
            through authorized dealers to be free from defects in material and workmanship under normal usage.
          </p>

          <h3 className="font-semibold text-lg mt-6 mb-2">Warranty Period</h3>

          {/* ✅ Table 1 */}
          <table className="w-full border border-black text-[16px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">S No.</th>
                <th className="border p-2">Model</th>
                <th className="border p-2">Free Service</th>
                <th className="border p-2">Paid Service</th>
                <th className="border p-2">36 Months/30,000 km<br />(Motor & Battery)</th>
                <th className="border p-2">12 Months/30,000 km<br />(Other Parts)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">1</td>
                <td className="border p-2">Acute / Acute+</td>
                <td className="border p-2">3</td>
                <td className="border p-2">16</td>
                <td className="border p-2">Motor & Battery*</td>
                <td className="border p-2">Chassis, Suspension, Electronics, etc.</td>
              </tr>
            </tbody>
          </table>

          <p className="text-sm mt-2 italic">
            *Warranty of some items is provided by respective manufacturers. Replacement time 10–15 working days.
          </p>

          <h3 className="font-semibold text-lg mt-6 mb-2">No Warranty Items</h3>

          {/* ✅ Table 2 */}
          <table className="w-full border border-black text-[16px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Model</th>
                <th className="border p-2">Items Not Covered Under Warranty</th>
                <th className="border p-2">Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Acute / Acute+</td>
                <td className="border p-2">
                  Tyres, painted parts, plastic parts, lock set, mirrors, charging plug, MCB,
                  bulbs, brake cables/shoes, shocker seals, wear & tear items, seat, disc brake parts,
                  switches, DRL, anti-theft remote, battery broken & physical damage.
                </td>
                <td className="border p-2">
                  Warranty from respective manufacturer only.
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="font-semibold text-lg mt-6 mb-2">Warranty Limitations</h3>
          <ul className="list-disc ml-6">
            <li>Missed scheduled services</li>
            <li>Commercial use or ownership transfer</li>
            <li>Unauthorized repair/modification</li>
            <li>Crash, overloading, racing or misuse</li>
            <li>Fitment of non-recommended accessories</li>
            <li>Damage due to flood/fire/natural disaster</li>
            <li>Improper maintenance or road conditions</li>
            <li>Vehicle uninsured or invalid insurance</li>
          </ul>

          <h3 className="font-semibold text-lg mt-6 mb-2">Battery Warranty</h3>

          <ul className="list-disc ml-6">
            <li>2 Years – Free replacement for manufacturing defects</li>
            <li>3rd Year – Pro-rata replacement</li>
            <li>Transportation charges by customer</li>
            <li>Rental/commercial: 1500–1700 cycles</li>
            <li>Performance drop: Yr1 – 10%, Yr2 – 10%, Yr3 – 20%</li>
          </ul>

          <h4 className="font-semibold mt-5">Battery AH drop guideline</h4>

          <ul className="list-disc ml-6">
            <li>Year 1: Replace if below 35Ah</li>
            <li>Year 2: Replace if below 31Ah</li>
            <li>Year 3: Replace if below 24Ah</li>
          </ul>

          <p className="mt-3">
            ANY speedometer change must be reported via official mail or warranty void.
          </p>

        </div>
      </section>
    </div>
  );
};

export default Warranty;
