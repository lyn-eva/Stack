import { useState, useRef } from "react";

function EnhancedFormField({ Original, initial, dispatchForm, custom, type, editable = false }) {
  const [value, setValue] = useState(custom ?? "");
  const [rename, setRename] = useState(initial);
  const ref = useRef(null);

  const handleRename = () => {
    setRename((prev) => !prev);
    setTimeout(() => ref.current.focus(), 0);
  };

  const handleChange = (e) => {
    const result = custom
      ? { ...value, [e.target.name]: e.target.value }
      : e.target.value;

    setValue(result);
    if (!dispatchForm) return;
    dispatchForm({ type: type, value: result });
  };

  return (
    <Original
      editable={editable}
      value={value}
      rename={rename}
      handleRename={handleRename}
      handleChange={handleChange}
    />
  );
}

export default EnhancedFormField;