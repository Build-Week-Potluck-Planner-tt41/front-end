import React,{useState, useEffect}from 'react'
import { axiosWithAuth } from '../utils/axioswithauth'
import { useParams, Link} from 'react-router-dom'
import PotLuckCard from './potLuckCard'
import styled from 'styled-components'
import SearchPot from './searchPot'

function GuestDash ({getPotLuck}){

    const[potLuck, setPotLuck]= useState([])
    // const[confirmedGuest, setConfirmedGuest] = useState([])
    const {id} = useParams()

    const fetchPotLuck = () =>{
            axiosWithAuth()
            .get('/potlucks')
            .then((res) =>{
                console.log('GET Res in Guest Dashboard:',res)
                setPotLuck(res.data)
            })
            .catch((err)=>{
                console.log('ERR getting potluck:',err.message)
            })
          }
          useEffect(() =>{
            fetchPotLuck()
        },[])

    return(
    
        <StyledGuestDashDiv >
               <h2>Welcome to Guest DashBoard </h2>
               <Link to='/searchPotLuck'>Search Potluck</Link>
            <ol>
                {potLuck.map((potlucks) =>{
                 return <div key={potlucks.potluck_id}>
                       <PotLuckCard  potlucks={potlucks}/>
                       </div>
                })}
            </ol>
            
        </StyledGuestDashDiv>

    )}

export default GuestDash;

const StyledGuestDashDiv = styled.div `
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
font-family: 'Poppins', sans-serif;
width:100%;
background:#f5f0e1;
height:100vh;
color:#DC143C;

h2{
    border: 1px solid black;
    border-radius:15px;
    padding:1%;
    text-align:center;
    background:#1e3d59;
    color:#DC143C;
    text-decoration:underline;
}
`

// const fetchConfirmedGuest = () => {
        //     axiosWithAuth()
        //     .get('/potlucks/1/guests/confirmed')
        //     .then((res) =>{
        //         console.log('RES in ConfirmedGuest GET:',res)

        //     })
        //     .catch((err) =>{
        //         console.log('Error getting Confirmed Guest',err)
        //     })
        // }
        // useEffect(() =>{
        //     fetchConfirmedGuest()
        // },[])