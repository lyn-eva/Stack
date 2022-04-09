import Description from "./Description";
import Title from "./Title";
import React from "react";
import Levels from "./Levels";
import Location from "./Location";
import EnhancedFormField from "../hoc/EnhancedFormField";

function Detail({ title, description, level, location, created, modified, dispatchForm, isForm = false}) {
  return (
    <div className="pt-5 pb-1 px-6 bg-bg-soft-gray rounded-md text-white">
      <EnhancedFormField Original={Title} initial={title} type='TITLE' isForm={isForm} dispatchForm={dispatchForm}/>
      <EnhancedFormField Original={Description} initial={description} type='DESCRIPTION' isForm={isForm} dispatchForm={dispatchForm}/>
      <div className="flex flex-wrap gap-4 justify-between items-center mt-4 mb-1">
        <Levels isForm={isForm} initial={level} dispatchForm={dispatchForm}/>
        <EnhancedFormField Original={Location} initial={location} type='LOCATION' editable custom={true} isForm={isForm}  dispatchForm={dispatchForm}/>
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
