import React from "react";
import axios from "axios";

const ACCESS_KEY_API = process.env.REACT_APP_ACCESSKEY_URL;

///Validating the access key name
const accessKeyNameValidation = async (setError,formData) => {
    if(!formData.name.trim()){
        setError({name:'Please enter the access key name'})
        return false;
    }

    //checking the name if already in backend
    try{
        let getName = await axios.get(`${ACCESS_KEY_API}?name=${formData.name.toLowerCase()}`)
        if(getName.data.length){
            setError({name:'Access key name already exists'})
            return false
        }
        return true
    }catch(err){
        console.log(err)
    }

}

export {accessKeyNameValidation}