import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import avatar1 from '@/assets/images/user/avatar-icon.png';
import { LuLoader, LuLogOut } from 'react-icons/lu';

const ProfileDropdown = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isOpen, setIsOpen] = useState(false); // ✅ toggle state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const dropdownRef = useRef(null); // ✅ reference for click-outside

  // ✅ Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
        setName(data.name);
      } catch (err) {
        console.error('Failed to load user profile', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // ✅ Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/update`,
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword)
      return alert('Passwords do not match!');
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/change-password`,
        {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Password changed successfully!');
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to change password');
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* ✅ Toggle Button */}
      <button
        type="button"
        onClick={handleToggle}
        className="rounded-full cursor-pointer focus:outline-none"
      >
        <img
          src={avatar1}
          alt="user"
          className="rounded-full size-10 border border-gray-300"
        />
      </button>

      {/* ✅ Dropdown visible only when isOpen */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          {loading ? (
            <div className="flex justify-center p-8">
              <LuLoader className="animate-spin text-gray-500" size={24} />
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                <img src={avatar1} alt="avatar" className="size-12 rounded-full" />
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                    {user?.name}
                  </h4>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="grid grid-cols-3 text-center border-b border-gray-200 dark:border-gray-700">
                {['profile', 'edit', 'password'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 text-sm font-medium ${
                      activeTab === tab
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab === 'profile'
                      ? 'Profile'
                      : tab === 'edit'
                      ? 'Edit'
                      : 'Password'}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="p-4 max-h-[350px] overflow-y-auto">
                {activeTab === 'profile' && (
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-semibold text-gray-800">{user?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-semibold text-gray-800">{user?.email}</p>
                    </div>
                    
                  </div>
                )}

                {activeTab === 'edit' && (
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-600 font-medium">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
                    >
                      Save Changes
                    </button>
                  </form>
                )}

                {activeTab === 'password' && (
                  <form onSubmit={handleChangePassword} className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600 font-medium">
                        Old Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.oldPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            oldPassword: e.target.value,
                          })
                        }
                        className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 font-medium">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            newPassword: e.target.value,
                          })
                        }
                        className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 font-medium">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
                    >
                      Update Password
                    </button>
                  </form>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 dark:border-gray-700">
                <Link
                  to="/logout"
                  className="flex items-center gap-2 p-3 text-red-500 hover:bg-red-50 rounded-b-lg justify-center"
                >
                  <LuLogOut size={18} /> Logout
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
