
import { useState } from "react";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const host = `https://anonymous-social-bt77.onrender.com/api/v1/auth`


export function useLogin() {


    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isLogged, setIsLogged] = useState(false);



    const login = async (username, password) => {
        setisLoading(true);
        setError(null);
        try {
            const response = await fetch(`${host}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                }),
            });
            const responseData = await response.json();
            if (response.ok) {
                toast.success('user logged in succesfully')

            }
            else {
                toast.error(responseData.msg);
                throw new Error(responseData.message);
            }
            setIsLogged(true);
            setisLoading(false);
        } catch (err) {
            toast.error('error logging in!!');
            console.log(err)
            setError(err.message);
            setisLoading(false);
        }
    }

    return { isLoading, error, isLogged, login };



}


export function useSignup() {

    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSignedUp, setIsSignedUp] = useState(false);

    const signup = async (username, password) => {
        setisLoading(true);
        setError(null);
        try {
            const response = await fetch(`${host}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                }),
            });
            const responseData = await response.json();
            if (response.ok) {
                toast.success('user signed up succesfully')

            }
            else {
                toast.error(responseData.error);
                throw new Error(responseData.error);
            }
            setIsSignedUp(true);
            setisLoading(false);
        } catch (err) {
            toast.error('error signing up!!');
            setError(err.message);
            setisLoading(false);
        }
    }

    return { isLoading, error, isSignedUp, signup };

}