import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

declare global {
  interface WindowEventMap {
    "local-storage": CustomEvent;
  }
}

type SetValue<T> = Dispatch<SetStateAction<T>>;

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] {
  // Get value from local storage
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key);
    return item ? parseJSON<T>(item) ?? initialValue : initialValue;
  });

  // Set value to local storage
  const setValue: SetValue<T> = useCallback(
    (value) => {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      window.dispatchEvent(new CustomEvent("local-storage"));
    },
    [key, storedValue]
  );

  // Listen for changes
  useEffect(() => {
    const listener = () => {
      const item = window.localStorage.getItem(key);
      setStoredValue(item ? parseJSON<T>(item) ?? initialValue : initialValue);
    };
    window.addEventListener("local-storage", listener);
    return () => {
      window.removeEventListener("local-storage", listener);
    };
  }, [key, initialValue]);

  return [storedValue, setValue];
}

// A wrapper for "JSON.parse()"" to support "undefined" value
function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === "undefined" ? undefined : JSON.parse(value ?? "");
  } catch {
    console.log("parsing error on", { value });
    return undefined;
  }
}
