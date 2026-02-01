import HighlightText from "../../components/common/HighlightText";
import Button from "../../components/common/Button";
import React from "react";
import learningGridData from "../../assets/data/learningGridData";



export default function LearningGrid() {
  return (
    <section className="mx-auto mt-20 w-11/12 max-w-maxContent text-white flex flex-col gap-10">
    <div className="grid mx-auto w-87.5 xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12">
      {learningGridData.map((card, index) => {
        const isHero = card.order < 0;

        return (
          <div
            key={index}
            className={`
              ${index === 0 && "xl:col-span-2"}
              ${
                card.order % 2 === 1
                  ? "bg-richblack-700"
                  : card.order % 2 === 0
                  ? "bg-richblack-800"
                  : "bg-transparent"
              }
              ${card.order === 3 && "xl:col-start-2"}
              h-73.5
            `}
          >
            {isHero ? (
              <div className="xl:w-[90%] flex flex-col gap-3 p-8">
                <h3 className="text-4xl font-semibold">
                  {card.heading}{" "}
                  <HighlightText text={card.highlightText} />
                </h3>

                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>

                <Button to={card.btnLink} className="w-fit mt-2">
                  {card.btnText}
                </Button>
              </div>
            ) : (
              <div className="p-8 flex flex-col gap-8">
                <h4 className="text-lg font-semibold text-richblack-5">
                  {card.heading}
                </h4>

                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
    </section>
  );
}
