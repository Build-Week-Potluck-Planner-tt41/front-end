import React, {useState,useEffect} from 'react'
import PotLuckCard from './potLuckCard'
import {axiosWithAuth} from '../utils/axioswithauth'

const initialValue = {
    name:'',
}


const SearchPot = ({potLuck}) =>{
    const [formValues,setFormValues] = useState(initialValue)

    const fetchPotLuck = () =>{
        axiosWithAuth()
        .get('/potlucks')
        .then((res) =>{
            console.log('GET Res in Search:',res)
            setFormValues(res.data)
        })
        .catch((err)=>{
            console.log('ERR in Search:',err.message)
        })
      }
      useEffect(() =>{
        fetchPotLuck()
    },[])

    const onChange=(e) =>{
        e.preventDefault()
        setFormValues({
            [e.target.name]:e.target.value
        })
    }
            
        
    const search = (e) =>{
    e.preventDefault();
    if(e.target.value === potLuck.potLuck_name){
        return <div>
            <PotLuckCard />
        </div>
    } else{
        <div><p>Potluck Doesnt Exist Sorry!</p></div>
    }
        
    }

    return(
        <form className='guest-search' onSubmit={search}>
                   <label>Search Potlucks:</label>
                   <input type='text' name='name' value={formValues.name} onChange={onChange} placeholder='Search Potlucks'></input>
                   <button type='submit'>Search</button>
                   </form> 
                
    )
}

export default SearchPot

