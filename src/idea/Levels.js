import { useState } from "react";

const options = [
  { color: "bg-green-600", level: "trivial", selected: false },
  { color: "bg-blue-700", level: "moderate", selected: false },
  { color: "bg-red-700", level: "urgent", selected: false },
];

function Levels({initial}) {
  console.log(initial)
  const [selected, setSelected] = useState(initial ? 'trivial' : '');

  return (
    <div className=" gap-3 flex items-center">
      {options.map((option) => {
        return (
          <button
            key={option.level}
            id={option.level}
            onClick={(e) => setSelected(option.level)}
            className={
              "font-normal pb-[2px] text-[14px] tracking-wide underline underline-offset-1 px-2 rounded-sm " +
              (selected === option.level ? option.color : "")
            }
          >
            {option.level}
          </button>
        );
      })}
    </div>
  );
}

export default Levels;
