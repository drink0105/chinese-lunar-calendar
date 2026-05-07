import React, { useEffect, useRef } from 'react';

const BannerAd: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current) return;
    if (!containerRef.current) return;
    injected.current = true;

    // Create the named container div that Adsterra targets
    const adDiv = document.createElement('div');
    adDiv.id = 'container-7e837ab13f79058005ef41ae58ba4d35';
    containerRef.current.appendChild(adDiv);

    // Load the Adsterra native banner script after the container exists
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://pl29366352.profitablecpmratenetwork.com/7e837ab13f79058005ef41ae58ba4d35/invoke.js';
    containerRef.current.appendChild(script);

    return () => {
      injected.current = false;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        maxWidth: '360px',
        margin: '16px auto',
        minHeight: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    />
  );
};

export default BannerAd;