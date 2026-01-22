import React from "react";

const createRandomstring = () => {
    let string = "";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < 16; i++) {
        string += chars[Math.floor(Math.random() * chars.length)];
    }
    return string;
};

const findDifferDays = (data) => {
    if(data === 'unlimited' || data === '') return data;
    const targetDate = new Date(data);
    const now = new Date();
    const diffDays = Math.ceil((targetDate - now) / (1000 * 60 * 60 * 24));

    return diffDays;
};

export {createRandomstring, findDifferDays}
