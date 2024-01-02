import { Bold, FileImage, Italic, Link2, List, Strikethrough, Underline } from "lucide-react";

export function BoldIcon() {
  return (
    <button className="hover:bg-gray-300 p-1 hover:rounded-full">
      <Bold size={15} />
    </button>
  );
}

export function ItalicIcon() {
  return (
    <button className="hover:bg-gray-300 p-1 hover:rounded-full">
      <Italic size={15} />
    </button>
  );
}

export function UnderlineIcon() {
  return (
    <button className="hover:bg-gray-300 p-1 hover:rounded-full">
      <Underline size={15} />
    </button>
  );
}

export function StrikethroughtIcon() {
  return (
    <button className="hover:bg-gray-300 p-1 hover:rounded-full">
      <Strikethrough size={15} />
    </button>
  );
}

export function ListIcon() {
  return (
    <button className="hover:bg-gray-300 p-1 hover:rounded-full">
      <List size={15} />
    </button>
  );
}

export function LinkIcon() {
  return (
    <button className="hover:bg-gray-300 p-1 hover:rounded-full">
      <Link2 size={15} />
    </button>
  );
}

export function FileImgIcon() {
  return (
    <button className="hover:bg-gray-300 p-1 hover:rounded-full">
      <FileImage size={15} />
    </button>
  );
}
