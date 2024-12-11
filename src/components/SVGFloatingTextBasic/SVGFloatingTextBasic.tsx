interface FloatingTextProps {
  text: string;
}

const SVGFloatingTextBasic = ({ text }: FloatingTextProps) => {
  return (
    <div className="frame">
      <div className="content">
        <svg width="100%" height="100%">
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
                  fontSize={"180"}
                  fontWeight={900}
                >
                  <animate
                    attributeName="dy"
                    from="-100vh"
                    to="0"
                    dur="4s"
                    begin={`${index * 0.5}s`}
                  />
                  {letter}
                </tspan>
              ))}
            </text>
          </mask>

          <image
            href="/underwater.jpg"
            width="100%"
            height="100%"
            mask="url(#letterMask)"
          />
        </svg>
      </div>
    </div>
  );
};

export default SVGFloatingTextBasic;
