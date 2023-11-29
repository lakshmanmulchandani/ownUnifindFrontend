import React from 'react'
import loginBoy from "./../assets/loginBoy.png"
import {useNavigate} from "react-router-dom"
import "./styles.css"

const Welcome = () => {
  const navigate = useNavigate();

  const tologin = () => {
    navigate("/login")
      }
      const tosignup = () => {
        navigate("/signup")
          }
  return (
     <div className='Ending'>
        <div className="ending-heading" >
        <img src={loginBoy}></img>
        <h1>Unifind</h1>
        <h4>Find what's lost, connect what's found
            <br />
             – your lost items, a click away!</h4>
      </div>
      <div className='welcome-buttons-wrapper'>
      <div onClick={tologin} className='welcome-btn'>Login</div>
      <div onClick={tosignup} className='welcome-btn'>Signup</div>
      </div>

   
    
    </div>
  )
}

export default Welcome;