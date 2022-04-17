import { useReducer, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getLastModified } from "../utility/datetime";
import { useDB } from "../context/dbProvider";
import Description from "./Description";
import Title from "./Title";
import Levels from "./Levels";
import Location from "./Location";
import EnhancedFormField from "../renderProp/EnhancedFormField";
import Iconify from "../utility/Iconify";
import Modal from "../utility/Modal";

const variant = {
  expand: {
    height: "auto",
    opacity: 1,
    paddingBlock: ".8rem",
    transition: { type: 'tween'},
  },
  shrink: {
    height: 0,
    opacity: 0,
    paddingBlock: 0,
    transition: { type: 'tween' },
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TITLE":
      return { ...state, title: action.value, title_uppercase: action.value.toUpperCase() };
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
    title_uppercase: idea?.title.toUpperCase() ?? "",
    description: idea?.description ?? "",
    level: idea?.level ?? 0,
    location: idea?.location ?? {},
  };

  const [formState, dispatch] = useReducer(reducer, initialForm);
  const { createIdea, updateIdea, deleteIdea } = useDB();
  const [onDelete, setOnDelete] = useState(false);

  const modified = getLastModified(idea?.modified.toMillis());
  const created = getLastModified(idea?.created.toMillis());

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
        transition={{duration: .5}}
        className="!mb-4 relative overflow-hidden rounded-md bg-bg-soft-gray px-5 sm:px-7 text-white"
      >
        <EnhancedFormField
          Render={Title}
          initial={formState.title}
          type="TITLE"
          isForm={isForm}
          dispatchForm={dispatch}
        />
        <EnhancedFormField
          Render={Description}
          initial={formState.description}
          type="DESCRIPTION"
          isForm={isForm}
          dispatchForm={dispatch}
        />
        <div className="mt-4 mb-1 sm:flex flex-wrap items-center justify-between gap-4">
          <Levels isForm={isForm} initial={formState.level} dispatchForm={dispatch} />
          <EnhancedFormField
            Render={Location}
            initial={formState.location}
            type="LOCATION"
            editable
            custom={true}
            isForm={isForm}
            dispatchForm={dispatch}
          />
        </div>
        <hr />
        <div className='flex flex-col-reverse sm:flex-row justify-between sm:items-center mt-2'>
          <div className="flex gap-5 sm:text-t-lg mt-2 sm:mt-0">
            <button onClick={handleSave} className="text-green-500">
              save changes{" "}
              <Iconify
                style={{ marginTop: "-2px" }}
                data-icon="ant-design:check-outlined"
              />
            </button>
            <button
              onClick={handleExpand}
              className="text-red-500"
            >
              cancel{" "}
              <Iconify style={{ marginTop: "-1px" }} data-icon="akar-icons:cross" />
            </button>
          </div>
          <div className="sm:flex gap-5 text-[13px] font-light">
            <p>
              last modified: <span className="font-medium">{modified}</span>
            </p>
            <p>
              created at: <span className="font-medium tracking-wide">{created}</span>
            </p>
          </div>
        </div>
        <button onClick={handleDelete} className='absolute top-3 right-5 text-[#f00]'><Iconify data-icon='fa6-solid:trash-can'/></button>
      </motion.div>
    </>
  );
}

export default Detail;
