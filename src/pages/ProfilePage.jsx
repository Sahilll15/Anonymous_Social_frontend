import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';
import { Navigate, useParams } from 'react-router-dom';
import formatDate  from '../utils/Formatdate';
import SkeletonProfilePage from '../components/Skeletons/SkeletonProfilePage';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


  

const ProfilePage = () => {

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { userID } = useParams();
    const [editMode, setEditMode] = useState(false);
    const [username, setUsername] = useState(user.username);
    const navigate=useNavigate();
    const [description, setDescription] = useState('This is user description of the profile page of an user');
  
    const handleEditClick = () => {
      setEditMode(true);
    };
    
    const authToken=localStorage.getItem('auth');
    const getUser = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`https://anonymous-social-bt77.onrender.com/api/v1/auth/userprofile/${userID}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setUser(data.user);
            console.log(data.user);
            setIsLoading(false);
          } else {
            setIsLoading(false);
            throw new Error(data.message);
          }
        } catch (error) {
          console.log(error.message);
          setIsLoading(false);
        }
      }

    const fetchPosts = async () => {
        const authToken=localStorage.getItem('auth');
        setIsLoading(true);
        try {
            const response = await fetch(`https://anonymous-social-bt77.onrender.com/api/v1/posts/getpostsById/${userID}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                    }
                },
            );
            const responseData = await response.json();
            if (response.ok) {
                setPosts(responseData.posts);
                console.log(responseData.posts)
                setIsLoading(false);
            } else {
                setIsLoading(false);
                throw new Error(responseData.message);
            }
        } catch (err) {
            setIsLoading(false);
            console.log(err.message);
        }
    }

    useEffect(()=>{
        getUser();
        fetchPosts();
        
    },[])

    if(isLoading){
        return(
            <SkeletonProfilePage />
        )
      
    }

  return (
    <div className="container mx-auto mt-8 flex justify-center">

    {/* button to go back on the home page */}

    <div className="flex flex-col bg-black text-white w-96 p-4 rounded-lg ">
        <div className="flex justify-between items-center">

        <button
              className="bg-white hover:bg-gray-500  text-black font-bold py-2 px-4 rounded text-2xl"
                onClick={() =>navigate('/') }
            >
                <FaHome />
            </button>
      
          <h1 className="font-bold text-2xl">Profile</h1>
          {editMode ? (
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setEditMode(false)}
            >
              Save Profile
            </button>
          ) : (
            <button
              className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
              onClick={handleEditClick}
            >
              Edit Profile
            </button>
          )}


        </div>
        <hr className="mt-4" />

        <img
          className="h-26 w-26 rounded-full border border-gray-300 mt-10"
          src={user.avatar?.url}
          alt={user.username}
        />

        <hr className="mt-10" />
        <div className="ml-4 mt-2">
          {editMode ? (
            <>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="font-bold text-xl focus:outline-none text-black p-2 rounded-lg"
              />
              <p className="text-gray-600">@{user.username}</p>
            </>
          ) : (
            <>
              <h2 className="font-bold text-4xl">{user.username}</h2>
              <p className="text-gray-600">@{user.username}</p>
            </>
          )}

         
          {editMode ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-xl font-sans mt-4 text-black resize-none p-2 rounded-lg"
            />
          ) : (
            <p className="text-xl font-sans mt-4">{description}</p>
          )}

          <div className="mt-4">
            <p className="text-gray-400">Followers: 100</p>
            <p className="text-gray-400">Following: 101</p>
          </div>
        </div>
      </div>



    <div className="ml-8 flex-grow bg-gray-500 p-10">
      <h3 className="font-bold text-xl text-black mb-4">Posts</h3>
      <ul className="space-y-10">
        {posts.map((post) => (
              <div className="bg-black text-white p-4 shadow-md rounded-lg">
              <div className="flex items-center">
                <img
                  className="h-10 w-10 rounded-full border border-6 "
                  src={user.avatar?.url}
                  alt={user.username}
                />
              
              </div>
              <p className="text-white mt-2">{post.content}</p>
            
              <div className="text-blue-600 text-sm mt-2">{formatDate(post.createdAt)}</div>
            </div>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default ProfilePage;
