import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [formdata, setFormData] = useState({ username: "", cpassword: "", password: "" });
  const [seepasword, setseepassword] = useState(false);
  const { signup } = useSignup();

  const onChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const validation=()=>{
    if(formdata.password!==formdata.cpassword){
      toast.error("Password and Confirm Password does not match")
      return false
    }
    return true
  }

  const handleviewpassword = () => {
    setseepassword(!seepasword);
    if (seepasword) {
      document.getElementById('password').type = 'password';
      document.getElementById('cpassword').type = 'password';
    } else {
      document.getElementById('password').type = 'text';
      document.getElementById('cpassword').type = 'text';
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if(validation()){

    signup(formdata.username, formdata.password);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="max-w-md w-full p-6 bg-gray-300 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Create an Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Choose a unique username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                required
                onChange={onChange}
              />
            </div>
       
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Choose a secure password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                required
                onChange={onChange}
              />
            </div>
            
         

            <div className="mb-2">
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
                Confirm-Password
              </label>
              <input
                type="password"
                id="cpassword"
                name="cpassword"
                placeholder="Choose a secure password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                required
                onChange={onChange}
              />
            </div>
            
            <div className="flex items-center justify-between mb-2">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="viewpassword"
                        aria-describedby="viewpassword"
                        onClick={handleviewpassword}
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlhtmlFor="viewpassword" className="text-gray-900 dark:text-gray-900">
                        View password
                      </label>
                    </div>
                  </div>
                </div>
            
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="px-4 py-2  bg-blue-500  text-white rounded-lg hover:text-blue-700 focus:outline-none focus:ring focus:border-green-300"
              >
                Sign Up
              </button>
              <Link to="/login" className="text-gray-600 hover:text-blue-600">
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
