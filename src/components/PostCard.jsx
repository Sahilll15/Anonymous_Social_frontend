import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaComment } from 'react-icons/fa';
import { useLikeDislike } from '../hooks/likes';
import { useUserInfo } from '../hooks/auth';

import SkeletonPostCard from './Skeletons/SkeletonPostCard';
import { NavLink } from 'react-router-dom';
import formatDate  from '../utils/Formatdate';

const PostCard = ({ post }) => {
  const { LikePost } = useLikeDislike();
  const { userInfo, user } = useUserInfo();
  const [liked, setLiked] = useState(false);
  const [isloading,setisLoading]=useState(false);
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setisLoading(true); 
        await userInfo();
        setisLoading(false); 
      } catch (error) {
        setisLoading(false); 
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const userLiked = post.likes.some((like) => like === user?._id);
    setLiked(userLiked);
  }, [post.likes, user?._id]);

  const handleLikeClick = async (postId) => {
    try {
  
      setLiked((prevLiked) => !prevLiked);
      post.likes.length += liked ? -1 : 1;

      await LikePost(postId);
    } catch (error) {
      setLiked((prevLiked) => !prevLiked);
      post.likes.length += liked ? 1 : -1;
    }
  };

  const handleComment=()=>{

  }

  if(isloading){
    return(
      <SkeletonPostCard />
    )

  }

  return (
    <div className="bg-black text-white p-4 shadow-md rounded-lg">
    <NavLink to={`/profile/${post.author?.id}`}>
    <div className="flex items-center">
      <img
        className="h-10 w-10 rounded-full border border-6 "
        src={post.author.avatar}
        alt={post.author.name}
      />
      <p className="ml-4 text-white font-bold">{post.author.name}</p>
    </div>
    </NavLink>
    <p className="text-white mt-2">{post.content}</p>
    <div className="flex items-center mt-4">
      <button
        onClick={() => handleLikeClick(post._id)}
        className={`mr-2 text-white flex items-center focus:outline-none ${
          liked ? 'text-orange-500' : ''
        }`}
      >
        <FaThumbsUp className="mr-1" />
        {post.likes.length}
      </button>
      <button
        onClick={() => handleComment(post.id)}
        className="mr-2 text-white hover:text-blue-500 flex items-center focus:outline-none"
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
