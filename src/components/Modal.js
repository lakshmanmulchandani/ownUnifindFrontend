import React, { useEffect } from 'react'

function Modal(props) {
  const handleClose = (e) =>{
    e.stopPropagation();
    props.setOpen(false);
  }

  
  useEffect(()=>{
    if(props.open) document.body.classList.add('modal-open');
    else document.body.classList.remove('modal-open');
  },[props.open])
  useEffect(() =>{
    return () =>{
        document.body.classList.remove("modal-open");
    }
  },[])
  return (
    <div className={!props.open?"displaynone": "modal-container"} onClick={handleClose} >
        {props.children}
    </div>
  )
}

export default Modal