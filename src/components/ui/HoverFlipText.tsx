interface HoverFlipTextProps {
  text: string;
  className?: string;
}

export default function HoverFlipText({ text, className }: HoverFlipTextProps) {
  return (
    <span className={`hover-flip-word ${className ?? ""}`}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="hover-flip-char"
          style={{ "--i": i } as React.CSSProperties}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
