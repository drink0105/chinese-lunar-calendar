import React from 'react';

interface AdSlotProps {
  type: 'banner' | 'interstitial';
  className?: string;
}

const AdSlot: React.FC<AdSlotProps> = ({ type, className }) => {
  return (
    <div 
      className={`bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs p-2 rounded-lg ${className}`}
      style={type === 'banner' ? { minHeight: '50px' } : { minHeight: '250px' }}
    >
      {/* AD SLOT — replace with Adsterra script */}
      <div className="text-center">
        <p className="font-bold uppercase">{type} AD SLOT</p>
        <p>Placeholder for advertising</p>
      </div>
    </div>
  );
};

export default AdSlot;