import { Icon } from '@iconify/react';
function Description({ value, rename, Ref, handleRename, handleChange, handleKeyDown }) {
  return (
    <div className='group relative'>
      <label className='mr-3 font-exo text-t-md font-semibold tracking-wide text-gray-300 sm:text-t-lg'>
        Description:
      </label>
      <hr />
      <textarea
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={value}
        disabled={!rename}
        ref={Ref}
        placeholder='description'
        className={`${
          rename ? 'bg-white text-black' : 'bg-transparent'
        } mt-2 block h-auto w-full rounded-sm px-1 text-t-md font-light leading-5 outline-none sm:text-[1.1rem] sm:leading-6 md:font-normal`}
      />
      <button
        onClick={handleRename}
        className='absolute top-2 -left-4 sm:top-[5px] sm:-left-5 sm:opacity-0 sm:group-hover:opacity-100'
      >
        <Icon className='h-3 w-3 sm:h-[14px] sm:w-[14px] lg:h-4 lg:w-4' icon='fa6-solid:pencil' />
      </button>
    </div>
  );
}

export default Description;
