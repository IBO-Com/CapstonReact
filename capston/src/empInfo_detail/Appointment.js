import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import "../css/empinfo/Appointment.css";
const Appointment = () => {
  const [tableList, setTableList] = useState("*");
  const handleTableList = (event) => {
    setTableList(event.target.value);
  };
  return (
    <div className="Appointment_main">
      <div className="Appointment_header">
        <span>발령</span>
        <FormControl  size="small">
          <Select
            value={tableList || ""}
            sx={{
              minWidth: "153px",
              marginLeft: "15px",
              marginRight: "26px",
            }}
            onChange={handleTableList}>

          <MenuItem value={"*"}>
            전체
          </MenuItem>
          </Select>
        </FormControl>
        

      </div>

      <div className="Appointment_Table">
        <table>
            <thead>
                <tr>
                    <td>번호</td>
                    <td>발령구분</td>
                    <td>발령일자</td>
                    <td>발령소속</td>
                    <td>직책</td>
                    <td>근무지</td>
                    <td>재직상태</td>
                    <td>사원구분</td>
                    <td>급여유형</td>
                    <td>파견/겸직소속</td>
                    <td>퇴직사유</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>부서이동</td>
                    <td>2018-01-01</td>
                    <td>기술연구소</td>
                    <td>상무보</td>
                    <td>판교</td>
                    <td>재직</td>
                    <td>임원</td>
                    <td>연봉제</td>
                    <td>TEST-3777</td>
                    <td></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>부서이동</td>
                    <td>2018-01-01</td>
                    <td>기술연구소</td>
                    <td>상무보</td>
                    <td>판교</td>
                    <td>재직</td>
                    <td>임원</td>
                    <td>연봉제</td>
                    <td>TEST-3777</td>
                    <td></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>부서이동</td>
                    <td>2018-01-01</td>
                    <td>기술연구소</td>
                    <td>상무보</td>
                    <td>판교</td>
                    <td>재직</td>
                    <td>임원</td>
                    <td>연봉제</td>
                    <td>TEST-3777</td>
                    <td></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>부서이동</td>
                    <td>2018-01-01</td>
                    <td>기술연구소</td>
                    <td>상무보</td>
                    <td>판교</td>
                    <td>재직</td>
                    <td>임원</td>
                    <td>연봉제</td>
                    <td>TEST-3777</td>
                    <td></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>부서이동</td>
                    <td>2018-01-01</td>
                    <td>기술연구소</td>
                    <td>상무보</td>
                    <td>판교</td>
                    <td>재직</td>
                    <td>임원</td>
                    <td>연봉제</td>
                    <td>TEST-3777</td>
                    <td></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>부서이동</td>
                    <td>2018-01-01</td>
                    <td>기술연구소</td>
                    <td>상무보</td>
                    <td>판교</td>
                    <td>재직</td>
                    <td>임원</td>
                    <td>연봉제</td>
                    <td>TEST-3777</td>
                    <td></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>부서이동</td>
                    <td>2018-01-01</td>
                    <td>기술연구소</td>
                    <td>상무보</td>
                    <td>판교</td>
                    <td>재직</td>
                    <td>임원</td>
                    <td>연봉제</td>
                    <td>TEST-3777</td>
                    <td></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>부서이동</td>
                    <td>2018-01-01</td>
                    <td>기술연구소</td>
                    <td>상무보</td>
                    <td>판교</td>
                    <td>재직</td>
                    <td>임원</td>
                    <td>연봉제</td>
                    <td>TEST-3777</td>
                    <td></td>
                </tr> <tr>
                    <td>1</td>
                    <td>부서이동</td>
                    <td>2018-01-01</td>
                    <td>기술연구소</td>
                    <td>상무보</td>
                    <td>판교</td>
                    <td>재직</td>
                    <td>임원</td>
                    <td>연봉제</td>
                    <td>TEST-3777</td>
                    <td></td>
                </tr> <tr>
                    <td>1</td>
                    <td>부서이동</td>
                    <td>2018-01-01</td>
                    <td>기술연구소</td>
                    <td>상무보</td>
                    <td>판교</td>
                    <td>재직</td>
                    <td>임원</td>
                    <td>연봉제</td>
                    <td>TEST-3777</td>
                    <td></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>부서이동</td>
                    <td>2018-01-01</td>
                    <td>기술연구소</td>
                    <td>상무보</td>
                    <td>판교</td>
                    <td>재직</td>
                    <td>임원</td>
                    <td>연봉제</td>
                    <td>TEST-3777</td>
                    <td></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>부서이동</td>
                    <td>2018-01-01</td>
                    <td>기술연구소</td>
                    <td>상무보</td>
                    <td>판교</td>
                    <td>재직</td>
                    <td>임원</td>
                    <td>연봉제</td>
                    <td>TEST-3777</td>
                    <td></td>
                </tr><tr>
                    <td>1</td>
                    <td>부서이동</td>
                    <td>2018-01-01</td>
                    <td>기술연구소</td>
                    <td>상무보</td>
                    <td>판교</td>
                    <td>재직</td>
                    <td>임원</td>
                    <td>연봉제</td>
                    <td>TEST-3777</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointment;
