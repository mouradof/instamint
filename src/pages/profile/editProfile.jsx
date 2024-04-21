import React, { useState, useRef, useEffect } from 'react';

function EditUserProfile() {
  const [user, setUser] = useState({
    username: '',
    bio: '',
    profileImage: '',
    coverImage: ''
  });
  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:4000/api/user/1')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setUser({
          ...data,
          profileImage: data.profileImage || '/images/default-profile-picture.jpg',
          coverImage: data.coverImage || '/images/default-cover-picture.jpg'
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = event => {
    const { name, value } = event.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = event => {
    const { name, files } = event.target;
    if (files && files[0]) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);
      fileReader.onload = () => {
        setUser(prevState => ({
          ...prevState,
          [name]: fileReader.result
        }));
      };
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
      formData.append(key, value);
    });

    fetch('http://localhost:4000/api/user/1', {
      method: 'PUT',
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      alert('User updated successfully!');
    })
    .catch(error => {
      console.error('Error updating user:', error);
      setError(error);
    })
    .finally(() => setLoading(false));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-3/4 mt-4 bg-white shadow rounded-lg p-4">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="Username" />
          <textarea name="bio" value={user.bio} onChange={handleChange} placeholder="Bio" />
          <div>
            <label>
              Profile Image (click to change):
              <img src={user.profileImage} alt="Profile" onClick={() => fileInputRef.current.click()} />
              <input type="file" name="profileImage" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            </label>
          </div>
          <div>
            <label>
              Cover Image (click to change):
              <img src={user.coverImage} alt="Cover" onClick={() => coverInputRef.current.click()} />
              <input type="file" name="coverImage" ref={coverInputRef} onChange={handleFileChange} className="hidden" />
            </label>
          </div>
          <button type="submit" disabled={isLoading} className="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default EditUserProfile;
