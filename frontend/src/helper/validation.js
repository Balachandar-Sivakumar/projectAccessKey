import React from "react";

///Validating the form
const accessKeyFormValidation = (setError,formData,keys) => {
   let newErrors = {}

    if(!formData.name.trim()){
        newErrors.name = 'Please enter the access key name'
    }

    let checkName = keys.find(key => key.name === formData.name.trim().toLowerCase())

    if(checkName){
        newErrors.name = 'Access key name already exists'
    }

    if(Object.keys(newErrors).length>0){
        setError(newErrors)
        return false;
    }

    return true;
}

export {accessKeyFormValidation}