import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <nav className="bg-gray-200 h-full p-4 w-64 shadow-lg">
      <ul className="space-y-2">
        <li>
          <a href="/" className="block py-2 px-4 hover:bg-blue-500 hover:text-white transition rounded">Home</a>
        </li>
        <li>
          <a href="about" className="block py-2 px-4 hover:bg-blue-500 hover:text-white transition rounded">About</a>
        </li>        
        <li>
          <a href="#contact" className="block py-2 px-4 hover:bg-blue-500 hover:text-white transition rounded">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
