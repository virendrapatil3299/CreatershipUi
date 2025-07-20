"use client";

import React, { useEffect, useState } from "react";
import { Play } from "lucide-react";

const trendingCreators = [
  {
    id: 1,
    platform: "Instagram",
    tag: "GoodRx",
    title: "#ad #GoodRxforHCPs Healthy is the new beauty goal",
    views: "13.0K",
    likes: "926",
    comments: "35",
    creator: "@anjanettearnold",
    image: "/icon.png",
  },
  {
    id: 2,
    platform: "Instagram",
    tag: "Viator Tours",
    title: "I found this unique NYC Christmas experience!",
    views: "22.2K",
    likes: "359",
    comments: "41",
    creator: "@vickiturtwind",
    image: "/icon.png",
  },
  {
    id: 3,
    platform: "Instagram",
    tag: "Hipcamp",
    title: "Top 5 things we love about our campsite 🏕️",
    views: "39.4K",
    likes: "149",
    comments: "31",
    creator: "@milos_awesome_day",
    image: "/icon.png",
  },
  {
    id: 4,
    platform: "Instagram",
    tag: "eBay online",
    title: `"KING OF COLLECTIBLES: THE GOLDIN TOUCH"`,
    views: "6.6M",
    likes: "8.1K",
    comments: "208",
    creator: "@kengoldin",
    image: "/icon.png",
  },
];

const testimonials = [
  {
    quote: "Creatorships made it insanely easy for us to connect with the right influencer…",
    name: "John Carter",
    title: "Marketing Manager at Sound of Meme",
    bg: "bg-orange-400 text-white",
  },
  {
    quote: "We found our best-performing content creators through Creatorships.",
    name: "Bhavya Bansal",
    title: "CTO at FaceSearch",
    bg: "bg-white text-gray-800 shadow-md",
  },
  {
    quote: "Managing influencer partnerships used to be chaotic — Creatorships…",
    name: "Michael D",
    title: "Head of Partnerships at Ovatime",
    bg: "bg-orange-400 text-white",
  },
  {
    quote: "Creatorships is a must-have for brands looking to scale their influencer marketing strategy efficiently!",
    name: "Eva G",
    title: "Brand Strategist at World Redesigners",
    bg: "bg-white text-gray-800",
  },
];

const platformColors = {
  Instagram: "bg-pink-500",
  TikTok: "bg-black",
  YouTube: "bg-red-500",
};

export default function TrendingSection() {
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % trendingCreators.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [paused]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white  text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-black">
        Trending <span className="text-orange-500">Creator</span> Content
      </h2>
      <p className="mt-1 text-gray-500">
        Discover popular creators across multiple platforms
      </p>

      {/* Controls */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => setPaused(!paused)}
          className="px-4 py-1 text-sm border text-black rounded-full hover:bg-orange-100"
        >
          {paused ? "Play" : "Pause"}
        </button>
        <button
          onClick={() => setIndex(0)}
          className="px-4 py-1 text-black text-sm border rounded-full hover:bg-orange-100"
        >
          Reset
        </button>
        <span className="px-4 py-1 text-sm rounded-full bg-orange-500 text-white">
          Live
        </span>
      </div>

      {/* Creator Carousel */}
      <div className="flex overflow-x-auto gap-6 mt-10 px-6 snap-x snap-mandatory">
        {trendingCreators.map((creator, i) => (
          <div
            key={creator.id}
            className="relative min-w-[250px] snap-start bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={creator.image}
              alt={creator.title}
              className="w-full h-60 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <Play className="text-white w-10 h-10" />
            </div>

            {/* Platform + Tag */}
            <div className="absolute top-3 left-3 flex items-center space-x-2">
              <span
                className={`text-xs text-white px-2 py-1 rounded-full ${platformColors[creator.platform]}`}
              >
                {creator.platform}
              </span>
              <span className="bg-white text-xs px-2 py-1 rounded-full text-black font-semibold">
                {creator.tag}
              </span>
            </div>

            {/* Text Section */}
            <div className="p-4 text-left">
              <p className="text-gray-800 font-medium text-sm">{creator.title}</p>
              <p className="text-xs text-gray-400 mt-1">{creator.creator}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                <span>👀 {creator.views}</span>
                <span>❤️ {creator.likes}</span>
                <span>💬 {creator.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Status */}
      <div className="mt-6 text-sm text-gray-500">
        • Live Updates • {trendingCreators.length} Trending Videos • Auto-refresh enabled
      </div>

      {/* Carousel Dots */}
      <div className="mt-4 flex justify-center gap-2">
        {trendingCreators.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${
              i === index ? "bg-orange-500" : "bg-orange-200"
            }`}
          />
        ))}
      </div>

         {/* Testimonials Section with Auto-Scroll */}
         <div className="mt-20 relative">
        <div className="bg-orange-500 py-10 -skew-y-4 transform origin-top-left">
          <div className="skew-y-4 max-w-4xl mx-auto px-4 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
              Testimonials that Speak to Our Results
            </h2>

            <div className="relative h-52 overflow-hidden">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out transform ${
                    i === testimonialIndex ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                >
                  <div
                    className={`p-6 rounded-xl text-sm mx-auto max-w-lg ${t.bg}`}
                  >
                    <p className="italic text-xl">"{t.quote}"</p>
                    <p className="mt-4 text-xl font-semibold">{t.name}</p>
                    <p className="text-lg">{t.title}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-2 rounded-full ${
                    i === testimonialIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
