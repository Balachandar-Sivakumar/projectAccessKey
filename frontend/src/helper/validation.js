import React from "react";
import axios from "axios";
import { findDifferDays } from "./accessKeyHelper";

const ACCESS_KEY_API = process.env.REACT_APP_ACCESSKEY_URL;

///Validating the access key name
const accessKeyFormValidation = async (setError,formData) => {
   let newErrors = {}

    if(!formData.name.trim()){
        newErrors.name = 'Please enter the access key name'
    }
    let checkDate = findDifferDays(formData.expires_at)

    if(checkDate <= 0){ //Checking the date if the user selected valid date
        newErrors.expires_at = 'Please select valid date'
    }

    if(Object.keys(newErrors).length>0){
        setError(newErrors)
        return false
    }

    //checking the name if already in backend
    try{
        let getName = await axios.get(`${ACCESS_KEY_API}?name=${formData.name.toLowerCase()}`)
        if(getName.data.length){
            setError({name:'Access key name already exists'})
            return false //if it exists return fals and raise error
        }
        return true //if is not exists return true
    }catch(err){
        console.log(err)
    }

}

export {accessKeyFormValidation}