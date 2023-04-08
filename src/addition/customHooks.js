import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  UNSAFE_NavigationContext,
  useLocation,
  useNavigate,
} from "react-router-dom";

//theme changer
const isDarkTheme = window?.matchMedia("(prefers-color-scheme: dark)").matches;
const defaultTheme = isDarkTheme ? "dark" : "light";
export const useTheme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("app-theme") || defaultTheme
  );

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("app-theme", theme);
  }, [theme]);
  return { theme, setTheme };
};
//inputs and validation
export const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);
  const onChange = (e) => setValue(e.target.value);
  const onBlur = (e) => setDirty(true);
  const clear = () => setValue("");
  const set = (text) => setValue(text);
  return {
    bind: { value, onChange, onBlur },
    clear,
    value,
    set,
    ...valid,
    isDirty,
    setDirty,
  };
};

const useValidation = (value, validators) => {
  const [textErr, setTextErr] = useState("");
  useEffect(() => {
    let isTextErrSetted = false;
    for (const validation in validators) {
      switch (validation) {
        case "isEmpty":
          if (
            value &&
            !value.split("").every((el) => el === "\n") &&
            !value.split("").every((el) => el === " ")
          ) {
            setTextErr("");
            isTextErrSetted = false;
          } else {
            setTextErr("Field can't be empty");
            isTextErrSetted = true;
          }

          break;
        case "maxLength":
          if (value?.length > validators[validation] - 1) {
            setTextErr(`Text must be in range 1 - ${validators[validation]}`);
            isTextErrSetted = true;
          } else if (!isTextErrSetted) {
            setTextErr("");
            isTextErrSetted = false;
          }
          break;
        default:
          break;
      }
    }
  }, [value]);

  return { textErr };
};
//mobile touching
export const useTouchMove = () => {
  const [touched, setTouched] = useState(false);
  const onTouchStart = () => setTouched(true);
  const onTouchEnd = () => setTouched(false);
  return { bind: { onTouchEnd, onTouchStart }, touched };
};
//block navigation when text edited
export function useBlocker(blocker, when = true) {
  const navigator = useContext(UNSAFE_NavigationContext).navigator;

  useEffect(() => {
    if (!when) return;

    const unblock = navigator.block((tx) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when]);
}

export function useCallbackPrompt(when) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPrompt, setShowPrompt] = useState(false);
  const [lastLocation, setLastLocation] = useState(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  const cancelNavigation = useCallback(() => {
    setShowPrompt(false);
  }, []);

  // handle blocking when user click on another route prompt will be shown
  const handleBlockedNavigation = useCallback(
    (nextLocation) => {
      // in if condition we are checking next location and current location are equals or not
      if (
        !confirmedNavigation &&
        nextLocation.location.pathname !== location.pathname
      ) {
        setShowPrompt(true);
        setLastLocation(nextLocation);
        return false;
      }
      return true;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [confirmedNavigation, location]
  );

  const confirmNavigation = useCallback(() => {
    setShowPrompt(false);
    setConfirmedNavigation(true);
  }, []);

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      navigate(lastLocation.location.pathname);

      // Clean-up state on confirmed navigation
      setConfirmedNavigation(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmedNavigation, lastLocation]);

  useBlocker(handleBlockedNavigation, when);

  return [showPrompt, confirmNavigation, cancelNavigation];
}
