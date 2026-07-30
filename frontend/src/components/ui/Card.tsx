interface CardProps {
  title: string;
  children: React.ReactNode;
}

export default function Card({
  title,
  children,
}: CardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="border-b px-6 py-4">
        <h2 className="font-semibold">
          {title}
        </h2>
      </div>

      <div className="p-6">
        {children}
      </div>
    </div>
  );
}