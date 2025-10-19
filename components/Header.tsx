
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/50 backdrop-blur-sm p-4 text-center border-b border-gray-700 shadow-lg sticky top-0 z-10">
      <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
        Image Fusion Hug
      </h1>
      <p className="text-gray-400 mt-1">Create a new image of two people hugging using AI</p>
    </header>
  );
};
