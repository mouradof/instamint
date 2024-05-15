import React, { useState } from "react";
import { useRouter } from "next/router";

const DeleteProfile = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    const userId = JSON.parse(localStorage.getItem("user"))?.id;

    try {
      const response = await fetch(`http://localhost:4000/api/user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      setSuccess(true);
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(countdownInterval);
        router.push("/register");
      }, 5000);
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(`/profile/${JSON.parse(localStorage.getItem("user"))?.id}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Delete Account</h1>
        {!success ? (
          <>
            <p className="mb-6 text-gray-700">Please enter your password to confirm the deletion of your account.</p>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <div className="flex justify-between">
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
              >
                {isLoading ? "Deleting..." : "Delete Account"}
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                Cancel
              </button>
            </div>
            {error && <div className="mt-4 text-red-500">{error.message}</div>}
          </>
        ) : (
          <>
            <p className="mb-6 text-gray-700">Your account has been deleted. You will be redirected to the registration page in {countdown} seconds.</p>
            <div className="relative w-full h-4 bg-gray-200 rounded">
              <div
                className="absolute top-0 left-0 h-4 bg-red-500 rounded transition-width duration-1000"
                style={{ width: `${(5 - countdown) * 20}%` }}
              ></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DeleteProfile;
