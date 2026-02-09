import React from "react";



export default function CategoryHero({ category }) {

  

  
  return (
    <section className="bg-richblack-800 px-4">
      <div className="mx-auto flex min-h-65 max-w-maxContent flex-col justify-center gap-4">
        <p className="text-sm text-richblack-300">
          Home / Catalog /{" "}
          <span className="text-yellow-25">{category?.name}</span>
        </p>

        <h1 className="text-3xl text-richblack-5">
          {category?.name}
        </h1>

        <p className="max-w-217.5 text-richblack-200">
          {category?.description}
        </p>
      </div>
    </section>
  );
}
