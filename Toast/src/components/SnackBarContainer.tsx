import SnackBar from "./SnackBar";
import { useSnackBar } from "../context/snackbar-context";

function SnackBarContainer() {
  const { addSnackBar, snackbar, removeSnackBar } = useSnackBar();
  return (
    <div>
      <button onClick={addSnackBar}>Add SnackBar</button>
      {snackbar.map((item, i) => {
        return (
          <SnackBar
            key={item.id}
            {...item}
            onClose={removeSnackBar}
            displaceMent={i * 60}
          />
        );
      })}
    </div>
  );
}

export default SnackBarContainer;
