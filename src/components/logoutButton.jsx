import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { logout } from '@/utils/useAuth';

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter(); // Initialize useRouter

  const handleLogout = async () => {
    setLoading(true);
    setError('');

    try {
      await logout();
      console.log('Logged out successfully');
      router.push('/'); // Redirect to the home page
    } catch (err) {
      setError('Logout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="p-4 mb-4 text-sm text-red-600 bg-red-100 rounded">
          {error}
        </div>
      )}
      <button
        onClick={handleLogout}
        className={`px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-slate-500 hover:bg-slate-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        disabled={loading}
      >
        {loading ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  );
};

export default LogoutButton;
