import React from "react";
import axios from "axios";
import { findDifferDays } from "../helper/accessKeyHelper";
import { notify } from "../helper/notification";

//Access key url
const ACCESS_KEY_API = process.env.REACT_APP_ACCESSKEY_URL;

//getting keys from backend
const getAccessKeys = async (set, get) => {
    try {
        let res = await axios.get(ACCESS_KEY_API);
        let accessKeys = res.data;
        set({ keys: accessKeys });
    } catch (err) {
        console.log(err);
    }
};

//Creating the access key
const createAccessKey = async (set, get) => {
    const { formData, keys } = get();
    let currentTime = new Date(Date.now()).toUTCString()
    
    let payLoad = {                        //payload for create the key
            ...formData,
            status:"enabled",
            expires_at: formData.expires_at?.trim() || 'unlimited',
            created_at:currentTime
        }

    try {
        let createKey = await axios.post(`${ACCESS_KEY_API}`,payLoad);  //creating the key
        set({
            keys: [...keys, createKey.data],
            formData: { name: "", expires_at: "" },
        });
    } catch (err) {
        console.log(err);
    }
};

///Update status
const updateAccessKeyStatus = async (set,get) =>{
    const {formData,keys} = get()

    let checkDate = findDifferDays(formData.expires_at)

    if(checkDate <= 0){
        notify('error','Error','This Access key is expired')
        return;
    }

    let payLoad = {...formData,status:formData.status === 'enabled'?'disabled':'enabled'}
    try{
        let updateKeyRes = await axios.put(`${ACCESS_KEY_API}/${formData.id}`,payLoad)
        let updateKey = keys.map(key => key.id === formData.id ? {...key,...updateKeyRes.data}:key)

        set({keys:updateKey,action:null,formData:{name:'',expires_at:''}})
    }catch(err){
        console.log(err)
    }
}

///delete access key
const deleteAccessKey = async (set, get) => {
  const { formData, keys } = get();

  if (!formData?.id) return;

  try {
    await axios.delete(`${ACCESS_KEY_API}/${formData.id}`);

    //remove deleted key
    let removeKey = keys.filter(key => key.id !== formData.id)

    set({
      keys: removeKey,
      action: null,
      formData: { name: "", expires_at: "" },
    });

  } catch (err) {
    console.error(err);
  }
};


export { getAccessKeys, createAccessKey, deleteAccessKey, updateAccessKeyStatus };
