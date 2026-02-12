import { useEffect, useState } from "react";
import CurriculumHeader from "./CurriculumHeader";
import CourseSection from "./CourseSection";
import React from "react";
import formatDuration from "../../utils/formatDuration";
import { CourseInstructions } from "./CourseInstructions";


const CourseCurriculum = ({ sections , instructions}) => {
  const [activeSections, setActiveSections] = useState([]);
  const [totalLectures, setTotalLectures] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    let lectures = 0;
    let duration = 0;

    sections?.forEach((section) => {
      lectures += section.subSections?.length || 0;

      section.subSections?.forEach((sub) => {
        duration += sub.timeDuration || 0;
      });
    });

    setTotalLectures(lectures);
    setTotalDuration(duration);
  }, [sections]);

  const toggleSection = (sectionId) => {
    setActiveSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  if (!sections || sections.length === 0) {
    return <p>No curriculum available</p>;
  }


  return (
    <div className="flex flex-col gap-6">

      <CourseInstructions instructions={instructions} />

      
      <CurriculumHeader
        sections={sections.length}
        lectures={totalLectures}
        duration={formatDuration(totalDuration)}
        onCollapseAll={() => setActiveSections([])}
      />

      <div className="flex flex-col gap-2">
        {sections.map((section) => (
          <CourseSection
            key={section._id}
            section={section}
            isOpen={activeSections.includes(section._id)}
            onToggle={() => toggleSection(section._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseCurriculum;
