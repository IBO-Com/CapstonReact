import React, { useEffect, useState } from "react";
import "../css/personnelcard/formPerCard.css";
import axios from "axios";
import qs from "qs";
import * as GetCDTR from "../modules/getCDTR";
import User from "../img/user.png";
import * as Cookie from "../cookies/cookies";


const App = ({ componentRef, sabun }) => {
  const [today, setToday] = useState(new Date());
  const [defaultYear, setDefaultYear] = useState("19");

  const [userData, setUserData] = useState();
  const [dept, setDept] = useState("");
  const [team, setTeam] = useState("");
  const [rank, setRank] = useState("");
  const [center, setCenter] = useState("");

  const [picture, setPicture] = useState(null);

  function getParametersForUnsplash({width, height, quality, format}) { //이미지 최적화
    return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`
  }

  useEffect(() => {
    if (sabun == null) return;
    console.log(sabun);

    let postParam = qs.stringify({
      sabunOrName: sabun,
    });

    axios
      .post("http://43.200.115.198:8080/empselect.jsp", postParam)
      .then((response) => {
        setUserData(response.data.ITEMS[0]);
        let userInfo = response.data.ITEMS[0];

        if (
          today.getFullYear() - 2000 <
          parseInt(userInfo["identity"].slice(0, 2))
        ) {
          setDefaultYear("19");
        } else {
          setDefaultYear("20");
        }

        GetCDTR.getCDTR(
          userInfo["center"],
          userInfo["dept"],
          userInfo["team"],
          userInfo["rank"],
          setCenter,
          setDept,
          setTeam,
          setRank
        );
      });

      let postParam2 = qs.stringify({
        id: sabun,
      });
  
      axios
        .post("http://43.200.115.198:8080/getpicture.jsp", postParam2)
        .then((response) => {
          console.log(response);
          setPicture(response.data.ITEMS[0].picture);
        });
      console.log("change sabun : ", sabun);
  }, [sabun]);

  return (
    <div className="perCard_box" ref={componentRef}>
      <div className="perCardtitle">
        <p>인사기록카드</p>
      </div>
      <div className="perCard_data">
        <table>
          <thead>
            <tr>
              <td colSpan={5}>사원정보</td>
            </tr>
          </thead>
          <tbody>
            <tr className="firsttable">
              <td rowSpan={4} style={{padding:'0px', minWidth:'125px', height:'180px'}}>{picture === null ? (
                  <img className="empimg" style={{width:'100px', height:'100px', borderRadius:'0px'}} src={User + getParametersForUnsplash({width: 240, height: 240, quality: 80, format: 'jpg'})}  alt="이미지" />
                ) : (
                  <img className="empimg" style={{width:'110px', height:'150px', borderRadius:'0px'}} src={picture} alt={"사진"} />
                )}</td>
              <td>부서명</td>
              <td>{dept}</td>
              <td>입사년월일</td>
              <td>
                {userData
                  ? userData["start_date"].slice(0, 4) +
                  "-" +
                  userData["start_date"].slice(4, 6) +
                  "-" +
                  userData["start_date"].slice(6, 8)
                  : ""}
              </td>
            </tr>
            <tr className="table_bg">
              <td>성명</td>
              <td>{userData ? userData["name"] : ""}</td>
              <td>영문 성명</td>
              <td>{userData ? userData["eng_name"] : ""}</td>
            </tr>
            <tr className="table_bg">
              <td>직책</td>
              <td>{rank}</td>
              <td>주민등록번호</td>
              <td>
                {userData
                  ? userData["identity"].slice(0, 6) +
                  "-" +
                  userData["identity"].slice(6, 13)
                  : ""}
              </td>
            </tr>
            <tr className="table_bg">

              <td>주소</td>
              <td colSpan={3}>{userData ? userData["address"] : ""}</td>
            </tr>

            <tr className="firsttable family_td">
              <td rowSpan={4}>가족사항</td>
              <td>관계</td>
              <td>성명</td>
              <td>생년월일</td>
              <td>동기여부</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr className="firsttable family_td">
              <td rowSpan={4}>경력사항</td>
              <td>발령일</td>
              <td>발령구분</td>
              <td>부서</td>
              <td>직책</td>
            </tr>

            <tr>
              <td>&nbsp;</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>&nbsp;</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>&nbsp;</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr className="firsttable family_td">
              <td rowSpan={4}>자격사항</td>
              <td>취득일자</td>
              <td>자격면허명</td>
              <td>자격번호</td>
              <td>부여기관</td>
            </tr>

            <tr>
              <td>&nbsp;</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>&nbsp;</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>&nbsp;</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
