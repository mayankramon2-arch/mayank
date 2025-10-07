
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center p-4 md:p-6">
      <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
        Meta-Agent
      </h1>
      <p className="text-slate-400 mt-2 text-md md:text-lg">AI Agent Factory</p>
    </header>
  );
};

export default Header;
