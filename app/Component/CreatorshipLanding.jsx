'use client';

import React, { useEffect, useState } from 'react';

const steps = [
  {
    title: 'Search & Filter',
    description:
      'Use sliders/toggles to prioritize metrics like "engagement rate", "growth velocity", or "audience quality".',
  },
  {
    title: 'Analyze & Compare',
    description:
      'Compare creator profiles with trend graphs (e.g., 1-week engagement vs. 1-month average).',
  },
  {
    title: 'Connect & Track',
    description:
      'Direct messaging + campaign performance tracking integrated into the platform.',
  },
];

// FeatureCard component
const FeatureCard = ({ title, description, button, image, gradient }) => (
  <div
    className={`relative overflow-hidden p-10 transition duration-300 hover:translate-1.5 rounded-[28px] shadow-[10px_10px_0_#FF9472] border-2 border-red-400 text-left flex flex-col justify-between h-full  ${
      gradient
        ? 'bg-gradient-to-br from-[#FF7E5F] to-[#FF9472] text-white shadow-[4px_4px_0_#FFDDD0]'
        : 'bg-[#FFEFE7] hover:bg-[#FFDDD0] text-black'
    }`}
  >
    <div>
      <h3 className={`font-bold text-xl ${gradient ? 'text-white' : 'text-orange-600'}`}>{title}</h3>
      <p className={`text-sm mt-2 ${gradient ? 'text-white' : 'text-gray-700'}`}>{description}</p>
    </div>

    {image && (
      <img
        src={image}
        alt="Feature"
        className="mt-10 w-100 h-auto self-center object-contain"
      />
    )}

    {button && (
      <button
        className={` mt-6 px-5 py-2 rounded-full font-medium transition ${
          gradient
            ? 'bg-white text-[#FF5E57] hover:bg-gray-200'
            : 'bg-white text-orange-600 border border-orange-600 hover:bg-orange-600 hover:text-white'
        }`}
      >
        {button}
      </button>
    )}
  </div>
);

// DashboardSection component
const DashboardSection = () => (
  <div className="bg-white w-full  max-w-5xl mx-auto rounded-[4rem] p-6 md:p-10 mt-14 border-2 border-orange-400 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
    
    {/* Text Content */}
    <div className="flex-1 text-center md:text-left">
      <h3 className="text-2xl md:text-2xl font-extrabold text-black leading-snug">
        Transparent Analytics<br />
        <span className="text-orange-600">Dashboard</span>
      </h3>
      <p className="text-gray-600 mt-4 text-md">
        No black-box algorithms. Dive deep into creator performance.
      </p>

      <ul className="mt-4 space-y-2 text-sm md:text-sm text-gray-800">
        <li className="flex items-start">
          <span className="text-orange-500 mr-2">✔</span> Audience demographics
        </li>
        <li className="flex items-start">
          <span className="text-orange-500 mr-2">✔</span> Content performance analytics
        </li>
        <li className="flex items-start">
          <span className="text-orange-500 mr-2">✔</span> Predictive ROI calculator based on historical campaigns
        </li>
      </ul>

      <button className="mt-6 bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 transition font-semibold text-sm md:text-base">
        Get Started Now
      </button>
    </div>

    {/* Image */}
    <div className="flex-1 w-80 md:w-auto">
      <img
        src="/dash.png"
        alt="Analytics dashboard illustration"
        className="w-full max-w-sm mx-auto"
      />
    </div>
  </div>
);

// HowItWorks component
const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.step-section');
      let index = 0;
      sections.forEach((section, i) => {
        const top = section.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.5) {
          index = i;
        }
      });
      setActiveStep(index);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white py-20 px-6 sm:px-10 lg:px-24">
      <div className="text-center mb-20">
        <h2 className="text-4xl font-bold text-black">
          How it <span className="text-orange-500">Works</span>?
        </h2>
        <p className="text-gray-500 mt-2">
          From Concept to Success – See the Process in Action
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-1.5 top-0 h-full w-1 bg-orange-100" />

        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-start mb-10 step-section scroll-mt-28"
          >
            {/* Timeline indicators */}
            <div className="flex flex-col items-center z-10 mr-10">
              <div
                className={`w-4 h-4 rounded-full ${
                  index <= activeStep
                    ? 'bg-orange-500'
                    : 'bg-gray-300'
                }`}
              ></div>
              {index < steps.length - 1 && (
                <div
                  className={`w-1 h-24 ${
                    index < activeStep ? 'bg-orange-500' : 'bg-orange-100'
                  }`}
                ></div>
              )}
            </div>

            {/* Step content */}
            <div>
              <h3
                className={`text-2xl font-semibold mb-2 ${
                  index <= activeStep
                    ? 'text-black'
                    : 'text-gray-400'
                }`}
              >
                {String(index + 1).padStart(2, '0')}{' '}
                {step.title}
              </h3>
              <p
                className={`max-w-md ${
                  index <= activeStep
                    ? 'text-gray-600'
                    : 'text-gray-300'
                }`}
              >
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Landing Component
const CreatorshipLanding = () => {
  return (
    <div className="max-w-7xl mx-auto px-26 py-16 bg-white">
      <h1 className="text-center text-4xl text-black font-extrabold">
        Why <span className="text-orange-600">Creatorships</span>?
      </h1>
      <p className="text-center text-lg text-gray-600 mt-2 font-sans">
        Unlock the Tools and Opportunities to Build, Scale, and Succeed
      </p>

      {/* Feature Cards */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <FeatureCard
          title="Performance Over Follower Count"
          description="Identify creators based on real-time engagement, not vanity metrics."
          image="/Chat7.svg"
        />
        <FeatureCard
          title="Trending & Growth Metrics"
          description="Spot creators with explosive potential using AI-powered trend analysis."
          button="Get Started"
          image="/Trending.png"
          gradient
        />
        <FeatureCard
          title="Micro-Creator Spotlight"
          description="High-ROI partnerships start here."
          image="/graphic.png"
        />
      </div>

      <DashboardSection />
      <HowItWorks />
    </div>
  );
};

export default CreatorshipLanding;
