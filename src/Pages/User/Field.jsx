import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
const Field = (props) =>
{
    const [edit,setEdit] = useState(true);


    const handleToggleEdit = () => {
        setEdit(!edit);
      };

      const handleSubmit = async() => {
        

        let userdata;
        const tokenString = localStorage.getItem('token'); 
        const token = JSON.parse(tokenString);
        const api = axios.create({
            
          baseURL: BACKEND_URL, 
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', 
          },
        });
        
              try {
              
                const res = await  api.get(`./user`)
                 userdata = res.data.user
        
              } catch (error) {
                console.log(error.message)
              }



       const val = props.val;
       userdata[val] = props.state;


        const res = await  api.put(`./user/${props.id}`,userdata)


      } 



    return <>
{props.icon}
<label htmlFor={props.labelName}> {props.labelName} </label>
<br />
<div className='profile-input'>
<input type={props.type} placeholder={props.placeholder} name={props.name} disabled = {edit} value={props.state}
 onChange={(e)=>props.setstate(e.target.value)}
  />

<div onClick={handleToggleEdit} >
    {
        edit?(<div className='edit' >Edit</div>):(<div className='done' onClick={handleSubmit}   >Done</div>)
    }
</div>
</div>
    </>
}

export default Field