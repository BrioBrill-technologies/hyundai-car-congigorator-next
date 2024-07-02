import { useState, useEffect } from 'react';

export const Modal = ({ visible, setVisibility, title, description }) => {
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (visible) {
      setHasInteracted(true);
    }
  }, [visible]);

  const handleXClick = () => {
    setVisibility(false);
  };

  return (
    <div
      className={`absolute w-full z-20 top-1 pointer-events-none ${visible ? 'fade-in block' : hasInteracted ? 'fade-out' : 'hidden'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="text-white w-9/12 bg-black/35 rounded-lg mx-auto p-2 text-center flex flex-col justify-center pointer-events-none gap-2">
        <div className="flex flex-col gap-2">
          <p className="text-sm" id="modal-title">{title}</p>
          <p className="text-xs" id="modal-description">{description}</p>
        </div>
        <button 
          className="bg-white w-fit mx-auto text-black rounded-full px-2 py-0.5 pointer-events-auto"
          onClick={handleXClick}
          aria-label="Close"
        >
          X
        </button>
      </div>
    </div>
  );
};
