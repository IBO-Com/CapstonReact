import React from 'react';
import "../css/personnelcard/formCareeCert.css";

const App = ({componentRef}) => {
   return (
      <div ref={componentRef} className="formProofofempMain">
          <div className="perCardtitle">
        <p>경력증명서</p>
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
               <td>재직기간</td>
               <td colSpan={3} className="enterForm">
                  <div className='date_form'>
                     <div className='date'>
                        <p>2020년 1월 1일부터</p>
                        <p>2020년 12월 31일까지</p>
                     </div>
                     <div className='date2'>
                        <p>(1년 0개월 0일)</p>
                     </div>
                  </div>

               </td>
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