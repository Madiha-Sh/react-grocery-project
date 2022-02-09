import React, { Component, useEffect } from 'react';

const Alert = ({ type, text, removeAlert, groceries }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      removeAlert();
    }, 2000);

    return () => clearTimeout(timeOut);
  }, [groceries]);
  return (
    <p className={`alert alert-${type}`}>{text}</p>
  )
};

export default Alert;