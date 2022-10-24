import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import JqxGrid, { jqx } from "jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import format from "date-fns/format";
import DateFnsUtils from "@date-io/date-fns";
import koLocale from "date-fns/locale/ko";

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

function AttendanceRegister() {
  const myGrid = useRef();
  const [itemList, setItemList] = useState([]);
  const [retrieveDate, setRetrieveDate] = useState(getFormatDate(new Date()));

  //const urlRetrieve = "http://localhost:8080/attretrieve.jsp";
  //const urlSave = "http://localhost:8080/attsave.jsp";
  //const urlClosing = "http://localhost:8080/attclosing.jsp";
  const urlRetrieve = "http://43.200.115.198:8080/attretrieve.jsp";
  const urlSave = "http://43.200.115.198:8080/attsave.jsp";
  const urlClosing = "http://43.200.115.198:8080/attclosing.jsp";

  const handleDateChange = (date) => {
    setRetrieveDate(getFormatDate(date));
  };

  const work_form_list = [
    { value: "NM", label: "일반" },
    { value: "OW", label: "외근" },
    { value: "BT", label: "출장" },
    { value: "HW", label: "재택" },
    { value: "EW", label: "연장" },
    { value: "RW", label: "휴일" },
  ];

  const workFormSource = {
    datatype: "array",
    datafields: [
      { name: "label", type: "string" },
      { name: "value", type: "string" },
    ],
    localdata: work_form_list,
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
      editable: false,
      datafield: "name",
      width: 150,
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
      width: 150,
    },
    {
      text: "출근(시작)시간",
      align: "center",
      datafield: "start_datetime",
      cellsalign: "center",
      width: 160,
    },
    {
      text: "퇴근(종료)시간",
      align: "center",
      cellsalign: "center",
      datafield: "end_datetime",
      width: 160,
    },
    {
      text: "연장시간(분)",
      align: "center",
      cellsalign: "center",
      datafield: "over_datetime",
      editable: false,
      width: 160,
    },
    {
      text: "야근시간(분)",
      align: "center",
      cellsalign: "center",
      datafield: "night_datetime",
      editable: false,
      width: 160,
    },
  ]);

  const onClickAddButton = () => {
    myGrid.current.addrow(null, {});
  };

  const onClickDeleteButton = () => {
    const selectedrowindex = myGrid.current.getselectedcell().rowindex;
    const rowscount = myGrid.current.getdatainformation().rowscount;
    if (selectedrowindex >= 0 && selectedrowindex < parseFloat(rowscount)) {
      const id = myGrid.current.getrowid(selectedrowindex);
      myGrid.current.deleterow(id);
    }
  };

  const onClickRetrieveButton = () => {
    axios
      .get(urlRetrieve, {
        params: {
          retrieveDate: retrieveDate.replaceAll("-", ""),
        },
      })
      .then((response) => {
        console.log(response);
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

        let end_datetime = data[i].end_datetime.replace(":", "");
        let split_time = data[i].end_datetime.split(":");
        let hour = parseInt(split_time[0]);
        let min = parseInt(split_time[1]);
        let sec = (hour * 60 + min) * 60;
        if (end_datetime > "1800" && end_datetime < "2200") {
          data[i].over_datetime = String((sec - 64800) / 60);
        } else {
          // 10시 이후 퇴근
          data[i].over_datetime = "240";
          if (end_datetime > "2200" && end_datetime <= "2400") {
            data[i].night_datetime = String((sec - 79200) / 60);
          } else if (end_datetime <= "0600") {
            data[i].night_datetime = String((7200 + sec) / 60);
          } else {
            data[i].over_datetime = "";
          }
        }
      }
    }

    if (confirm == 1) {
      axios
        .get(urlSave, {
          params: {
            data: JSON.stringify(data),
            lengths: lengths,
          },
        })
        .then((response) => {
          if (response.data.result === "success") {
            alert("저장되었습니다.");
            onClickRetrieveButton();
          } else {
            alert("error");
          }
        });
    }
  };

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
            onClick={() => onClickDeleteButton()}
            variant="contained"
          >
            삭제
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
            height={450}
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
