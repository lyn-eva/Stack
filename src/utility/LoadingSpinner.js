import React from "react";

function LoadingSpinner({ width }) {
  return (
    <div className="absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2">
      <div className="w-10 h-10 rounded-full border-4 border-b-text-gray animate-spin"></div>
    </div>
  );
}

export default LoadingSpinner;
