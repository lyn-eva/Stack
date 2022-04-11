import { useReducer } from "react";
import { useDB } from "../context/dbProvider";
import Description from "./Description";
import Title from "./Title";
import React from "react";
import Levels from "./Levels";
import Location from "./Location";
import EnhancedFormField from "../hoc/EnhancedFormField";
import Iconify from "../utility/Iconify";

const getTime = (time) => time?.toDate().toString().match(/\s{1}\d{1,2}(:\d{1,2}){2}\s{1}/g)[0];

const reducer = (state, action) => {
  switch (action.type) {
    case "TITLE":
      return { ...state, title: action.value };
    case "DESCRIPTION":
      return { ...state, description: action.value };
    case "LEVEL":
      return { ...state, level: action.value };
    case "LOCATION":
      return { ...state, location: action.value };
    default:
      return { ...state };
  }
};

function Detail({ idea, handleExpand, stackId, isForm = false }) {
  const initialForm = {
    title: idea?.title ?? "",
    title_i: idea?.title.toUpperCase() ?? '',
    description: idea?.description ?? "",
    level: idea?.level ?? 0,
    location: idea?.location ?? {},
  };
  
  const [formState, dispatch] = useReducer(reducer, initialForm);
  const { createIdea, updateIdea } = useDB();

  const handleSave = () => {
    isForm ? createIdea(stackId, formState) : updateIdea(stackId, idea.id, formState);
    handleExpand(); // set to false
  };

  return (
    <div className="pt-4 pb-2 px-6 bg-bg-soft-gray rounded-md text-white relative">
      <EnhancedFormField
        Original={Title}
        initial={formState.title}
        type="TITLE"
        isForm={isForm}
        dispatchForm={dispatch}
      />
      <EnhancedFormField
        Original={Description}
        initial={formState.description}
        type="DESCRIPTION"
        isForm={isForm}
        dispatchForm={dispatch}
      />
      <div className="flex flex-wrap gap-4 justify-between items-center mt-4 mb-1">
        <Levels isForm={isForm} initial={formState.level} dispatchForm={dispatch} />
        <EnhancedFormField
          Original={Location}
          initial={formState.location}
          type="LOCATION"
          editable
          custom={true}
          isForm={isForm}
          dispatchForm={dispatch}
        />
      </div>
      <hr />
      <div className="font-light text-[13px] flex justify-end gap-5 mt-2">
        <p>
          last modified: <span className="font-medium">{getTime(idea?.created)}</span>
        </p>
        <p>
          created at: <span className="font-medium">{getTime(idea?.created)}</span>
        </p>
      </div>
      <div className="flex gap-5 absolute left-8 bottom-[5px] text-[1.05rem]">
        <button onClick={handleSave} className="text-green-500">
          save changes {" "}
          <Iconify style={{ marginTop: "-2px" }} data-icon="ant-design:check-outlined" />
        </button>
        <button onClick={handleExpand} className="text-red-500">
          cancel <Iconify style={{ marginTop: "-1px" }} data-icon="gridicons:cross" />
        </button>
      </div>
    </div>
  );
}

export default Detail;
