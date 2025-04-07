import React from "react";
import "./style.css";

const Button = ({ label, onClick, type = "button", style}) => {
    
  return (
    <button
      type={type}
      onClick={onClick}
      className={`mt-3 submit-btn ${style}`}
    >
      {label}
    </button>
  );
};

export default Button;
