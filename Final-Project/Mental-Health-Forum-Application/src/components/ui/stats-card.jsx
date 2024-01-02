/* eslint-disable react/prop-types */

export default function StatsCard({ children, icon, title }) {
  return (
    <div className="my-4 gap-2 cursor-pointer overflow-hidden relative transition-all duration-500 hover:translate-y-2  h-auto bg-neutral-50 rounded-lg shadow-xl flex flex-row justify-evenly before:absolute before:w-full hover:before:top-0 before:duration-500 before:-top-1 before:h-1 before:bg-blue-300">
      <div className="w-full">
        <div className="flex gap-4 px-4 py-3 text-gray-200 bg-secondary-navy">
          {icon}
          <span className="font-bold text-sm">{title}</span>
        </div>
        <div className="m-4 text-custom-gray">{children}</div>
      </div>
    </div>
  );
}

