// components/HeroSection.tsx
'use client';

import React from "react";
import FeatureHero from "./FeatureHero";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div
      className="relative w-full min-h-screen bg-fixed bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/back1.jpg')" }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-[#fff5f2]/90 to-white/95 z-10" />

      {/* Content */}
      <div className="relative z-20 px-4 py-20 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Stats */}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-10 mb-10">
          <a
            href="https://app.arcade.software/share/1eGvKFSVEm3obVzW3Iyu?ref=share-link"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="text-4xl font-bold text-orange-500">5000+</div>
            <div className="text-gray-700 font-medium text-md">Creators Tracked</div>
          </a>
          <div>
            <div className="text-4xl font-bold text-orange-500">95%</div>
            <div className="text-gray-700 text-md">Predicted Success</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-500">Ready</div>
            <div className="text-gray-700 text-md">Campaign Tools</div>
          </div>
        </div>

        {/* Title */}
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold text-black leading-tight">
            Unlock Tomorrow&apos;s Viral <span className="text-orange-500">Talent</span>
          </h1>
          <p className="mt-4 text-gray-600 text-2xl font-sans">
            Find Micro-Creators on the Verge of Going Viral — While They&apos;re Still Undervalued.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8">
          <Link
            href="/creators"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition"
          >
            Discover Undervalued Creators Now →
          </Link>
        </div>

        {/* Features */}
        <div className="mt-12 w-full">
          <FeatureHero />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
