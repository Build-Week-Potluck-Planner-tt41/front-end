import React,{useState, useEffect}from 'react'
import { axiosWithAuth } from '../utils/axioswithauth'
import { useParams } from 'react-router-dom'

function GuestDash ({getPotLuck}){

    const[potluck, setPotLuck]= useState([])
    const {id} = useParams()

    const fetchPotLuck = () =>{
            axiosWithAuth()
            .get('/potlucks ')
            .then((res) =>{
                console.log('Res in Guest Dashboard:',res)
                setPotLuck(res.data)
            })
            .catch((err)=>{
                console.log('ERR getting potluck with ID:',err.message)
            })
          }
          useEffect(() =>{
            fetchPotLuck()
        },[])

        
        
    return(
        <div className='guest-dash'>
            <h3>Current Potlucks</h3>
            <ol>
                {potluck.map((potlucks) =>{
                    return <div></div>
                })}
            </ol>
        </div>
    )
}

export default GuestDash;