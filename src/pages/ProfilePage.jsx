import React, { useState } from 'react';
import PostCard from '../components/PostCard';

const User = {
  name: 'John Doe',
  username: 'johndoe',
  avatar: 'https://example.com/avatar.jpg',
  bio: 'Hello, I am John Doe!',
  followers: 100,
  following: 50,
};

const posts = [
  {
    id: 1,
    content: 'Hello, this is my first post!',
    createdAt: '2023-07-30T12:34:56.789Z',
  },
  {
    id: 2,
    content: 'Just enjoying life.',
    createdAt: '2023-07-29T09:15:00.123Z',
  },
];



const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  };
  

const ProfilePage = () => {

  const [user] = useState(User);

  return (
    <div className="container mx-auto mt-8 flex justify-center">
    <div className="flex flex-col bg-black text-white w-96 p-4 rounded-lg">
      <img
        className="h-20 w-20 rounded-full border border-gray-300"
        src={user.avatar}
        alt={user.username}
      />
      <div className="ml-4 mt-2">
        <h2 className="font-bold text-2xl">{user.username}</h2>
        <p className="text-gray-600">@{user.username}</p>
        <div className="mt-4">
          <p className="text-gray-700">'hello'</p>
        </div>
        <div className="mt-4">
          <p className="text-gray-700">Followers: 100</p>
          <p className="text-gray-700">Following: 101</p>
        </div>
      </div>
    </div>

    <div className="ml-8 flex-grow">
      <h3 className="font-bold text-xl text-white">Posts</h3>
      <ul className="space-y-4">
        {posts.map((post) => (
              <div className="bg-black text-white p-4 shadow-md rounded-lg">
              <div className="flex items-center">
                <img
                  className="h-10 w-10 rounded-full border border-6 "
                  src={User.avatar}
                  alt={User.name}
                />
                <p className="ml-4 text-white font-bold">'dadasd'</p>
              </div>
              <p className="text-white mt-2">'dasdasd'</p>
              <div className="flex items-center mt-4">
            
              </div>
              <div className="text-blue-600 text-sm mt-2">{formatDate(post.createdAt)}</div>
            </div>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default ProfilePage;
