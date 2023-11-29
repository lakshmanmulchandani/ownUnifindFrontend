import React, { useEffect } from 'react'
import "./profile.css"
import { useState } from 'react'
import { BACKEND_URL } from '../../constants'
import Field from './Field'
import {useNavigate} from "react-router-dom"
import axios from 'axios'


const Profile = () => {
    const [name,setname] = useState("")
    const [email,setemail] = useState("")
    const [phone,setphone] = useState("")
    const [orgId,setorgId] = useState("")
    const [password,setpassword] = useState("")
    const [id,setId] = useState("")
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
      





    useEffect(() => {
      console.log("data")
        
        const getdata = async() =>
        {
            
          let user;
          console.log("function is triggered")
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
                    
                    const res = await  api.get(`./user`)
                     user = res.data.user
            
                  } catch (error) {
                    console.log(error.message)
                  }


        if (user) {
            try {
              
              const userDataObject = user;
              console.log(userDataObject)
              if(userDataObject.userEmail)
              {
                  setemail(userDataObject.userEmail)
              }
              else {
                  setemail("Not Available")
              }
              console.log(userDataObject.userName)
              setorgId(userDataObject.orgId);
              setname(userDataObject.userName);
              setphone(userDataObject.phoneNO);
              setpassword("*******")
              setId(userDataObject._id)
              console.log(id)
          
              
            } catch (error) {
              console.error('Error parsing user data:', error);
            }
          }
        }
      
    getdata()
      
      }, []); 
    














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

        <Field  id = {id} icon = {pho} val = "PhoneNO"  labelName = "Phone" placeholder="Enter your phone number" state = {phone} setstate = {setphone}  />
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