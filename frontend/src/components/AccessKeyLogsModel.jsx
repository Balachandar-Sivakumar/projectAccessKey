import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { getAccessKeyLogs } from "../handlers/accesKeyService";
import useAccessKeyStore from "../store/accessKeyStore";
import { KeyIcon } from "./icons";

const AccessKeyLogsModel = () => {
  const { handleCancel } = useAccessKeyStore();

  const [logs, setLogs] = useState([]);

  ///Get access keys logs from db
  useEffect(() => {
    const getLogs = async () => {
      const data = await getAccessKeyLogs();
      setLogs(data);
    };

    getLogs();
  }, []);

  const [page, setPage] = useState(10); //page nation

  const reversedLogs = [...logs].reverse(); 
  const data = reversedLogs.slice(0, page); ///last 10 records

  return (
    <div
      className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4"
      onClick={handleCancel}
    >
      <div
        className="bg-white w-[600px] h-[80vh] rounded-2xl shadow-lg flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-2 font-semibold">
            <KeyIcon />
            <span>Project Default Key Usage Logs</span>
          </div>

          <button
            onClick={handleCancel}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <AiOutlineClose />
          </button>
        </div>

        {/* Table */}
        <div className="mx-4 my-4 overflow-y-auto scrollbar-hide border rounded-md ">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="text-center px-6 py-3 font-medium">
                  Workflow / Pipe Name
                </th>
                <th className="text-center px-6 py-3 font-medium">
                  Time Stamp
                </th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 && (
                <tr>
                  <td colSpan={2} className="py-10 text-center text-gray-400">
                    No logs available
                  </td>
                </tr>
              )}

              {data.map((log, index) => (
                <tr key={index} className="even:bg-gray-100">
                  <td className="px-6 py-3 text-[13px]">{log.name}</td>
                  <td className="px-6 py-3 text-[13px]">{log.timestamp}</td>
                </tr>
              ))}
              {data.length === page && (
                <tr>
                  <td colSpan={2} className="text-center py-3">
                    <button
                      onClick={() => setPage(page + 10)}
                      className="border px-5 py-2 cursor-pointer rounded-md text-sm hover:bg-gray-100"
                    >
                      View More logs
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccessKeyLogsModel;
