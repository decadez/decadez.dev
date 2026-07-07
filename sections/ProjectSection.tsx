import { useEffect, useRef } from "react";
import { RoughNotation } from "react-rough-notation";
import { useTheme } from "next-themes";

import ProjectCard from "@/components/ProjectCard";
import { useSection } from "context/section";
import useOnScreen from "hooks/useOnScreen";
import useScrollActive from "hooks/useScrollActive";

const ProjectSection: React.FC = () => {
  const { theme } = useTheme();

  const sectionRef = useRef<HTMLDivElement>(null);

  const elementRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(elementRef);

  const projectSection = useScrollActive(sectionRef);
  const { onSectionChange } = useSection();
  useEffect(() => {
    projectSection && onSectionChange!("projects");
  }, [onSectionChange, projectSection]);

  return (
    <section ref={sectionRef} id="projects" className="section">
      <div className="project-title text-center">
        <RoughNotation
          type="underline"
          color={`${theme === "light" ? "rgb(0, 122, 122)" : "rgb(5 206 145)"}`}
          strokeWidth={2}
          order={1}
          show={isOnScreen}
        >
          <h2 className="section-heading">Featured Work</h2>
        </RoughNotation>
      </div>
      <span className="project-desc text-center block mb-4" ref={elementRef}>
        A few current tracks and reusable building blocks.
      </span>
      <div className="flex flex-wrap">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} index={index} project={project} />
        ))}
      </div>
      <div className="others text-center mb-16">
        More experiments live on{" "}
        <a
          href="https://github.com/decadez"
          className="font-medium underline link-outline text-marrsgreen dark:text-carrigreen whitespace-nowrap"
        >
          GitHub
        </a>
        .
      </div>
    </section>
  );
};

const projects = [
  {
    title: "decadez.dev",
    type: "Website",
    image: (
      <div className="h-full w-full p-6 flex flex-col justify-between">
        <span className="text-sm uppercase tracking-widest">Static Site</span>
        <strong className="text-4xl">10z</strong>
      </div>
    ),
    desc: "A small personal blog and portfolio built with Next.js, TypeScript, and Tailwind CSS.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://decadez.github.io/decadez.dev/",
    codeUrl: "https://github.com/decadez/decadez.dev",
    bgColor: "bg-[#E2EFEF] dark:bg-carddark",
    githubApi: "https://api.github.com/repos/decadez/decadez.dev",
  },
  {
    title: "AI workflow notes",
    type: "Writing",
    image: (
      <div className="h-full w-full p-6 flex flex-col justify-between">
        <span className="text-sm uppercase tracking-widest">Research</span>
        <strong className="text-4xl">AI</strong>
      </div>
    ),
    desc: "Notes about agentic coding, evaluation, prompts, and how to keep automation accountable.",
    tags: ["Agents", "Evaluation", "Workflow"],
    liveUrl: "https://decadez.github.io/decadez.dev/blog/",
    codeUrl: "https://github.com/decadez/decadez.dev",
    bgColor: "bg-[#EBF4F4] dark:bg-carddark",
    githubApi: "https://api.github.com/repos/decadez/decadez.dev",
  },
];

export default ProjectSection;
