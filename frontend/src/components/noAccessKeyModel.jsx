import React from "react";
import useAccessKeyStore from "../store/accessKeyStore";
import { ControlPanelIcon } from "./icons";

const NoAccessKey = () => {
    const {setAction} = useAccessKeyStore()
  return (
    <div className="flex items-center justify-center h-[570px] rounded-lg w-full border">
      <div className="flex flex-col items-center justify-center max-w-sm text-center">
        <ControlPanelIcon/>
        <p className="text-gray-500 mb-6 mt-6 text-sm">
          No access key is available. Please click Create New to add a new key.
        </p>
        <button
            onClick={() => setAction("createKey")}
            className="bg-[#518167] hover:bg-emerald-700 active:bg-emerald-900 text-white text-[15px] px-3 py-2 rounded-lg shadow-sm hover:shadow transition-all duration-200"
        >
            Create New Key
        </button>
      </div>
    </div>
  );
};

export default NoAccessKey;
