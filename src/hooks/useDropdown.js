import { useState, useRef, useEffect, useCallback } from "react";

export const useDropdown = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);
  const ref = useRef(null);

  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);
  const close = useCallback(() => setIsOpen(false), []);
  const open = useCallback(() => setIsOpen(true), []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        close();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape" || event.key === "Tab") {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, close]);

  return {
    isOpen,
    toggle,
    close,
    open,
    ref,
  };
};