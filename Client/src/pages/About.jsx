import React from "react";

import AboutHeroSection from "../components/about/AboutHeroSection"; 
import QuoteSection from "../components/about/QuoteSection";
import FoundingStorySection from "../components/about/FoundingStorySection";
import VisionMissionSection from "../components/about/VisionMissionSection";
import StatsSection from "../components/about/StatsSection";
import LearningGrid from "../components/about/LearningGrid";


export default function AboutPage() {
  return (
    <main>
      <AboutHeroSection />
      <QuoteSection />
      <FoundingStorySection />
      <VisionMissionSection />
      <StatsSection />
      <LearningGrid/>
    </main>
  );
}
