import Iconify from "../utility/Iconify";

function Description({ value, rename, ref, handleRename, handleChange }) {

  return (
    <div className="relative group">
      <label className="font-exo font-semibold text-[1rem] text-gray-300 tracking-wide mr-3">Description: </label>
      <button
          onClick={handleRename}
          className="absolute top-0 left-26 opacity-0 group-hover:opacity-100"
        >
          <Iconify data-width={13} data-icon="fa6-solid:pencil" />
        </button>
      <hr />
      <textarea
        onChange={handleChange}
        value={value}
        disabled={!rename}
        ref={ref}
        placeholder="description"
        className={`${rename ? 'bg-white text-black' : 'bg-transparent'} text-[1.1rem] block mt-3 w-full h-24 rounded-sm px-1 outline-none`}
      />
    </div>
  );
}

export default Description;
