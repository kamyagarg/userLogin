import { Fragment, useState, useEffect } from "react";
import Modal from "react-modal";
import close from "../../Assets/Icons/close.svg";
import { CLOSE_CONST } from "../Constants";

const CommonModal = (props) => {
  const { children, display, onClose } = props;

  return (
    <div>
      <Modal
        isOpen={display}
        // className="modalContainer"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgb(0,0,0.7)",
            zindex: 1
          }
        }}
        onRequestClose={onClose}
      >
        <img src={close} alt={CLOSE_CONST} onClick={onClose} />
        {children}
      </Modal>
    </div>
  );
};

export default CommonModal;
