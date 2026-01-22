import React from "react";

import {
  FiSettings,
  FiGlobe,
  FiKey,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { MdChecklist } from "react-icons/md";

const ProjectSettingsSidebar = () => {
  return (
    <div className="w-[300px] border rounded-lg bg-white flex flex-col px-5 py-6">

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-16 h-16 flex items-center justify-center rounded-xl border mb-3">
          <MdChecklist className="text-3xl text-emerald-700" />
        </div>

        <h2 className="text-md text-gray-800">
          Shopify Integration
        </h2>

        <p className="text-sm text-gray-500">
          James Smith – Project Owner
        </p>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2">

        {/* General Settings */}
        <SidebarItem
          Icon={<FiSettings />}
          label="General Settings"
        />

        {/* Global Variables */}
        <SidebarItem
          Icon={<FiGlobe />}
          label="Global Variables"
        />

        {/* Access Key - Active */}
        <SidebarItem
          Icon={<FiKey />}
          label="Access Key"
          active

        />

        {/* User Profile */}
        <SidebarItem
          Icon={<FiUser />}
          label="User Profile"
        />

        {/* User Groups */}
        <SidebarItem
          Icon={<FiUsers />}
          label="User Groups"
        />
      </nav>
    </div>
  );
};

export default ProjectSettingsSidebar;

const SidebarItem = ({ Icon , label, active = false }) => {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer
      ${
        active
          ? "bg-emerald-50 text-black"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-lg">{Icon}</span>
      </div>

    </div>
  );
};
