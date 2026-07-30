interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className="rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
    >
      {children}
    </button>
  );
}