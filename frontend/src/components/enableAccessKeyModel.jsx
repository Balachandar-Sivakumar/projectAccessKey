import React from "react";
import { Button } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { AiOutlineClose } from "react-icons/ai";
import useAccessKeyStore from "../store/accessKeyStore";

const EnableAccessKeyModal = () => {
    const { updateAccessKeyStatus, setAction, setFormData } = useAccessKeyStore();

    function cancelAction() {
        setAction(null);
        setFormData({ name: "", expires_at: "" });
    }

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 p-4"
            onClick={cancelAction}
        >
            <div
                className="relative bg-white rounded-2xl p-6 w-[480px] h-[360px] pt-20 shadow-lg text-center"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={cancelAction}
                    className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                >
                    <AiOutlineClose size={16} className="text-gray-600" />
                </button>

                {/* Success Icon */}
                <div className="mb-4">
                    <CheckCircleFilled className="text-[40px] text-[#518167] bg-[#DCFCE7] p-5 rounded-full" />
                </div>

                {/* Title */}
                <h2 className="mb-3 text-[20px] font-semibold text-gray-900">
                    Enable this Access Key
                </h2>

                {/* Description */}
                <p className="mb-8 text-[14px] leading-6 text-gray-500">
                    Enabling this access key will allow workflows and integrations
                    to authenticate using it. Do you want to proceed?
                </p>

                {/* Actions */}
                <div className="flex justify-center gap-4">
                    <Button
                        onClick={cancelAction}
                        className="text-sm rounded-lg border border-gray-300 font-medium"
                    >
                        Cancel
                    </Button>

                    <Button
                        type="primary"
                        onClick={() => updateAccessKeyStatus()}
                        className="text-sm rounded-lg bg-[#518167] font-medium hover:!bg-[#518167] hover:shadow-lg"
                    >
                        Enable Now
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EnableAccessKeyModal;
