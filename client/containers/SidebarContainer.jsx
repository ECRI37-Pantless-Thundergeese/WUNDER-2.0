import React, { useState, useEffect } from 'react';
import Form from '../components/Form.jsx'
import ParkTally from '../components/ParkTally.jsx'

const SidebarContainer = (props) => {
  return (
    <div className='sidebarContainer'>
      <Form codes={props.codes} userParkData={props.userParkData} />
      <ParkTally codes={props.codes} />
    </div>
  )
}



export default SidebarContainer;