import React from "react";
import Modal from "@material-ui/core/Modal";

const AppointmentModal = ({ openModal, setOpenModal }) => {
  return (
    <div>
      <div className="AppointmentModal_container">
        <div className="AppointmentModal_title">
          <p>인사발령</p>
        </div>
        <div className="AppointmentModal_content"></div>
        <button onClick={() => setOpenModal(false)}>취소</button>
        <button>등록</button>
      </div>
    </div>
  );
};

export default AppointmentModal;

