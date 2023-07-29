import React, { useState } from 'react';
import { FaThumbsUp, FaComment } from 'react-icons/fa';
import { useLikeDislike } from '../hooks/likes';

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

const PostCard = ({ post, handleLike, handleComment }) => {
  const {LikePost}=useLikeDislike();
  const [liked, setLiked] = useState(false);

  const handleLikeClick = (postId) => {
    console.log(postId)
    LikePost(postId)
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <div className="flex items-center">
        <img
          className="h-10 w-10 rounded-full"
          src={post.author.avatar}
          alt={post.author.name}
        />
        <p className="ml-4 text-gray-800 font-bold">{post.author.name}</p>
      </div>
      <p className="text-gray-800 mt-2">{post.content}</p>
      <div className="flex items-center mt-4">
        <button
          onClick={() => handleLikeClick(post._id)}
          className={`mr-2 text-gray-600 hover:text-blue-500 flex items-center focus:outline-none ${liked ? 'text-blue-500' : ''}`}
        >
          <FaThumbsUp className="mr-1" />
          {post.likes.length}
        </button>
        <button
          onClick={() => handleComment(post.id)}
          className="mr-2 text-gray-600 hover:text-blue-500 flex items-center focus:outline-none"
        >
          <FaComment className="mr-1" />
          {post.comments}
        </button>
      </div>
      <div className="text-blue-600 text-sm mt-2">{formatDate(post.createdAt)}</div>
    </div>
  );
};

export default PostCard;
