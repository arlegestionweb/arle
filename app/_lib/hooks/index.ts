import { useEffect, RefObject, MouseEvent } from 'react';

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
  ignoreRef?: RefObject<HTMLElement>
) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      ref.current &&
      !ref.current.contains(event.target as Node) &&
      !(ignoreRef?.current?.contains(event.target as Node))
    ) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside as unknown as EventListener);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside as unknown as EventListener);
    };
  }, [ref, callback, ignoreRef]);
};

export const useHideBodyOverflow = (isOverflowHidden: boolean) => {
  useEffect(() => {
    if (isOverflowHidden) {
      document.body.style.overflowY = "hidden"; // Hide vertical scrollbar
    }
    return () => {
      document.body.style.overflowY = "unset"; // Hide vertical scrollbar
    };
  }, [isOverflowHidden]);
};
