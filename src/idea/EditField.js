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
  }, [inputRef]);

  
  const handleChange = (e) => {
    setValue(e.target.value);
    setHeight(inputRef.current.scrollHeight);
  };

  const handleKeyDown = e => {
    console.log(e.key)
  }


  return (
    <div className="py-1 relative">
      <textarea
        value={value}
        onChange={handleChange}
        // onBlur={handleRenamed}
        onKeyDown={handleKeyDown}
        className="w-full overflow-hidden bg-gray-700 resize-none px-1 font-light text-[1.05rem]"
        ref={inputRef}
        type="text"
        style={{height, maxHeight: 'fit-content'}}
        // autoFocus
      />
      <p className="px-1 font-light text-[1.05rem] absolute -top-40 bg-bg-soft-gray">
        {value}
      </p>
    </div>
  );
}

export default forwardRef(EditField);
