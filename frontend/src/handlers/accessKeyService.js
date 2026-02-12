import React from "react";
import { findDifferDays, handleRequest } from "../helper/accessKeyHelper";
import { notify } from "../helper/notification";
import { disableExpiredAccessKeys } from "./accessKeyHandler";

//Access key url
const ACCESS_KEY_API = `${process.env.REACT_APP_BASE_URL}/access_keys`;
///Access key logs url
const ACCESS_KEY_LOG_API = `${process.env.REACT_APP_BASE_URL}/access_Key_logs`;

//getting keys from backend
const getAccessKeys = async (set, get) => {
  //Get keys from db
  let res = await handleRequest(ACCESS_KEY_API);
  if (res.status === 200) {
    let accessKeys = res?.data || [];
    //Updating the dates
    set({ keys: accessKeys });
    //checking accesskey, if it expired change enable int disable
    disableExpiredAccessKeys(set, get, res?.data || []);
  }
};

//Creating the access key
const createAccessKey = async (set, get) => {
  const { formData, keys } = get();

  ///this is current date and time
  let currentTime = new Date(Date.now()).toUTCString();

  //payload for creating
  let payLoad = {
    ...formData,
    status: 1,
    expires_at: formData.expires_at?.trim() || "unlimited",
    created_at: currentTime,
  };

  //creating new access key in db
  let res = await handleRequest( ACCESS_KEY_API,"post", payLoad);

  if (res?.status === 201 && res?.statusText === "Created") {
    //Updating previous keys
    set({
      keys: [...keys, res?.data],
      formData: { name: "", expires_at: "" },
      action: "generateKey", //showing Access key generated model
    });
    notify("success", "Success", "Access Key created successfully");
  }
};

///Update status
const updateAccessKeyStatus = async (set, get,isChange = false) => {
  const { formData, keys } = get();

  let checkDate = findDifferDays(formData?.expires_at);

  ///If expired key try to enable raise error
  if (checkDate <= 0 && formData?.status === 0) {
    notify("error", "Error", "This Access key is expired");
    return;
  }

  let payLoad = { ...formData, status: Number(!formData?.status) };

  //Update the status in db
  let res = await handleRequest(`${ACCESS_KEY_API}/${formData?.id}/`,"put" ,payLoad);

  if (res?.status === 200 && res?.statusText === "OK") {
    //Modifying the previous keys
    let updateKey = keys.map((key) =>
      key.id === formData.id ? { ...key, ...res?.data } : key,
    );

    //Then set update keys and refresh action and form data
    set({
      keys: updateKey,
      action: null,
      formData: { name: "", expires_at: "" },
    });
    if(isChange) return
    //Success notification
    notify(
      "success",
      "Success",
      formData?.status === 1 ? "Access key disabled" : "Access key enabled",
    );
  }
};

///delete access key
const deleteAccessKey = async (set, get) => {
  const { formData, keys } = get();

  //Delete access key frm db
  let res = await handleRequest(`${ACCESS_KEY_API}/${formData?.id}`,"delete");

  if (res?.statusText === "OK" && res?.status === 200) {
    //Filtering the the expect deleted key
    let removeKey = keys.filter((key) => key?.id !== formData?.id);

    //updating data and refresh form and action
    set({
      keys: removeKey,
      action: null,
      formData: { name: "", expires_at: "" },
    });
    notify("success", "Success", "Access Key deleted successfully");
  }
};

///Getting Access logs from Db
const getAccessKeyLogs = async () => {
  //get logs from db
  let res = await handleRequest(ACCESS_KEY_LOG_API);
  if (res?.status === 200) {
    //if it success return data
    return res?.data || [];
  }
};

export {
  getAccessKeys,
  createAccessKey,
  deleteAccessKey,
  updateAccessKeyStatus,
  getAccessKeyLogs,
};
