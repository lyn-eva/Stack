const options = ['bg-green-600', 'bg-u-blue', 'bg-[#fa0505]'];

function Dues({ dues }) {
  <ul className='mt-3 text-black'>
    {!dues?.length && <p className='mt-5 text-center text-text-gray'>there's no due :)</p>}
    {dues?.map(({ id, level, title }) => (
      <div
        key={id}
        className='text-normal relative mt-2 min-h-[2rem] truncate rounded-sm bg-white px-4 py-[5px]'
      >
        <span
          className={`${options[level]} absolute top-0 right-0 h-[5px] w-24 rounded-tr-sm`}
        ></span>
        {title}
      </div>
    ))}
  </ul>;
}
export default Dues;
