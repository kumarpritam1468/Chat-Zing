import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300 mb-2'>
          Sign Up to <span className='text-blue-500'> Chat-Zing</span>
        </h1>

        <form>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input type='text' placeholder='Enter Full Name' className='w-full input input-bordered  h-10' />
          </div>

          <div>
            <label className='label p-2 '>
              <span className='text-base label-text'>Username</span>
            </label>
            <input type='text' placeholder='Enter username' className='w-full input input-bordered h-10' />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              className='w-full input input-bordered h-10'
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              type='password'
              placeholder='Confirm Password'
              className='w-full input input-bordered h-10'
            />
          </div>

          <div className='flex'>
            <div className='form-control'>
              <label className={`label gap-2 cursor-pointer`}>
                <span className='label-text'>Male : </span>
                <input type='checkbox' className='checkbox border-white' />
              </label>
            </div>
            <div className='form-control'>
              <label className={`label gap-2 cursor-pointer`}>
                <span className='label-text'>Female : </span>
                <input type='checkbox' className='checkbox border-white' />
              </label>
            </div>
          </div>

          <Link to='/login' className='text-sm text-gray-300 hover:underline hover:text-blue-400 inline-block'>
            Already have an account?
          </Link>

          <div>
            <button className='btn btn-block btn-primary text-base bg-blue-500 btn-sm mt-2 border border-slate-700'>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp