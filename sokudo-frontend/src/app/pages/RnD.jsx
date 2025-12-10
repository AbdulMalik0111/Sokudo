import Banner from "/career.webp";
import About from "/p4.webp";
import { GiMaterialsScience } from "react-icons/gi";
import { MdElectricalServices } from "react-icons/md";
import { HiShieldCheck } from "react-icons/hi";
import { BsBatteryCharging } from "react-icons/bs";
import { RiCpuLine } from "react-icons/ri";

const RnD = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero */}

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
          <h1 className="heading !text-white">R&amp;D</h1>
        </div>
      </section>

      {/* Main content: left image, right content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Image */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-gray-200">
              <img
                src={About}
                alt="R&D at Sokudo India"
                className="w-full h-full object-cover aspect-[4/3] sm:aspect-[16/10]"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              R &amp; D · Sokudo India
            </h2>

            <p className="mt-4 leading-7 text-gray-700">
              We are a quality-seeking and quality-conscious organisation.
              Before it reaches our customers, every product we manufacture is
              thoroughly inspected, rigorously tested by quality engineers, and
              subjected to stringent quality checks. Sokudo certified
              organization that is environmentally conscious, socially
              responsible and professionally ethical in its business operations.
              We&apos;ve been revolutionising your travel-to-work experience by
              enabling the smooth connectivity of technology and mobility
              solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom highlights section */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-semibold text-gray-900">
            Key R&amp;D Highlights
          </h3>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 ring-1 ring-emerald-200 text-emerald-600">
                  <GiMaterialsScience className="text-xl" />
                </span>
                <h4 className="font-semibold text-gray-900">
                  Advanced Materials
                </h4>
              </div>
              <p className="mt-3 text-gray-700 leading-7">
                3.5mm ABS plastic thickness, surpassing the industry standard of
                2mm, ensuring unmatched durability.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 ring-1 ring-emerald-200 text-emerald-600">
                  <MdElectricalServices className="text-xl" />
                </span>
                <h4 className="font-semibold text-gray-900">
                  Innovative Charging
                </h4>
              </div>
              <p className="mt-3 text-gray-700 leading-7">
                Through our CAN bus connector, we introduce faster, more
                efficient, and intelligent charging for electric vehicles.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 ring-1 ring-emerald-200 text-emerald-600">
                  <HiShieldCheck className="text-xl" />
                </span>
                <h4 className="font-semibold text-gray-900">
                  Safety as Priority
                </h4>
              </div>
              <p className="mt-3 text-gray-700 leading-7">
                Certified IP67 motors and fireproof batteries underscore our
                commitment to rider safety and environmental preservation.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 ring-1 ring-emerald-200 text-emerald-600">
                  <BsBatteryCharging className="text-xl" />
                </span>
                <h4 className="font-semibold text-gray-900">
                  Longevity and Efficiency
                </h4>
              </div>
              <p className="mt-3 text-gray-700 leading-7">
                LFP battery cells offer triple the life cycle of NMC cells,
                guaranteeing up to 2500– 3000 cycles of reliable performance.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 ring-1 ring-emerald-200 text-emerald-600">
                  <RiCpuLine className="text-xl" />
                </span>
                <h4 className="font-semibold text-gray-900">
                  Smart Battery Management
                </h4>
              </div>
              <p className="mt-3 text-gray-700 leading-7">
                Equipped with an active balancer, our batteries ensure optimal
                performance by automatically balancing cells to prevent issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pioneering Electric Mobility – separate section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="text-2xl font-semibold text-gray-900">
            Pioneering Electric Mobility: Sokudo&apos;s Journey of Research and
            Development
          </h3>
          <div className="mt-4 text-gray-700 leading-7 space-y-4">
            <p>
              In an era marked by a growing urgency to address environmental
              concerns, Sokudo has emerged as a symbol of innovation, is an
              Indigenous purveyor. dedication, and transformation. Our
              groundbreaking journey commenced in November 2019 under the
              visionary leadership of Mr. Prashant Vashitha, our Managing
              Director. Our mission was clear: to create a lasting impact on our
              nation, environment, and way of life.
            </p>
            <p>
              Electric two-wheelers have emerged as a beacon of hope in our
              quest for sustainability, offering a tangible solution to the
              escalating challenges of CO2 emissions, noise pollution, and
              carbon footprint.
            </p>
            <p>
              However, as we embarked on our journey, we encountered a critical
              gap in the market. Low-speed electric scooters were dominating the
              scene, often sidestepping regulations and compromising on quality.
              In contrast, Sokudo envisioned a higher standard for electric
              mobility. Our exploration through market dealers revealed a
              disconcerting prevalence of subpar products, marred by battery
              explosions, motor inefficiencies, and fragile components.
            </p>
            <p>
              Under the stewardship of Mr. Prashant Vashitha and bolstered by
              our team&apos;s unwavering dedication, we resolved to confront
              these challenges head-on. Our pursuit of excellence led to the
              approval of 12 low-speed scooter models, marking a pivotal shift.
              Yet, it was evident that achieving quality demanded more than
              approval; it demanded a commitment to innovation, research, and a
              resolute determination to raise the bar.
            </p>
            <p>
              Thus, the Sokudo Acute and Acute 2.2 were born – electric scooters
              that embody Sokudo&apos;s unwavering commitment to quality,
              performance, and sustainability. These ICAT-certified and
              FAME-subsidized models stand as testaments to our pledge to
              deliver products that not only meet but exceed expectations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RnD;
