import { useState, useEffect } from "react";
import useDevice from "../custom-hook/useDevice";
import Wrapper from "../utility/Wrapper";

const variant = {
  expand: {
    height: "auto",
  },
  shrink: {
    height: 0,
  },
};

const shouldExpand = (device) => (device === "mobile" ? false : true);

function EnhancedDetailCard({ Render, className, props }) {
  const device = useDevice();
  const [expand, setExpand] = useState(shouldExpand(device));

  useEffect(() => {
    setExpand(shouldExpand(device));
  }, [device]);

  return (
    <Wrapper
      onClick={() => setExpand((prev) => !prev)}
      className={className || `${expand ? "pb-3" : ""} group relative mb-3 px-4 pt-2 font-lato text-white shadow-l2 sm:mb-5 sm:p-4 sm:pb-2`}
    >
      <Render expand={expand} variant={variant} {...props}/>
    </Wrapper>
  );
}

export default EnhancedDetailCard;
