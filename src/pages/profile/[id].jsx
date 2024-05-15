import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComments, faRetweet, faBars, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

// Fonction pour formater les nombres
const formatNumber = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + ' B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + ' M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + ' K';
  }
  return num.toString();
};

const ProfileHeader = ({ user }) => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleDeleteAccountRedirect = () => {
    router.push(`/profile/deleteProfile`);
  };

  return (
    <div className="w-full h-56 bg-cover bg-center relative" style={{ backgroundImage: `url(${user.coverImage})` }}>
      <div className="absolute top-4 left-4">
        <img src="/images/logo-Instamint.png" alt="Company Logo" className="h-29 w-14" />
      </div>
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleMenu}
          className="p-2 text-white bg-gray-800 bg-opacity-75 rounded-full hover:bg-opacity-100 transition-opacity duration-300"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
        {showMenu && (
          <div className="absolute right-0 mt-12 bg-white rounded shadow-lg w-48">
            <ul className="text-gray-700">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => router.push("/profile/editProfile")}
              >
                Edit Profile
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => router.push("/profile/changePassword")}
              >
                Change Password
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleDeleteAccountRedirect}>
                Delete Account
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfileContent = ({ user }) => (
  <div className="w-3/4 mt-4 px-4 flex flex-col items-start">
    <div className="flex w-full">
      <div className="flex flex-col items-start mr-8">
        <img src={user.profileImage} alt="Profile" className="h-24 w-24 rounded-full border-4 border-white" />
      </div>
      <div className="flex-grow flex justify-around">
        <div className="flex flex-col items-center">
          <span className="font-bold text-lg" title={user.followers}>{formatNumber(user.followers)}</span>
          <span className="text-sm text-gray-600">Followers</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-lg" title={user.following}>{formatNumber(user.following)}</span>
          <span className="text-sm text-gray-600">Following</span>
        </div>
      </div>
    </div>
    <div className="flex flex-col items-start mr-8">
      <div className="mt-2">
        <div className="text-xl font-bold">{user.username}</div>
        <div className="text-sm text-gray-600">{user.bio || "No bio provided."}</div>
      </div>
    </div>
    <hr className="w-full mt-4" />
  </div>
);

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("user"))?.id;
        if (!userId) {
          throw new Error("No user ID found");
        }

        const response = await axios.get(`http://localhost:4000/api/user/${userId}`);
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/login");
      }
    };

    // Fetch user data initially
    fetchUserData();

    // Set up polling to fetch user data every 10 seconds
    const interval = setInterval(fetchUserData, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="flex flex-col items-center w-full">
      {user ? (
        <>
          <ProfileHeader user={user} />
          <ProfileContent user={user} />
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default ProfilePage;
