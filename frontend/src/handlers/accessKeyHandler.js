import React from "react";
import { notify } from "../helper/notification";
import { findDifferDays } from "../helper/accessKeyHelper";
import { updateAccessKeyStatus } from "./accessKeyService";

//Handling the if something cancel
const handleCancel = (set, get) => {
  set({ action: null, formData: { name: "", expires_at: "" }, errors: {} });
};

//Token copy to clipboard
const copyToClipBoard = (accesskey, setCopy, setShowKey) => {
  navigator.clipboard.writeText(accesskey);
  setCopy(true);
  setShowKey(false);
  notify("success", "Success", "Access Token Copied success"); ///Notification message
};

///setValuer for form data
const getVales = (data,setFormData,formData,errors,setErrors, isDate = false) => {
  if (isDate) {
    setFormData({...formData,expires_at: data.endOf("day").utc().format("ddd, DD MMM YYYY HH:mm:ss [GMT]")});
    setErrors({ ...errors, expires_at: "" });
  }else{
    setFormData({ ...formData, name: data.target.value });
     setErrors({ ...errors, name: "" });
  }
};

///Disabling the expired keys
const disableExpiredAccessKeys = (set,get,keys) => {
    keys.forEach(async (key) => {
    const days = findDifferDays(key.expires_at);

    if (days <= 0 && days !== "unlimited" && key.status === 1) {
      set({formData:key})
      await updateAccessKeyStatus(set,get,true);
    }
  })
}

export { handleCancel, copyToClipBoard, getVales, disableExpiredAccessKeys };
