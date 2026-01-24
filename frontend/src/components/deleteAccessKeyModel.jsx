import React from "react";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { AiOutlineClose } from "react-icons/ai";
import useAccessKeyStore from "../store/accessKeyStore";
import { handleCancel } from "../handlers/accessKeyHandler";

export default function DeleteAccessKey() {
    const { deleteAccessKey,handleCancel } = useAccessKeyStore();

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 p-4"
            onClick={handleCancel} // clicking outside closes
        >
            <div
                className="relative bg-white rounded-2xl p-6 w-[480px] h-[360px] pt-20 shadow-lg text-center"
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
                {/* Close Button */}
                <button
                    onClick={handleCancel}
                    className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                >
                    <AiOutlineClose size={16} className="text-gray-600" />
                </button>

                {/* Delete Icon */}
                <div className="mb-4">
                    <DeleteOutlined className="text-[#ff4d4f] text-[40px] bg-red-50 p-5 rounded-full"/>
                </div>

                {/* Heading */}
                <h3 className="font-semibold text-lg mb-2">
                    Delete this Access Key
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-12">
                    Deleting this Access Key will impact dynamic workflows/pipes
                    that authenticated using it. Do you want to proceed?
                </p>

                {/* Buttons */}
                <div className="flex justify-center gap-3">
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button
                        type="primary"
                        danger
                        onClick={() => deleteAccessKey()}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}
