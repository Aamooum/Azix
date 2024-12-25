"use client";
import Link from 'next/link';
import { getSession, signIn } from 'next-auth/react';
import { useState } from 'react';

const SignInForm = () => {
  const [err,setErr] = useState("")
  const handleSignIn = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false
    });
    if(res.status === 401){
      setErr('Invalid email or password')
    }
    if (res.ok) {
      const session = await getSession();
      window.location.href = session.user.role === "admin" ? "/create-product" : "/";
    }
  };

  return (
   
      <div className="flex h-[94vh] flex-1 flex-col px-6 pt-24 border-2 border-black border-t-0 lg:px-8 max-480:pt-10 h-[94vh]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className='font-bold text-5xl text-center'>AZIX</h2>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form method="POST" className="space-y-6" onSubmit={handleSignIn}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full border border-black p-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link href="#" className="font-semibold text-black underline hover:no-underline">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full border border-black p-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full border border-black justify-center bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
            <h2 className='text-center text-red-500'> {err} </h2>
          </form>
        
          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link href="/register" className="font-semibold leading-6 text-black underline hover:no-underline">
              Create an account
            </Link>
          </p>
         
        </div>
       
      </div>
    
  );
};

export default SignInForm;
