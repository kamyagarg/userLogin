import { Fragment, useState, useEffect } from "react";
import Modal from "react-modal";
import close from "../../Assets/Icons/close.svg";
import { CLOSE_CONST } from "../Constants";

const CommonModal = (props) => {
  const { children, display, onClose } = props;

  const customStyles = {
    content: {
      height: "50%",
      width: "50%",
    },
  };

  return (
    <div className="modal">
      <Modal
        isOpen={display}
        className="modalContainer"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.4)",
            zindex: 1,
          },
        }}
        onRequestClose={onClose}
      >
        <div className="modalItems">
          <img
            src={close}
            alt={CLOSE_CONST}
            onClick={onClose}
            className="crossImg"
          />
          {children}
        </div>
      </Modal>
    </div>
  );
};

export default CommonModal;
