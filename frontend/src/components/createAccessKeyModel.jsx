import React from "react";
import { Form, Input, DatePicker, Button } from 'antd';
import useAccessKeyStore from "../store/accessKeyStore";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { accessKeyFormValidation } from "../helper/validation";
import { AiOutlineClose, AiFillExclamationCircle } from "react-icons/ai";

dayjs.extend(utc);

const CreateAccessKey = () => {
  const { setAction, formData, setFormData, setErrors, errors, createAccessKey } = useAccessKeyStore();

  function handleCancel(){
              setAction(null);
              setFormData({ name: "", expires_at: "" });
              setErrors({});
  }

  return (
      <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 p-4"
          onClick={handleCancel}
      >
          {/* Popup content */}
          <div
              className="relative w-[600px] h-[420px] bg-white rounded-[20px] p-8 shadow-lg"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
              <div className=" flex justify-between font-semibold items-center mb-8 pb-4 border-b border-gray-200 -mx-8 px-8">
                  <h3 >
                      Create Access Key
                  </h3>

                  <button
                      onClick={() => setAction(null)}
                      className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 transition"
                  >
                      <AiOutlineClose style={{ color: "black" }} size={12} />
                  </button>
              </div>
              <Form
                  layout="vertical"
                  onFinish={async () => {
                      let isValid = await accessKeyFormValidation(setErrors,formData);
                      if (!isValid) return;
                      createAccessKey();
                      setAction("generateKey");
                  }}
              >
                  <Form.Item
                      label={  <span className="text-gray-500 flex gap-1 items-center">Access Key Name <span className="text-red-600">*</span> <AiFillExclamationCircle/></span>}
                      validateStatus={errors.name ? "error" : ""}
                      help={errors.name}
                  >
                      <Input
                          value={formData.name}
                          placeholder="Bigcommerce credential"
                          onChange={(e) => {
                              setFormData({...formData,name: e.target.value});
                              setErrors({...errors,name:''});
                          }}
                          className="rounded-md h-10 border border-gray-300 transition hover:border-gray-300 focus:border-gray-300 focus:ring-0"
                      />
                  </Form.Item>

                  <Form.Item
                      label={<span className="text-gray-500 flex items-center gap-1">Expiry Date <AiFillExclamationCircle/></span>}
                      style={{ marginBottom: "40px" }}
                      validateStatus={errors.expires_at? 'error':''}
                      help={errors.expires_at}
                  >
                      <DatePicker
                          onChange={(date) =>{
                              setFormData({...formData,expires_at: date.endOf('day').utc().format("ddd, DD MMM YYYY HH:mm:ss [GMT]")})
                              setErrors({...errors,expires_at:""})
                          }
                        }
                          style={{ width: "100%" }}
                          className="rounded-md h-10 border border-gray-300 transition hover:border-gray-300 focus:border-gray-300 focus:ring-0"
                      />
                  </Form.Item>

                  <Form.Item style={{ textAlign: "center", marginTop: 72 }}>
                      <Button
                          type="primary"
                          htmlType="submit"
                          className="bg-[#4f7f63] border border-[#4f7f63] py-2 px-5 text-[14px] h-10 hover:!bg-[#4f7f63]"
                      >
                          Create
                      </Button>
                  </Form.Item>
              </Form>
          </div>
      </div>
  );
};

export default CreateAccessKey;
