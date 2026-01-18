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

  render(index) {
    return (
      <div
        className='p-4 my-2 glass-card flex gap-4 items-center animate-fadeInUp'
        style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
      >
        <div className='size-14 min-w-14 rounded-xl overflow-hidden glass-panel p-2'>
          <Img className='size-full object-contain' src={this.img} alt={this.name} />
        </div>
        <div className='w-full group hover:*:whitespace-normal overflow-hidden'>
          <p className='truncate transition-all text-neutral-700 font-medium'>{this.content}</p>
          <p className='group-hover:hidden text-sm mt-1 text-pink-500'>
            {this.skillLevel.map((level, index) => (
              <FontAwesomeIcon key={index} icon={level} className="mr-0.5" />
            ))}
          </p>
        </div>
      </div>
    );
  }
}

function Skills() {
  useEffect(() => {
    document.title = "Skills 🔍 - Puppy";
  }, []);

  const [openCategory, setOpenCategory] = useState(0);

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  const skillList = [
    new Skill(
      "C++",
      "C++: Powerful system language (Owner's main language) ⚡.",
      cppIcon,
      [brandStar, brandStar, brandStar, brandStar, brandStar]
    ),
    new Skill(
      "HTML",
      "HTML: Structural base for the web 🧱.",
      htmlIcon,
      [brandStar, brandStar, brandStar, brandStar, regularStar]
    ),
    new Skill(
      "CSS",
      "CSS: Designing layout and visuals 🎨.",
      cssIcon,
      [brandStar, brandStar, brandStar, regularStar, regularStar]
    ),
    new Skill(
      "JavaScript",
      "JavaScript: Adding interactivity and dynamic logic ✨.",
      javascriptIcon,
      [brandStar, brandStar, brandStar, brandStar, regularStar]
    ),
    new Skill(
      "TypeScript",
      "TypeScript: Typed superset of JavaScript for scale 🛡️.",
      typescriptIcon,
      [brandStar, brandStar, brandStar, regularStar, regularStar]
    ),
    new Skill(
      "Python",
      "Python: Clean syntax for many domains 🐍.",
      pythonIcon,
      [brandStar, brandStar, brandStar, brandStar, regularStar]
    ),
    new Skill(
      "Tailwind CSS",
      "Tailwind: Utility-first CSS framework 🍃.",
      tailwindIcon,
      [brandStar, brandStar, brandStar, regularStar, regularStar]
    ),
    new Skill(
      "ReactJS",
      "ReactJS: Modern UI component library ⚛️.",
      reactIcon,
      [brandStar, brandStar, brandStar, regularStar, regularStar]
    ),
    new Skill(
      "Node.js",
      "Node.js: Server-side JavaScript runtime 🖥️.",
      nodejsIcon,
      [brandStar, regularStar, regularStar, regularStar, regularStar]
    ),
    new Skill(
      "VS Code",
      "VS Code: Powerful modern editor 🖥️.",
      vscodeIcon,
      [brandStar, brandStar, brandStar, brandStar, regularStar]
    ),
    new Skill(
      "GitHub",
      "GitHub: Collaboration and version control 👩‍💻.",
      githubIcon,
      [brandStar, brandStar, brandStar, brandStar, regularStar]
    ),
    new Skill(
      "Notepad++",
      "Notepad++: Lightweight text editor 📝.",
      notepadppIcon,
      [brandStar, brandStar, brandStar, brandStar, brandStar]
    ),
  ];

  const categories = [
    {
      name: "Core Languages",
      contents: skillList.slice(0, 6),
    },
    {
      name: "Modern Web Stack",
      contents: skillList.slice(6, 9),
    },
    {
      name: "Essential Tools",
      contents: skillList.slice(9, 12),
    },
  ];

  return (
    <div className='font-bold text-neutral-800 w-full pb-8 animate-fadeIn'>
      <div className='mb-6 flex text-3xl gap-2 font-bold'>
        <div className='bg-neutral-800 h-[36px] w-2'></div>
        <h2>Skills 🔍</h2>
      </div>
      <p className="text-neutral-600 mb-8 font-medium">
        The stack I use to craft digital experiences. 😊
      </p>
      <div className='space-y-6'>
        {categories.map((category, index) => (
          <div
            className='glass-panel overflow-hidden transition-all duration-500 shadow-lg'
            key={index}
            style={{ borderRadius: '30px' }}
          >
            <div
              className={`p-5 cursor-pointer flex justify-between items-center transition-all duration-300 ${
                openCategory === index 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' 
                  : 'hover:bg-white/40'
              }`}
              onClick={() => toggleCategory(index)}
            >
              <h2 className='text-xl font-bold tracking-wide'>{category.name}</h2>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                openCategory === index ? 'rotate-180 bg-white/20' : 'bg-black/5'
              }`}>
                <span className='text-xl'>{openCategory === index ? '−' : '+'}</span>
              </div>
            </div>
            {openCategory === index && (
              <div className="p-5 bg-white/5 space-y-4 animate-fadeIn">
                {category.contents.map((skill, idx) => (
                  <div key={idx} className="animate-fadeInUp" style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'both' }}>
                    {skill.render(idx)}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
