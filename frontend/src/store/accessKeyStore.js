import React from "react";
import { create } from "zustand";
import { deleteAccessKey, getAccessKeys, updateAccessKeyStatus } from "../handlers/accessKeyService";
import { createAccessKey } from "../handlers/accessKeyService";
import { handleCancel } from "../handlers/accessKeyHandler";

//Global function and states
const useAccessKeyStore = create((set, get) => ({
    keys: [],
    action :null,
    errors : {},
    formData:{name:'',expires_at:''},

    setKeys: (data) => set({ keys: data }),
    setAction : (data) => set({action:data}),
    setErrors : (data) => set({errors:data}),
    setFormData : (data) => set({formData:data}),

    getAccessKeys : () => getAccessKeys(set,get),
    createAccessKey : (...args) => createAccessKey(set,get,...args),
    updateAccessKeyStatus : (...args) => updateAccessKeyStatus(set,get,...args),
    deleteAccessKey : () => deleteAccessKey(set,get),
    handleCancel: () => handleCancel(set,get)
}));

export default useAccessKeyStore;
