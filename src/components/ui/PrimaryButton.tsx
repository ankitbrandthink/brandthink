interface Props {
  children: React.ReactNode;
}

export default function PrimaryButton({
  children,
}: Props) {
  return (
    <button className="bg-red-600 px-6 py-4 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-red-500">
      {children}
    </button>
  );
}