import React from "react";

function Iconify({ icon, width, style }) {
  return (
    <i
      className="iconify !inline-block mb-[1px]"
      data-width={width || undefined}
      data-icon={icon}
      style={style || undefined}
    ></i>
  );
}

export default Iconify;
