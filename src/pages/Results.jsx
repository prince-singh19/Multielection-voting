import React, { useEffect, useState } from 'react'
import ResultElection from '../components/ResultElection'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Results = () => {


  const token = useSelector(state => state?.vote?.currentVoter?.token);
const navigate = useNavigate()

  useEffect(()=>{
    if(!token){
      navigate('/')
    }
  },[])
  const [elections, setElections] = useState([])

  

  const getElections = async (e) =>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/elections`,
        {withCredentials: true, headers:{Authorization:`Bearer ${token}`}}
      )
      const elections = await response.data;
      setElections(elections)
    } catch (error) {
      console.log(error)
    }
  }

useEffect (() =>{
  getElections()
}, [])


  return (
    <section className="results">
      <div className="container results__container">
        {
          elections.map(election => (
            <ResultElection key={election._id} {...election} />
          ))
        }
      </div>
    </section>
  )
}

export default Results
