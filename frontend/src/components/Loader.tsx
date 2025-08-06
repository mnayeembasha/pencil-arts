import React from 'react';
import './Loader.css'; // You can also use CSS Modules or Tailwind if preferred

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="loader-line" />
      ))}
    </div>
  );
};

export default Loader;
