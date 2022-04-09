import { useReducer } from "react";
import { useDB } from "../context/dbProvider";
import Button from "../utility/Button";
import Iconify from "../utility/Iconify";
import Detail from "./Detail";

const actionStyle = {
  color: "#fff",
  padding: "5px 1rem",
  width: "7rem",
  marginRight: "1rem",
};

const initialForm = {
  title: "",
  description: "",
  level: "",
  location: {},
};

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

export function AddIdeaForm({ stackId, setAddIdea, btnStyle, iconifyData }) {
  const [formState, dispatch] = useReducer(reducer, initialForm);
  const { createIdea } = useDB();

  const handleIdeaForm = async () => {
    await createIdea(formState, stackId);
    setAddIdea(false);
  };

  return (
    <li>
      <Detail isForm={true} dispatchForm={dispatch} />
      <div className="mt-2">
        <Button
          onClick={handleIdeaForm}
          style={{
            ...btnStyle,
            ...actionStyle,
            backgroundColor: "#0000ff",
          }}
        >
          Add
          <Iconify data-icon="ant-design:plus-outlined" {...iconifyData} />
        </Button>
        <Button
          onClick={() => setAddIdea(false)}
          style={{
            ...btnStyle,
            ...actionStyle,
            backgroundColor: "#ff0000",
          }}
        >
          Cancel
          <Iconify data-icon="akar-icons:cross" {...iconifyData} />
        </Button>
      </div>
    </li>
  );
}
