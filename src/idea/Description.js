import React from "react";
function Description({ bold, initial }) {
  return (
    <div className="">
      <label className={bold}>Description: </label>
      <hr />
      <textarea
        placeholder="description"
        className={`${initial ? 'bg-white text-black' : 'bg-transparent'} block mt-3 w-full h-24 rounded-sm px-1 outline-none`}
      />
    </div>
  );
}

export default Description;
