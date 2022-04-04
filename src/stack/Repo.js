import RepoFrame from "./RepoFrame";

const dues = [
  { txt: "remove unused code", clr: "#f00" },
  { txt: "extarct into new component", clr: "#0f0" },
  { txt: "add more comments", clr: "#00f" },
];

const Dues = () => (
  <ul className="text-black mt-3">
    {dues.map(({ txt, clr }) => (
      <div key={txt} className="bg-white mt-2 rounded-sm px-4 py-[5px] relative">
        <span
          className="absolute top-0 left-0 rounded-sm rounded-bl-none h-[5px] w-24"
          style={{ backgroundColor: clr}}
        ></span>
        {txt}
      </div>
    ))}
  </ul>
);

function Repo({name}) {
  return (
    <div className="bg-bg-dark w-[20rem] rounded-md">
      <RepoFrame name={name}/>
      <div className="p-6 text-white font-roboto">
        <h2 className="font-medium mb-1">Latest dues</h2>
        <hr />
        <Dues />
      </div>
    </div>
  );
}

export default Repo;
