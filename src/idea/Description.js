import{useState} from "react";

function Description({ bold, initial, dispatchForm }) {
  const [descr, setDescr] = useState('');

  const handleChange = e => {
    setDescr(e.target.value)
    if (!dispatchForm) return;
    dispatchForm({type: 'DESCRIPTION', value: e.target.value});
  }

  return (
    <div className="">
      <label className={bold}>Description: </label>
      <hr />
      <textarea
        onChange={handleChange}
        value={descr}
        placeholder="description"
        className={`${initial ? 'bg-white text-black' : 'bg-transparent'} block mt-3 w-full h-24 rounded-sm px-1 outline-none`}
      />
    </div>
  );
}

export default Description;
