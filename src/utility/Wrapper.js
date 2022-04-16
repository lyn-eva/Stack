import React from "react";

function Wrapper({ children, className, onClick }) {
  return <div onClick={onClick} className={`bg-bg-soft-gray rounded-md ${className}`}>{children}</div>;
}

export default Wrapper;
