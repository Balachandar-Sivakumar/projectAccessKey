import React from "react";
import { notification } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";


//Notification popup
export const notify = (type,message,description) => {
    notification.open({
        message,
        description,
        placement: "topRight",
        duration: 2,
        icon:
            type === "success" ? (
                <CheckCircleFilled style={{ color: "#22C55E" }} />
            ) : (
                <CloseCircleFilled style={{ color: "#EF4444" }} />
            ),
    });
};
