import React,{useEffect} from 'react'
import HomePage from './components/HomePage'
import {axiosWithAuth} from './utils/axioswithauth'
import AddPotLuck from './components/addPotLuck'
import {Route} from 'react-router-dom'
import './App.css';

function App() {

  const getPotLuck = () =>{
    axiosWithAuth()
    .get('')
    .then((res) =>{
      console.log('RES IN GET:', res)
    })
    .catch((err) =>{
      console.log('Error In GET:',err)
    })
    }
  useEffect(() =>{
    getPotLuck()
  },[])

  
  return (
    <div className="App">
      <Route path ='/Home'>
        <HomePage /> </Route>

      <Route path='/add-potluck' render={
        props =>{
          return(<AddPotLuck {...props} getPotLuck={getPotLuck}  />)
        }}>
      </Route>


    </div>
  );
}

export default App;
