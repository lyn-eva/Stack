import { useState } from "react";
import { useDB } from "../context/dbProvider";
import Button from "../utility/Button";
import Iconify from "../utility/Iconify";
import Idea from "../idea/Idea";
import MoreDetail from "../idea/MoreDetail";
import Detail from "../idea/Detail";

const btnStyle = {
  fontSize: "14px",
  padding: "2px 8px",
  borderRadius: "4px",
  letterSpacing: "1px",
};
const iconifyData = { "data-width": "14", style: { marginLeft: ".5rem" } };

const ideas = [
  { no: 1, idea: "remove unused code", line: "46", file: "Sidebar.js" },
  // {no: 2, idea: "remove unused code", line: "46", file: "Sidebar.js"},
  // {no: 3, idea: "remove unused code", line: "46", file: "Sidebar.js"},
];

function StackSection({ stackId }) {
  const [addIdea, setAddIdea] = useState(false);
  const { stacks } = useDB();

  const handleAddIdea = () => {
    setAddIdea(false);
  };

  return (
    <section className="w-full">
      <h2 className="font-lato text-white font-medium text-2xl mb-2 leading-5">
        Your stack
      </h2>
      <hr />
      <ul className="flex gap-4 mt-4">
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href={stacks[stackId]?.url}
            className="bg-white inline-block font-roboto font-medium"
            style={btnStyle}
          >
            go to repo
            <Iconify data-icon="ri:git-repository-line" {...iconifyData} />
          </a>
        </li>
        <li>
          <Button onClick={() => setAddIdea(true)} style={btnStyle}>
            new idea
            <Iconify data-icon="ant-design:plus-outlined" {...iconifyData} />
          </Button>
        </li>
        <li>
          <Button style={btnStyle}>
            filter
            <Iconify data-icon="bytesize:filter" {...iconifyData} />
          </Button>
        </li>
        <li>
          <Button style={btnStyle}>
            sort
            <Iconify data-icon="cil:sort-descending" {...iconifyData} />
          </Button>
        </li>
      </ul>
      <ul className="mt-4 flex flex-col gap-5">
        {addIdea && (
          <AddIdeaForm
            handleAddIdea={handleAddIdea}
            btnStyle={btnStyle}
            iconifyData={iconifyData}
            setAddIdea={setAddIdea}
          />
        )}
        {ideas.map((stack) => (
          <Idea key={stack.no} {...stack} />
        ))}
      </ul>
    </section>
  );
}

export default StackSection;

function AddIdeaForm({ handleAddIdea, btnStyle, iconifyData, setAddIdea }) {
  return (
    <li>
      <Detail initial={true}/>
      <div className="mt-2">
        <Button
          onClick={handleAddIdea}
          style={{
            ...btnStyle,
            backgroundColor: "#0000ff",
            color: "#fff",
            padding: "5px 1rem",
            width: "7rem",
          }}
        >
          Add
          <Iconify data-icon="ant-design:plus-outlined" {...iconifyData} />
        </Button>
        <Button
          onClick={() => setAddIdea(false)}
          style={{
            ...btnStyle,
            backgroundColor: "#ff0000",
            color: "#fff",
            padding: "5px 1rem",
            width: "7rem",
            marginLeft: "1rem",
          }}
        >
          Cancel
          <Iconify data-icon="akar-icons:cross" {...iconifyData} />
        </Button>
      </div>
    </li>
  );
}
