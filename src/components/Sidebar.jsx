import React, { useEffect } from 'react';
import { RiHome2Line, RiCompass3Line, RiBellLine, RiLogoutCircleLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { useUserInfo } from '../hooks/auth';

const Sidebar = () => {

  const handleLogout = () => {
    localStorage.removeItem('auth');
    window.location.href = '/login';
  };

  const { userInfo, user } = useUserInfo();

  useEffect(() => {
    userInfo();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-800 text-white fixed top-0 w-1/6 p-4 h-screen">
      <div className="flex items-center mb-8">
        <div className="h-10 w-10 rounded-full bg-white mr-3">
          <img
            src={user.avatar.url}
            alt={user.username}
            className="h-full w-full object-cover rounded-full"
          />
        </div>
        <div>
          <p className="font-bold text-xl">Anonymous Social</p>
          <p className="text-sm">Welcome, {user.username}!</p>
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
        <li className="flex items-center space-x-3" onClick={handleLogout}>
          <RiLogoutCircleLine className="w-6 h-6 fill-current" />
          <NavLink>Logout</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
