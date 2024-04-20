import React, { useState, useEffect } from "react";

const EditProfilePage = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    bio: ''
  });
  const [alert, setAlert] = useState({ message: '', type: '', show: false });

  useEffect(() => {
    fetch('http://localhost:4002/api/user/2') // Utiliser l'ID de l'utilisateur connecté
      .then(response => response.json())
      .then(data => setUserData({
        username: data.username,
        email: data.email,
        bio: data.bio
      }))
      .catch(error => {
        console.error('Failed to load user data', error);
        showAlert('Failed to load user data. Please try again.', 'error');
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:4002/api/user/2`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: userData.username,
        bio: userData.bio
      })
    })
    .then(response => {
      if (response.ok) {
        showAlert('Profile updated successfully!', 'success');
      } else {
        return response.json().then(data => {
          throw new Error(data.message || 'Error updating profile');
        });
      }
    })
    .catch(error => {
      console.error('Failed to update profile', error);
      showAlert(error.message, 'error');
    });
  };

  const showAlert = (message, type) => {
    setAlert({ message, type, show: true });
    setTimeout(() => {
      setAlert(prevAlert => ({ ...prevAlert, show: false }));
    }, 3000); // Correctly update alert state after 3 seconds
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      {alert.show && (
        <div className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-3 border rounded-md shadow-lg text-white ${alert.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {alert.message}
        </div>
      )}
      <form className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={userData.username}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email (not editable)
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            readOnly
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            placeholder="Bio"
            value={userData.bio}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
