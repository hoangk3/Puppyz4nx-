/* eslint-disable no-script-url */
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as brandStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import Img from "../../components/img";
import htmlIcon from "../../assets/icons/html.svg";
import cssIcon from "../../assets/icons/css.svg";
import javascriptIcon from "../../assets/icons/javascript.svg";
import nodejsIcon from "../../assets/icons/nodejs-dark.svg";
import vscodeIcon from "../../assets/icons/vscode.svg";
import githubIcon from "../../assets/icons/github.svg";
import notepadppIcon from "../../assets/icons/notepadplusplus.svg";
import tailwindIcon from "../../assets/icons/tailwind.svg";
import reactIcon from "../../assets/icons/react.svg";
import typescriptIcon from "../../assets/icons/typescript.svg";
import pythonIcon from "../../assets/icons/python.svg";
import cppIcon from "../../assets/icons/cpp.svg";

class Skill {
  constructor(name, content, img, skillLevel) {
    this.name = name;
    this.content = content;
    this.img = img;
    this.skillLevel = skillLevel;
  }

  render() {
    return (
      <div className='p-2 my-1 bg-slate-100 rounded-xl flex gap-4 items-center'>
        <div className='size-14 min-w-14 rounded-xl overflow-hidden'>
          <Img className='size-full' src={this.img} alt={this.name} />
        </div>
        <div className='w-full group hover:*:whitespace-normal overflow-hidden'>
          <p className='truncate transition-all'>{this.content}</p>
          <p className='group-hover:hidden text-sm'>
            {this.skillLevel.map((level, index) => (
              <FontAwesomeIcon key={index} icon={level} />
            ))}
          </p>
        </div>
      </div>
    );
  }
}

function Skills() {
  useEffect(() => {
    document.title = "📚 - Puppy_z4nx";
  }, []);

  const [openCategory, setOpenCategory] = useState(0);

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  const skillList = [
    new Skill(
      "C++",
      "C++: A powerful programming language that supports both object-oriented and procedural programming. Commonly used in system software, game development, and high-performance applications (this is the main language of the website owner) ⚡.",
      cppIcon,
      [brandStar, brandStar, brandStar, brandStar, brandStar]
    ),
    new Skill(
      "HTML",
      "HTML: (HyperText Markup Language) is the building block 🧱 of the web, using tags to define the structure and content of web pages.",
      htmlIcon,
      [brandStar, brandStar, brandStar, brandStar, regularStar]
    ),
    new Skill(
      "CSS",
      "CSS: (Cascading Style Sheets) is a styling language used to design layouts and visual presentation for HTML, helping developers create visually appealing websites 🎨.",
      cssIcon,
      [brandStar, brandStar, brandStar, regularStar, regularStar]
    ),
    // eslint-disable-next-line
    new Skill(
      "JavaScript",
      "JavaScript: A flexible language that adds interactivity ✨ and dynamic behavior 🥏 to websites, creating engaging user experiences.",
      javascriptIcon,
      [brandStar, brandStar, brandStar, brandStar, regularStar]
    ),
    new Skill(
      "TypeScript",
      "TypeScript: A programming language built on top of JavaScript, providing better tooling for large-scale applications.",
      typescriptIcon,
      [brandStar, brandStar, brandStar, regularStar, regularStar]
    ),
    new Skill(
      "Python",
      "Python: A language with clean syntax and clear structure, beginner-friendly and easy to learn, widely used across many domains.",
      pythonIcon,
      [brandStar, brandStar, brandStar, brandStar, regularStar]
    ),
    new Skill(
      "Tailwind CSS",
      "Tailwind CSS: A utility-first CSS framework that allows developers to quickly build user interfaces without leaving their HTML.",
      tailwindIcon,
      [brandStar, brandStar, brandStar, regularStar, regularStar]
    ),
    new Skill(
      "ReactJS",
      "ReactJS: A library for building native and web user interfaces using reusable components written in JavaScript.",
      reactIcon,
      [brandStar, brandStar, brandStar, regularStar, regularStar]
    ),
    new Skill(
      "Node.js",
      "Node.js: A server-side JavaScript runtime 🖥 that enables building scalable and efficient web applications.",
      nodejsIcon,
      [brandStar, regularStar, regularStar, regularStar, regularStar]
    ),
    new Skill(
      "Visual Studio Code",
      "Visual Studio Code: A free ✨ and open-source editor developed by Microsoft, offering rich features and extensions for many languages.",
      vscodeIcon,
      [brandStar, brandStar, brandStar, brandStar, regularStar]
    ),
    new Skill(
      "GitHub",
      "GitHub: A platform providing collaboration and version control tools, allowing developers to store 👩‍💻, review, and manage code repositories.",
      githubIcon,
      [brandStar, brandStar, brandStar, brandStar, regularStar]
    ),
    new Skill(
      "Notepad++",
      "Notepad++: A free and open-source 📝 text editor for Windows. Lightweight, fast, and packed with useful features.",
      notepadppIcon,
      [brandStar, brandStar, brandStar, brandStar, brandStar]
    ),
  ];

  const categories = [
    {
      name: "Languages",
      contents: skillList.slice(0, 5),
    },
    {
      name: "Frameworks & Styling",
      contents: skillList.slice(5, 7),
    },
    {
      name: "Development Tools",
      contents: skillList.slice(7, 11),
    },
  ];

  return (
    <div className='font-bold text-neutral-800 w-full pb-4'>
      <div className='mb-3 flex text-3xl gap-2 font-bold'>
        <div className='bg-neutral-800 h-[36px] w-2'></div>
        <h2>Skills 🔍</h2>
      </div>
      <p>
        Skills and technologies I use to build websites (including other related
        tools as well). 😊
      </p>
      <div className='mt-6'>
        {categories.map((category, index) => (
          <div
            className='border-b-slate-600/40 border-b-[1px] cursor-pointer'
            key={index}
          >
            <div onClick={() => toggleCategory(index)}>
              <div className='pt-6 pb-4'>
                <h2 className='text-lg'>
                  {category.name}{" "}
                  {openCategory === index ? (
                    <span className='text-cyan-600'>-</span>
                  ) : (
                    "+"
                  )}
                </h2>
              </div>
              {openCategory === index && (
                <div>
                  {category.contents.map((skill, idx) => (
                    <div key={idx}>{skill.render()}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
