import React from "react";

function Idea({ no, idea, line, file }) {
  return (
    <li className="bg-bg-soft-gray rounded-md text-white mb-3">
      <div className="bg-bg-darker shadow-l2 font-lato flex justify-between items-center rounded-md px-6 py-3">
        <p className='font-lighter text-lg tracking-wide'>
          <span className="font-bold mr-4">{no}.</span> {idea}
        </p>
        <p className="font-exo font-light text-sm">
          line <span className='text-[#23dc41]'>{line}</span> from <span className='text-[#1BF9F9]'>{file}</span>
        </p>
      </div>
    </li>
  );
}

export default Idea;
