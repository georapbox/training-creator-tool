import { useEffect } from 'react';
import { navigate } from 'gatsby';

export const useKeyboardNavigation = (previousLink, nextLink) => {
  const navigatePrevious = () => {
    if (previousLink) {
      navigate(previousLink);
    }
  };

  const navigateNext = () => {
    if (nextLink) {
      navigate(nextLink);
    }
  };

  const canGoPrevious = !!previousLink;
  const canGoNext = !!nextLink;

  useEffect(() => {
    const keyboardHandler = (event) => {
      if (event.key === 'ArrowRight' && nextLink) {
        navigateNext();
      }

      if (event.key === 'ArrowLeft' && previousLink) {
        navigatePrevious();
      }
    };

    window.addEventListener('keydown', keyboardHandler);

    return () => {
      window.removeEventListener('keydown', keyboardHandler);
    };
  }, [previousLink, nextLink]);

  return {
    navigatePrevious,
    navigateNext,
    canGoPrevious,
    canGoNext
  };
};
