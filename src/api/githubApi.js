import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeFork, faStar, faBook, faFile } from "@fortawesome/free-solid-svg-icons";
import { faHtml5, faJs, faPython, faJava, faPhp, faSwift, faCss3 } from "@fortawesome/free-brands-svg-icons";

const GitHubProjects = () => {
  const [projects, setProjects] = useState([]);
  const [blacklist] = useState(["hoangk3"]);
  const [repoData, setRepoData] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/hoangk3/repos")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => console.error("Lỗi:", error));
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      setRepoData(projects);
    }
  }, [projects]);

  const langIcon = {
    JavaScript: <FontAwesomeIcon icon={faJs} />,
    HTML: <FontAwesomeIcon icon={faHtml5} />,
    Python: <FontAwesomeIcon icon={faPython} />,
    Java: <FontAwesomeIcon icon={faJava} />,
    PHP: <FontAwesomeIcon icon={faPhp} />,
    Swift: <FontAwesomeIcon icon={faSwift} />,
    CSS: <FontAwesomeIcon icon={faCss3} />,
  };

  const filteredProjects = projects.filter((project) => !blacklist.includes(project.name));

  if (!repoData) {
    return (
      <>
        <div className='bg-slate-300 animate-pulse w-full h-[120px] rounded-xl'></div>
        <div className='bg-slate-300 animate-pulse w-full h-[120px] rounded-xl'></div>
        <div className='bg-slate-300 animate-pulse w-full h-[120px] rounded-xl'></div>
      </>
    );
  }

  return (
    <>
      {filteredProjects.map((project, index) => {
        return (
          <Link to={`/projects/${project.name}`} key={project.name} className="block h-full">
            <div
              className='p-6 glass-card h-full animate-fadeInUp'
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
            >
              <div className='flex gap-2 items-center text-cyan-600 mb-2'>
                <FontAwesomeIcon icon={faBook} />
                <p className="font-bold">{project.name}</p>
              </div>
              <p className='text-sm truncate w-full overflow-hidden text-neutral-600 mb-4'>
                {project.description || "No description provided."}
              </p>
              <div className='flex gap-4 text-xs text-neutral-500 mt-auto'>
                {project.language && (
                  <p className="flex items-center gap-1">
                    {langIcon[project.language] || <FontAwesomeIcon icon={faFile} />} {project.language}
                  </p>
                )}
                <p className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faCodeFork} /> {project.forks_count}
                </p>
                <p className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faStar} /> {project.stargazers_count}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default GitHubProjects;
