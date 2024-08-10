import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="flex flex-col items-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
        <h2 className="text-xl font-semibold text-white">Loading...</h2>
        <p className="text-md text-gray-200">Please wait a moment.</p>
      </div>
    </div>
  );
};

export default Loading;

