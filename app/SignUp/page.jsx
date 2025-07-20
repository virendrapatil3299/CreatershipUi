'use client';

import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Link from 'next/link';

export default function SignUp() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!agreed) {
      setErrorMessage('Please accept the Terms and Privacy Policy');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);
      setSuccessMessage('Verification email sent. Please check your inbox.');

      await fetch('/api/save-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.uid, fullName, email }),
      });

      let verified = false;
      while (!verified) {
        const confirmed = confirm("Once you've verified your email, click OK to continue.");
        await user.reload();
        verified = user.emailVerified;

        if (verified) {
          setSuccessMessage('Email verified successfully!');
          router.push('/SignIn');
          break;
        } else {
          setErrorMessage('Email not verified yet. Please check again.');
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Email already exists or invalid input. Please try again.');
    }
  };

  return (
    <div className='min-h-screen bg-white flex items-center justify-center px-4 py-5'>
    <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white shadow-xl rounded-3xl overflow-hidden">
      {/* Form Section */}
      <div className="p-8 sm:p-10 md:p-14">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Create an account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full name"
            className="w-full px-5 py-3 border rounded-full shadow-sm text-sm text-black"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-5 py-3 border rounded-full shadow-sm text-sm text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              className="w-full px-4 py-3 pr-10 rounded-full border text-sm text-black"
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

          <label className="flex items-start gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              className="mt-1 accent-orange-500"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
            />
            <span>
              I agree to the{' '}
              <a href="/terms" className="text-orange-500 underline">Terms</a> and{' '}
              <a href="/privacy" className="text-orange-500 underline">Privacy Policy</a>
            </span>
          </label>

          {/* Error / Success */}
          {errorMessage && (
            <div className="mb-2 text-sm text-red-600 px-4 py-2 bg-red-100 rounded-md text-center">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="mb-2 text-sm text-green-700 px-4 py-2 bg-green-100 rounded-md text-center">
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-full text-white bg-gradient-to-r from-orange-500 to-orange-400 font-semibold"
          >
            Sign Up
          </button>

          <div className="flex justify-center text-sm text-gray-400 mt-3">OR CONTINUE WITH</div>

          <button
            type="button"
            className="flex items-center justify-center gap-3 w-full py-3 border rounded-full shadow-sm"
          >
            <FcGoogle size={20} />
            <span className="text-sm font-medium text-gray-700">Google</span>
          </button>

          <p className="text-sm text-center mt-4 text-gray-600">
            Already have an account?{' '}
            <Link href="/SignIn" className="text-orange-500 font-medium hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Illustration Section */}
      <div className="hidden md:flex items-center justify-center bg-[#ffefe9] relative">
        <img
          src="/Ui.png"
          alt="Sign up Illustration"
          className="max-w-full w-[80%] rounded-2xl drop-shadow-xl"
        />
      </div>
    </div>
     </div>
  );
}
