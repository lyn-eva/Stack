import React from "react";
import Button from "../utility/Button";
import Iconify from "../utility/Iconify";

const iconifyStyle = { "data-width": "14", style: { marginLeft: ".5rem" } };

const btnStyle = {
  fontSize: "14px",
  padding: "2px 8px",
  borderRadius: "4px",
  letterSpacing: "1px",
};

function StackActions({ setAddIdea, setOrder, repoUrl }) {
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
      <li>
        <Button style={btnStyle}>
          filter
          <Iconify data-icon="bytesize:filter" {...iconifyStyle} />
        </Button>
      </li>
      <li className="group relative">
        <Button style={btnStyle}>
          sort
          <Iconify data-icon="cil:sort-descending" {...iconifyStyle} />
        </Button>
        <ul className="absolute top-8 -z-10 rounded-sm bg-white py-1 opacity-0 shadow-md group-focus-within:z-10 duration-[600ms] group-focus-within:opacity-100">
          <li
            onClick={() => setOrder("level")}
            className="cursor-pointer px-3 py-1 hover:bg-blue-100"
          >
            level
          </li>
          <li
            onClick={() => setOrder("created")}
            className="cursor-pointer px-3 py-1 hover:bg-blue-100"
          >
            latest
          </li>
          <li
            onClick={() => setOrder("title_i")}
            className="cursor-pointer px-3 py-1 hover:bg-blue-100"
          >
            alphabetically
          </li>
        </ul>
      </li>
    </ul>
  );
}

export default StackActions;
