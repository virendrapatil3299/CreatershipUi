// App.jsx

'use client';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Login from './SignIn/page';
import SignUp from './SignUp/page';
import Dashboard from './Dashboard/page';
import Navbar from './Component/Navbar';
import BetaBanner from './Component/BetaBanner';
import HeroSection from './Component/Hero';

import Footer from './Component/Footer';
import FAQSection from './Component/FaqSection';
import PricingPlans from './Component/PricingPlans';
import TrendingSection from './Component/trendingCreators';
import TopHeader from './Dashboard/TopHeader';
import CreatorshipLanding from './Component/CreatorshipLanding';
import FeatureBox from './Dashboard/FeatureBox';
import Link from 'next/link';
import Sidebar from './Dashboard/Sidebar';
import GeminiChat from './GeminiChat';

// import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
    
      <Navbar/>
      <HeroSection/>
      <CreatorshipLanding/>
      
      <TrendingSection/>
      <PricingPlans/>
      <FAQSection/>
      <Footer/>
      {/* <GeminiChat/>
        <
        
  <FeatureBox/> */}
{/* <TopHeader/> */}

</div>
  );
}

export default App;
