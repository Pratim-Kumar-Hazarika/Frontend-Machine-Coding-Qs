import { createContext, useContext, useMemo, useState } from "react";
import SnackBarContainer from "../components/SnackBarContainer";

const SnackBarContext = createContext();

const variations = ["success", "error", "warning", "info"];
export const SnackBarProvider = ({ children }) => {
  const [snackbar, setSnackBar] = useState([]);
  const random = Math.floor(Math.random() * 4) + 1;
  const addSnackBar = () => {
    setSnackBar((prev) => {
      return [
        {
          id: Date.now(),
          message: `Hello ${Date.now()}`,
          variant: variations[random],
        },
        ...prev,
      ];
    });
  };

  const removeSnackBar = (id) => {
    setSnackBar((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  const value = useMemo(() => {
    return {
      addSnackBar,
      removeSnackBar,
      snackbar,
    };
  }, [addSnackBar, removeSnackBar, snackbar]);

  return (
    <SnackBarContext.Provider value={value}>
      {children}
      <SnackBarContainer />
    </SnackBarContext.Provider>
  );
};

export const useSnackBar = () => {
  const context = useContext(SnackBarContext);
  if (!context) {
    throw new Error("useSnack bar should be in snackbar context");
  }
  return context;
};
