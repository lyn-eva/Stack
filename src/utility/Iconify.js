import React from "react";

function Iconify({ icon, width }) {
  return (
    <i
      className="iconify !inline-block mb-[1px]"
      data-width={width || undefined}
      data-icon={icon}
    ></i>
  );
}

export default Iconify;
