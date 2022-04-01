import React from "react";

function Button({ children, style }) {
  return <button className='font-roboto font-medium bg-white px-4 py-[6px] rounded-md' style={style || {}}>{children}</button>;
}

export default Button;
