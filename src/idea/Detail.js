import { useReducer, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDB } from "../context/dbProvider";
import Description from "./Description";
import Title from "./Title";
import React from "react";
import Levels from "./Levels";
import Location from "./Location";
import EnhancedFormField from "../hoc/EnhancedFormField";
import Iconify from "../utility/Iconify";
import Modal from "../utility/Modal";

const variant = {
  expand: {
    height: "auto",
    opacity: 1,
    paddingBlock: ".8rem",
    transition: { bounce: 0, duration: 1 },
  },
  shrink: {
    height: 0,
    opacity: 0,
    paddingBlock: 0,
    transition: { bounce: 0, duration: 1 },
  },
};

const getTime = (time) =>
  time
    ?.toDate()
    .toString()
    .match(/\s{1}\d{1,2}(:\d{1,2}){2}\s{1}/g)[0];

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
    title_i: idea?.title.toUpperCase() ?? "",
    description: idea?.description ?? "",
    level: idea?.level ?? 0,
    location: idea?.location ?? {},
  };

  const [formState, dispatch] = useReducer(reducer, initialForm);
  const { createIdea, updateIdea, deleteIdea } = useDB();
  const [onDelete, setOnDelete] = useState(false);

  const handleSave = () => {
    isForm ? createIdea(stackId, formState) : updateIdea(stackId, idea.id, formState);
    handleExpand(); // set to false
  };

  const handleDelete = () => {
    setOnDelete(true);
  };

  const confirmDelete = () => {
    deleteIdea(stackId, idea.id);
  };

  return (
    <>
      <AnimatePresence>
        {onDelete && (
          <Modal handleToggle={() => setOnDelete(false)} handleDelete={confirmDelete} />
        )}
      </AnimatePresence>

      <motion.div
        variants={variant}
        initial={"shrink"}
        animate={"expand"}
        exit={"shrink"}
        className="!mb-4 relative overflow-hidden rounded-md bg-bg-soft-gray px-6 text-white"
      >
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
        <div className="mt-4 mb-1 flex flex-wrap items-center justify-between gap-4">
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
        <div className='flex justify-between items-center mt-2'>
          <div className="flex gap-5 text-[1rem]">
            <button onClick={handleSave} className="text-green-500">
              save changes{" "}
              <Iconify
                style={{ marginTop: "-2px" }}
                data-icon="ant-design:check-outlined"
              />
            </button>
            <button
              onClick={isForm ? handleExpand : handleDelete}
              className="text-red-500"
            >
              {isForm ? "cancel" : "Delete"}{" "}
              <Iconify style={{ marginTop: "-1px" }} data-icon="ion:trash-outline" />
            </button>
          </div>
          <div className="flex gap-5 text-[13px] font-light">
            <p>
              last modified: <span className="font-medium">{getTime(idea?.created)}</span>
            </p>
            <p>
              created at: <span className="font-medium">{getTime(idea?.created)}</span>
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Detail;
