import React from 'react';
import { RiHome2Line, RiCompass3Line, RiBellLine, RiLogoutCircleLine } from 'react-icons/ri';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white fixed top-0 w-1/6 p-4 h-screen">
      <div className="flex items-center mb-8">
        <div className="h-10 w-10 rounded-full bg-white mr-3"></div>
        <div>
          <p className="font-bold text-xl">Anonymous Social</p>
          <p className="text-sm">Welcome, Guest!</p>
        </div>
      </div>
      <ul className="space-y-4">
        <li className="flex items-center space-x-3">
          <RiHome2Line className="w-6 h-6 fill-current" />
          <a href="/">Home</a>
        </li>
        <li className="flex items-center space-x-3">
          <RiCompass3Line className="w-6 h-6 fill-current" />
          <a href="/">Explore</a>
        </li>
        <li className="flex items-center space-x-3">
          <RiBellLine className="w-6 h-6 fill-current" />
          <a href="/">Notifications</a>
        </li>
        <li className="flex items-center space-x-3">
          <RiLogoutCircleLine className="w-6 h-6 fill-current" />
          <a href="/">Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
