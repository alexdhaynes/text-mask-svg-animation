import styles from "./CSSMaskedText.module.css";

interface CSSMaskedTextProps {
  text: string;
}

const CSSMaskedText = ({ text }: CSSMaskedTextProps) => {
  return (
    <>
      {text.split("").map((char, index) => (
        <span
          className={styles.letter}
          key={index}
          style={{ animationDelay: `${index * 0.25}s` }}
        >
          {char}
        </span>
      ))}
    </>
  );
};

export default CSSMaskedText;
