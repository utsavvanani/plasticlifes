// context/NotificationContext.js
import React, { createContext, useContext, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create the context
const NotificationContext = createContext();

// Notification provider component
export const NotificationProvider = ({ children }) => {
  const notifySuccess = (message) => {
    toast.success(message || "Operation successful");
  };

  const notifyError = (message) => {
    toast.error(message || "An error occurred");
  };

  return (
    <NotificationContext.Provider value={{ notifySuccess, notifyError }}>
      {children}
      <ToastContainer />
    </NotificationContext.Provider>
  );
};

// Custom hook to use the notification context
export const useNotification = () => {
  return useContext(NotificationContext);
};
