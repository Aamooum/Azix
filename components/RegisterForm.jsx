"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const RegisterForm = () => {
  const [isPasswordShort, setIsPasswordShort] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);
  const router = useRouter();

  const passwordVerification = (password, confirmPassword) => {
    if (password.length < 8) {
      setIsPasswordShort(true);
      return false;
    }
    if (password !== confirmPassword) {
      setIsPasswordMatched(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPasswordShort(false);
    setIsPasswordMatched(false);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confPassword = formData.get('confPassword');

    if (!passwordVerification(password, confPassword)) return;

    try {
      const response = await fetch(`/api/register`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      if (response.status === 201) router.push('/signin');
      if (response.status === 500) router.push('/500');
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (

      <div className='border-2 border-black border-t-0 pt-24 px-6 max-480:pt-10 min-h-[94vh]'>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className='font-bold text-5xl text-center'>AZIX</h2>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name:
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full border border-black p-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address:
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
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password:
              </label>
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
              <label htmlFor="confPassword" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password:
              </label>
              <div className="mt-2">
                <input
                  id="confPassword"
                  name="confPassword"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full border border-black p-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {isPasswordShort && (
              <div className='text-red-500'>
                Password must be at least 8 characters long.
              </div>
            )}
            {isPasswordMatched && (
              <div className='text-red-500'>
                Password confirmation does not match the password.
              </div>
            )}
            <div>
              <button
                type="submit"
                className="flex w-full border border-black justify-center bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Account
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/signin" className="font-semibold leading-6 text-black underline hover:no-underline">
              Sign in to your account
            </Link>
          </p>
        </div>
      </div>
    
  );
};

export default RegisterForm;
