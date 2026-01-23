import React from "react";

const KeyIcon = () => {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4.25" cy="11.25" r="3.5" fill="#D7FCE8" />
      <circle
        cx="4.25"
        cy="11.25"
        r="3.5"
        stroke="#040404"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.75 10.8684H11.75M11.75 10.8684V13.25M11.75 10.8684H15.75V14.75"
        stroke="#040404"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.75 18.2503C5.70352 20.4736 8.50632 21.75 11.4365 21.75C17.1231 21.75 21.75 17.0398 21.75 11.2508C21.75 5.46175 17.1233 0.752059 11.4367 0.75C8.50835 0.75 5.70754 2.0263 3.75202 4.24966"
        stroke="#040404"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const TrashIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.37875 8.66667L8.37875 14M11.5681 8.66667L11.5681 14M12.7363 4.66667H17.9469M12.7363 4.66667C12.7363 3.19391 11.5424 2 10.0696 2C8.59689 2 7.40298 3.19391 7.40298 4.66667M12.7363 4.66667L7.40298 4.66667M16.1054 4.66667L14.9958 15.0348C14.8082 16.7229 13.3814 18 11.6829 18L8.45642 18C6.75792 18 5.33104 16.7229 5.14347 15.0348L3.69034 4.66667M2 4.66667H7.40298"
        stroke="#667069"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export { KeyIcon, TrashIcon };
