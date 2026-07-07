import { useEffect, useRef } from "react";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { useSection } from "context/section";
import useOnScreen from "hooks/useOnScreen";
import useScrollActive from "hooks/useScrollActive";

import AboutBgSvg from "@/components/AboutBgSvg";

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSecOnScreen = useOnScreen(sectionRef);

  useEffect(() => {
    const q = gsap.utils.selector(sectionRef);

    gsap.registerPlugin(ScrollTrigger);

    const fromAnimation = {
      y: 100,
      opacity: 0,
    };

    const toAnimation = (triggerTarget: string) => ({
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: q(`.${triggerTarget}`),
        start: "top bottom",
      },
    });

    gsap.fromTo(q(".about-intro"), fromAnimation, toAnimation("about-intro"));
    gsap.fromTo(q(".focus-grid"), fromAnimation, toAnimation("focus-grid"));

    gsap.fromTo(
      q(".bg-svg"),
      { y: -80 },
      {
        scrollTrigger: {
          trigger: q(".bg-svg"),
          scrub: true,
        },
        y: 65,
        duration: 3,
      }
    );
  }, []);

  const { theme } = useTheme();

  const aboutSection = useScrollActive(sectionRef);
  const { onSectionChange } = useSection();
  useEffect(() => {
    aboutSection ? onSectionChange!("who am i?") : onSectionChange!("");
  }, [aboutSection, onSectionChange]);

  return (
    <div
      ref={sectionRef}
      className="about-panel bg-white dark:bg-[#1B2731] relative"
    >
      <section id="whoami" className="section">
        <RoughNotationGroup>
          <div className="text-center">
            <RoughNotation
              type="underline"
              color={`${theme === "light" ? "#8F79D9" : "#E3C9FA"}`}
              strokeWidth={2}
              order={1}
              show={isSecOnScreen}
            >
              <h2 className="section-heading">What is this?</h2>
            </RoughNotation>
          </div>

          <div className="about-intro max-w-3xl mx-auto text-lg leading-8">
            <p className="mb-4">
              decadez.dev is a personal site for practical notes: code I want to
              reuse, tools I want to remember, and product ideas that become
              clearer when written down.
            </p>
            <p>
              The goal is a quiet, durable home page rather than a heavy
              portfolio. It should be easy to scan, easy to edit, and simple to
              deploy.
            </p>
          </div>

          <div className="focus-grid grid md:grid-cols-3 gap-4 mt-10">
            {focusAreas.map((item) => (
              <div
                key={item.title}
                className="rounded-md bg-bglight dark:bg-carddark p-5 shadow-sm"
              >
                <h3 className="text-marrsgreen dark:text-carrigreen font-medium text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6">{item.description}</p>
              </div>
            ))}
          </div>
        </RoughNotationGroup>
      </section>

      <AboutBgSvg />
    </div>
  );
};

const focusAreas = [
  {
    title: "Engineering",
    description:
      "Notes on frontend systems, developer experience, deployment, and maintainable code.",
  },
  {
    title: "AI tooling",
    description:
      "Experiments with coding agents, prompts, workflows, and evaluation habits.",
  },
  {
    title: "Product sense",
    description:
      "Small observations about users, growth, interfaces, and decision making.",
  },
];

export default AboutSection;
