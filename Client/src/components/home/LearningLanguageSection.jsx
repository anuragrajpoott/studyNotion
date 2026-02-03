import Button from "../../components/common/Button";
import HighlightText from "../../components/common/HighlightText";
import React from "react";

import KnowYourProgress from "../../assets/visuals/Images/Know_your_progress.png";
import CompareWithOthers from "../../assets/visuals/Images/Compare_with_others.svg";
import PlanYourLessons from "../../assets/visuals/Images/Plan_your_lessons.svg";

export default function LearningLanguageSection() {
  return (
    <section>
      <div className="my-10 text-center text-4xl font-semibold text-white">
        Your swiss knife for{" "}
        <HighlightText text="learning any language" />

        <p className="mx-auto mt-3 text-base font-medium leading-6 text-richblack-700 lg:w-[75%]">
          Using spin makes learning multiple languages easy. With 20+ languages,
          realistic voice-overs, progress tracking, custom schedules, and more.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center lg:mt-0 lg:flex-row">
          <img
            src={KnowYourProgress}
            alt="Track your learning progress"
            className="object-contain lg:-mr-32"
          />
          <img
            src={CompareWithOthers}
            alt="Compare your progress with others"
            className="object-contain -mt-12 lg:-mb-10 lg:mt-0"
          />
          <img
            src={PlanYourLessons}
            alt="Plan your lessons efficiently"
            className="object-contain -mt-16 lg:-ml-36 lg:-mt-5"
          />
        </div>
      </div>

      <div className="mx-auto mb-8 w-fit -mt-5 lg:mb-20">
        <Button to="/signup">Learn More</Button>
      </div>
    </section>
  );
}
