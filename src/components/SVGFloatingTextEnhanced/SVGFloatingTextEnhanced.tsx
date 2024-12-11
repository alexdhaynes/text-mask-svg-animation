import { useEffect, useRef, useState } from "react";

import styles from "./SVGFloatingTextEnhanced.module.css";

interface FloatingTextProps {
  text: string;
}

const SVGFloatingTextEnhanced = ({ text }: FloatingTextProps) => {
  const [showText, setShowText] = useState(false);
  const [displayText, setDisplayText] = useState(text || "floating");
  const [documentIsLoaded, setDocumentIsLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  // store audio
  const audioRef = useRef(new Audio("/underwater-ambience-6201.mp3"));

  useEffect(() => {
    setDocumentIsLoaded(true);
    const params = new URLSearchParams(document.location.search).get("text");
    if (params) setDisplayText(params);
  }, []);

  useEffect(() => {
    if (!documentIsLoaded) return;

    // select the fade animations
    let animateElems = document.querySelectorAll("animate[id^=fade]");
    if (!animateElems) return;

    // find the LAST of the fade animations
    const fadeAnimation = Array.from(animateElems).find((elem) => {
      // get the index from the id of the return animation,
      // convert it to number, and see if matches the index of the last animation
      return +elem.id.split("-")[1] === displayText.length - 1;
    });

    if (!fadeAnimation) return;

    // add an "end" event listener to one of the fade-* animations,
    // and add the radial gradient after the letter's animation runs
    fadeAnimation.addEventListener("endEvent", () => {
      // console.log("first letter has faded");
      // add a new mask to the image
      const image = document.querySelector("#underwater-image");
      const animateElement = document.querySelector(
        "#radialAnimation"
      ) as SVGAnimateElement;

      if (!(image && animateElement)) return;

      image.setAttribute("mask", "url(#radialMask)");

      // begin the radial mask animation
      animateElement.beginElement();

      // find the radialAnimation and attach an event listener to it
      const radialAnimation = document.querySelector("#radialAnimation");
      if (!radialAnimation) return;

      radialAnimation.addEventListener("endEvent", () => {
        // console.log("end radial");
        setShowText(true);
        // set frame bg-color to black
        const frame = document.querySelector(".frame") as HTMLElement;
        if (!frame) return;
        frame.style.backgroundColor = "#000";
      });
    });
  }, [documentIsLoaded, displayText]);

  useEffect(() => {
    const audio = audioRef.current;

    if (isPaused) {
      audio.pause();
    } else {
      audio.play();
    }

    return () => {
      audio.pause();
    };
  }, [isPaused]);

  return (
    <div className="frame lexend-deca-600">
      <div className={`content ${styles.content}`}>
        {showText && (
          <article className={styles.mainContent}>
            <p className={`${styles.fadeIn} ${styles.fadeInText}`}>
              Can you hear the ocean?
            </p>
            <button
              className={`${styles.button} ${styles.fadeIn} ${styles.fadeInButton}`}
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? "Play" : "Pause"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                {isPaused ? (
                  <g fill="none" fillRule="evenodd">
                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="currentColor"
                      d="M5.669 4.76a1.47 1.47 0 0 1 2.04-1.177c1.062.454 3.442 1.533 6.462 3.276c3.021 1.744 5.146 3.267 6.069 3.958c.788.591.79 1.763.001 2.356c-.914.687-3.013 2.19-6.07 3.956c-3.06 1.766-5.412 2.832-6.464 3.28c-.906.387-1.92-.2-2.038-1.177c-.138-1.142-.396-3.735-.396-7.237c0-3.5.257-6.092.396-7.235"
                    />
                  </g>
                ) : (
                  <path
                    fill="currentColor"
                    d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2m6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2"
                  />
                )}
              </svg>
            </button>
          </article>
        )}
        {documentIsLoaded && displayText && (
          <svg
            width="100%"
            height="100%"
            className={`${styles.svg} ${styles.fadeIn} ${styles.fadeInSvg}`}
          >
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
                className={styles.floatingText}
                opacity={1}
                x="50%"
                y="80%"
                fill="#ffffff"
                textAnchor="middle" // Center the text horizontally
              >
                {displayText.split("").map((letter, index) => (
                  <tspan
                    key={index}
                    fontFamily="'Lexend Deca', sans-serif"
                    fontWeight={900}
                  >
                    <animate
                      attributeName="dy"
                      from="-100%"
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
        )}
      </div>
    </div>
  );
};

export default SVGFloatingTextEnhanced;
