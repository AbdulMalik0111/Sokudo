import Banner from "/videoimage.jpg";

const TermsConditions = () => {
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
                <h1 className="heading !text-white">Terms & Conditions</h1>
              </div>
            </section>

      

      {/* ✅ Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading Below Banner */}
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-2">
              Terms & Conditions
            </h2>
            <div className="h-[3px] w-24 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <div className="text-gray-700 leading-relaxed space-y-5 text-[17px]">

            <p className="font-semibold">Providers of services</p>
            <p>
              The Website serves as a platform for the internet buying and selling of branded products and services provided by SOKUDO Electric Vehicles' various affiliate/registered merchants/vendors/service providers ("Services"). 
              The Terms of Offer For Sale ("Terms of Offer For Sale") govern the purchase of the product and services on the Website.
            </p>

            <p className="font-semibold">Services Availability</p>
            <p>
              The Services are not available to minors under the age of eighteen (18) or to any Users who have been suspended or removed from the Sokudo system for any reason.
            </p>
            <p>
              You represent that You are of legal age and are otherwise qualified to form a binding contract and that You are not barred from receiving services under Indian law. 
              If You are under the age of eighteen (18), You may use Sokudo Services through Your legal guardian by applicable laws.
            </p>

            <p className="font-semibold">Return Policy</p>
            <p>
              Returns/refunds are not accepted. Once sold, goods will not be replaced or returned. 
              There will be no refund under any circumstances.
            </p>

            <p className="font-semibold">Information and Feedback</p>
            <p>
              Any feedback You provide to this Website is considered non-confidential. Sokudo Electric Vehicles shall have unrestricted use of such information.
            </p>
            <p>
              You confirm that your feedback does not contain confidential or proprietary information; 
              Sokudo is not under confidentiality obligation; and You are not entitled to any compensation for the feedback.
            </p>

            <p className="font-semibold">Privacy Statement</p>
            <p>
              The User hereby recognises, expresses, and agrees that he has read and fully understands Sockudo Privacy Policy. 
              You also agree that the terms and content of the Privacy Policy are acceptable to You.
            </p>

          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsConditions;
