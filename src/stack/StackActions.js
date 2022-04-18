import { useReducer } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useDB } from "../context/dbProvider";
import Button from "../utility/Button";
import Iconify from "../utility/Iconify";
import Modal from "../utility/Modal";

const iconifyStyle = { "data-width": "14", style: { marginLeft: ".5rem" } };

const btnStyle = {
  padding: "2px 8px",
  borderRadius: "4px",
  letterSpacing: "1px",
};

const variant = {
  shrink: { scaleY: 0, opacity: 0, zIndex: -50, originY: 0 },
  expand: { scaleY: 1, opacity: 1, zIndex: 20, originY: 0 },
};

const optionProps = {
  tabIndex: 1,
  className:
    "cursor-pointer px-3 text-t-md py-[2px] sm:py-1 sm:text-t-lg sm:font-normal outline-1 hover:bg-blue-100 focus:outline",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SORT":
      return { ...state, filterIsActive: false, sortIsActive: !state.sortIsActive };
    case "FILTER":
      return { ...state, sortIsActive: false, filterIsActive: !state.filterIsActive };
    case "DELETE":
      return { ...state, deleteIsActive: !state.deleteIsActive }; 
    default:
      return state;
  }
};

function StackActions({ repoUrl, stackId, setAddIdea, setOrder, setFilter }) {
  const [state, dispatch] = useReducer(reducer, {});
  const navigate = useNavigate();
  const { deleteStack } = useDB();

  const handleDelete = async () => {
    await deleteStack(stackId);
    navigate(-1);
  };

  return (
    <>
      <ul id="stack-actions" className="mb-6 mt-4 flex flex-wrap gap-1 sm:mb-8 sm:gap-4">
        <li className="shrink-0">
          <a
            target="_blank"
            rel="noreferrer"
            href={repoUrl}
            className="inline-block bg-white font-roboto text-t-sm font-medium sm:text-t-md lg:text-t-lg"
            style={btnStyle}
          >
            go to repo
            <Iconify data-icon="ri:git-repository-line" {...iconifyStyle} />
          </a>
        </li>
        <li className="shrink-0">
          <Button onClick={() => setAddIdea((prev) => !prev)} style={btnStyle}>
            new idea
            <Iconify data-icon="ant-design:plus-outlined" {...iconifyStyle} />
          </Button>
        </li>
        <li className="relative shrink-0">
          <Button onClick={() => dispatch({type: 'FILTER', })} style={btnStyle}>
            filter
            <Iconify data-icon="bytesize:filter" {...iconifyStyle} />
          </Button>
          <motion.ul
            variants={variant}
            initial="shrink"
            animate={state.filterIsActive ? "expand" : "shrink"}
            onClick={() => dispatch({type: 'FILTER'})}
            className="absolute top-8 whitespace-nowrap rounded-sm bg-white py-1  shadow-md"
          >
            <li onClick={() => setFilter(2)} {...optionProps}>
              urgent
            </li>
            <li onClick={() => setFilter(1)} {...optionProps}>
              moderate
            </li>
            <li onClick={() => setFilter(0)} {...optionProps}>
              trivial
            </li>
            <li onClick={() => setFilter(-1)} {...optionProps}>
              remove filter
            </li>
          </motion.ul>
        </li>
        <li className="relative shrink-0">
          <Button onClick={() => dispatch({type: 'SORT'})} style={btnStyle}>
            sort
            <Iconify data-icon="cil:sort-descending" {...iconifyStyle} />
          </Button>
          <motion.ul
            variants={variant}
            initial="shrink"
            animate={state.sortIsActive ? "expand" : "shrink"}
            onClick={() => dispatch({type: 'SORT'})}
            className="absolute top-8 rounded-sm bg-white py-1 shadow-md"
          >
            <li onClick={() => setOrder("level")} {...optionProps}>
              level
            </li>
            <li onClick={() => setOrder("created")} {...optionProps}>
              latest
            </li>
            <li onClick={() => setOrder("title_uppercase")} {...optionProps}>
              alphabetically
            </li>
          </motion.ul>
        </li>
        <li className="shrink-0  sm:ml-auto">
          <Button
            onClick={() =>  dispatch({type: 'DELETE'})}
            style={{ ...btnStyle, backgroundColor: "#f00", color: "#fff" }}
          >
            <span className="hidden sm:inline">Delete</span>{" "}
            <Iconify style={{ marginTop: "-1px" }} data-icon="ion:trash-outline" />
          </Button>
        </li>
      </ul>
      <AnimatePresence>
        {state.deleteIsActive && (
          <Modal
            handleDelete={handleDelete}
            handleToggle={() =>  dispatch({type: 'DELETE'})}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default StackActions;