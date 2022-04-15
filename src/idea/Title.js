import Iconify from "../utility/Iconify";

function Title({ value, rename, Ref, handleChange, handleRename }) {

  return (
    <div className="flex items-center mb-2 relative pr-6 group">
      <label className={"font-exo self-start font-semibold text-[1rem] tracking-wide mr-3 pt-[3px] text-gray-300"}>Title: </label>
      <textarea
        onChange={handleChange}
        disabled={!rename}
        value={value}
        type="text"
        ref={Ref}
        placeholder="title"
        rows='1'
        className={`${
          rename ? "bg-white text-black" : "bg-transparent"
        } font-normal text-lg rounded-sm px-2 w-full text-md outline-none tracking-wide`}
      />
      <button
        onClick={handleRename}
        className="absolute -top-[1px] -left-9 ml-4 opacity-0 group-hover:opacity-100"
      >
        <Iconify data-width={13} data-icon="fa6-solid:pencil" />
      </button>
    </div>
  );
}

export default Title;
