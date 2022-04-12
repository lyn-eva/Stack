import { useState } from "react";
import Button from "../utility/Button";
import Iconify from "../utility/Iconify";

const iconifyStyle = { "data-width": "14", style: { marginLeft: ".5rem" } };

const btnStyle = {
  fontSize: "14px",
  padding: "2px 8px",
  borderRadius: "4px",
  letterSpacing: "1px",
};

const optionAttr = {
  tabIndex: 1,
  className: "cursor-pointer px-3 py-1 outline-1 hover:bg-blue-100 focus:outline",
};

function StackActions({ repoUrl, setAddIdea, setOrder, setFilter }) {
  const [sortIsOpen, setSortIsOpen] = useState(false);
  const [filterIsOpen, setFilterIsOpen] = useState(false);

  const closeAll = (type, fn) => {
    type === "filter" ? setSortIsOpen(false) : setFilterIsOpen(false);
    fn((prev) => !prev);
  };

  const handleClick = () => {
    setSortIsOpen(false);
    setFilterIsOpen(false);
  }

  return (
    <ul className="mt-4 flex gap-4">
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href={repoUrl}
          className="inline-block bg-white font-roboto font-medium"
          style={btnStyle}
        >
          go to repo
          <Iconify data-icon="ri:git-repository-line" {...iconifyStyle} />
        </a>
      </li>
      <li>
        <Button onClick={() => setAddIdea(true)} style={btnStyle}>
          new idea
          <Iconify data-icon="ant-design:plus-outlined" {...iconifyStyle} />
        </Button>
      </li>
      <li className="relative">
        <Button onClick={() => closeAll("filter", setFilterIsOpen)} style={btnStyle}>
          filter
          <Iconify data-icon="bytesize:filter" {...iconifyStyle} />
        </Button>
        <ul
          onClick={handleClick}
          className={`${
            filterIsOpen ? "opacity-100 z-10" : "opacity-0 -z-50"
          } absolute top-8 whitespace-nowrap rounded-sm bg-white py-1  shadow-md`}
          >
          <li onClick={() => setFilter(2)} {...optionAttr}> urgent </li>
          <li onClick={() => setFilter(1)} {...optionAttr}> moderate </li>
          <li onClick={() => setFilter(0)} {...optionAttr}> trivial </li>
          <li onClick={() => setFilter(-1)} {...optionAttr}> remove filter</li>
        </ul>
      </li>
      <li className="relative">
        <Button onClick={() => closeAll("sort", setSortIsOpen)} style={btnStyle}>
          sort
          <Iconify data-icon="cil:sort-descending" {...iconifyStyle} />
        </Button>
        <ul
          onClick={handleClick}
          className={`${
            sortIsOpen ? "opacity-100 z-10" : "opacity-0 -z-50"
          } absolute top-8 rounded-sm bg-white py-1 shadow-md`}
        >
          <li onClick={() => setOrder("level")} {...optionAttr}> level </li>
          <li onClick={() => setOrder("created")} {...optionAttr}> latest </li>
          <li onClick={() => setOrder("title_i")} {...optionAttr}> alphabetically </li>
        </ul>
      </li>
    </ul>
  );
}

export default StackActions;
