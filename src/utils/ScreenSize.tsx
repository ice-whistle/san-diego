import { useState, useEffect } from 'react';

export const useScreenResolution = () => {
    const [isXSmall, setIsXSmall] = useState(false);
    const [isSmall, setIsSmall] = useState(false);
    const [isMedium, setIsMedium] = useState(false);
    const [isLarge, setIsLarge] = useState(false);
    const [isXLarge, setIsXLarge] = useState(false);
  
    useEffect(() => {
      const windowResized = () => {
        setIsXSmall(
          window.matchMedia(`screen and (max-width: 599px)`)
            .matches
        );
        setIsSmall(
          window.matchMedia(
            `screen and (min-width: 600px) and (max-width: 899px)`
          ).matches
        );
        setIsMedium(
          window.matchMedia(
            `screen and (min-width: 900px) and (max-width: 1199px)`
          ).matches
        );
        setIsLarge(
          window.matchMedia(
            `screen and (min-width: 1200px) and (max-width: 1535px)`
          ).matches
        );
        setIsXLarge(
          window.matchMedia(
            `screen and (min-width: 1536px)`
          ).matches
        );
      };
  
      window.addEventListener('resize', windowResized);
      windowResized();
      return () => window.removeEventListener('resize', windowResized);
    }, []);
  
    return { isXSmall, isSmall, isMedium, isLarge, isXLarge };
  };