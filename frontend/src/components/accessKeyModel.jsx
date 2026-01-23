import React from "react";
import useAccessKeyStore from "../store/accessKeyStore";
import { FaTrash, FaKey } from "react-icons/fa";
import { findDifferDays } from "../helper/accessKeyHelper";
import NoAccessKey from "./noAccessKeyModel";
import { KeyIcon, TrashIcon } from "./icons";

///Access key model rendering
const AccessKeySettings = () => {
    const { keys, setAction, setFormData } = useAccessKeyStore();

    if(keys.length === 0){
        return(<NoAccessKey/>)
    }

    return (
        <section className="flex flex-col border border-gray-200 rounded-lg p-4 w-full h-[570px] overflow-auto scrollbar-hide bg-white shadow-sm transition-shadow duration-200">
            <div className="fade-in w-full">
                <div className="flex justify-between items-start mb-2 w-full">
                    <div>
                        <h1 className="text-sm text-black">
                            Access Keys
                        </h1>
                        <p className="text-[12px] text-gray-500 mt-2 max-w-2xl">
                            A Project Level Access Key is used to securely
                            authenticate and manage access within a specific
                            project. <br/>It ensures that only authorized systems and
                            users can perform actions related to that project.
                        </p>
                    </div>

                    <button
                        onClick={() => setAction("createKey")}
                        className="bg-[#518167] hover:bg-emerald-700 active:bg-emerald-900 text-white text-[15px] px-3 py-2 rounded-lg shadow-sm hover:shadow transition-all duration-200"
                    >
                        Create New Key
                    </button>
                </div>

                <div className="space-y-4 fade-in mt-8">
                    {
                        keys.map((key) => 
                            {   let days = findDifferDays(key.expires_at);
                                
                           return (
                             <div
                               key={key.id}
                               className="expiring bg-white border border-gray-200 rounded-xl shadow-sm"
                             >
                               <div className="flex justify-between items-center bg-gray-50 p-3 py-2 overflow-hidden rounded-t-xl border-b border-gray-100">
                                 <div className="flex items-center gap-3">
                                    <KeyIcon/>
                                   <span className="text-gray-900 font-medium">
                                     {key.name[0].toUpperCase() +
                                       key.name.slice(1)}
                                   </span>
                                   <div className="flex items-center gap-2 mt-1">
                                     <span
                                       className={`${days <= 0 ? "bg-[#FAF1CA] text-[#ECA231]" : "bg-[#E3FBFF] text-[#006C9C]"} rounded-[4px] uppercase px-5 py-0.5 text-[13px]`}
                                     >
                                       {days === "unlimited"
                                         ? "Unlimited"
                                         : days > 0
                                           ? `${days} Days Left`
                                           : "Expired"}
                                     </span>
                                   </div>
                                 </div>
                                 <div className="flex items-center gap-3">
                                   <button className="text-sm text-gray-500 font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50 hover:shadow-sm transition-all flex items-center gap-2">
                                     View Usage Log
                                   </button>
                                   <button
                                     onClick={() => {
                                       setAction("deleteAccessKey");
                                       setFormData(key);
                                     }}
                                     className="text-gray-400 p-1 rounded-md cursor-pointer"
                                   >
                                     <TrashIcon />
                                   </button>
                                 </div>
                               </div>

                               <div className="grid grid-cols-8 p-3 text-sm text-gray-600 border-t border-gray-100">
                                 <div className="flex gap-10 col-span-3">
                                   <div>
                                     <div className="text-[13px] text-gray-500 mb-1.5">
                                       Access Key
                                     </div>
                                     <span className="font-mono text-[13px] px-2 py-0.5 text-black">
                                       {key.id}
                                     </span>
                                   </div>
                                   <div className="col-span-2">
                                     <div className="text-[13px] text-gray-500  mb-1.5">
                                       Expiry Date
                                     </div>
                                     <div className="text-[13px] font-medium text-black">
                                       {key.expires_at}
                                     </div>
                                   </div>
                                 </div>
                                 <div className="col-span-2">
                                   <div className="text-[13px] text-gray-500 mb-1.5">
                                     Created at
                                   </div>
                                   <div className="text-[13px] font-medium text-black">
                                     {key.created_at}
                                   </div>
                                 </div>
                                 <div className="col-span-2">
                                   <div className="text-[13px] text-gray-500 mb-1.5">
                                     Last Used
                                   </div>
                                   <div className="text-[13px] font-medium text-black">
                                     {key.lastUsed}
                                   </div>
                                 </div>
                                 <div className="flex items-center gap-3 col-span-1 justify-end">
                                   <div>
                                     <div className="text-[13px] text-gray-500 mb-1 text-center">
                                       Status
                                     </div>
                                     <label className="toggle-switch transform scale-75 origin-right">
                                       <input
                                         className="access-handle"
                                         type="checkbox"
                                         checked={key.status === "enabled"}
                                         onClick={() => {
                                           setAction(
                                             key.status === "enabled"
                                               ? "disableAccessKey"
                                               : "enableAccessKey",
                                           );
                                           setFormData(key);
                                         }}
                                       />
                                       <span className="toggle-slider"></span>
                                     </label>
                                   </div>
                                   <span className="text-[12px] mt-4 text-gray-400 text-black">
                                     {key.status === "enabled"
                                       ? "Enabled"
                                       : "Disabled"}
                                   </span>
                                 </div>
                               </div>
                             </div>
                           );}
                        )
                    }
                </div>
            </div>
        </section>
    );
};

export default AccessKeySettings;
