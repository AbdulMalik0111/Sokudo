import Banner from "/videoimage.jpg";

const PrivacyPolicy = () => {
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

        <div className="text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl font-semibold mb-3">
            Privacy Policies
          </h1>
        </div>
      </section>

      {/* ✅ Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading Below Banner */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-2">
              Privacy Policies
            </h1>
            <div className="h-[3px] w-24 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <div className="text-gray-700 leading-relaxed space-y-5 text-[17px]">
            <p>
              We use SOKUDO to provide personalization and analytic services on this website, 
              SOKUDO's privacy policy is in effect and can be found here.
            </p>

            <p>
              We (SOKUDO) understand how important it is to keep your data private and secure. 
              Here is what personal information we receive and collect when you use and visit SOKUDO, 
              as well as how we safeguard it. We never sell or rent your personal information to third parties.
            </p>

            <h2 className="font-semibold">Personal data that Sokudo's website uses -</h2>

            <h2 className="font-semibold">Comments</h2>
            <p>
              When spectators post comments on the site, we collect the information displayed in 
              the comments form as well as the visitor's IP address and browser user agent string 
              to aid in spam detection.
            </p>

            <h2 className="font-semibold">Analytics</h2>
            <p>
              For analytics, we use Google Analytics. This information generally includes where you have 
              been, how you can use our website and any communication services between your computer and 
              this site. We will collect information about your computer, Internet connection, IP address, 
              operating system, and browser type, among other things.
            </p>

            <h2 className="font-semibold">Media</h2>
            <p>
              If you transfer pictures to the website, you must avoid including embedded location information 
              (EXIF GPS). Website visitors can access and extract any location information from the website's images.
            </p>

            <h2 className="font-semibold">Contact forms</h2>
            <p>
              If you use the contact form on Sokudo, we only capture the data you enter. If you enter your name, 
              email address, or other personal information in the form, that data is sent to us via email. 
              We only keep the information for as long as it is required to offer an explanation you contacted us.
            </p>
            <p>
              We never use email addresses provided in contact forms for anything other than responding to you 
              about the reason you contacted us. We never sell contact form information to a third party for any reason.
            </p>

            <h2 className="font-semibold">How long will we keep your data?</h2>
            <p>
              When you leave a comment, it and its metadata are saved indefinitely. This allows us to automatically 
              recognise and authorise any follow-up comments rather than retaining them in a moderation queue.
            </p>
            <p>
              We store the personal information provided by users who register on our website (if any) in their user profile. 
              All users can view, edit, or delete their personal information at any time (except they cannot change their username). 
              Administrators of the website can also view and edit that information.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
