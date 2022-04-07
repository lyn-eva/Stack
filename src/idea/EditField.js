import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";

function EditField({ VALUE }, ref) {
  const [rename, setRename] = useState(false);
  const [height, setHeight] = useState(40);
  const [value, setValue] = useState(VALUE);
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    setRename,
  }));

  useEffect(() => {
    setHeight(inputRef.current.scrollHeight);
    if (!rename) return;
    setTimeout(inputRef.current.focus(), 0);
    console.log('in')
  }, [rename]);
  
  
  const handleChange = (e) => {
    setValue(e.target.value);
    setHeight(inputRef.current.scrollHeight);
  };
  
  const handleRenamed = () =>{
    setHeight(inputRef.current.scrollHeight);
    setRename(false);
  }

  return (
    <div className="py-1 relative outline-2 outline-cyan-500 outlin">
      <textarea
        value={value}
        onChange={handleChange}
        onBlur={handleRenamed}
        className={`w-full -z-10 bg-gray-700 -outline-offset-1 resize-none px-1 mt-1 font-roboto font-light text-[1rem]`}
        ref={inputRef}
        type="text"
        style={{height}}
      />
      <p className={`${rename ? '-z-10': 'z-10'} whitespace-pre-wrap h-full p-1 mt-1 font-roboto font-light text-[1rem] absolute top-0 bg-bg-soft-gray`}>
        {value}
      </p>
    </div>
  );
}

export default forwardRef(EditField);
