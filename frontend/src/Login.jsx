import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';
const Mainpage = () => {
    const [data,setdata] = useState({password:"",email:""})
    function onchangehandler(e){
    
      setdata({
        ...data,
        [e.target.name]:e.target.value
      })
      console.log(data);
    }
    const navigate = useNavigate()
    const signup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/user/login", {
                email: data.email,
                password: data.password,
                
            },{withCredentials:true});
            
            // Check if the signup was successful based on the response
            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/tasks")

            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            // Display error message for any other issues (e.g., network errors)
            toast.error(error.response?.data?.message || "An error occurred. Please try again.");
            console.error("Signup error:", error);
        }
    };
  return (
    <div>
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black ">Log in to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" onSubmit={signup} >
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-black ">Email address</label>
        <div class="mt-2">
          <input id="email" onChange={onchangehandler} name="email" value={data.email} type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-black p-2  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      
      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-black ">Password</label>
          
        </div>
        <div class="mt-2">
          <input id="password" name="password" type="password" onChange={onchangehandler} value={data.password}  autocomplete="current-password" required class="block p-2 w-full rounded-md border-0 py-1.5 text-black  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button   class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log in</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
      Not registered  
      <a href="/" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> SignUp</a>
    </p>
  </div>
</div>
    </div>
  )
}

export default Mainpage
