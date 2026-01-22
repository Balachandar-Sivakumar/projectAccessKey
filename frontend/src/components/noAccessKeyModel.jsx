import React from "react";
import { FaKey } from "react-icons/fa";
import useAccessKeyStore from "../store/accessKeyStore";

const NoAccessKey = () => {
    const {setAction} = useAccessKeyStore()
  return (
    <div className="flex items-center justify-center h-[570px] rounded-lg w-full border h-screen scrollbar-hide">
      <div className="flex flex-col items-center justify-center max-w-sm text-center">
        <FaKey className="text-gray-400 mb-4" size={48} />
        <p className="text-gray-500 mb-6 text-sm">
          No access key is available. Please click Create New to add a new key.
        </p>
        <button
            onClick={() => setAction("createKey")}
            className="bg-[#518167] hover:bg-emerald-700 active:bg-emerald-900 text-white text-[15px] px-3 py-2 rounded-lg shadow-sm hover:shadow transition-all duration-200 ring-offset-2 focus:ring-2 focus:ring-emerald-500"
        >
            Create New Key
        </button>
      </div>
    </div>
  );
};

export default NoAccessKey;
