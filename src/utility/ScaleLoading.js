function ScaleLoading() {
  return (
    <div className='flex gap-2 items-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
      <span className='scale-loading-bar w-1 h-6'></span>
      <span className='scale-loading-bar w-1 h-8'></span>
      <span className='scale-loading-bar w-1 h-6'></span>
    </div>
  );
}

export default ScaleLoading;
