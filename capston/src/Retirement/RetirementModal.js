import React from "react";
import "../css/Retirement/RetirementModal.css";
import closeBtn from "../img/closeBtn.png";

const ReriementModal = ({ setOpenModal, openModal, retInfo }) => {
  console.log("퇴직 데이터2 : ", retInfo);
  return (
    <div
      className={
        openModal == true ? "retirementModal_div" : "retirementModal_div_hidden"
      }
    >
      <div className="retirementModal_menu">
        <div className="retirementModla_title">
          ❗퇴직 사유 - {retInfo.teamKR + "  " + retInfo.name}
        </div>
        <div
          className="retirementModal_close_div"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          <img className="retirementModal_close" src={closeBtn}></img>
        </div>
      </div>

      <div className="retirementModal_contents">{retInfo["ret_reason"]}</div>
    </div>
  );
};

export default ReriementModal;
