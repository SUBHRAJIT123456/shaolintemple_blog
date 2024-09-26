import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import './profile.css'; 

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: '',
        confirmPassword: '',
      });
      setProfileImage(user.profileImage); 
      console.log('Profile User Data:', user);
    }
  }, [user]);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: '',
      confirmPassword: '',
    });
    setProfileImage(user.profileImage); 
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const updatedUser = {
      ...user,
      ...formData,
      profileImage: profileImage || user.profileImage,
    };

    try {
      await axiosInstance.put(`/users/${user.id}`, updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setSuccess('Profile updated successfully!');
      setError('');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('An error occurred while updating the profile.');
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/users/${user.id}`);
      localStorage.removeItem('user');
      navigate('/login');
    } catch (err) {
      console.error('Error deleting profile:', err);
      setError('An error occurred while deleting the profile.');
    }
  };

  const placeholderImage = '/assets/images/defaultProfileImage.jpg';

  return (
    <div className="profile-container">
      <button onClick={handleLogout} className="close-button">X</button>
      {isEditing ? (
        <div className="profile-edit-form">
          <h2>Edit Profile</h2>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="New Password (if you want to change it)"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
            <input
              type="file"
              name="profileImage"
              onChange={handleImageChange}
              accept="image/*"
            />
            <button type="submit" className="save-button">Save</button>
            <button type="button" onClick={handleCancelEdit} className="cancel-button">Cancel</button>
          </form>
        </div>
      ) : (
        <div className="profile-details">
          <h2>Profile</h2>
          <img
            src={profileImage || placeholderImage}
            alt="Profile"
            style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
          />
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={handleEditClick} className="edit-button">Edit Profile</button>
          <button onClick={handleDelete} className="delete-button">Delete Account</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
