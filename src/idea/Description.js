import { useState, useRef } from "react";
import Iconify from "../utility/Iconify";
import EditField from "./EditField";

function Description() {
  const descrRef = useRef(null);

  const rename = () => {
    descrRef.current.setRename(true);
  }

  return (
    <>
      <div className="group relative">
        <h4 className="font-exo font-semibold tracking-wide mb-1">Description</h4>
        <button
          onClick={rename}
          className="absolute -top-[2px] left-[5.3rem] ml-4 opacity-0 group-hover:opacity-100"
        >
          <Iconify data-width={13} data-icon="fa6-solid:pencil" />
        </button>
      </div>
      <hr />
      <EditField
        ref={descrRef}
        VALUE="there are many nested dafaiv whffffffffffffffffffffich make the rendering ffffffffffffffffffffffffffff faaaaaaaaaaprocess slow. Remove those or replace with React Fragment. two plus two is four. iminus one is three quick math"
      />
    </>
  );
}

export default Description;
