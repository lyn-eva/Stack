import { useState, useEffect } from "react";

const options = [
  { color: "bg-green-600", level: "trivial" },
  { color: "bg-blue-700", level: "moderate" },
  { color: "bg-red-600", level: "urgent" },
];

function Levels({ initial, dispatchForm }) {
  const [level, setLevel] = useState(initial);

  useEffect(() => {
    if (!dispatchForm) return;
    dispatchForm({ type: "LEVEL", value: level });
  }, [level]);

  return (
    <div className="mb-3 sm:mb-0 gap-3 flex items-center">
      {options.map((option, i) => {
        return (
          <button
            key={option.level}
            id={option.level}
            onClick={() => setLevel(i)}
            className={
              "font-light sm:font-normal pt-[1px] pb-[3px] text-t-sm sm:text-t-md tracking-wide underline underline-offset-1 px-1 sm:px-2 rounded-sm " +
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
