import LetterPath from "./letterPath";
import styles from "./SVGFloatingTextPaths.module.css";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const SVGFloatingTextPaths = () => {
  const svgContainer = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (!svgContainer.current) return;
      const letters = svgContainer.current.querySelectorAll("path");
      const letterRefs = Array.from(letters);

      const tl = gsap.timeline({
        defaults: {
          duration: 1,
          ease: "linear",
        },
      });

      tl.from(letterRefs, {
        y: -100,
        stagger: 0.25,
      });
    },
    { scope: svgContainer }
  );

  return (
    <div className="frame lexend-deca-600">
      <div className="content">
        <svg
          ref={svgContainer}
          className={styles.svgLetters}
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <mask id="letterMask" x="0" y="0" width="100%" height="100%">
              <g>
                {"FLOATING".split("").map((letter, index) => {
                  const letterSpacing = 190;
                  const xPosition = index * letterSpacing;
                  const yPosition = 50;

                  return (
                    <LetterPath
                      key={letter}
                      letter={letter}
                      x={+xPosition}
                      y={yPosition}
                    />
                  );
                })}
              </g>
            </mask>
          </defs>
        </svg>
        <div className={styles.backgroundDiv}></div>
      </div>
    </div>
  );
};

export default SVGFloatingTextPaths;
