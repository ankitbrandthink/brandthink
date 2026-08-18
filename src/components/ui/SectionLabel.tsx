interface Props {
  label: string;
}

export default function SectionLabel({ label }: Props) {
  return (
    <p className="mb-4 text-xs uppercase tracking-[0.3em] text-red-500">
      {label}
    </p>
  );
}