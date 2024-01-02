export function convertToInitial(username) {
  if (!username) {
    return "";
  }
  return username
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

const bgColors = [
  "bg-red-300",
  "bg-green-300",
  "bg-blue-300",
  "bg-yellow-300",
  "bg-purple-300",
  "bg-gray-300",
  "bg-slate-300",
  "bg-zinc-300",
  "bg-orange-300",
  "bg-amber-300",
  "bg-lime-300",
  "bg-emerald-300",
  "bg-teal-300",
  "bg-cyan-300",
  "bg-indigo-300",
  "bg-violet-300",
  "bg-fuchsia-300",
  "bg-pink-300",
  "bg-rose-300",
];

export const randomBgColor = () => {
  const randomIndex = Math.floor(Math.random() * bgColors.length);
  return bgColors[randomIndex];
};

export const createSlug = (title) => {
  return title.toLowerCase().replace(/\s+/g, "-");
};
