import React from "react";
import { Route,Routes } from "react-router-dom";
import MainModel from "../components/ProjectAccessKeyMain";

///Project Route function
function AppRoutes(){
    return (<Routes>
        <Route path="/" element={<MainModel/>}/>
    </Routes>)
}

export default AppRoutes;
