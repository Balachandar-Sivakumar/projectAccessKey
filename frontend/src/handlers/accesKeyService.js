import React from "react";
import axios from "axios";
import { findDifferDays } from "../helper/accessKeyHelper";
import { notify } from "../helper/notification";
import { disableExpiredAccessKeys } from "./accessKeyHandler";

//Access key url
const ACCESS_KEY_API = `${process.env.REACT_APP_BASE_URL}/access_keys`;
///Access key logs url
const ACCESS_KEY_LOG_API = `${process.env.REACT_APP_BASE_URL}/access_Key_logs`;

//getting keys from backend
const getAccessKeys = async (set, get) => {
  try {
    //Get keys from db
    let res = await axios.get(ACCESS_KEY_API, { timeout: 2000 });
    if (res.status === 200) {
      let accessKeys = res?.data || [];

      //Updating the dates
      set({ keys: accessKeys });
      //checking accesskey, if it expired change enable int disable
      disableExpiredAccessKeys(set, get, res?.data || []);
    }
  } catch (err) {
    //if something went wrong raises error
    notify("error", "Error", "Internal server error");
    console.log(err);
  }
};

//Creating the access key
const createAccessKey = async (set, get) => {
  const { formData, keys } = get();

  ///this is current date and time
  let currentTime = new Date(Date.now()).toUTCString();

  let payLoad = {
    //payload for create the key
    ...formData,
    status: 1,
    expires_at: formData.expires_at?.trim() || "unlimited",
    created_at: currentTime,
  };

  try {
    //creating new access key in db
    let createKey = await axios.post(`${ACCESS_KEY_API}`, payLoad, {
      timeout: 2000,
    }); //creating the key
    if (createKey.status === 201 && createKey.statusText === "Created") {
      //Updating previous keys
      set({
        keys: [...keys, createKey.data],
        formData: { name: "", expires_at: "" },
        action: "generateKey", //showing Access key generated model
      });
    }
  } catch (err) {
    notify("error", "Error", "Internal server error while creating access key");
    console.log(err);
  }
};

///Update status
const updateAccessKeyStatus = async (set, get) => {
  const { formData, keys } = get();

  let checkDate = findDifferDays(formData.expires_at);

  ///If expired key try to enable raise error
  if (checkDate <= 0 && formData.status === 0) {
    notify("error", "Error", "This Access key is expired");
    return;
  }

  let payLoad = { ...formData, status: formData.status === 1 ? 0 : 1 };

  try {
    //Update the status in db
    let updateKeyRes = await axios.put(
      `${ACCESS_KEY_API}/${formData.id}`,
      payLoad,
      { timeout: 2000 },
    );

    if (updateKeyRes.status === 200 && updateKeyRes.statusText === "OK") {
      //Modifying the previous keys
      let updateKey = keys.map((key) =>
        key.id === formData.id ? { ...key, ...updateKeyRes.data } : key,
      );

      //Then set update keys and refresh action and form data
      set({
        keys: updateKey,
        action: null,
        formData: { name: "", expires_at: "" },
      });

      //Success notification
      notify(
        "success",
        "Success",
        formData.status === 1 ? "Access key disabled" : "Access key enabled",
      );
    }
  } catch (err) {
    notify(
      "error",
      "Error",
      "Internal server error while updating access key status",
    );
    console.log(err);
  }
};

///delete access key
const deleteAccessKey = async (set, get) => {
  const { formData, keys } = get();

  if (!formData?.id) return;

  try {

    //Delete access key frm db
    let res = await axios.delete(`${ACCESS_KEY_API}/${formData.id}`, {
      timeout: 2000,
    });

    if (res.statusText === "OK" && res.status === 200) {

      //Filtering the the expect deleted key
      let removeKey = keys.filter((key) => key.id !== formData.id);

      //updating data and refresh form and action
      set({
        keys: removeKey,
        action: null,
        formData: { name: "", expires_at: "" },
      });
      notify("success", "Success", "Access Key deleted successfully");
    }
  } catch (err) {
    notify("error", "Error", "Internal server error while deleting access key");
    console.error(err);
  }
};

///Getting Access logs from Db
const getAccessKeyLogs = async () => {
  try {

    //get logs from db
    let res = await axios.get(ACCESS_KEY_LOG_API, { timeout: 2000 });
    if (res.status === 200) {

      //if it success return data
      return res?.data || [];
    }
  } catch (err) {
    //showing the error
    notify("error", "Error", "Internal server error while getting logs");
    console.log(err);
  }
};

export {
  getAccessKeys,
  createAccessKey,
  deleteAccessKey,
  updateAccessKeyStatus,
  getAccessKeyLogs,
};
