import { useCallback, useEffect, useState } from 'react';

export const useKeyboardToggle = (keyCode) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    const keyboardHandler = (event) => {
      if (event.keyCode === keyCode) {
        toggle();
      }
    };
    window.addEventListener('keydown', keyboardHandler);
    return () => {
      window.removeEventListener('keydown', keyboardHandler);
    };
  }, [toggle, keyCode]);

  return { isOpen, toggle, setIsOpen };
};
