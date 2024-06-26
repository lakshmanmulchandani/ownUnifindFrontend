import React, { useEffect } from 'react'
import "./profile.css"
import { useState } from 'react'
import { BACKEND_URL } from '../../constants'
import Field from './Field'
import {useNavigate, useOutletContext} from "react-router-dom"
import axios from 'axios'


const Profile = (props) => {
  const outletcontext = useOutletContext();
   const {name,setname,email,setemail,orgId,setorgId,phone,setphone,id,setId,password,setpassword} = outletcontext
    // const name = props.name;
    // const setname = props.setname;
    // const email = props.email;
    // const setemail = props.setemail;
    // const orgId = props.orgId;
    // const setorgId = props.setorgId;
    // const phone = props.phone;
    // const setphone = props.setphone;
    // const id = props.id;
    // const setId = props.setid;
    // const password = props.password;
    // const setpassword = props.setpassword;

    const navigate = useNavigate();

    const logOut = () => {

localStorage.removeItem('token');
localStorage.removeItem('user');

      navigate("/ending")
    }
    
    const deleteAccount = async() => {
      const tokenString = localStorage.getItem('token'); 
const token = JSON.parse(tokenString);
      try {
        const api = axios.create({
    
          baseURL: BACKEND_URL, 
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', 
          },
        });
        
        const res = await  api.delete(`./user/${id}`)

      } catch (error) {
        console.log(error)
      }

      logOut();
    
    }
      




 
    














    const user =  <i class="fa fa-user" aria-hidden="true"></i>;
    const pho =   <i class="fa fa-phone" aria-hidden="true"></i>;
    const building =   <i class="fa fa-building" aria-hidden="true"></i>;
    const unlock =         <i class="fa fa-unlock" aria-hidden="true"></i>;
    const envlope = <i class="fa fa-unlock" aria-hidden="true"></i>;


 

    
  return (
    <div className = "profile">
        <div className="profile-heading">Profile</div>
        <div className="profile-form">

        <Field id = {id} icon = {user} val = "userName"  labelName = "Your Name" placeholder="Login Person Name" state = {name} setstate = {setname}  />
        <Field  id = {id} icon = {envlope} val = "userEmail"  labelName = "Email" placeholder="email@email.com" state = {email} setstate = {setemail}  />

        <Field  id = {id} icon = {pho} val = "phoneNO"  labelName = "phone" placeholder="Enter your phone number" state = {phone} setstate = {setphone}  />
        <Field  id = {id} icon = {building} val = "orgId" labelName = "Organisation Number" placeholder="Organisation Number" state = {orgId} setstate = {setorgId}  />
        <Field  id = {id} icon = {unlock} val = "password"  labelName = "password" placeholder="Password" state = {password} setstate = {setpassword}  />


      
       

        <div className='profile-btns'>
            <div className='delete-btn' onClick={deleteAccount}  ><button id='btn-text' type="button">Delete Account</button></div>
            <div className='logout-btn' onClick={logOut} ><button  id='btn-text' on  type="button">Log Out</button></div>
       </div>
        
        </div>
  
        
       
    </div>
  )
}

export default Profile