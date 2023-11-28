import React, { useState } from 'react'
import "./report.css"
import { useParams } from 'react-router-dom'
import { report } from '../../Api/Api';

function Report() {
  const postid = useParams().id;
  const [description,setDescription] = useState("")
  const handleSubmit = async () =>{
    const res = await report(postid,description);
    if(res.status === 200) alert("Reported successfully")
    setDescription("")

  }

  return (
    <div className='report'>
        <div>
        <h2>Report</h2>
        <h1>Write Report</h1>
        <input value={description} onChange={(e)=>setDescription(e.target.value)} type="text" placeholder='Enter Report' />
        </div>
        <button onClick={handleSubmit} className='btn-primary'>Send</button>
    </div>
  )
}

export default Report