import { useState } from "react";
import Iconify from "../utility/Iconify";
import Wrapper from "../utility/Wrapper";

const getDate = (date) => {
  return date?.match(/.+(?=GMT)/g)[0];
};

function MetaData({ hdr, createdAt, updatedAt, pushedAt }) {
  const [expand, setExpand] = useState(true);

  return (
    <Wrapper className={`${expand ? 'p-5' : 'p-4 pb-3'} text-white mt-5 font-lato shadow-l2 relative group`}>
      <button
        onClick={() => setExpand((prev) => !prev)}
        className="absolute right-5 top-4 ml-4 opacity-0 group-hover:opacity-100"
      >
        <Iconify data-width={19} data-icon={expand ? 'icomoon-free:shrink2' : 'fa:expand'} />
      </button>
      <h3 className="font-semibold mb-1">{hdr}</h3>

      {expand && (
        <>
          <hr />
          <p className="my-2 mt-4 font-semibold">
            created at : <span className="font-normal ml-1">{getDate(createdAt)}</span>
          </p>
          <p className="font-semibold my-2">
            updated at : <span className="font-normal ml-1">{getDate(updatedAt)}</span>
          </p>
          {pushedAt && (
            <p className="font-semibold">
              pushed at : <span className="font-normal ml-1">{getDate(pushedAt)}</span>
            </p>
          )}
        </>
      )}
    </Wrapper>
  );
}

export default MetaData;
