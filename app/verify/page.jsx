'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/firebase';

export default function VerifyPage() {
  const [status, setStatus] = useState('loading'); // 'loading' | 'waiting' | 'verified'
  const router = useRouter();

  useEffect(() => {
    let interval;

    const checkVerification = (user) => {
      if (!user) {
        setStatus('loading');
        return;
      }

      setStatus('waiting');

      interval = setInterval(async () => {
        await user.reload();
        if (user.emailVerified) {
          setStatus('verified');
          clearInterval(interval);
          setTimeout(() => router.push('/SignIn'), 3000);
        }
      }, 2000);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      checkVerification(user);
    });

    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff6f1] px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800">Checking user status...</h2>
            <p className="text-gray-500 mt-2">Please wait a moment.</p>
          </>
        )}

        {status === 'waiting' && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800">Verify your email</h2>
            <p className="text-gray-600 mt-2">Check your inbox and click the verification link.</p>
            <p className="text-sm text-orange-500 mt-4">Waiting for verification...</p>
          </>
        )}

        {status === 'verified' && (
          <>
            <h2 className="text-2xl font-semibold text-green-600">Email Verified ✅</h2>
            <p className="text-gray-600 mt-2">Redirecting to login...</p>
          </>
        )}
      </div>
    </div>
  );
}
