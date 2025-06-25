import { useState, useEffect } from 'react';

interface WindowSize {
  width: number
  height: number
}

export default function useWindowDimensions(): WindowSize {

  const hasWindow = typeof window !== 'undefined';

  function getWindowDimensions() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState<WindowSize>(getWindowDimensions());

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }//eslint-disable-next-line
  }, [hasWindow]);

  return windowDimensions;
}
