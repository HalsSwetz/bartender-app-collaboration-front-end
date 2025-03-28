import { useEffect, useState } from "react";
import userService from "../../services/userService";
import { useNavigate, useParams } from 'react-router';

import styles from "../../css-styling/EditProfile.module.css";

const EditProfile = ({ user }) => {
  const { userId } = useParams();  
    const navigate = useNavigate();
    const initialState = {username: '', bio: '', profileImage: '' };
    const [formData, setFormData] = useState(initialState);
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        const userData = await userService.getProfile(userId);
        setFormData(userData);
      };
      
      if (userId) fetchUserProfile();

      return ()=> setFormData(initialState);
    }, [userId] );
    
  
    const handleChange = (evt) => {
      setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };
  
    const handleSubmit = async (evt) => {
      evt.preventDefault();
      try {
        const profileData = {
          username: formData.username,
          bio: formData.bio,
          profileImage: formData.profileImage
        };

        await userService.updateProfile(userId, profileData);
        navigate(`/profiles/${userId}`);

      } catch (error) {
        
      }
    };

    return (
      <div className={styles.profileContainer}>
        <div className={styles.formContainer}>
          <h1 className={styles.profileHeader}>Edit Profile</h1>
  
          <form onSubmit={handleSubmit}>
    
            <div className={styles.formGroup}>
              <label className={styles.myProfileBio} htmlFor="username-input">Username: </label>
              <input
                className={styles.input}
                required
                type="text"
                name="username"
                id="username-input"
                value={formData.username}
                onChange={handleChange}
                maxLength={100}
              />
            </div>
  
            <div className={styles.formGroup}>
              <label className={styles.myProfileBio} htmlFor="bio-input">Bio: </label>
              <textarea
                className={styles.textarea}
                name="bio"
                id="bio-input"
                value={formData.bio}
                onChange={handleChange}
                maxLength={500}
              />
            </div>
  
            <div className={styles.formGroup}>
              <label className={styles.myProfileBio} htmlFor="profileImage-input">Profile Image URL: </label>
              <input
                className={styles.input}
                type="text"
                name="profileImage"
                id="profileImage-input"
                value={formData.profileImage}
                onChange={handleChange}
              />
            </div>

  
            <button type="submit" className={styles.addButton}>
              Save Changes
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default EditProfile;