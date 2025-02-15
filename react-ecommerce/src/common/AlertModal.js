import React from "react";
import Modal from "react-modal";
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

Modal.setAppElement("#root");

const alertConfig = {
  warning: {
    icon: (
      <ExclamationTriangleIcon className="h-14 w-14 text-yellow-500 mx-auto" />
    ),
    color: "text-yellow-800",
    buttonColor: "bg-yellow-600 hover:bg-yellow-700",
  },
  info: {
    icon: <InformationCircleIcon className="h-14 w-14 text-blue-500 mx-auto" />,
    color: "text-blue-800",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
  },
  success: {
    icon: <CheckCircleIcon className="h-14 w-14 text-green-500 mx-auto" />,
    color: "text-green-800",
    buttonColor: "bg-green-600 hover:bg-green-700",
  },
  error: {
    icon: <XCircleIcon className="h-14 w-14 text-red-500 mx-auto" />,
    color: "text-red-800",
    buttonColor: "bg-red-600 hover:bg-red-700",
  },
};

const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  type = "info",
  title,
  message,
}) => {
  const config = alertConfig[type] || alertConfig.info;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white p-6 rounded-lg shadow-lg w-4xl mx-auto mt-20 border border-gray-200"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="">
        {config.icon}

        <h2 className={`text-xl font-semibold mt-4 ${config.color}`}>
          {title}
        </h2>
        <p className="text-gray-600 mt-2">{message}</p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-white rounded-lg transition duration-200 ${config.buttonColor}`}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AlertModal;
