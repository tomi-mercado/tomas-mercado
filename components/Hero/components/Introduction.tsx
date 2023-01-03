import React from 'react';

const Introduction: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="flex flex-col space-y-4 text-center">
        <h1 className="text-7xl font-bold">Tomás Mercado</h1>
        <div className="flex flex-col text-center justify-center items-center space-y-6">
          <h2 className="text-3xl">Web Developer</h2>
          <h4 className="text-lg text-gray-500 italic">
            Success is a journey, not a destination
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
