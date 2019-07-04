import React from 'react';

const Modal = (props) => {
  return (
    <>
      <div className="modal">
        <span className="modal-close" onClick={props.onCloseHandle}>&times;</span>
        <div className="modal-image">
          {props.image}
        </div>
      </div>
    </>
  )
}

export default Modal;