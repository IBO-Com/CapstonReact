import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import JqxGrid, { jqx } from "jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import format from "date-fns/format";
import DateFnsUtils from "@date-io/date-fns";
import qs from "qs";
import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css";
import koLocale from "date-fns/locale/ko";
import { ExcelRenderer } from "react-excel-renderer";
import * as Utils from "../modules/utils";

class koLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy년　　 MM월", { locale: this.locale });
  }
}

function getFormatDate(date) {
  var year = date.getFullYear(); //yyyy
  var month = 1 + date.getMonth(); //M
  month = month >= 10 ? month : "0" + month; //month 두자리로 저장
  return year + "-" + month;
}

function isNullOrEmpty(value) {
  var returnValue = false;
  try {
    if (
      (value != 0) & !value ||
      typeof value == "undefined" ||
      value == null ||
      (typeof value == "object" &&
        Object.prototype.toString.call(value) != "[object Date]" &&
        !Object.keys(value).length) ||
      (typeof value == "string" && value.trim() == "") ||
      (typeof value == "number" && isNaN(value))
    ) {
      returnValue = true;
    }
  } catch (e) {
    returnValue = false;
  }
  return returnValue;
}

function AttendanceRegister() {
  const myGrid = useRef();
  const name = useRef();
  const [itemList, setItemList] = useState([]);
  const [retrieveDate, setRetrieveDate] = useState(getFormatDate(new Date()));

  //const urlRetrieve = "http://localhost:8080/attretrieve.jsp";
  //const urlSave = "http://localhost:8080/attsave.jsp";
  //const urlClosing = "http://localhost:8080/attclosing.jsp";
  const urlRetrieve = "http://43.200.115.198:8080/attretrieve.jsp";
  const urlSave = "http://43.200.115.198:8080/attsave.jsp";
  const urlDelete = "http://43.200.115.198:8080/attdelete.jsp";
  const urlClosing = "http://43.200.115.198:8080/attclosing.jsp";

  const handleDateChange = (date) => {
    setRetrieveDate(getFormatDate(date));
  };

  let workForm = [
    {
      value: "BK",
      label: "연차",
    },
    {
      value: "BT",
      label: "출장",
    },
    {
      value: "EW",
      label: "연장",
    },
    {
      value: "HW",
      label: "재택",
    },
    {
      value: "NM",
      label: "일반",
    },
    {
      value: "OW",
      label: "외근",
    },
    {
      value: "RW",
      label: "휴일",
    },
  ];

  const workFormSource = {
    datatype: "array",
    datafields: [
      { name: "label", type: "string" },
      { name: "value", type: "string" },
    ],
    localdata: workForm,
  };

  let workFormAdapter = new jqx.dataAdapter(workFormSource, {
    autoBind: true,
  });

  const sources = {
    datafields: [
      { name: "in_date", type: "string" },
      { name: "sabun", type: "string" },
      { name: "name", type: "string" },
      { name: "work_form_cd", type: "string" },
      { name: "work_form_nm", type: "string" },
      { name: "start_datetime", type: "string" },
      { name: "end_datetime", type: "string" },
      { name: "normal_datetime", type: "string" },
      { name: "holiday_datetime", type: "string" },
      { name: "over_datetime", type: "string" },
      { name: "night_datetime", type: "string" },
    ],
    localdata: itemList,
  };

  const [columns] = useState([
    {
      cellsrenderer: (row, column, value) => {
        return (
          '<div style="margin-top:7px;margin-right:2px;text-align:center">' +
          (value + 1) +
          "</div>"
        );
      },
      columntype: "number",
      datafield: "",
      draggable: false,
      editable: false,
      filterable: false,
      groupable: false,
      resizable: true,
      sortable: true,
      text: "",
      width: 50,
      textSize: "14px",
    },
    {
      text: "",
      align: "center",
      cellsalign: "center",
      buttonclick: (row) => {
        console.log(myGrid.current.getrowdata(row));
        if (myGrid.current.getrowdata(row).sabun !== "") {
          if (window.confirm("해당 데이터를 삭제하시겠습니까?")) {
            axios
              .get(urlDelete, {
                params: {
                  in_date: myGrid.current
                    .getrowdata(row)
                    .in_date.replaceAll("-", ""),
                  sabun: myGrid.current.getrowdata(row).sabun,
                  work_form_cd: myGrid.current.getrowdata(row).work_form_cd,
                },
              })
              .then((response) => {
                console.log(response);
                if (response.data.result === "success") {
                  alert("저장되었습니다.");
                  onClickRetrieveButton();
                } else {
                  alert("error");
                }
              });
          }
        } else {
          myGrid.current.deleterow(row);
        }
      },
      cellsrenderer: () => {
        return "삭제";
      },
      columntype: "button",
      width: 60,
    },
    {
      text: "일자",
      align: "center",
      cellsalign: "center",
      datafield: "in_date",
      width: 150,
    },
    {
      text: "사번",
      align: "center",
      cellsalign: "center",
      datafield: "sabun",
      width: 150,
    },
    {
      text: "이름",
      align: "center",
      cellsalign: "center",
      datafield: "name",
      editable: false,
      width: 120,
    },
    {
      text: "근무형태",
      align: "center",
      cellsalign: "center",
      columntype: "dropdownlist",
      datafield: "work_form_cd",
      displayfield: "work_form_nm",
      createeditor: function (row, value, editor) {
        editor.jqxDropDownList({
          source: workFormAdapter,
          displayMember: "label",
          valueMember: "value",
        });
      },
      width: 80,
    },
    {
      text: "출근(시작)시간",
      align: "center",
      datafield: "start_datetime",
      cellsalign: "center",
      width: 120,
    },
    {
      text: "퇴근(종료)시간",
      align: "center",
      cellsalign: "center",
      datafield: "end_datetime",
      width: 120,
    },
    {
      text: "일반근무시간(분)",
      align: "center",
      cellsalign: "center",
      datafield: "normal_datetime",
      editable: false,
      width: 120,
    },
    {
      text: "휴일근무시간(분)",
      align: "center",
      cellsalign: "center",
      datafield: "holiday_datetime",
      editable: false,
      width: 120,
    },
    {
      text: "연장근무시간(분)",
      align: "center",
      cellsalign: "center",
      datafield: "over_datetime",
      editable: false,
      width: 120,
    },
    {
      text: "야근근무시간(분)",
      align: "center",
      cellsalign: "center",
      datafield: "night_datetime",
      editable: false,
      width: 120,
    },
  ]);

  const importExcel = (event) => {
    let fileObj = event.target.files[0];
    let test = [];
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        console.log(resp.rows);
        for (let i = 1; i < resp.rows.length; i++) {
          test.push({
            in_date: resp.rows[i][0],
            sabun: resp.rows[i][1],
            start_datetime: resp.rows[i][2],
            end_datetime: resp.rows[i][3],
          });
        }
        setItemList(test);
      }
    });
  };

  const onClickAddButton = () => {
    myGrid.current.addrow(null, {});
  };

  const onClickRetrieveButton = () => {
    axios
      .get(urlRetrieve, {
        params: {
          retrieveDate: retrieveDate.replaceAll("-", ""),
          sabunOrName: name.current.value == "" ? null : name.current.value,
        },
      })
      .then((response) => {
        setItemList(response.data.DATA);
      });
  };

  const onClickSaveButton = () => {
    let data = myGrid.current.getrows();
    let lengths = data.length;
    let confirm = 0;
    data = { ...data };

    if (window.confirm("저장 하시겠습니까?")) {
      confirm = 1;
      for (let i = 0; i < lengths; i++) {
        if (
          !(
            data[i].in_date &&
            data[i].sabun &&
            data[i].start_datetime &&
            data[i].end_datetime
          )
        ) {
          alert("공백은 저장 할 수 없습니다.");
          return;
        }

        delete data[i]["uniqueid"];
        delete data[i]["boundindex"];
        delete data[i]["uniqueid"];
        delete data[i]["uid"];
        delete data[i]["visibleindex"];

        let split_StartTime = data[i].start_datetime.split(":");
        let hour_start = parseInt(split_StartTime[0]);
        let min_start = parseInt(split_StartTime[1]);
        let sec_start = (hour_start * 60 + min_start) * 60;

        let end_datetime = data[i].end_datetime.replace(":", "");
        let split_endTime = data[i].end_datetime.split(":");
        let hour_end = parseInt(split_endTime[0]);
        let min_end = parseInt(split_endTime[1]);
        let sec_end = (hour_end * 60 + min_end) * 60;

        if (data[i].work_form_cd == "RW") {
          data[i].normal_datetime = "0";
          data[i].over_datetime = "0";
          data[i].night_datetime = "0";
          data[i].holiday_datetime = String((sec_end - sec_start) / 60);
        } else {
          data[i].holiday_datetime = "0";
          if (end_datetime <= "1830") {
            data[i].normal_datetime = String((sec_end - sec_start) / 60);
            data[i].over_datetime = "0";
            data[i].night_datetime = "0";
            data[i].work_form_cd = checkWorkForm(data[i].work_form_cd, 1);
            if (end_datetime > "1800") data[i].normal_datetime = "540";
          } else if (end_datetime >= "1830" && end_datetime <= "2200") {
            data[i].normal_datetime = "540";
            data[i].night_datetime = "0";
            data[i].over_datetime = String((sec_end - 64800) / 60);
            data[i].work_form_cd = checkWorkForm(data[i].work_form_cd, 2);
          } else if (end_datetime > "2200" && end_datetime <= "2400") {
            data[i].normal_datetime = "540";
            data[i].over_datetime = "240";
            data[i].night_datetime = String((sec_end - 79200) / 60);
            data[i].work_form_cd = checkWorkForm(data[i].work_form_cd, 2);
          } else if (end_datetime <= "0600") {
            data[i].normal_datetime = "540";
            data[i].over_datetime = "240";
            data[i].night_datetime = String((7200 + sec_end) / 60);
            data[i].work_form_cd = checkWorkForm(data[i].work_form_cd, 2);
          }
        }
      }
    }

    if (confirm == 1) {
      let postParam = qs.stringify({
        data: JSON.stringify(data),
        lengths: lengths,
      });
      axios.post(urlSave, postParam).then((response) => {
        if (response.data.result === "success") {
          Utils.AttendanceRegisterToPay(); //근태에서 급여 테이블로
          onClickRetrieveButton();
          alert("저장되었습니다.");
        } else {
          alert("error");
        }
      });
    }
  };

  function checkWorkForm(workFormCd, Flag) {
    if (Flag == 1) {
      if (isNullOrEmpty(workFormCd) || workFormCd == "EW") {
        return "NM";
      }
    } else {
      if (isNullOrEmpty(workFormCd) || workFormCd == "NM") {
        return "EW";
      }
    }
    return workFormCd;
  }

  const onClickClosingButton = () => {
    let str =
      retrieveDate.substring(0, 4) + "년 " + retrieveDate.substring(5, 7);
    if (window.confirm(str + "월의 근태를 마감하시겠습니까?")) {
      axios
        .get(urlClosing, {
          params: {
            closingDate: retrieveDate.replaceAll("-", ""),
          },
        })
        .then((response) => {
          console.log(response);
          if (response.data.result === "success") {
            alert("마감이 완료되었습니다.");
          } else {
            alert("오류가 발생했습니다.");
          }
        });
    }
  };

  return (
    <div
      style={{
        width: "98%",
        minHeight: "790px",
        background: "white",
      }}
    >
      <>
        <div
          style={{
            width: "98%",
            height: "6%",
            display: "flex",
            paddingTop: "15px",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              marginLeft: "80px",
              marginRight: "auto",
            }}
          >
            <div
              style={{
                display: "inline",
                lineHeight: "30px",
                marginRight: "10px",
              }}
            >
              기준년월
            </div>
            <MuiPickersUtilsProvider utils={koLocalizedUtils} locale={koLocale}>
              <DatePicker
                autoOk
                variant="inline"
                views={["year", "month"]}
                format="yyyy-MM"
                value={retrieveDate}
                inputVariant="outlined"
                size="small"
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider>
            <div
              style={{
                display: "inline",
                lineHeight: "30px",
                paddingLeft: "30px",
                marginRight: "10px",
              }}
            >
              사번/이름
            </div>
            <TextField
              inputRef={name}
              InputProps={{ sx: { width: 180, height: 40 } }}
            />
          </div>
          <div
            style={{
              marginTop: "6px",
            }}
          >
            <input
              type="file"
              onChange={(e) => importExcel(e)}
              style={{
                display: "none",
              }}
              name="excel_upload"
              id="excel_upload"
            />
            <label
              style={{
                padding: "6px 20px",
                marginRight: "2vw",
                width: "3.5vw",
                height: "3.5vh",
                backgroundColor: "#E5A360",
                borderRadius: "5px",
                color: "#FFFFFF",
                cursor: "pointer",
              }}
              for="excel_upload"
            >
              엑셀업로드
            </label>
          </div>
          <Button
            style={{
              width: "3.5vw",
              height: "3.5vh",
              marginRight: "2vw",
              backgroundColor: "#E5A360",
              color: "#FFFFFF",
            }}
            onClick={() => onClickAddButton()}
            variant="contained"
          >
            추가
          </Button>

          <Button
            style={{
              width: "3.5vw",
              height: "3.5vh",
              marginRight: "2vw",
              backgroundColor: "#E5A360",
              color: "#FFFFFF",
            }}
            onClick={() => onClickRetrieveButton()}
            variant="contained"
          >
            조회
          </Button>
          <Button
            style={{
              width: "3.5vw",
              height: "3.5vh",
              marginRight: "2vw",
              backgroundColor: "#E5A360",
              color: "#FFFFFF",
            }}
            onClick={() => onClickSaveButton()}
            variant="contained"
          >
            저장
          </Button>
          <Button
            style={{
              width: "3.5vw",
              height: "3.5vh",
              marginRight: "2vw",
              backgroundColor: "#E79A4C",
              color: "#FFFFFF",
            }}
            onClick={() => onClickClosingButton()}
            variant="contained"
          >
            마감
          </Button>
        </div>
        <hr className="empFirstLine" align="left" />

        <div>
          <JqxGrid
            style={{
              margin: "auto",
              marginTop: "20px",
            }}
            ref={myGrid}
            width={"90%"}
            height={600}
            altrows={true}
            selectionmode={"singlecell"}
            editable={true}
            source={new jqx.dataAdapter(sources)}
            columns={columns}
            columnsresize={true}
            keyboardnavigation={false}
          />
        </div>
      </>
    </div>
  );
}

export default React.memo(AttendanceRegister);
