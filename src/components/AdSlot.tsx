import React, { useEffect, useRef } from 'react';

interface AdSlotProps {
  type: 'banner' | 'interstitial';
  className?: string;
}

const AdSlot: React.FC<AdSlotProps> = ({ type, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any previous content to avoid duplicate ads on re-render
    containerRef.current.innerHTML = '';

    if (type === 'banner') {
      // 320x50 banner
      const optionsScript = document.createElement('script');
      optionsScript.innerHTML = `
        atOptions = {
          'key': '6a65a65aa404a6955c2204e8d0c8093e',
          'format': 'iframe',
          'height': 50,
          'width': 320,
          'params': {}
        };
      `;
      containerRef.current.appendChild(optionsScript);

      const invokeScript = document.createElement('script');
      invokeScript.async = true;
      invokeScript.setAttribute('data-cfasync', 'false');
      invokeScript.src = 'https://www.highperformanceformat.com/6a65a65aa404a6955c2204e8d0c8093e/invoke.js';
      containerRef.current.appendChild(invokeScript);

    } else {
      // 300x250 rectangle (replaces interstitial placeholder)
      const optionsScript = document.createElement('script');
      optionsScript.innerHTML = `
        atOptions = {
          'key': 'e7a9b5688d950af7dbc31ba04a1fecd0',
          'format': 'iframe',
          'height': 250,
          'width': 300,
          'params': {}
        };
      `;
      containerRef.current.appendChild(optionsScript);

      const invokeScript = document.createElement('script');
      invokeScript.async = true;
      invokeScript.setAttribute('data-cfasync', 'false');
      invokeScript.src = 'https://www.highperformanceformat.com/e7a9b5688d950af7dbc31ba04a1fecd0/invoke.js';
      containerRef.current.appendChild(invokeScript);
    }
  }, [type]);

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        width: type === 'banner' ? '320px' : '300px',
        minHeight: type === 'banner' ? '50px' : '250px',
        margin: '0 auto',
      }}
    >
      <div ref={containerRef} />
    </div>
  );
};

export default AdSlot;