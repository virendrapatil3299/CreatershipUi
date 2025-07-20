"use client";

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const faqData = [
  {
    question: 'What is Creatorships?',
    answer:
      'Creatorships is an AI-powered platform that connects brands with rising content creators, facilitating authentic partnerships and collaborations while providing comprehensive analytics and management tools.',
  },
  {
    question: 'How does creator matching work?',
    answer: 'Our AI technology analyzes creator content, engagement metrics, and audience demographics to match brands with creators who align with their values and target audience, ensuring authentic and effective partnerships.',
  },
  {
    question: 'What metrics do you track?',
    answer: 'We track comprehensive metrics including engagement rate, audience demographics, content performance, ROI, and viral potential, providing detailed analytics for both creators and brands.',
  },
  {
    question: 'How do you ensure authentic partnerships?',
    answer: 'We use AI to analyze creator content history and engagement patterns to ensure genuine audience connections, and we provide tools for transparent communication between brands and creators.',
  },
  {
    question: 'How does the collaboration process work?',
    answer: 'Once you ve identified a creator you like to work with, our platform facilitates the entire collaboration process. From initial outreach to contract signing and content approval, everything happens within our secure platform. Our team provides guidance throughout to ensure successful partnerships.',
  },
  {
    question: 'How do I discover the right creator for my brand?',
    answer: 'Our advanced filtering system allows you to search based on specific criteria like niche, engagement rates, audience demographics, and growth trajectory. Our AI-powered recommendations also suggest creators who align with your brand values and campaign goals.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0); // Default: open first FAQ

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#fff5f2] text-center pt-8 ">
      <h2 className="text-3xl md:text-3xl font-bold  text-black">
        Frequently Asked <span className="text-[#ff5e57]">Questions?</span>
      </h2>
      <p className="text-md text-gray-600 mt-1">
        Get the Answers You Need to Make the Right Move
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`bg-white rounded-2xl shadow transition p-6 text-left ${
              openIndex === index ? 'shadow-md' : ''
            }`}
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggle(index)}
            >
              <p className="font-semibold text-xl text-black ">{item.question}</p>
              {openIndex === index ? (
                <X className="rounded-4xl bg-[#f4d4d1]  text-[#e34a08] w-6 h-6" />
              ) : (
                <Plus className="rounded-4xl bg-[#f4d4d1]  text-[#e34a08] w-6 h-6" />
              )}
            </div>
            {openIndex === index && item.answer && (
              <p className="text-sm text-gray-600 mt-2">{item.answer}</p>
            )}
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <div className="mt-16 bg-white px-6 py-12 w-full text-center">
  <h3 className="text-4xl md:text-4xl font-bold text-black flex justify-center items-center gap-3">
    <span>Expand</span> 
    <span className="text-[#ff5e57]">🔥 Connect</span> 
    <span className="text-black">🔥 Grow</span>
  </h3>

  <div className="flex items-center justify-center my-6">
    <div className="h-px bg-black w-full" />
    <span className="mx-4 text-[#ff5e57] text-3xl">✦</span>
    <div className="h-px bg-black w-full" />
  </div>

  <p className="text-4xl  font-sans  text-black">
    Don't Miss the Next Viral Creator – <br className="md:hidden" />
    Login to Discover!
  </p>

  <button className="mt-6 bg-gradient-to-r from-orange-500 to-red-400 hover:opacity-90 text-white px-8 py-3 rounded-full text-lg font-semibold transition">
    Discover Creators
  </button>
</div>

    </div>
  );
};

export default FAQSection;
