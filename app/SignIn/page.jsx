'use client';

import { useState } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        router.push('/Dashboard'); // change as needed
      } else {
        setErrorMessage('Please verify your email before logging in.');
        await signOut(auth);
      }
    } catch (error) {
      setErrorMessage( ' Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-5">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white shadow-xl rounded-3xl overflow-hidden">
        {/* Left - Login Form */}
        <div className="p-8 sm:p-10 md:p-14">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Login to your account</h2>

          

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-3 text-black rounded-full border border-gray-200 shadow-sm placeholder-gray-400 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <a href="/forgot-password" className="text-sm text-orange-500 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative mt-1">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="w-full px-4 text-black py-3 pr-10 rounded-full border border-gray-200 shadow-sm placeholder-gray-400 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
            </div>

            {errorMessage && (
            <div className="mb-4 text-sm text-red-500  px-4 py-2 rounded-lg text-center">
              {errorMessage}
            </div>
          )}

            <button
              type="submit"
              className="w-full py-3 rounded-full text-white bg-gradient-to-r from-orange-500 to-orange-400 font-semibold shadow-md hover:opacity-90 transition"
            >
              Login
            </button>

            <div className="relative text-center text-sm text-gray-400">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <span className="bg-white px-2 relative z-10">OR CONTINUE WITH</span>
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-3 w-full py-3 border rounded-full shadow-sm hover:bg-gray-50 transition"
            >
              <FcGoogle size={20} />
              <span className="text-sm font-medium text-gray-700">Google</span>
            </button>

            <p className="text-sm text-center text-gray-600 mt-4">
              Don’t have an account?{' '}
              <Link href="/SignUp" className="text-orange-500 font-medium hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>

        {/* Right - Illustration Panel */}
        <div className="hidden md:flex items-center justify-center bg-[#ffefe9] relative">
          <img
            src="/password.png"
            alt="Login Illustration"
            className="max-w-full w-[80%] rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
