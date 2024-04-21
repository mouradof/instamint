import React, { useState } from 'react';

const DeleteAccountPage = () => {
  const [alert, setAlert] = useState({ message: '', type: '', show: false });

  const handleDeleteAccount = () => {
    fetch('http://localhost:4002/api/user/1', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      if (response.ok) {
        showAlert('Account deleted successfully!', 'success');
      } else {
        throw new Error('Failed to delete account.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showAlert(error.message, 'error');
    });
  };

  const showAlert = (message, type) => {
    setAlert({ message, type, show: true });
    setTimeout(() => {
      setAlert(prevAlert => ({ ...prevAlert, show: false }));
    }, 3000);
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full max-w-xs mx-auto mt-10">
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => setShowModal(true)}
      >
        Delete Account
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Confirm Account Deletion
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
            </div>
            <div className="mt-4">
              <button
                onClick={() => {
                  handleDeleteAccount();
                  setShowModal(false);
                }}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              >
                Delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {alert.show && (
        <div className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-3 border rounded-md shadow-lg text-white ${alert.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {alert.message}
        </div>
      )}
    </div>
  );
};

export default DeleteAccountPage;
