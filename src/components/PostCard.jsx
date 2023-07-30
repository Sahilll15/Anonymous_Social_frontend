import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaComment } from 'react-icons/fa';
import { useLikeDislike } from '../hooks/likes';
import { useUserInfo } from '../hooks/auth';

import SkeletonPostCard from './Skeletons/SkeletonPostCard';
import { NavLink } from 'react-router-dom';
import formatDate from '../utils/Formatdate';

const PostCard = ({ post }) => {
  const { LikePost } = useLikeDislike();
  const { userInfo, user, followUser, unfollowUser } = useUserInfo();
  const [liked, setLiked] = useState(false);
  const [isloading, setisLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

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

    const isUserFollowing = post?.author?.followers?.some(
      (follower) => follower === user?._id
    );
    setIsFollowing(isUserFollowing);
  }, [post.likes, post.author?.followers, user?._id]);

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

  const handleFollowClick = async (authorId) => {
    // try {
    //   setIsFollowing((prevFollowing) => !prevFollowing);

    //   if (isFollowing) {
    //     await unfollowUser(authorId);
    //   } else {
    //     await followUser(authorId);
    //   }
    // } catch (error) {
    //   setIsFollowing((prevFollowing) => !prevFollowing);
    // }
    
    console.log(authorId)
  };
  const isPostByCurrentUser = post.author?.id === user?._id;

  if (isloading) {
    return <SkeletonPostCard />;
  }

  return (
    <div className="bg-black text-white p-4 shadow-md rounded-lg">
      <div className='flex gap-4'>
      <NavLink to={`/profile/${post.author?.id}`}>
    
        <div className="flex items-center gap-2 ">
          <img
            className="h-10 w-10 rounded-full border border-6"
            src={post.author.avatar}
            alt={post.author.name}
          />
          <p className="ml-4 text-white font-bold">{post.author.name}</p>
               </div>
               </NavLink>  
               

      <div className='mt-2'>
      {!isPostByCurrentUser && (
            <button
              onClick={() => handleFollowClick(post.author?.id)}
              className={`text-sm px-3 py-1 rounded-full ${
                isFollowing
                  ? 'bg-transparent border border-blue-500 text-blue-500'
                  : 'bg-blue-500 text-white'
              }`}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )}
      </div>
        

</div>
       
       
      
      <p className="text-white mt-2">{post.content}</p>
      <div className="flex items-center mt-4">
        <button
          onClick={() => handleLikeClick(post._id)}
          className={`mr-2 text-white flex items-center focus:outline-none ${
            liked ? 'text-orange-500' : ''
          }`}
        >
          <FaThumbsUp className="mr-1" />
          {post.likes?.length || 0}
        </button>
        <NavLink to={`/comments/${post._id}`}>
          <button
            className="mr-2 text-white hover:text-blue-500 flex items-center focus:outline-none"
          >
            <FaComment className="mr-1" />
            {post.comments?.length || 0}
          </button>
        </NavLink>
       
      </div>
      <div className="text-blue-600 text-sm mt-2">{formatDate(post.createdAt)}</div>
    </div>
  );
};

export default PostCard;
