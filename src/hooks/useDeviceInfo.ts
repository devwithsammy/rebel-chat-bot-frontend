import { useState, useEffect } from 'react';

export interface DeviceInfo {
  isMobile: boolean;
  innerWidth: number;
  // userAgentMobile: boolean;
}

export const MOBILE_BREAKPOINT = 768;

const MOBILE_USER_AGENTS = [
  /Android/i,
  /webOS/i,
  /iPhone/i,
  /iPad/i,
  /iPod/i,
  /BlackBerry/i,
  /Windows Phone/i
];

const checkUserAgentMobile = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  
  return MOBILE_USER_AGENTS.some(pattern => 
    pattern.test(navigator.userAgent)
  );
};

export const useDeviceInfo = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    innerWidth: 0,
    // userAgentMobile: false,
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      setDeviceInfo({
        isMobile: window.innerWidth <= MOBILE_BREAKPOINT|| checkUserAgentMobile(),
        innerWidth: window.innerWidth,
        // userAgentMobile: checkUserAgentMobile(),
      });
    };

    updateDeviceInfo();

    window.addEventListener('resize', updateDeviceInfo);

    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
};