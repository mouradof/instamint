import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Vérifier si l'on est dans un environnement de navigateur
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (!userData) {
        router.push('/login');
      }
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ text: "New passwords do not match!", type: "error" });
      setLoading(false);
      return;
    }

    const userId = JSON.parse(localStorage.getItem("user"))?.id;
    try {
      const response = await axios.put(`http://localhost:4000/api/user/${userId}/change-password`, {
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword
      });
      setMessage({ text: "Password updated successfully!", type: "success" });
      setTimeout(() => {
        router.push(`/profile/${userId}`);
      }, 4000);
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage({ text: "Failed to update password. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 relative">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Change Password</h1>
      {message && (
        <div className={`fixed bottom-0 mb-6 inset-x-0 px-4 py-2 text-center rounded-lg shadow-lg ${message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="oldPassword" className="text-sm font-medium text-gray-700">Old Password:</label>
          <input
            id="oldPassword"
            type="password"
            name="oldPassword"
            value={passwords.oldPassword}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="newPassword" className="text-sm font-medium text-gray-700">New Password:</label>
          <input
            id="newPassword"
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm New Password:</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <button type="submit" disabled={loading} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300">
          {loading ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword
