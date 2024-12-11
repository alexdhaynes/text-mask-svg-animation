import { useEffect, useState } from "react";
import styles from "./SVGFloatingTextEnhanced.module.css";

interface FloatingTextProps {
  text: string;
}

const SVGFloatingTextEnhanced = ({ text }: FloatingTextProps) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // select the fade animations
    let animateElems = document.querySelectorAll("animate[id^=fade]");
    if (!animateElems) return;

    // find the LAST of the fade animations
    const fadeAnimation = Array.from(animateElems).find((elem) => {
      // get the index from the id of the return animation,
      // convert it to number, and see if matches the index of the last animation
      return +elem.id.split("-")[1] === text.length - 1;
    });

    if (!fadeAnimation) return;

    // add an "end" event listener to one of the fade-* animations,
    // and add the radial gradient after the letter's animation runs
    fadeAnimation.addEventListener("endEvent", () => {
      // console.log("first letter has faded");
      // add a new mask to the image
      const image = document.querySelector("#underwater-image");
      const animateElement = document.querySelector("#radialAnimation");

      if (!(image && animateElement)) return;

      image.setAttribute("mask", "url(#radialMask)");

      // begin the radial mask animation
      animateElement.beginElement();

      // find the radialAnimation and attach an event listener to it
      const radialAnimation = document.querySelector("#radialAnimation");
      if (!radialAnimation) return;

      radialAnimation.addEventListener("endEvent", () => {
        console.log("end radial");
        setShowText(true);
        // set frame bg-color to black
        const frame = document.querySelector(".frame");
        if (!frame) return;
        frame.style.backgroundColor = "#000";
      });
    });
  }, []);
  return (
    <div className="frame">
      <div className={`content ${styles.content}`}>
        {showText && (
          <article className={styles.mainContent}>
            Hello this is the cool poem.
          </article>
        )}
        <svg width="100%" height="100%" className={styles.svg}>
          <defs>
            <mask id="radialMask" x="0" y="0" width="100%" height="100%">
              <circle cx="63%" cy="70%" r="0" fill="white">
                <animate
                  id="radialAnimation"
                  attributeName="r"
                  from="0"
                  to="100%"
                  dur="3s"
                  fill="freeze"
                  calcMode="spline"
                  keySplines="0.42 0 0.58 1"
                />
              </circle>
            </mask>
          </defs>

          <mask id="letterMask">
            <text
              x="50%"
              y="80%"
              fill="#ffffff"
              textAnchor="middle" // Center the text horizontally
            >
              {text.split("").map((letter, index) => (
                <tspan
                  key={index}
                  fontFamily="sans-serif"
                  fontSize={180}
                  fontWeight={900}
                >
                  <animate
                    attributeName="dy"
                    from="-100vh"
                    to="0"
                    dur="3s"
                    fill="freeze"
                    id={`sink-${index}`}
                    begin={`${index * 0.25}s`}
                    calcMode="spline"
                    keySplines="0.42 0 1 1; 0 0 0.58 1" /* ease in and ease out */
                    keyTimes="0; 0.25; 1" /* ease in from 0 to 0.15; ease out from 0.15 to 1; */
                  />

                  {/* Float up */}
                  <animate
                    attributeName="dy"
                    to="-20"
                    dur="3s"
                    begin={`sink-${index}.end + 0s`}
                    calcMode="spline"
                    keySplines="0.42 0 0.58 1"
                    keyTimes="0; 1"
                    fill="freeze"
                    id={`floatup-${index}`}
                  />
                  {/* Float down */}
                  <animate
                    attributeName="dy"
                    to="20"
                    dur="3s"
                    begin={`floatup-${index}.end + 0s`}
                    calcMode="spline"
                    keySplines="0.42 0 0.58 1"
                    keyTimes="0; 1"
                    fill="freeze"
                    id={`floatdown-${index}`}
                  />
                  {/* Return to baseline */}
                  <animate
                    attributeName="dy"
                    to="0"
                    dur="1s"
                    begin={`floatdown-${index}.end + 0s`}
                    fill="freeze"
                    id={`return-${index}`}
                    calcMode="spline"
                    keySplines="0.42 0 0.58 1"
                    keyTimes="0; 1"
                  />
                  {/* Fade out */}
                  <animate
                    attributeName="opacity"
                    from="1"
                    to="0"
                    dur="2s"
                    begin={`return-${index}.end + 0s`}
                    fill="freeze"
                    id={`fade-${index}`}
                    calcMode="spline"
                    keySplines="0.42 0 0.58 1"
                    keyTimes="0; 1"
                  />

                  {letter}
                </tspan>
              ))}
            </text>
          </mask>

          <image
            id="underwater-image"
            href="/underwater.jpg"
            width="100%"
            height="102%" /* a little extra height to cover small gap */
            mask="url(#letterMask)"
            preserveAspectRatio="xMidYMid slice"
          />
        </svg>
      </div>
    </div>
  );
};

export default SVGFloatingTextEnhanced;
