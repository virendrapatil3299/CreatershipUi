import { useEffect, useState } from 'react';

import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from '../../../lib/firebase'; // Your configured Firebase instance

export default function Security() {
  const [form, setForm] = useState({
    current: '',
    new: '',
    confirm: '',
    showPassword: false,
  });
  const [twoFA, setTwoFA] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const user = auth.currentUser;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleVisibility = () =>
    setForm((prev) => ({ ...prev, showPassword: !prev.showPassword }));

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    if (form.new !== form.confirm) {
      return setMessage('New passwords do not match');
    }

    try {
      setLoading(true);
      const credential = EmailAuthProvider.credential(user.email, form.current);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, form.new);
      setMessage('Password updated successfully!');
    } catch (err) {
      console.error(err);
      setMessage(err.message || 'Password update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePasswordUpdate} className="text-gray-700">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left: Change Password */}
        <div>
          <h3 className="text-lg font-bold mb-2">Change Password</h3>
          <p className="text-sm text-gray-500 mb-6">
            Update your password to keep your account secure
          </p>

          {/* Input Fields */}
          {['current', 'new', 'confirm'].map((field) => (
            <div key={field} className="relative mb-4">
              <input
                type={form.showPassword ? 'text' : 'password'}
                placeholder={
                  field === 'current'
                    ? 'Current Password'
                    : field === 'new'
                    ? 'New Password'
                    : 'Confirm New Password'
                }
                value={form[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className="w-full border border-gray-300 rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={toggleVisibility}
              >
                👁️
              </span>
            </div>
          ))}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-orange-400 to-rose-400 text-white w-full py-2 rounded-full font-semibold mt-4 hover:opacity-90 transition"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>

          {message && (
            <p className="text-sm mt-3 text-center text-red-500">{message}</p>
          )}
        </div>

        {/* Right: 2FA and Sessions */}
        <div className="pt-2">
          <h3 className="text-lg font-bold mb-2">Two-factor Authentication</h3>
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={twoFA}
                onChange={() => setTwoFA(!twoFA)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-checked:bg-orange-400 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-300 transition-all" />
            </label>
            <span className="font-medium">Enable two-factor authentication</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Add an extra layer of security by requiring both a password and verification code.
          </p>

          {/* Sessions */}
          <button
            type="button"
            onClick={() => alert('Session management coming soon')}
            className="mt-6 px-6 py-2 border border-orange-400 text-orange-500 rounded-full font-medium hover:bg-orange-50 transition flex items-center gap-2"
          >
            🖥️ View Last Logged Sessions
          </button>
        </div>
      </div>
    </form>
  );
}
