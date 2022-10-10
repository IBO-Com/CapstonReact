import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import "../css/HrInfo/AppointmentCheck.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const App = () => {
  const classes = useStyles();
  const [appointment, setAppointment] = React.useState("");

  const handleChange = (event) => {
    setAppointment(event.target.value);
  };

  return (
    <div className="appointmentCheck_contianer">
      <div className="appointmentCheck_title">
        <p>발령</p>
        <div className="appointmentCheck_select">
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="appointmentList">구분</InputLabel>
            <Select value={appointment} onChange={handleChange} label="Age">
              <MenuItem value={0}>부서이동</MenuItem>
              <MenuItem value={1}>승진</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="appointmentCheck_list">
        <table className="appointmentCheck_table">
          <th>번호</th>
          <th>발령구분</th>
          <th>발령일자</th>
          <th>발령소속</th>
          <th>직책</th>
          <th>근무지</th>
          <th>재직상태</th>
          <th>사원구분</th>
          <th>급여유형</th>
          <th>파견/겸직소속</th>
          <th>퇴직사유</th>
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
            <td>TEST-32777</td>
            <td> </td>
          </tr>
          <tr>
            <td>2</td>
            <td>부서이동</td>
            <td>2018-01-01</td>
            <td>기술연구소</td>
            <td>상무보</td>
            <td>판교</td>
            <td>재직</td>
            <td>임원</td>
            <td>연봉제</td>
            <td>TEST-32777</td>
            <td> </td>
          </tr>
          <tr>
            <td>3</td>
            <td>부서이동</td>
            <td>2018-01-01</td>
            <td>기술연구소</td>
            <td>상무보</td>
            <td>판교</td>
            <td>재직</td>
            <td>임원</td>
            <td>연봉제</td>
            <td>TEST-32777</td>
            <td> </td>
          </tr>
          <tr>
            <td>4</td>
            <td>부서이동</td>
            <td>2018-01-01</td>
            <td>기술연구소</td>
            <td>상무보</td>
            <td>판교</td>
            <td>재직</td>
            <td>임원</td>
            <td>연봉제</td>
            <td>TEST-32777</td>
            <td> </td>
          </tr>
          <tr>
            <td>5</td>
            <td>부서이동</td>
            <td>2018-01-01</td>
            <td>기술연구소</td>
            <td>상무보</td>
            <td>판교</td>
            <td>재직</td>
            <td>임원</td>
            <td>연봉제</td>
            <td>TEST-32777</td>
            <td> </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default App;
