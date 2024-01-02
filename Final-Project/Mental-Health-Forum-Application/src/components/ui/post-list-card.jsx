/* eslint-disable react/prop-types */

export default function PostListCard({ children, icon, title }) {
  return (
    <div className=" flex flex-row justify-evenly my-4 gap-2 cursor-pointer overflow-hidden relative  h-auto bg-neutral-50 rounded-lg shadow-xl">
      <div className="w-full">
        <div className="flex gap-4 px-4 py-3 text-gray-200 bg-secondary-navy">
          {icon}
          <span className="font-bold text-sm">{title}</span>
        </div>
        <div className="mx-4 my-2 text-custom-gray">{children}</div>
      </div>
    </div>
  );
}
