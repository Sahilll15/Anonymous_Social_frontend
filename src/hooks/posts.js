import axios from "axios";
import { useState } from "react";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const host = `https://anonymous-social-bt77.onrender.com/api/v1/posts`


export function useGetPosts() {
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const fetchPosts = async () => {
        setisLoading(true);
        setError(null);
        try {
            const response = await fetch(`${host}/getposts`);
            const responseData = await response.json();
            if (response.ok) {
                setData(responseData.posts);
            }
            else {
                throw new Error(responseData.message);
            }
            setisLoading(false);
        }
        catch (err) {
            setError(err.message);
            setisLoading(false);
        }
    }

    return { isLoading, error, data, fetchPosts };


}

export function useAddPost() {
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const addPost = async (content) => {
        setisLoading(true);
        setError(null);
        try {
            // Get the authentication token from wherever it's stored (e.g., localStorage, cookies)
            const authToken = localStorage.getItem('auth');

            const response = await fetch(`${host}/createpost`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`, // Include the authorization token here
                },
                body: JSON.stringify({
                    content
                }),
            });
            const responseData = await response.json();
            if (response.ok) {
                setData(responseData.post);
                toast.success('post added successfully');
            } else {
                toast.error(responseData.msg);
                throw new Error(responseData.message);

            }
            setisLoading(false);
        } catch (err) {
            setError(err.message);
            setisLoading(false);
        }
    };

    return { isLoading, error, data, addPost };
}


