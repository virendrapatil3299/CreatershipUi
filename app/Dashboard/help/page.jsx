'use client';

import { useState } from 'react';
import SearchBar from './SearchBar'

const faqs = [
  {
    question: 'What is Creatorships?',
    answer:
      'Creatorships is a platform that connects brands with creators for marketing campaigns...',
  },
  {
    question: 'How do I create a campaign?',
    answer:
      'To create a campaign, navigate to the Campaigns tab, click on "Create Campaign"...',
  },
  {
    question: 'How do I find creators for my campaign?',
    answer:
      "You can find creators by using our search filters to narrow down by category...",
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards, PayPal, and bank transfers...',
  },
  {
    question: 'How much does it cost to use Creatorships?',
    answer:
      'Creatorships offers different subscription tiers based on your needs...',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer:
      'Yes, you can cancel your subscription at any time...',
  },
  {
    question: 'How do creators get paid?',
    answer:
      'Creators are paid through the platform once deliverables are approved...',
  },
  {
    question: 'What metrics can I track for my campaigns?',
    answer:
      'You can track metrics like impressions, clicks, conversions...',
  },
  {
    question: 'How do I contact support?',
    answer:
      'You can contact our support team through the form or email us...',
  },
  {
    question: 'Is my data secure on Creatorships?',
    answer:
      'Yes, all data is encrypted and follows best practices for security...',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 4);

  return (
    <div className="w-full px-5   bg-gray-50">
      {/* Fixed Height Container with scrollable card */}
      <SearchBar/>
      <div className="w-full max-w-6xl mx-auto mt-5   px-4 sm:px-6 lg:px-8 h-[calc(95vh-100px)] bg-white rounded-3xl shadow-lg overflow-x-auto flex flex-col">
        {/* Header */}
        <div className='mt-5'>
          <h2 className="text-3xl font-bold text-orange-500">How we can help?</h2>
          <p className="mt-2 text-black text-base">FAQs</p>
        </div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {visibleFaqs.map((faq, index) => (
            <div
              key={index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="bg-white border border-gray-100 hover:shadow-md transition rounded-2xl p-5 space-y-3 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <p className="text-lg font-semibold text-black">{faq.question}</p>
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-rose-100 text-orange-400 text-lx">
                  {openIndex === index ? '×' : '+'}
                </span>
              </div>
              {openIndex === index && (
                <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>

        {/* View More Button */}
        {!showAll && (
          <div className="text-center mt-3">
            <button
              onClick={() => setShowAll(true)}
              className="border bg-white text-orange-400 border-orange-400 shadow-xl hover:bg-rose-50 px-6 py-2 rounded-full transition"
            >
              View More
            </button>
          </div>
        )}

        {/* Show Contact Form Toggle */}
        <div className="text-center">
          <button
            className="text-orange-400 border border-orange-400 px-5 py-2 mt-4 mb-4 rounded-full shadow-xl hover:bg-orange-50 transition"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Hide Form' : 'Still need help?'}
          </button>
        </div>

        {/* Contact Form */}
        {showForm && (
          <div className="border border-orange-300 rounded-3xl mb-8 p-8 grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-black">
                Still need <span className="text-orange-500">help?</span>
              </h3>
              <form className="space-y-4 text-black">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 p-2 rounded-xl focus:outline-orange-400"
                />
                <input
                  type="text"
                  placeholder="What's your question about?"
                  className="w-full border border-gray-300 p-2 rounded-xl focus:outline-orange-400"
                />
                <textarea
                  placeholder="Describe your issue or question..."
                  className="w-full border border-gray-300 p-2 rounded-xl h-32 focus:outline-orange-400"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-rose-400 to-orange-400 text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition"
                >
                  Send Request
                </button>
              </form>
            </div>
            <div className="flex justify-center">
              <img src="/support.png" alt="Support" className="w-full max-w-xs" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
