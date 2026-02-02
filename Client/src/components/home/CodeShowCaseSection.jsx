import CodeBlocks from "../../components/home/CodeBlocks";
import HighlightText from "../../components/common/HighlightText";
import React from "react";
export default function CodeShowcaseSection() {
  return (
    <section className="mx-auto w-11/12 max-w-maxContent">
      <CodeBlocks
        position="lg:flex-row"
        heading={
          <h2 className="text-4xl font-semibold">
            Unlock your <HighlightText text="coding potential" /> with our
            courses.
          </h2>
        }
        subheading="Learn from industry experts with real-world projects."
        ctabtn1={{ btnText: "Try it Yourself", link: "/signup", active: true }}
        ctabtn2={{ btnText: "Learn More", link: "/signup", active: false }}
        codeColor="text-yellow-25"
        codeblock={`<!DOCTYPE html>\n<html>\n<body>\n<h1>Hello World</h1>\n</body>\n</html>`}
        backgroundGradient={<div className="codeblock1 absolute" />}
      />

      <CodeBlocks
        position="lg:flex-row-reverse"
        heading={
          <h2 className="text-4xl font-semibold">
            Start <HighlightText text="coding in seconds" />
          </h2>
        }
        subheading="Write real code from your very first lesson."
        ctabtn1={{ btnText: "Continue Lesson", link: "/signup", active: true }}
        ctabtn2={{ btnText: "Learn More", link: "/signup", active: false }}
        codeColor="text-white"
        codeblock={`const App = () => <div>Hello World</div>`}
        backgroundGradient={<div className="codeblock2 absolute" />}
      />
    </section>
  );
}
