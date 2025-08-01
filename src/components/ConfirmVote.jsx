import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UiActions } from '../store/ui-slice';
import axios from 'axios';
import { voteActions } from '../store/vote-slice';
import { useNavigate } from 'react-router-dom';

const ConfirmVote = ({selectedElection}) => {

    const [modalCandidate,setModalCandidate]=useState({});
const navigate = useNavigate()
    const dispatch = useDispatch()

    const closeCandidateModal = ()=>{
        dispatch(UiActions.closeVoteCandidateModal())
    }
  const selectedVoteCandidate = useSelector(state => state?.vote?.selectedVoteCandidate)
  const token = useSelector(state => state?.vote?.currentVoter?.token);

const currentVoter = useSelector(state => state?.vote?.currentVoter);

    const fetchCandidate = async() =>{
       
       try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/candidates/${selectedVoteCandidate}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    setModalCandidate(await response.data)
   
  } catch (error) {
    console.log(error)
  }
    }

const confirmVote = async () => {
 try {
   const response = await axios.patch(
    `${process.env.REACT_APP_API_URL}/candidates/${selectedVoteCandidate}`,
    {selectedElection},
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const voteResult = response.data;

  dispatch(
    voteActions.changeCurrentVoter({
      ...currentVoter,
      votedElections: voteResult
    })
  );

  navigate('/congrats');
 } catch (error) {
  console.log(error)
 }
 closeCandidateModal();
};




    useEffect(()=>{
        fetchCandidate()
    },[])


  return (
   <section className="modal">
  <div className="modal__content confirm__vote-content">
    <h5>Please confirm your vote</h5>
    
    <div className="confirm__vote-image">
      <img src={modalCandidate.image} alt={modalCandidate.fullName} />
    </div>

    <h2>{modalCandidate?.fullName?.length>17 ?modalCandidate?.fullName?.substring(0,17)+"...":
        modalCandidate?.fullName}</h2>
    <p>{modalCandidate?.motto?.length>45 ? modalCandidate?.motto?.substring(0,45)+"...":
        modalCandidate?.motto}</p>

    <div className="confirm__vote-cta">
      <button className="btn" onClick={closeCandidateModal}>Cancel</button>
      <button className="btn primary" onClick={confirmVote}>Confirm</button>
    </div>
  </div>
</section>

  )
}

export default ConfirmVote
