import React from "react";
import axios from "axios";
import { notify } from "./notification";

///Creating random 16 string for access token
const createRandomstring = () => {
    let string = "";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < 16; i++) {
        string += chars[Math.floor(Math.random() * chars.length)];
    }
    return string;
};


//Checking the expired_at date with current date
const findDifferDays = (data) => {
    if(data === 'unlimited' || data === '') return data;
    const targetDate = new Date(data);
    const now = new Date();
    const diffDays = Math.ceil((targetDate - now) / (1000 * 60 * 60 * 24));

    return diffDays;
};

//service from backend
const handleRequest = async (apiUrl, action = 'get', payload = "",timeout=2000) => {
  try {
    //get api response from db
    let response = await axios({
      method: action,
      url: apiUrl,
      data: payload,
      timeout: timeout,
    });
    return response;
  } catch (err) {
    notify(
      "error",
      "Error",
      `"Internal server error while ${action}ing access key status",`,
    );
    console.log(err)
  }
};

export {createRandomstring, findDifferDays, handleRequest}
