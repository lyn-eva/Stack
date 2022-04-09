import { useState, useEffect } from "react";

const options = [
  { color: "bg-green-600", level: "trivial", selected: false },
  { color: "bg-blue-700", level: "moderate", selected: false },
  { color: "bg-red-700", level: "urgent", selected: false },
];

function Levels({initial, isForm, dispatchForm}) {
  const [level, setLevel] = useState(isForm ? 0 : initial);

  useEffect(() => {
    if (!dispatchForm) return;
    dispatchForm({type: 'LEVEL', value: level})
  }, [level])
  

  return (
    <div className=" gap-3 flex items-center">
      {options.map((option, i) => {
        return (
          <button
            key={option.level}
            id={option.level}
            onClick={() => setLevel(i)}
            className={
              "font-normal pb-[2px] text-[14px] tracking-wide underline underline-offset-1 px-2 rounded-sm " +
              (i === level ? option.color : "")
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
