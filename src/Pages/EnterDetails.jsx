import React from 'react'
import loginBoy from "../assets/loginBoy.png"
import axios from 'axios';
import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';



import "./styles.css";
import { BACKEND_URL } from '../constants';


// Retrieve the token from local storage


const handleSubmitAuth = async (formData) => {
const tokenString = await localStorage.getItem('token'); 
const token = await JSON.parse(tokenString);

const api = axios.create({
  
  baseURL: BACKEND_URL, 
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json', // You can add other headers as needed
  },
});

const res = await api.post("./user/userDetails",formData)
const user = res.data.existinguser;
console.log(user);
await localStorage.setItem('user', JSON.stringify(user))

}








const EnterDetails= () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    phoneNO: '',
    orgId: '',
  });
  

  useEffect(() => {
    // Get the query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
  
    // Extract the values of 'token' and 'user'
    const token = urlParams.get('token');
    const user = urlParams.get('user');
    if(token!=null)
    {
    localStorage.setItem('token', JSON.stringify(token))
    localStorage.setItem('user', JSON.stringify(user))
}
  
  

  }, []);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
     const res =  await handleSubmitAuth(formData)
      // Reset the form
      setFormData({
        userName: '',
    phoneNO: '',
    orgId: '',
      });
      navigate("/")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='Signup'>
        <div className="signup-heading" >
        <img src={loginBoy}></img>
        <h1>Enter Details</h1>
        <h4>Create an account so you can explore all the lost Things</h4>
      </div>
      <div className='signup-form' >
        <form action="submit" onSubmit={handleSubmit} >
          <input type="text" name='userName' placeholder='Enter your name'value={formData.userName} onChange={handleChange}  />
          <input type="text" name='phoneNO' placeholder='Phone number' value={formData.phoneNO} onChange={handleChange}  />
          <input type="text" name='orgId' placeholder='Organisation Number' value={formData.orgId} onChange={handleChange}  />
         
          <button type="submit">Done</button>
        </form>
        <div>
      
        </div>
   
      </div>
    </div>
  )
}

export default EnterDetails;