import React, { useState } from "react";
import "./Style/modal.css";

export default function Modal({ title, descrip, price, image, size, quantity }) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Buy
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
           
            <div className="parent">
                <div className="div1">
                {image && <img src={image} alt={title} className="image "/>}
                </div>

                <div className="div3">
                <h2>{title}</h2>
                </div>
                
                <div className="div4">
                  <h3>{descrip}</h3>
                </div>
                
                
                {/* Descripccion */}
                <div className="div5">
                  <h3>{quantity}</h3>
                  <h3>{size}</h3>
                  <h3>{price}</h3>
                </div>
            </div>
    
              
            <button className="close-modal" onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      )}
      
    </>
  );
}