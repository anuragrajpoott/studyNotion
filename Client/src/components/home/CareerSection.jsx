import HighlightText from "../../components/common/HighlightText";
import Button from "../../components/common/Button";
import React from "react";
import TimeLineImage from "../../assets/visuals/Images/TimelineImage.png";
import Logo1 from "../../assets/visuals/TimeLineLogo/Logo1.svg";
import Logo2 from "../../assets/visuals/TimeLineLogo/Logo2.svg";
import Logo3 from "../../assets/visuals/TimeLineLogo/Logo3.svg";
import Logo4 from "../../assets/visuals/TimeLineLogo/Logo4.svg";

const timelineData = [
  {
    logo: Logo1,
    heading: "Leadership",
    description: "Fully committed to the success of the company",
  },
  {
    logo: Logo2,
    heading: "Responsibility",
    description: "Students will always be our top priority",
  },
  {
    logo: Logo3,
    heading: "Flexibility",
    description: "The ability to switch is an important skill",
  },
  {
    logo: Logo4,
    heading: "Solve the problem",
    description: "Code your way to a solution",
  },
];


export default function CareerSection() {
  return (
    <section className="bg-pure-greys-5 text-richblack-700">
      <div className="mx-auto w-11/12 max-w-maxContent flex flex-col gap-10">

        <div className="mt-20 flex flex-col lg:flex-row gap-10">
          <h2 className="text-4xl font-semibold lg:w-[45%]">
            Get the skills you need for a{" "}
            <HighlightText text="job that is in demand." />
          </h2>

          <div className="lg:w-[40%] flex flex-col gap-6">
            <p>
              Today, being competitive requires more than professional skills.
            </p>
            <Button to="/signup">Learn More</Button>
          </div>
        </div>

        <section>
              <div className="mb-20 flex flex-col items-center gap-20 lg:flex-row">
                
                {/* ================= LEFT: TIMELINE ================= */}
                <div className="flex flex-col gap-14 lg:w-[45%] lg:gap-3">
                  {timelineData.map((item, index) => (
                    <div key={index} className="flex flex-col lg:gap-3">
                      
                      <div className="flex gap-6">
                        <div className="flex h-13 w-13 items-center justify-center rounded-full bg-white shadow-[0_0_62px_0_rgba(0,0,0,0.07)]">
                          <img
                            src={item.logo}
                            alt={item.heading}
                            className="object-contain"
                          />
                        </div>
        
                        <div>
                          <h3 className="text-[18px] font-semibold">
                            {item.heading}
                          </h3>
                          <p className="text-base">
                            {item.description}
                          </p>
                        </div>
                      </div>
        
                      {/* Connector */}
                      {index !== timelineData.length - 1 && (
                        <div className="hidden h-14 w-6.5 border-r border-dotted border-richblack-100 lg:block" />
                      )}
                    </div>
                  ))}
                </div>
        
                {/* ================= RIGHT: IMAGE + STATS ================= */}
                <div className="relative h-fit w-fit shadow-[0_0_30px_0_rgba(59,130,246,0.3)]">
                  
                  {/* Stats Overlay */}
                  <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 flex-col gap-4 bg-caribbeangreen-700 py-5 text-white uppercase lg:flex-row lg:gap-0 lg:py-10">
                    
                    <div className="flex items-center gap-5 px-7 lg:border-r lg:border-caribbeangreen-300 lg:px-14">
                      <h4 className="w-18.75 text-3xl font-bold">10</h4>
                      <p className="w-18.75 text-sm text-caribbeangreen-300">
                        Years experience
                      </p>
                    </div>
        
                    <div className="flex items-center gap-5 px-7 lg:px-14">
                      <h4 className="w-18.75 text-3xl font-bold">250</h4>
                      <p className="w-18.75 text-sm text-caribbeangreen-300">
                        Types of courses
                      </p>
                    </div>
                  </div>
        
                  {/* Image */}
                  <img
                    src={TimeLineImage}
                    alt="Learning journey timeline"
                    className="h-100 object-cover shadow-[20px_20px_0px_0px_white] lg:h-fit"
                  />
                </div>
              </div>
            </section>
      </div>
    </section>
  );
}
