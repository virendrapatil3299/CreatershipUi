// components/WelcomeCard.tsx
import React from "react";

const WelcomeCard = () => {
  return (
    <div className="min-h-screen   flex items-center justify-center p-4">
      <div className="relative bg-transparent  backdrop-blur-3xl shadow-2xl rounded-4xl p-10 max-w-4xl w-full text-center">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8">
          Effortless Influencer Discovery &amp; Competitive Insights for Brands
        </h1>

        {/* Description */}
        <p className="text-gray-700 text-base sm:text-lg mb-6">
          This interactive demo showcases how <strong>CREATORSHIPS</strong> empowers brands to
          discover top micro and nano influencers, analyze competitors, and filter creator insights
          by campaign, time period, and audience demographics. Experience intuitive navigation,
          AI-powered content analysis, and actionable metrics—all designed to help you build smarter,
          data-driven partnerships.
        </p>

        {/* CTA Button */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition duration-200">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomeCard;
