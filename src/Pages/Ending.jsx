import React from 'react'
import loginBoy from "./../assets/loginBoy.png"
import {useNavigate} from "react-router-dom"
import "./styles.css"

const Ending = () => {
  const navigate = useNavigate();
  const handleClick = () => {
navigate("/")
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

      <div onClick={handleClick} className='thanks'>Thank you</div>
    
    </div>
  )
}

export default Ending