import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { voteActions } from '../store/vote-slice';
import { useNavigate } from 'react-router-dom';


const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(voteActions.changeCurrentVoter(null));
    localStorage.removeItem('currentUser');
    const timer = setTimeout(() => {
      navigate('/');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="logout-container">
      <div className="spinner"></div>
      <p className="logout-message">Logging you out...</p>
    </div>
  );
};

export default Logout;
