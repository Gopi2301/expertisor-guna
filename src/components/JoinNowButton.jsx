import React, { useState } from 'react';
import ApplyModal from './Simple_elite_temp_Components.jsx/ApplyModal';

const JoinNowButton = ({ children, className, courseId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button onClick={handleClick} className={className}>
        {children}
      </button>
      <ApplyModal open={isModalOpen} onClose={() => setIsModalOpen(false)} courseId={courseId} />
    </>
  );
};

export default JoinNowButton;