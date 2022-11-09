import React, { useEffect, useRef, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import format from "date-fns/format";
import { Button, TextField } from "@mui/material";

function getFormatDate(date) {
  var year = date.getFullYear(); //yyyy
  var month = 1 + date.getMonth(); //M
  month = month >= 10 ? month : "0" + month; //month 두자리로 저장
  var day = date.getDate();
  day = day >= 10 ? day : "0" + day; //day 두자리로 저장
  return year + "-" + month + "-" + day;
}

function RequestOW() {
  const formRef = useRef();
  const dateRef = useRef();
  const [owDate, setOwdate] = useState(getFormatDate(new Date()));

  const handleDateChange = (date) => {
    setOwdate(date.target.value);
  };

  const urlSave = "http://43.200.115.198:8080/empregister.jsp";
  //const urlSave = "http://localhost:8080/empregister.jsp";
  //const urlGetCls = "http://localhost:8080/empGetOrg.jsp";

  const clickSaveButton = () => {
    console.log(dateRef.current.value);
    if (formRef.current.reportValidity()) {
      if (window.confirm("신청하시겠습니까?")) {
        let postParam = qs.stringify({
          name: name.current.value,
          englishName: englishName.current.value,
          identityNumberFront: identityNumberF.current.value,
          identityNumberBack: identityNumberB.current.value,
          email: email.current.value,
          tel: tel.current.value,
          address: address.current.value,
          gender: gender,
          married: married,
          center: center.split("-")[0],
          dept: dept.split("-")[0],
          team: team.split("-")[0],
          rank: rank,
          dateComeIn: dateComeIn,
          loginId: Cookie.getCookie("employeeInfo").id,
          img_base64: picture.img,
        });

        // axios.post(urlSave, postParam).then((response) => {
        //   console.log(response);
        //   if (response.data.result === "success") {
        //     alert("저장되었습니다.");
        //   } else {
        //     alert("error");
        //   }
        // });
      }
    }
  };

  return (
    <>
      <form ref={formRef}>
        <div
          style={{
            marginTop: "40px",
            marginLeft: "60px",
          }}
        >
          <p>신청날짜</p>
        </div>
        <hr className="card_lineBar" align="left" />
        <div
          style={{
            marginTop: "30px",
            marginLeft: "60px",
          }}
        >
          <input
            style={{
              width: "150px",
              height: "40px",
              fontSize: "15px",
              marginRight: "20px",
            }}
            ref={dateRef}
            type="date"
            id="start"
            name="trip-start"
            value={owDate}
            onChange={handleDateChange}
            min="2022-01-01"
          ></input>
        </div>
        <div
          style={{
            marginTop: "40px",
            marginLeft: "60px",
          }}
        >
          <p>신청시간</p>
        </div>

        <hr className="card_lineBar" align="left" />
        <div
          style={{
            marginTop: "30px",
            marginLeft: "60px",
          }}
        >
          <input
            style={{
              width: "150px",
              height: "40px",
              fontSize: "15px",
              marginRight: "20px",
            }}
            type="time"
            id="appt"
            name="appt"
            min="09:00"
            max="18:00"
            required
          />
          ~
          <input
            style={{
              width: "150px",
              height: "40px",
              fontSize: "15px",
              marginLeft: "20px",
            }}
            type="time"
            id="appt"
            name="appt"
            min="09:00"
            max="18:00"
            required
          />
        </div>
        <div
          style={{
            marginTop: "40px",
            marginLeft: "60px",
          }}
        >
          <p>사유</p>
        </div>
        <div
          style={{
            marginTop: "30px",
            marginLeft: "60px",
          }}
        >
          <TextField
            multiline
            rows={4}
            InputProps={{ sx: { width: "70vw", height: "10vh" } }}
            inputRef={name}
          />
        </div>
        <div>
          <Button
            style={{
              marginTop: "70px",
              marginLeft: "45%",
              width: "150px",
            }}
            onClick={() => clickSaveButton()}
            variant="contained"
          >
            신청하기
          </Button>
        </div>
      </form>
    </>
  );
}

export default React.memo(RequestOW);
