import Iconify from "../utility/Iconify";

function Title({ value, rename, Ref, handleChange, handleRename }) {
  return (
    <div className="group relative mb-2 flex items-center pr-6">
      <label
        className={
          "self-start pt-[2px] font-exo text-t-md font-semibold tracking-wide text-gray-300 sm:mr-3 sm:text-t-lg"
        }
      >
        Title:
      </label>
      <textarea
        onChange={handleChange}
        disabled={!rename}
        value={value}
        type="text"
        ref={Ref}
        placeholder="title"
        rows="1"
        className={`${
          rename ? "bg-white text-black" : "bg-transparent"
        } w-full rounded-sm px-2 text-t-md font-light leading-5 tracking-wide outline-none sm:text-lg sm:font-normal sm:leading-none`}
      />
      <button
        onClick={handleRename}
        className="absolute -left-8 ml-4 text-t-sm sm:-top-[1px] sm:-left-9  sm:opacity-0 sm:group-hover:opacity-100"
      >
        <Iconify data-width={13} data-icon="fa6-solid:pencil" />
      </button>
    </div>
  );
}

export default Title;
