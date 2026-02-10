import { useEffect, useState } from "react";
import CurriculumHeader from "./CourseSidebar";
import CourseSection from "./CourseSection";
import React from "react";


const CourseCurriculum = ({ course }) => {
  const { courseContent, totalDuration } = course;

  const [activeSections, setActiveSections] = useState([]);
  const [totalLectures, setTotalLectures] = useState(0);

  useEffect(() => {
    let lectures = 0;
    courseContent?.forEach((section) => {
      lectures += section.subSection?.length || 0;
    });
    setTotalLectures(lectures);
  }, [courseContent]);

  const toggleSection = (sectionId) => {
    setActiveSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <CurriculumHeader
        sections={courseContent?.length}
        lectures={totalLectures}
        duration={totalDuration}
        onCollapseAll={() => setActiveSections([])}
      />

      <div className="flex flex-col gap-2">
        {courseContent?.map((section) => (
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
