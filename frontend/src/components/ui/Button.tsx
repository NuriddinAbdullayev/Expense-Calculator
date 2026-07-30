interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'danger' | 'secondary';
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      'bg-green-600 hover:bg-green-700 text-white',

    danger:
      'bg-red-600 hover:bg-red-700 text-white',

    secondary:
      'bg-gray-200 hover:bg-gray-300 text-gray-800',
  };

  return (
    <button
      {...props}
      className={`rounded-lg px-4 py-2 transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}