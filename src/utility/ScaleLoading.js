function ScaleLoading() {
  return (
    <div className='mt-8 flex gap-2 items-center absolute top-[max(50%,5rem)] left-1/2 -translate-x-1/2'>
      <span className='scale-loading-bar w-1 h-6'></span>
      <span className='scale-loading-bar w-1 h-8'></span>
      <span className='scale-loading-bar w-1 h-6'></span>
    </div>
  );
}

export default ScaleLoading;
