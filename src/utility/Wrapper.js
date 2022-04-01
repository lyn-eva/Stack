import React from "react";

function Wrapper({ children, className }) {
  return <div className={`bg-bg-soft-gray rounded-md ${className}`}>{children}</div>;
}

export default Wrapper;
