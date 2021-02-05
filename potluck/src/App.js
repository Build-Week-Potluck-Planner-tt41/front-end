
import React,{useEffect} from 'react'
import HomePage from './components/homePage'
import {axiosWithAuth} from './utils/axioswithauth'
import AddPotLuck from './components/addPotLuck'
import {Route, Switch} from 'react-router-dom'
import SignUpForm from './components/signUpForm';
import LoginForm from './components/loginForm'
import './App.css';
import OrganizerDash  from './components/organizerDash'
import EditPotluck from './components/editPotluck'


import React, { useEffect } from "react";
import HomePage from "./components/homePage";
import { axiosWithAuth } from "./utils/axioswithauth";
import AddPotLuck from "./components/addPotLuck";
import { Route, Switch } from "react-router-dom";
import SignUpForm from "./components/signUpForm";
import LoginForm from "./components/loginForm";
import "./App.css";
import GuestDash from "./components/guestDash";
import SearchPot from "./components/searchPot";
import AddGuestFood from "./components/addGuestFood";
import DisplayGuestPot from "./components/displayGuestPot";


function App() {
  const getPotLuck = () => {
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
    // getPotLuck()
  },[])

      .get("/potlucks")
      .then((res) => {
        console.log("RES IN GET:", res);
      })
      .catch((err) => {
        console.log("Error In GET:", err);
      });
  };
  useEffect(() => {
    getPotLuck();
  }, []);


  return (
    <div className="App">

        <Switch>
      <Route exact path ='/' component={HomePage} />
      <Route path='/sign-up' component={SignUpForm}/> 
      <Route path='/login' component={LoginForm}/> 
      <Route path='/add-potluck' render={
        props =>{
          return(<AddPotLuck {...props} getPotLuck={getPotLuck}  />)
        }}>
      </Route>  
      <Route path="/organizer" component={OrganizerDash} />
      <Route path="/edit-potluck" component={EditPotluck} />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/sign-up" component={SignUpForm} />
        <Route path="/login" component={LoginForm} />
        <Route path="/searchPotLuck" component={SearchPot} />
        <Route
          path="/add-potluck"
          render={(props) => {
            return <AddPotLuck {...props} getPotLuck={getPotLuck} />;
          }}
        ></Route>
        <Route path="/guest" component={GuestDash} />
        <Route path="/add-guestfood" component={AddGuestFood} />
        <Route path="/display" component={DisplayGuestPot} />

      </Switch>
    </div>
  );
}

export default App;
