import { useState, useRef } from "react";

function EnhancedFormField({ Render, initial, isForm, dispatchForm, custom, type, editable = false }) {
  const [value, setValue] = useState(initial);
  const [rename, setRename] = useState(isForm);
  const ref = useRef(null);

  const handleRename = () => {
    setRename((prev) => !prev);
    setTimeout(() => ref.current.focus(), 0);
  };

  const handleChange = (e) => {
    const result = custom? { ...value, [e.target.name]: e.target.value }: e.target.value;
    setValue(result);
    if (!dispatchForm) return;
    dispatchForm({ type: type, value: result });
  };

  return (
    <Render
      editable={editable}
      value={value}
      rename={rename}
      Ref={ref}
      handleRename={handleRename}
      handleChange={handleChange}
    />
  );
}

export default EnhancedFormField;
