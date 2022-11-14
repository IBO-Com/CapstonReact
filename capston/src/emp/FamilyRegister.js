import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import koLocale from "date-fns/locale/ko";
import format from "date-fns/format";
import { Button } from "@mui/material";
import { useCookies } from "react-cookie";
import styles from "../css/emp/empRegister/empRegister.module.css";
import "../css/emp/empRegister/FamilyRegister.css";
import { differenceInSeconds } from "date-fns";
import qs from "qs";
import axios from "axios";

class koLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy년　　 MM월", { locale: this.locale });
  }
}

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [family, setFamily] = useState([]);
  const [relationList, setRelationList] = useState("0");
  const [cohabitationList, setCohabitaionList] = useState("0");
  const [birthDate, setBirthtDate] = useState(new Date("2020-01-01"));
  const [radioBtn, setRadioBtn] = useState(-1);

  const addDefaultTable = {
    identity:"20000101",
    name: "",
    relation: "3",
    cohabitation: "1"
  }

  useEffect(() => {
    let loginInfo = cookies["empRegister_userInfo"];
    
    let postParam = {
      sabun: loginInfo.id
    }
    postParam = qs.stringify(postParam);
    axios.post("http://43.200.115.198:8080/getFamily.jsp", postParam).then((res) => {
      let data = res.data.ITEMS;
      setFamily(data);
    })
    .catch((Error) => {
        alert("가족 오류!!");
    }); 
  }, []);

  const autoHyphen = (target) => {
    console.log(target);
    target.value = target.value
      .replace(/[^0-9]/g, '')
     .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
   }

  function YMDFormatter(num){ //날짜 자동으로 하이픈 넣기
    if(!num) return "";
    var formatNum = '';
    // 공백제거
    num=num.replace(/\s/gi, "");
    try{
         if(num.length == 8) {
              formatNum = num.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
         }
    } catch(e) {
         formatNum = num;
    }
    return formatNum;
  }

  const addBtnClick = () => { //추가 버튼
    let tempTable = [...family];
    tempTable.push(addDefaultTable);
    setFamily(tempTable);
  }

  const removeBtnClick = () => { //삭제버튼
    let tempTable = [...family];
    if(radioBtn == -1 || (tempTable.length-1) < radioBtn) { //라디오 버튼이 선택되지 않았을때
      alert("삭제할 데이터가 선택되지 않았습니다.");
      return;
    }
    tempTable.splice(radioBtn, 1);
    setFamily(tempTable);
  }

  const saveBtnClick = () => { //저장 버튼
    let familyTable = document.querySelectorAll(".Family_table tbody tr");
    let isReady = true;
    let data = [];
    for(let i = 0; i < familyTable.length; i ++) {
      let tempArr = [];
      for(let j = 2; j <= 5; j++) {
        let element = null; 
        if(j == 2 || j == 5) {
          element = familyTable[i].querySelectorAll("td")[j].querySelector("select");
        } else {
          element = familyTable[i].querySelectorAll("td")[j].querySelector("input");
        }
        let val = element.value;
        val = val.replace(/\-/g, ""); //날짜는 하이픈 없앰

        if(val.trim() == '') { //값이 없을 때
          isReady = false;
          element.className = "Family_input Family_td_noneData";
        } else {
          element.className = "Family_input";
        }
        tempArr.push(val.replace(",", "."));
      }
      data.push(tempArr);
    }
    if(isReady == false) {
      alert("입력란에 공백이 존재합니다.");
      return;
    }
    let postParam = {
      sabun: cookies["empRegister_userInfo"].id,
      length: data.length
    }
    for(let i = 0; i < data.length; i ++) {
      let row = data[i].join(",");
      postParam["data" + i] = row;
    }
    console.log(postParam);
    postParam = qs.stringify(postParam);

    
    axios.post("http://43.200.115.198:8080/updateFamily.jsp", postParam).then((res) => {
      alert("저장이 완료되었습니다.");
    }).catch((Error) => {
      alert("오류가 발생했습니다.");
      console.log(Error)
    })
    
  }

  const handleRelationList = (event) => {
    setRelationList(event.target.value);
  };

  const handleCohabitationList = (event) => {
    setCohabitaionList(event.target.value);
  };

  const handleBirthtDateChange = (date) => {
    setBirthtDate(date);
  };

  return (
    <>
      <Button
        className={styles.buttonStyle}
        style={{
          marginLeft: "92%",
          marginRight: "2.5vw",
          marginTop: "-90px",
        }}
        // onClick={() => clickSaveButton()}
        variant="contained"
      >
        저장
      </Button>
      <div className="FamilyReigster_container">
        <div className="FamilyRegister_title">
          <span>{cookies["empRegister_userInfo"].name}의 가족</span>
          <div className="Account_btns">
              <button className="Family_removeBtn" onClick={() => {removeBtnClick()}}>삭제</button>
              <button className="Family_addBtn" onClick={() => {addBtnClick()}}>추가</button>
              <button className="Family_saveBtn"onClick={() => {saveBtnClick()}}>저장</button>
            </div>
        </div>
        <div className="Family_table">
        <table>
          <thead>
            <tr>
              <td>번호</td>
              <td>삭제</td>
              <td>관계</td>
              <td>성명</td>
              <td>생년월일</td>
              <td>동거여부</td>
            </tr>
          </thead>
          <tbody>
            {
              family.map((item, index) => {
                
                return(
                  <tr>
                    <td width={"150px"}>{index + 1}</td>
                    <td width={"150px"}>
                      <input
                        type="radio"
                        name="familySelect" 
                        className="family_radioBtn"
                        onChange={() => { setRadioBtn(index)}}
                      />
                    </td>
                    <td style={{width:"200px"}}>
                    <select  className="Family_select" defaultValue={item.relation}>
                      <option key="bu" value="0">부</option>
                      <option key="mo" value="1">모</option>
                      <option key="be" value="2">배우자</option>
                      <option key="ja" value="3">자녀</option>
                    </select>
                    </td>
                    <td style={{width:"100px"}}><input className="Family_input" Value={item.name}></input></td>
                    <td style={{width:"200px"}}>
                      <input className="Family_input" onInput={(e) => {autoHyphen(e.target)}} maxLength={10} Value={YMDFormatter(item.identity)}>
                      </input>
                      </td>
                    <td style={{width: "200px"}}> 
                    <select  className="Family_select" defaultValue={item.cohabitation}>
                      <option key="apple" value="0">별거</option>
                      <option key="orange" value="1">동거</option>
                    </select></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
};

export default App;
