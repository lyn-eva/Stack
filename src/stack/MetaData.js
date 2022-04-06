import React from "react";
import Iconify from "../utility/Iconify";
import Wrapper from "../utility/Wrapper";

const getDate = (date) => {
  return date?.match(/.+(?=GMT)/g)[0];
}

function MetaData({ hdr, createdAt, updatedAt, pushedAt }) {
  // console.log(createdAt, updatedAt, pushedAt)
  return (
    <Wrapper className="p-5 text-white mt-5 font-lato shadow-l2 relative group">
      <button className="absolute right-5 top-4 ml-4 opacity-0 group-hover:opacity-100">
        <Iconify data-width={19} data-icon="icomoon-free:shrink2" />
      </button>
      <h3 className="font-semibold mb-1">{hdr}</h3>
      <hr />
      <p className="my-2 mt-4 font-semibold text-right">
        created at : <span className="font-normal ml-1">{getDate(createdAt)}</span>
      </p>
      <p className="font-semibold text-right my-2">
        updated at : <span className="font-normal ml-1">{getDate(updatedAt)}</span>
      </p>
      {pushedAt && <p className="font-semibold text-right">
        pushed at : <span className="font-normal ml-1">{getDate(pushedAt)}</span>
      </p>}
    </Wrapper>
  );
}

export default MetaData;
