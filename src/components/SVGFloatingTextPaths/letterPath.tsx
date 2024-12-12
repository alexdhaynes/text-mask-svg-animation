interface LetterPathDataType {
  [key: string]: string;
}

const LETTER_PATH_DATA: LetterPathDataType = {
  A: "M154.467 156.02L140.044 117.456L154.467 156.02ZM154.467 156.02H91.9282L106.06 118.536L106.06 118.536L106.064 118.524C107.983 113.008 110.021 107.372 112.18 101.616C114.343 95.8477 116.386 89.96 118.308 83.9524L118.31 83.947C120.075 78.2097 121.739 72.675 123.302 67.3428C124.954 72.503 126.692 77.9197 128.516 83.593C130.676 90.3128 132.716 96.6726 134.636 102.672L134.638 102.681L134.641 102.689C136.802 108.69 138.603 113.612 140.044 117.455L154.467 156.02ZM1.08628 252.818L0.819226 253.5H1.55188H54.8318H55.1777L55.2997 253.176L75.1288 200.58H171.133L190.804 253.175L190.925 253.5H191.272H246.712H247.444L247.178 252.818L148.898 0.818327L148.774 0.5H148.432H100.192H99.8507L99.7263 0.81775L1.08628 252.818Z",
  F: "M1.26001 253V253.5H1.76001H55.76H56.26V253V153.42H156.92H157.42V152.92V106.48V105.98H156.92H56.26V50.1H172.04H172.54V49.6V1V0.5H172.04H56.26H55.76H26.6H26.1H1.76001H1.26001V1V253Z",
  G: "M79.24,251.25c95.79,35.56,186.85-26.81,168.77-132.36h-117.6v46h64.76c-1.34,28.82-30.85,46.88-58.14,46.16-32.46.42-62-19.34-74.42-49.01C30.19,72.26,132.61,11.77,198.97,78.7c.71-.75,33.41-35.21,34.13-35.97C186.04-12.75,89.04-12.66,38.41,37.67-26.43,97.78-5.03,220.14,79.24,251.25Z",
  I: "M0.944092 253V253.5H1.44409H139.684H140.184V253V206.56V206.06H139.684H98.0641V47.94H139.684H140.184V47.44V1V0.5H139.684H1.44409H0.944092V1V47.44V47.94H1.44409H43.0641V206.06H1.44409H0.944092V206.56V253Z",
  L: "M1.04126 253V253.5H1.54126H169.661H170.161V253V204.4V203.9H169.661H56.0413V1V0.5H55.5413H1.54126H1.04126V1V253Z",
  N: "M.5 1 48.74 .5 175.92 171.54 170.78 1 224.2 .5 223.7 253 174.74 253 48.77 84.95 52.84 134.39 53.42 252 .5 252.5 .5 1",
  O: "M10.08,183.88c26.55,69.67,110.73,96.63,176.46,65.88,33.02-15.47,58.12-46.25,66.89-81.51,7.69-31.02,5.85-65.09-7.22-94.36-15.87-35.99-49.95-62.92-88.43-70.57-37.15-7.46-77.79-.23-108.14,23.23C2.28,61.65-10.66,130.13,10.01,183.7l.07.18ZM158.31,204.32c-42.07,17.35-88.27-5.15-99.01-49.69-7.91-34.79,1.07-72.65,33.07-91.79,15.62-9.55,34.85-12.42,52.88-8.43,43.04,9.29,64.05,55.44,54.93,96.25-4.87,22.76-19.76,44.46-41.68,53.58l-.18.08Z",
  T: "M74.2262 253V253.5H74.7262H128.726H129.226V253V50.1H204.326H204.826V49.6V1V0.5H204.326H1.28625H0.786255V1V49.6V50.1H1.28625H74.2262V253Z",
};

interface LetterPathProps {
  letter: string;
  x: number;
  y: number;
}

const LetterPath = ({ letter, x, y }: LetterPathProps) => {
  return (
    <path
      d={LETTER_PATH_DATA[letter]}
      data-letter={letter}
      transform={`translate(${x}, ${y}) scale(0.5)`}
      fill="white"
    />
  );
};

export default LetterPath;