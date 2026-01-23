import React, { useEffect } from "react";
import Header from "./header";
import Sidebar from "./sideBar";
import ProjectSettingsSidebar from "./settingsModel";
import useAccessKeyStore from "../store/accessKeyStore";
import AccessKeySettings from "./accessKeyModel";
import CreateAccessKey from "./createAccessKeyModel";
import GeneratedAccessKey from "./generateAccessTokenModel";
import DeleteAccessKey from "./deleteAccessKeyModel";
import DisableAccessKeyModal from "./disableAccessKeyModel";
import EnableAccessKeyModal from "./enableAccessKeyModel";


const MainModel = () => {
   
    const { getAccessKeys, action } = useAccessKeyStore();

     useEffect( () => {
       getAccessKeys();
    }, []);

    return (
        <>
            <Header /> 
            <Sidebar />
            <div className="mt-4 ml-20 mr-6 flex gap-4 mt-[70px]">
                <ProjectSettingsSidebar />
                <AccessKeySettings/>
            </div>
            {action === 'createKey' && <CreateAccessKey/>}
            {action === 'generateKey' && <GeneratedAccessKey/>}
            {action === 'deleteAccessKey' && <DeleteAccessKey/>}
            {action === 'disableAccessKey' && <DisableAccessKeyModal/>}
            {action === 'enableAccessKey' && <EnableAccessKeyModal/>}
        </>
    );
};

export default MainModel;
