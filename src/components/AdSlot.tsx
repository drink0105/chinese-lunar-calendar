import React, { useEffect, useRef } from 'react';

interface AdSlotProps {
  type: 'vignette' | 'inpage';
  className?: string;
}

const AdSlot: React.FC<AdSlotProps> = ({ type, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current) return;
    if (!containerRef.current) return;
    injected.current = true;

    const script = document.createElement('script');

    if (type === 'vignette') {
      script.text = `(function(s){
        s.dataset.zone='10957781',
        s.src='https://n6wxm.com/vignette.min.js'
      })([document.documentElement, document.body]
        .filter(Boolean).pop()
        .appendChild(document.createElement('script')))`;
    } else {
      script.text = `(function(s){
        s.dataset.zone='10957814',
        s.src='https://nap5k.com/tag.min.js'
      })([document.documentElement, document.body]
        .filter(Boolean).pop()
        .appendChild(document.createElement('script')))`;
    }

    script.setAttribute('data-cfasync', 'false');
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      injected.current = false;
    };
  }, [type]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ display: 'contents' }}
    />
  );
};

export default AdSlot;