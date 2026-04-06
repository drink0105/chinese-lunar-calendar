import React from 'react';

interface AdSlotProps {
  type: 'banner' | 'interstitial';
  className?: string;
}

const AdSlot: React.FC<AdSlotProps> = ({ type, className }) => {
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
        background: 'transparent',
      }}
    />
  );
};

export default AdSlot;