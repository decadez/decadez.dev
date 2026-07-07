import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import LinkButton from "../components/LinkButton";

const HeroSection: React.FC = () => {
  const sectionRef = useRef(null);
  const q = gsap.utils.selector(sectionRef);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(q(".bg-text"), {
      scrollTrigger: {
        trigger: q(".bg-text"),
        scrub: true,
      },
      y: 350,
    });

    const tl = gsap.timeline({ defaults: { stagger: 0.2, duration: 0.3 } });
    tl.fromTo(q(".text-animation"), { y: 100 }, { y: 0, delay: 1 });

    const orbit = gsap.timeline({ repeat: -1 });
    orbit
      .to(q(".orbital-card"), 3, {
        y: "-=20",
        x: "+=12",
        rotation: "-=1",
        ease: "power1.easeInOut",
      })
      .to(q(".orbital-card"), 3, {
        y: "+=20",
        x: "-=12",
        rotation: "+=1",
        ease: "power1.easeInOut",
      });
  }, [q]);

  return (
    <section
      ref={sectionRef}
      className="relative mt-16 sm:mt-8 pt-8 lg:pt-0 px-4 sm:px-8 md:px-20 max-w-5xl sm:pb-24 min-h-[769px] mx-auto sm:flex sm:flex-col sm:justify-center sm:items-center lg:flex-row-reverse"
    >
      <span
        aria-hidden="true"
        className="bg-text absolute -top-36 rotate-12 text-gray-100 dark:text-[#1f2e3a] text-9xl scale-150 tracking-wide font-bold select-none pointer-events-none text-center z-0"
      >
        BUILD NOTES SYSTEMS TOOLS IDEAS
      </span>

      <div className="orbital-card z-10 select-none mt-8 sm:mt-14 lg:mt-0 mx-auto lg:basis-1/3">
        <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-md border border-marrsgreen/30 dark:border-carrigreen/30 bg-white dark:bg-carddark shadow-xl overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-px opacity-20">
            {Array.from({ length: 36 }).map((_, index) => (
              <span
                key={index}
                className="bg-marrsgreen dark:bg-carrigreen"
              />
            ))}
          </div>
          <div className="absolute inset-8 rounded-md border border-bgdark/10 dark:border-bglight/10 bg-bglight/80 dark:bg-bgdark/80 p-6 flex flex-col justify-between">
            <div>
              <div className="text-sm uppercase tracking-widest text-marrsgreen dark:text-carrigreen">
                decadez.dev
              </div>
              <div className="mt-6 text-5xl font-semibold">10z</div>
            </div>
            <div className="text-sm leading-6">
              Notes on code, product, AI tooling, and the small systems that
              make work feel lighter.
            </div>
          </div>
        </div>
      </div>

      <div className="lg:basis-2/3 z-10 relative">
        <span className="text-marrsgreen lg:text-lg font-medium dark:text-carrigreen">
          Hi, this is
        </span>
        <div className="overflow-hidden">
          <h1 className="text-animation text-4xl md:text-5xl lg:text-7xl md:my-2 font-semibold my-1">
            decadez
          </h1>
        </div>
        <div className="overflow-hidden">
          <span className="text-animation text-2xl md:text-3xl lg:text-5xl block md:my-3 text-marrsgreen dark:text-carrigreen font-medium">
            A small lab for code and ideas
          </span>
        </div>
        <div className="mt-2 my-4 md:mb-8">
          <p className="mb-1">
            I write about software engineering, product thinking, AI tools, and
            the systems I use to keep projects moving.
          </p>
          <p>
            This site is intentionally lightweight: a portfolio, a blog, and a
            running notebook for experiments worth keeping.
          </p>
        </div>
        <LinkButton href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
          Get in touch
        </LinkButton>
      </div>
      <a
        href="#whoami"
        className="group absolute link-outline animate-bounce hidden md:bottom-14 lg:bottom-16 left-1/2 transform -translate-x-1/2 md:flex items-center flex-col"
      >
        <span className="group-hover:text-marrsgreen dark:group-hover:text-carrigreen">
          Scroll
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          className="dark:fill-bglight group-hover:fill-marrsgreen dark:group-hover:fill-carrigreen"
        >
          <path d="M11.975 22H12c3.859 0 7-3.14 7-7V9c0-3.841-3.127-6.974-6.981-7h-.06C8.119 2.022 5 5.157 5 9v6c0 3.86 3.129 7 6.975 7zM7 9a5.007 5.007 0 0 1 4.985-5C14.75 4.006 17 6.249 17 9v6c0 2.757-2.243 5-5 5h-.025C9.186 20 7 17.804 7 15V9z"></path>
          <path d="M11 6h2v6h-2z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          className="dark:fill-bglight group-hover:fill-marrsgreen dark:group-hover:fill-carrigreen"
        >
          <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
        </svg>
      </a>
    </section>
  );
};

export default HeroSection;
