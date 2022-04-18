import Iconify from "../utility/Iconify";

function Description({ value, rename, Ref, handleRename, handleChange, handleKeyDown }) {

  return (
    <div className="relative group">
      <label className="font-exo font-semibold text-t-md sm:text-t-lg text-gray-300 tracking-wide mr-3">Description: </label>
      <hr />
      <textarea
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={value}
        disabled={!rename}
        ref={Ref}
        placeholder="description"
        className={`${rename ? 'bg-white text-black' : 'bg-transparent'} leading-5 sm:leading-6 text-t-md sm:text-[1.1rem] font-light block mt-2 sm:mt-3 w-full h-auto rounded-sm px-1 outline-none`}
      />
      <button
          onClick={handleRename}
          className="absolute sm:-top-[2px] top-0 -left-4 sm:-left-5 sm:opacity-0 sm:group-hover:opacity-100"
        >
          <Iconify data-width={13} data-icon="fa6-solid:pencil" />
        </button>
    </div>
  );
}

export default Description;
