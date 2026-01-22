import React, { useState } from "react";
import { Input, Button } from "antd";
import {
    EyeOutlined,
    EyeInvisibleOutlined,
    CopyOutlined,
    CheckCircleFilled,
    CheckOutlined,
    WarningFilled
} from "@ant-design/icons";
import { createRandomstring } from "../helper/accessKeyHelper";
import useAccessKeyStore from "../store/accessKeyStore";
import { AiOutlineClose } from "react-icons/ai";

export default function GeneratedAccessKey() {
    const { setAction } = useAccessKeyStore();
    const [showKey, setShowKey] = useState(true);
    const [copy, setCopy] = useState(false);
    const [accesskey, setAccessKey] = useState(createRandomstring());

    function handleCancel() {
        setAction(null);
    }

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 p-4"
            onClick={handleCancel}
        >
            <div
                className="relative bg-white rounded-2xl p-6 w-[540px] shadow-lg"
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
                {/* Close Button */}
                <button
                    onClick={handleCancel}
                    className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                >
                    <AiOutlineClose size={16} className="text-gray-600" />
                </button>

                {/* Success Icon */}
                <div className="flex items-center mb-4">
                    <CheckCircleFilled
                        style={{
                            color: "#009688",
                            fontSize: 22,
                            marginRight: 8,
                        }}
                    />
                    <h3 className="text-[18px] font-semibold m-0">
                        Access Key Generated
                    </h3>
                </div>

                {/* Subtitle */}
                <p className="mb-4 text-gray-600 text-sm">
                    You can generate and copy this Access key only once. Make
                    sure to store it securely.
                </p>

                {/* Input */}
                <Input
                    type={showKey ? "text" : "password"}
                    readOnly
                    value={accesskey}
                    suffix={
                        copy ? (
                            ""
                        ) : showKey ? (
                            <EyeOutlined
                                onClick={() => setShowKey(false)}
                                style={{ cursor: "pointer" }}
                            />
                        ) : (
                            <EyeInvisibleOutlined
                                onClick={() => setShowKey(true)}
                                style={{ cursor: "pointer" }}
                            />
                        )
                    }
                    className="mb-4 text-[14px] tracking-widest px-3 py-2 rounded-md border border-gray-300 focus:border-gray-700 focus:ring-0 hover:border-gray-400 transition"
                />

                {/* Warning */}
                <p className="text-yellow-600 text-sm mb-6">
                    <WarningFilled/> It won’t be shown again, and if lost, a new key must be
                    generated, Make sure to store it securely once copied
                    proceeding.
                </p>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    {!copy && <Button onClick={handleCancel}>Cancel</Button>}
                    <Button
                        onClick={() => {
                            navigator.clipboard.writeText(accesskey);
                            setCopy(true);
                            setShowKey(false);
                        }}
                        type="primary"
                        icon={copy ? <CheckOutlined /> : <CopyOutlined />}
                        style={{
                            backgroundColor: copy ? "#ccd1cd" : "#518167",
                            color: copy ? "black" : "white",
                        }}
                    >
                        {copy ? `Copied! Keep It Secure` : "Copy API Key"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
