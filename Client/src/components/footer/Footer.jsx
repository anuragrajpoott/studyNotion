import { Link } from "react-router-dom";
import { FooterLink2 } from "../../assets/data/footer-links";
import FooterLinkGroup from "./FooterLinkGroup";

import React from "react";

// Assets
import Logo from "../../assets/visuals/Logo/Logo-Full-Light.png";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const bottomLinks = ["Privacy Policy", "Cookie Policy", "Terms"];

const staticSections = [
  {
    title: "Company",
    links: ["About", "Careers", "Affiliates"],
  },
  {
    title: "Resources",
    links: [
      "Articles",
      "Blog",
      "Chart Sheet",
      "Code challenges",
      "Docs",
      "Projects",
      "Videos",
      "Workspaces",
    ],
  },
  {
    title: "Plans",
    links: ["Paid memberships", "For students", "Business solutions"],
  },
  {
    title: "Community",
    links: ["Forums", "Chapters", "Events"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-richblack-800">
      <div className="w-11/12 max-w-maxContent mx-auto py-14 text-richblack-400">

        {/* Top Section */}
        <div className="flex flex-col lg:flex-row border-b border-richblack-700 pb-8 gap-8">

          {/* Left */}
          <div className="lg:w-1/2 flex flex-wrap justify-between gap-4">
            <div className="w-[30%] min-w-45 flex flex-col gap-4">
              <img src={Logo} alt="StudyNotion" className="w-40" />

              {staticSections.slice(0, 1).map(section => (
                <FooterLinkGroup
                  key={section.title}
                  title={section.title}
                  links={section.links.map(l => ({
                    label: l,
                    to: l.toLowerCase(),
                  }))}
                />
              ))}

              <div className="flex gap-3 text-lg">
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
            </div>

            {staticSections.slice(1).map(section => (
              <FooterLinkGroup
                key={section.title}
                title={section.title}
                links={section.links.map(l => ({
                  label: l,
                  to: l.split(" ").join("-").toLowerCase(),
                }))}
              />
            ))}
          </div>

          {/* Right */}
          <div className="lg:w-1/2 flex flex-wrap justify-between gap-4">
            {FooterLink2.map(section => (
              <FooterLinkGroup
                key={section.title}
                title={section.title}
                links={section.links.map(link => ({
                  label: link.title,
                  to: link.link,
                }))}
              />
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-center pt-8 text-sm">
          <div className="flex">
            {bottomLinks.map((item, i) => (
              <Link
                key={item}
                to={item.split(" ").join("-").toLowerCase()}
                className={`px-3 hover:text-richblack-50 transition-all ${
                  i !== bottomLinks.length - 1 &&
                  "border-r border-richblack-700"
                }`}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
