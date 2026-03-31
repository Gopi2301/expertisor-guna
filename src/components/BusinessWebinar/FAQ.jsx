import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQItem = ({ question, answer, isOpen, toggle }) => {
  return (
    <div className="mb-4 overflow-hidden rounded-xl border border-[#2D2D2D] bg-transparent transition-all duration-300 hover:border-[#d4af37]/30">
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between p-6 text-left"
      >
        <span className="font-clash text-lg font-medium text-white md:text-xl pr-8">
          {question}
        </span>
        <div
          className={`shrink-0 text-white transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDown size={24} />
        </div>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-0">
          <p className="font-inter text-base leading-relaxed text-gray-400 md:text-lg">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQ = ({ title, highlight, list }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-[#050400] py-20 px-4 md:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 font-clash text-3xl font-bold text-white md:text-5xl uppercase tracking-wider">
            {title.split(highlight).map((part, index, array) => (
              <React.Fragment key={index}>
                {part}
                {index < array.length - 1 && (
                  <span className="text-[#FFD700]">{highlight}</span>
                )}
              </React.Fragment>
            )) || title}
          </h2>
          {/* <p className="font-inter text-lg text-gray-400 md:text-xl">
            {subtitle}
          </p> */}
        </div>

        <div className="flex flex-col gap-2">
          {list?.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              toggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
