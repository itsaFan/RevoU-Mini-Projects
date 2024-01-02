import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export default function CardBorder({ title, children }: Props) {
  return (
    <div className="h-96 flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="relative">
        <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg animate-pulse"></div>
        <div className="bg-white p-16 rounded-lg shadow-2xl w-80 relative z-10 transform transition duration-500 ease-in-out">
          <h2 className="text-center text-3xl font-bold mb-5 text-gray-800">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}
