import React from "react";
import "../css/personnelcard/formProofEmp.css";

const App = ({ componentRef }) => {
  return (
    <div ref={componentRef} className="formProofofempMain">
      <div className="perCardtitle">
        <p>재직증명서</p>
        </div>
        <table className="formProofofeTable">
            <tr className="formProofofeFirst">
               <td>성명</td>
               <td></td>
               <td>생년월일</td>
               <td></td>
            </tr>

            <tr className="formProofofeFirst">
               <td>주소</td>
               <td colSpan={3}></td>
            </tr>

            <tr className="formProofofeFirst">
               <td>연락처</td>
               <td></td>
               <td>부서</td>
               <td></td>
            </tr>

            <tr className="formProofofeFirst">
               <td>입사일자</td>
               <td></td>
               <td>직책</td>
               <td></td>
            </tr>
            <tr className="formProofofeFirst formProofofeSecond">
               <td>용도</td>
               <td colSpan={3}>제출용</td>
            </tr>
            
        </table>

         <div className="footer_info_form">
            <p>상기와 같이 재직하고 있음을 증명합니다.</p>   
            <p>2022년 10월 9일</p>
            <p className="mbt">IBO</p>
            <p>대표이사 담 당 자 (인)</p>
         </div>   
    </div>
  );
};

export default App;
