import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useDB } from "../context/dbProvider";
import Button from "../utility/Button";
import Iconify from "../utility/Iconify";
import Modal from "../utility/Modal";

const iconifyStyle = { "data-width": "14", style: { marginLeft: ".5rem" } };

const btnStyle = {
  fontSize: "14px",
  padding: "2px 8px",
  borderRadius: "4px",
  letterSpacing: "1px",
};

const variant = {
  shrink: {scaleY: 0, opacity: 0, zIndex: -50, originY: 0},
  expand: {scaleY: 1, opacity: 1, zIndex: 10, originY: 0},
}

const optionAttr = {
  tabIndex: 1,
  className: "cursor-pointer px-3 py-1 outline-1 hover:bg-blue-100 focus:outline",
};

function StackActions({ repoUrl, stackId, setAddIdea, setOrder, setFilter }) {
  const [sortIsOpen, setSortIsOpen] = useState(false);
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const navigate = useNavigate();
  const { deleteStack } = useDB();

  const closeAll = (type, fn) => {
    type === "filter" ? setSortIsOpen(false) : setFilterIsOpen(false);
    fn((prev) => !prev);
  };

  const handleClick = () => {
    setSortIsOpen(false);
    setFilterIsOpen(false);
  };

  const handleDelete = async () => {
    await deleteStack(stackId)
    navigate(-1);
  };

  return (
    <>
      <ul className="mt-4 mb-8 flex gap-4">
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href={repoUrl}
            className="inline-block bg-white font-roboto font-medium"
            style={btnStyle}
          >go to repo<Iconify data-icon="ri:git-repository-line" {...iconifyStyle} /></a>
        </li>
        <li>
          <Button onClick={() => setAddIdea((prev) => !prev)} style={btnStyle}>new idea<Iconify data-icon="ant-design:plus-outlined" {...iconifyStyle} /></Button>
        </li>
        <li className="relative">
          <Button onClick={() => closeAll("filter", setFilterIsOpen)} style={btnStyle}>
            filter
            <Iconify data-icon="bytesize:filter" {...iconifyStyle} />
          </Button>
          <motion.ul
            variants={variant}
            initial='shrink'
            animate={filterIsOpen ? 'expand': 'shrink'}
            onClick={handleClick}
            className='absolute top-8 whitespace-nowrap rounded-sm bg-white py-1  shadow-md'
          >
            <li onClick={() => setFilter(2)} {...optionAttr}>urgent</li>
            <li onClick={() => setFilter(1)} {...optionAttr}>moderate</li>
            <li onClick={() => setFilter(0)} {...optionAttr}>trivial</li>
            <li onClick={() => setFilter(-1)} {...optionAttr}>remove filter</li>
          </motion.ul>
        </li>
        <li className="relative">
          <Button onClick={() => closeAll("sort", setSortIsOpen)} style={btnStyle}>
            sort
            <Iconify data-icon="cil:sort-descending" {...iconifyStyle} />
          </Button>
          <motion.ul
            variants={variant}
            initial='shrink'
            animate={sortIsOpen ? 'expand': 'shrink'}
            onClick={handleClick}
            className='absolute top-8 rounded-sm bg-white py-1 shadow-md'
          >
            <li onClick={() => setOrder("level")} {...optionAttr}>level</li>
            <li onClick={() => setOrder("created")} {...optionAttr}>latest</li>
            <li onClick={() => setOrder("title_uppercase")} {...optionAttr}>alphabetically</li>
          </motion.ul>
        </li>
        <li className="ml-auto">
          <Button
            onClick={() => setToggleDelete(true)}
            style={{ ...btnStyle, backgroundColor: "#f00", color: "#fff" }}
          >
            Delete <Iconify style={{ marginTop: "-1px" }} data-icon="ion:trash-outline" />
          </Button>
        </li>
      </ul>
      <AnimatePresence>
        {toggleDelete && <Modal handleDelete={handleDelete} handleToggle={() => setToggleDelete(false)} />}
      </AnimatePresence>
    </>
  );
}

export default StackActions;
