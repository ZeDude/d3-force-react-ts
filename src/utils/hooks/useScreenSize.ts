import { useEffect, useState } from 'react';

import { GeneralTypes } from '../../types/GeneralTypes';

const { innerWidth, innerHeight }: GeneralTypes.ScreenSize = window;

export default function useScreenSize() {
  const [screenSize, setScreenSize] = useState<GeneralTypes.ScreenSize>({
    innerWidth,
    innerHeight
  });

  useEffect(() => {
    const onResize = (e: Event) => {
      const { innerWidth, innerHeight } = e.target as Window;
      setScreenSize({ innerWidth, innerHeight });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return screenSize;
}
