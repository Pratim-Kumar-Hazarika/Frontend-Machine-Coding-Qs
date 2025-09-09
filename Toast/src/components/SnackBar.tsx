import { useEffect, useRef } from "react";
const AUTO_CLOSE = 3000;

function SnackBar({
  id,
  message,
  onClose,
  autoCloseDuration,
  displaceMent,
  variant,
}) {
  const timerId = useRef();
  useEffect(() => {
    timerId.current = setTimeout(() => {
      onClose(id);
    }, autoCloseDuration || AUTO_CLOSE);
    return () => {
      clearTimeout(timerId);
    };
  }, []);
  console.log(variant);
  return (
    <div
      style={{
        transform: `translateY(${displaceMent}px)`,
      }}
      className={`snackbar ${variant}`}
    >
      <div>{message}</div>
      <button onClick={() => onClose(id)}>X</button>
    </div>
  );
}

export default SnackBar;
