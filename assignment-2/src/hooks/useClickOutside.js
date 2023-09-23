import { useEffect } from 'react';

const useClickOutside = (ref, callback, refElementIgnore) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      if (refElementIgnore && refElementIgnore.current) {
        const { top, bottom, left, right } =
          refElementIgnore.current.getBoundingClientRect();
        const betweenX = left <= event.clientX && event.clientX <= right;
        const betweenY = top < event.clientY && event.clientY <= bottom;
        if (betweenX && betweenY) {
          return;
        }
      }
      callback(event);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

export default useClickOutside;
