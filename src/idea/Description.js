import Iconify from "../utility/Iconify";

function Description({ value, rename, Ref, handleRename, handleChange, handleKeyDown }) {

  return (
    <div className="relative group">
      <label className="font-exo font-semibold text-[1rem] text-gray-300 tracking-wide mr-3">Description: </label>
      <hr />
      <textarea
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={value}
        disabled={!rename}
        ref={Ref}
        placeholder="description"
        className={`${rename ? 'bg-white text-black' : 'bg-transparent'} text-[1.1rem] block mt-3 w-full h-auto rounded-sm px-1 outline-none`}
      />
      <button
          onClick={handleRename}
          className="absolute -top-[2px] -left-5 opacity-0 group-hover:opacity-100"
        >
          <Iconify data-width={13} data-icon="fa6-solid:pencil" />
        </button>
    </div>
  );
}

export default Description;
