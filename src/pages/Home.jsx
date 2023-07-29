import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useGetPosts } from '../hooks/posts';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
import PostCard from '../components/PostCard';
import { useAddPost } from '../hooks/posts';

const host = `https://anonymous-social-bt77.onrender.com/api/v1/posts`

const Home = () => {
  const [posts, setPosts] = useState([]);

  const { addPost } = useAddPost();

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${host}/getposts`);
      const responseData = await response.json();
      if (response.ok) {
        setPosts(responseData.posts);
        console.log(responseData.posts)
      } else {
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target[0].value;
    console.log(content)
    addPost(content);
    await fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, [])

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleComment = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, comments: post.comments + 1 } : post
      )
    );
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <Sidebar />

        <div className="container ml-44 lg:w-3/4 mx-auto px-10 py-8 lg:ml-80">
          <h1 className="text-4xl font-bold mb-4">Anonymous Social Website</h1>

          {/* Post Input Form */}
          <div className="mb-4">
            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full border rounded px-3 py-2"
                placeholder="Write your post here..."
                name='content'
              ></textarea>
              <button
                type="submit"
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Post
              </button>
            </form>
          </div>

          <div className="space-y-4 ">
            {posts.length === 0 ? <h1>Loading..</h1> : null}
            {posts.map((post) => (
              <PostCard post={post} handleLike={handleLike} handleComment={handleComment} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
