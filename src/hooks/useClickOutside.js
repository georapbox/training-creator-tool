import { useCallback, useEffect } from 'react';

export const useClickOutside = (ref, callback) => {
  const handleClick = useCallback(
    (event) => {
      if (event.target.closest('#openMenuButton')) {
        return;
      }
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    },
    [callback, ref]
  );

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);
};
