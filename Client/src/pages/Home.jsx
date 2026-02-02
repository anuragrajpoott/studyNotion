import HeroSection from "../components/home/HeroSection";
import CodeShowcaseSection from "../components/home/CodeShowCaseSection";
import CareerSection from "../components/home/CareerSection";
import React from "react";
import ExploreMore from "../components/home/ExploreMore";
import InstructorSection from "../components/home/InstructorSection";
import LearningLanguageSection from "../components/home/LearningLanguageSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CodeShowcaseSection />
      <ExploreMore />
      <CareerSection />
      <LearningLanguageSection/>
      <InstructorSection />
    </main>
  );
}
