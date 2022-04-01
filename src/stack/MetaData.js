import React from "react";
import Wrapper from "../utility/Wrapper";

function MetaData({ hdr }) {
  return (
    <Wrapper className="p-5 text-white mt-5 font-lato">
      <h3 className="font-semibold mb-1">{hdr}</h3>
      <hr />
      <p className="my-2 mt-4 font-semibold text-right">
        created at : <span className="font-normal ml-1">2022-01-02T15:38:34Z</span>
      </p>
      <p className="font-semibold text-right">
        updated at : <span className="font-normal ml-1">2022-01-02T15:38:34Z</span>
      </p>
    </Wrapper>
  );
}

export default MetaData;
