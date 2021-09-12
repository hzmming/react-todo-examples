import { useCallback } from "react";

export default function useOnEnter(callback, deps) {
  return useCallback((event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      callback();
    }
  }, deps); // QUESTION
}
