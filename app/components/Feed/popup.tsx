import React, { useState, useEffect } from 'react';
const Popup = ({ message, show, onClose }) => {
    useEffect(() => {
      if (show) {
        const timer = setTimeout(onClose, 3000); // Auto-hide after 3 seconds
        return () => clearTimeout(timer);
      }
    }, [show, onClose]);
  
    if (!show) return null;
  
    return (
      <div className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-gray-800 text-white rounded shadow-lg ${show ? 'block' : 'hidden'}`}>
        {message}
      </div>
    );
  };
  export default Popup;