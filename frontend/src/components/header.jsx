import react from "react";
import { FaUserCircle,FaStar } from "react-icons/fa";

//Header Model
function Header() {
    return (
  <header className="fixed top-0 h-14 w-full flex items-center justify-between px-4 z-10 bg-white border-b border-gray-200 z-5">
      {/* Left Section */}
      <div className="flex items-center gap-8">
        {/* Logo */}
        <img src='/dckap-integrator.png' alt="Logo" className="h-7 w-auto" />

        {/* Meta Info */}
        <div className="flex items-center gap-6 text-sm text-gray-700">
          <div className="flex items-center gap-1 whitespace-nowrap">
            <FaStar size={20} color="#555"/>
            <span>Star Distribution</span>
          </div>

          <div className="flex items-center gap-1 whitespace-nowrap">
            <FaUserCircle size={20} color="#555" />
            <span>Project owner</span>
          </div>

          <div className="flex items-center gap-1 whitespace-nowrap">
            <span className="opacity-70">🕒</span>
            <span>Pacific Time – Vancouver</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <select aria-label="country" className="h-8 px-2 rounded-md border-none bg-white text-sm focus:outline-none">
          <option>USA</option>
          <option>Canada</option>
        </select>

        <button className="h-8 w-8 flex items-center justify-center rounded-md border-none hover:bg-gray-100">
          🔔
        </button>
      </div>
    </header>
    );
}

export default Header;
