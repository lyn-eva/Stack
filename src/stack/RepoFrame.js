import React from "react";

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
    <div className="bg-bg-soft-gray rounded-md overflow-hidden">
      <img
        className="w-full"
        src="https://opengraph.githubassets.com/420b332eb627556905a9ddc13f97481a71d0a4972e834f43f79734558c/lyn-eva/lyn-eva"
        alt="github"
      />
      <Tags />
    </div>
  );
}

export default RepoFrame;
