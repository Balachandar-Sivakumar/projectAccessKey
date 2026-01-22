import { useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineBranches,
  AiOutlineDatabase,
  AiOutlineFileText,
  AiOutlineShop,
} from "react-icons/ai";
import { BiCube } from "react-icons/bi";
import { FiSettings, FiEdit, FiClipboard } from "react-icons/fi";
import { MdOutlineWidgets } from "react-icons/md";
import { Link } from "react-router-dom";

//Rendering side bar
export default function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(6); // Settings active by default

  const icons = [AiOutlineArrowLeft,AiOutlineBranches,BiCube,AiOutlineDatabase,FiEdit,FiClipboard,FiSettings,MdOutlineWidgets,AiOutlineShop,AiOutlineFileText];

  return (
    <aside className="fixed top-14 left-0 w-[64px] h-[calc(100vh-3.5rem)] bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-4 z-40">
      {icons.map((Icon , index) => (
        <SidebarIcon
          active={activeIndex === index}
          onClick={() => setActiveIndex(index)}
        >
          <Icon className="w-5 h-5" />
        </SidebarIcon>
      ))}
    </aside>
  );
}

function SidebarIcon({ children, active, onClick }) {
  return (
    <Link
      onClick={onClick}

      className={`w-8 h-8 flex items-center justify-center rounded-lg transition
        ${
          active
            ? "bg-green-800 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
    >
      {children}
    </Link>
  );
}
