import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import schema from '../validation/schema';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import {axiosWithAuth} from '../utils/axioswithauth'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const initialFormValues = {
    name:'',
    password:'',
    role:''
};
const initialFormErrors = {
    name:'',
    password:'',
    role:''
};
const initialDisabled = true;
const initialUserState = []

export default function LoginForm(props) {
    const [users, setUsers] = useState(initialUserState);
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(initialDisabled);
    const {push} =useHistory()
    // ADDING USER TO STATE W/ CALLBACK//
    // ADDING USER TO STATE W/ CALLBACK//
    const addUser = newUser => {
        setUsers([newUser, ...users]);
        setFormValues(initialFormValues);
    }
    const userSubmit = evt => {
        evt.preventDefault();
        console.log('FORMVALUES:', formValues)
        axios
        .post('https://cors-anywhere.herokuapp.com/https://backend-potlucks.herokuapp.com/api/auth/login', formValues)
        .then((res) =>{
            console.log('RES IN POST',res)
            localStorage.setItem('token',res.data.token)
            setFormValues(initialFormValues)
            push(`/${formValues.role}`)
        })
        .catch((err) =>{
            console.log('err in login POST:',err.message)
        })
        const newUser = {
            name: formValues.name.trim(),
            password: formValues.password.trim(),
            role: formValues.role,
        }
        addUser(newUser)
    }
    // FORM CHANGE AND SUBMIT VALIDATION HANDLING //
    // FORM CHANGE AND SUBMIT VALIDATION HANDLING //
    const userChange = (name, value) => {
        yup
        .reach(schema, name)
        .validate(value)
        .then(() => {
            setFormErrors({
                ...formErrors,
                [name]: '',
            })
        })
        .catch(err => {
            setFormErrors({
                ...formErrors,
                [name]: err.errors[0],
            })
        })
        setFormValues({
            ...formValues,
            [name]: value,
        })
    }
    const onChange = evt => {
        const {name, value} = evt.target;
        userChange(name, value);
    }
    useEffect(() => {
        schema.isValid(formValues).then(valid => {
            setDisabled(!valid)
        })
    }, [formValues]);

    

    return (
        <div>
            <FormStyled onSubmit={userSubmit}>
                <LoginStyled>
                    <TopDiv>
                        <h1>Login</h1><br />
                    </TopDiv>
                    <InfoDiv>
                        <div>{formErrors.name}</div>
                        <div>{formErrors.password}</div>
                        <div>{formErrors.role}</div>
                        <InputDiv>
                            <TextLabel>Name<br />
                            </TextLabel>
                            <TextInput
                                type='text'
                                name='name'
                                value={formValues.name}
                                onChange={onChange}
                            ></TextInput>
                        </InputDiv>
                        <InputDiv>
                            <TextLabel>Password<br />
                            </TextLabel>
                            <TextInput
                                type='password'
                                name='password'
                                value={formValues.password}
                                onChange={onChange}
                            ></TextInput>
                        </InputDiv>
                        <RadioDiv>
                            <RadioLabel>Organizer
                                <Radio
                                    type='radio'
                                    name='role'
                                    value='organizer'
                                    checked={formValues.role === 'organizer'}
                                    onChange={onChange}
                                ></Radio>
                            </RadioLabel>
                            <RadioLabel>Guest
                                <Radio
                                    type='radio'
                                    name='role'
                                    value='guest'
                                    checked={formValues.role === 'guest'}
                                    onChange={onChange}
                                ></Radio>
                            </RadioLabel>
                        </RadioDiv>
                        <Button disabled={disabled}>Login</Button>
                        <p>Dont have an account sign-up here? <br></br> <Link to ="/sign-up">Sign Up Here</Link> </p>
                    </InfoDiv>
                </LoginStyled>
            </FormStyled>
        </div>
    );
}

// STYLED COMPONENTS //

const FormStyled = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    background-color: #f5f0e1;
    height: 100vh;
`;
const LoginStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    height: 500px;
    box-shadow: 0px 1px 6px -2px rgb(128, 127, 127);
    border: 1px solid rgb(210, 210, 210);
    color: #1e3d59;
`;
const TopDiv = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    background-color: #1e3d59;
    color: white;
    width: 100%;
`;
const InfoDiv = styled.div`
    flex: 3;
    display: flex;
    text-align: left;
    width: 80%;
    justify-content: center;
    flex-direction: column;
`;
const InputDiv = styled.div`
    margin: 10px 0;
`;
const TextLabel = styled.label`
    margin: 5px 0;
    font-size: 1.2rem;
    font-weight: 600;
    font-style: italic;
`;
const TextInput = styled.input`
    border-style: none;
    border-radius: 5px;
    width: 200px;
    height: 25px;
    background-color: #FEE5B0;
    border: 2px solid #E4B34A;
`;
const RadioDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
`;
const RadioLabel = styled.label`
    font-weight: 500;
    border: 2px solid #1e3d59;
    border-radius: 5px;
    padding: 5px;
    display: flex;
    align-items: center;
    margin: 10px 0 20px 0;
    width: 40%;
    justify-content: center;
    background-color: #1e3d59;
    color: white;
`;
const Radio = styled.input`
    height: 15px;
    width: 15px;
    color: #1e3d59;
`;
const Button = styled.button`
    width: 50%;
    margin: 0 auto;
    height: 50px;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e3d59;
    border-radius: 10px;
    border-style: none;
    border: 2px solid #1e3d59;
    &:disabled {
        border: 2px solid #B7C9DA;
        color: #B7C9DA;
    }
`;








