import React, { useState, useEffect } from 'react';
import Modal from './modal/modal.jsx';

const Icon = (iconData) => {

  const [show, setShow] = useState(false);
  const [parkName, setName] = useState(iconData.park);
  const [parkCode, setCode] = useState(iconData.parkCode);
  const [visible, setVisible] = useState('');

  return (
    < div >
      <img
        src={iconData.imgLink}
        id={iconData.park}
        className={`${iconData.className} imageIcon`}
        onClick={(e) => {
          setShow(true);
          setVisible('visible');
        }}
      />
      <Modal
        onClose={() => { return setShow(false); setVisible('') }}
        show={show}
        parkName={parkName}
        parkCode={parkCode}
        className={visible}
        userParkData={iconData.userParkData[parkCode]}
      />
    </div >
  );

  // we also need an onclick handler
  //
};

// export out the MainContainer
export default Icon;
