import Description from "./Description";
import Title from "./Title";
import React from "react";
import Levels from "./Levels";
import Location from "./Location";

const bold = "font-exo font-semibold text-[1rem] tracking-wide mr-5";

function Detail() {
  return (
    <div className="pt-5 pb-1 px-6">
      <Title bold={bold} />
      <Description bold={bold} />
      <div className="flex flex-wrap gap-4 justify-between items-center mt-4 mb-1">
        <Levels />
        <Location editable/>
      </div>
      <hr />
      <div className="font-light text-[13px] flex justify-end gap-5 my-1">
        <p>
          last modified: <span className="font-normal">3 min ago</span>
        </p>
        <p>
          created at: <span className="font-normal">12/27/2021</span>
        </p>
      </div>
    </div>
  );
}

export default Detail;
