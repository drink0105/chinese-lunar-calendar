import React, { useEffect, useRef } from 'react';

const BannerAd: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current) return;
    if (!containerRef.current) return;
    injected.current = true;

    const script = document.createElement('script');
    script.async = true;
    script.referrerPolicy = 'no-referrer-when-downgrade';
    script.src = '//shameful-farm.com/bGXNVPsMd.GllH0WYbW-cP/Je/my9duiZ-UClakCPlTkcaxaMsjmQS1UO-DNkCtYNbz/E/yjNUDmUj5/MVwK';
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
        minHeight: '100px',
        margin: '16px auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    />
  );
};

export default BannerAd;