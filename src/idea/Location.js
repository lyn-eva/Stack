import Iconify from "../utility/Iconify";

function Location({ editable, value, rename, Ref, handleChange, handleRename }) {
  return (
    <div
      className={`group mr-1 relative font-exo text-sm font-light sm:mt-0 sm:flex sm:items-center sm:pl-6 ${
        !editable ? "w-[30%]" : ""
      }`}
    >
      {editable && (
        <button
          onClick={handleRename}
          className="absolute top-0 -left-4 sm:left-0 sm:opacity-0 sm:group-hover:opacity-100"
        >
          <Iconify data-width={13} data-icon="fa6-solid:pencil" />
        </button>
      )}
      {rename ? (
        <>
          <div className='inline sm:block'>
            <label className="mr-1 font-normal sm:mr-3 sm:font-medium">Line: </label>
            <input
              onChange={handleChange}
              value={value.line ?? ""}
              name="line"
              ref={Ref}
              maxLength="5"
              type="number"
              placeholder="69"
              className="text-md w-8 rounded-sm px-1 text-center text-black outline-none sm:w-14"
            />
          </div>
          <div className="mt-3 ml-2 inline sm:mt-0 sm:block">
            <label className="mr-1 font-medium sm:mx-3">from: </label>
            <input
              onChange={handleChange}
              value={value.file ?? ""}
              name="file"
              maxLength="34"
              type="text"
              placeholder="CustomForm.js"
              className="text-md w-5/12 rounded-sm px-1 text-center text-black outline-none sm:w-[72%] sm:max-w-[17rem]"
            />
          </div>
        </>
      ) : (
        <p className="font-lighter flex text-left font-roboto text-t-sm tracking-[.2px] sm:font-exo sm:text-sm">
          {(value.line || editable) && (
            <>
              line <span className="mx-[3px] text-[#23dc41] sm:mx-2">{value.line}</span>
            </>
          )}
          {(value.file || editable) && (
            <>
              at{" "}
              <span className="mx-[3px] truncate text-[#1BF9F9] sm:mx-2">
                {value.file}
              </span>
            </>
          )}
        </p>
      )}
    </div>
  );
}

export default Location;
