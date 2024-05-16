import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className=' flex flex-col justify-center items-center min-w-96 mx-auto'>

      <div className=" w-full p-6 shadow-md bg-gray-400 bg-clip-padding backdrop-blur-lg bg-opacity-0">
        <h1 className=" text-3xl text-gray-300 text-center font-semibold">
          Login to <span className=' text-blue-500'>Chat-Zing</span>
        </h1>

        <form>

          <div>
            <label className=' label p-2'>
              <span className=' text-base label-text'>Username</span>
            </label>
            <input type="text" placeholder='Enter Username' className=' w-full input input-bordered h-10' />
          </div>

          <div>
            <label className=' label p-2'>
              <span className=' text-base label-text'>Password</span>
            </label>
            <input type="password" placeholder='Enter Password' className=' w-full input input-bordered h-10' />
          </div>

          <Link to='/' className=' text-sm text-gray-300 hover:underline hover:text-blue-400 mt-4 ml-2 inline-block transition-all duration-300 ease-in-out'>
            Don't have an Account?
          </Link>

          <div>
            <button className=' btn btn-block btn-primary bg-blue-500 btn-sm text-base mt-4'>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login