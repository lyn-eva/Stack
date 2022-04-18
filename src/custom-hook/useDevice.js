import { useEffect, useState } from "react";

const identify = (width) => {
  return width < 640
    ? "mobile"
    : width > 640 && width < 768
    ? "tablet"
    : width > 768 && width < 1024
    ? "laptop"
    : "desktop";
};

function useDevice() {
  const [device, setDevice] = useState(identify(window.outerWidth));

  useEffect(() => {
    const unsub = () => setDevice(identify(window.outerWidth));
    window.addEventListener("resize", unsub);
    return () => window.removeEventListener("resize", unsub);
  }, []);

  return device;
}

export default useDevice;
