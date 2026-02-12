import React from 'react'
import { BsFillCaretRightFill } from "react-icons/bs";

export const CourseInstructions = ({instructions}) => {
  return (
    <div className='border-2 rounded-md border-richblack-600 bg-richblack-700 p-4'>

         {instructions.length > 0 && (
        <div>
          <p className="mb-2 text-lg font-semibold">
            This course includes:
          </p>

          <div className="flex flex-col gap-2 text-sm ">
            {instructions.map((item, i) => (
              <div key={i} className="flex gap-2">
                <BsFillCaretRightFill />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}


    </div>
  )
}
