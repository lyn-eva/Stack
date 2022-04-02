import React from "react";
import Wrapper from "../utility/Wrapper";

const tags = ["HTML", "CSS", "BOOTSTRAP"];

const Tags = () => (
  <div className="p-2 flex gap-3 items-center">
    {tags.map((tag) => (
      <span key={tag} className="bg-white px-2 rounded-sm">{tag}</span>
    ))}
  </div>
);

function RepoFrame() {
  return (
    <Wrapper className='shadow-l2'>
      <img
        className="w-full rounded-md"
        src="https://opengraph.githubassets.com/420b332eb627556905a9ddc13f97481a71d0a4972e834f43f79734558c/lyn-eva/lyn-eva"
        alt="github"
      />
      <Tags />
    </Wrapper>
  );
}

export default RepoFrame;
