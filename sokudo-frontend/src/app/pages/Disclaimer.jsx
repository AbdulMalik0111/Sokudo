import Banner from "/videoimage.jpg";

const Disclaimer = () => {
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
              <h1 className="heading !text-white">Disclaimer</h1>
            </div>
          </section>

      {/* ✅ Content Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading Below Banner */}
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-2">
              Disclaimer
            </h2>
            <div className="h-[3px] w-24 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          {/* Content */}
          <div className="text-gray-700 leading-relaxed space-y-5 text-[17px]">

            <p>
              Electric scooters are not permitted on public roads, bike paths, or footpaths. 
              It is entirely the responsibility of the customer to ensure that their e-scooter 
              is used in accordance with all local and national laws.
            </p>

            <p>
              The customer accepts and assumes all risks and liabilities associated with the 
              use of an e-scooter or any other product purchased from Sokudo. The customer 
              accepts full responsibility and waives the right to hold Sokudo or its owners liable 
              for any damages or liabilities arising from the use of the product, unless caused by 
              company negligence or a defective product.
            </p>

            <p>
              The customer must ensure that their e-scooter complies with all applicable laws. 
              The user assumes full responsibility for the use of the electric scooter and releases 
              Sokudo and its owners from any liability incurred through the scooter's use.
            </p>

            <p>
              The information provided on this website is not legal advice and should not be treated as such. 
              Always consult a qualified legal professional for legal guidance regarding your specific needs.
            </p>
            
          </div>

        </div>
      </section>

    </div>
  );
};

export default Disclaimer;
