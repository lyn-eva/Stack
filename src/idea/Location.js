import { Icon } from '@iconify/react';

function Location({ editable, value, rename, Ref, handleChange, handleRename }) {
  return (
    <div
      className={`group relative mr-1 font-exo text-sm font-light sm:mt-0 sm:ml-6 sm:flex sm:items-center ${
        !editable ? 'w-[30%]' : ''
      }`}
    >
      {editable && (
        <button
          onClick={handleRename}
          className='absolute top-[3px] -left-4 sm:-left-[17px] sm:opacity-0 sm:group-hover:opacity-100 md:top-1 lg:top-[2px] lg:-left-5'
        >
          <Icon className='h-3 w-3 sm:h-[14px] sm:w-[14px] lg:h-4 lg:w-4' icon='fa6-solid:pencil' />
        </button>
      )}
      {rename ? (
        <>
          <div className='inline sm:block'>
            <label className='mr-1 font-normal sm:mr-3 sm:font-medium'>Line: </label>
            <input
              onChange={handleChange}
              value={value.line ?? ''}
              name='line'
              ref={Ref}
              maxLength='5'
              type='number'
              placeholder='69'
              className='text-md w-8 rounded-sm px-1 text-center lg:text-t-lg leading-4 text-black outline-none sm:w-14 sm:leading-5 md:leading-6'
            />
          </div>
          <div className='mt-3 ml-2 inline sm:mt-0 sm:block'>
            <label className='mr-1 font-medium sm:mx-3'>from: </label>
            <input
              onChange={handleChange}
              value={value.file ?? ''}
              name='file'
              maxLength='34'
              type='text'
              placeholder='CustomForm.js'
              className='text-md w-5/12 rounded-sm px-1 text-center lg:text-t-lg leading-4 text-black outline-none sm:w-[72%] sm:max-w-[17rem] sm:leading-5 md:leading-6'
            />
          </div>
        </>
      ) : (
        <p className='font-lighter flex justify-self-start truncate text-left font-roboto text-t-sm tracking-[.2px] sm:font-exo sm:text-sm'>
          {(value.line || editable) && (
            <>
              line <span className='mx-[3px] text-[#23dc41] sm:mx-2'>{value.line}</span>
            </>
          )}
          {(value.file || editable) && (
            <>
              at
              <span className='mr-[3px] ml-1 truncate text-[#1BF9F9] sm:mx-2'>{value.file}</span>
            </>
          )}
        </p>
      )}
    </div>
  );
}

export default Location;
