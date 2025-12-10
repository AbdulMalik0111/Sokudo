import React, { useEffect, useRef, useState } from "react";
import Banner from "/videoimage.jpg";
import { FiChevronRight } from "react-icons/fi";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const rightSectionRef = useRef(null);
  const answerRefs = useRef([]);

  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch FAQs
  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const response = await fetch("/faq.json");
        const data = await response.json();
        setFaqs(data);

        // Initialize refs after data load
        answerRefs.current = data.map(() => React.createRef());
      } catch (error) {
        console.error("FAQ fetch error:", error);
      }
    };

    fetchFAQ();
  }, []);

  // Auto-scroll to active answer
  useEffect(() => {
    if (answerRefs.current[activeIndex]?.current) {
      answerRefs.current[activeIndex].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [activeIndex]);

  if (faqs.length === 0) {
    return <div className="text-center py-20 text-gray-500">Loading FAQs...</div>;
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* Top Banner */}
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
              <h1 className="heading !text-white">Frequently Asked Questions</h1>
            </div>
          </section>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 py-[60px] flex flex-col md:flex-row gap-6">

        {/* Left - Questions */}
        <div className="md:w-1/3 border-r border-gray-300 max-h-[80vh] overflow-y-auto pr-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Frequently Asked Questions
          </h2>

          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-full text-left p-3 rounded-lg flex items-center justify-between 
                  ${
                    activeIndex === index
                      ? "bg-yellow-100 text-yellow-700"
                      : "hover:bg-gray-100"
                  }
                `}
              >
                <span className="text-sm font-medium">{faq.question}</span>
                <FiChevronRight
                  className={`transition-transform duration-200 ${
                    activeIndex === index
                      ? "rotate-90 text-yellow-600"
                      : "text-gray-500"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right - All Answers (scrollable) */}
        <div
          ref={rightSectionRef}
          className="md:w-2/3 max-h-[80vh] overflow-y-auto pl-2 space-y-6"
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={answerRefs.current[index]}
              className={`bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm ${
                activeIndex === index ? "ring-2 ring-yellow-300" : ""
              }`}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>

              <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FAQ;
