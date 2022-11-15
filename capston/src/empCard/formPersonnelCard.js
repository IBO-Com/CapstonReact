import React, { useEffect, useState } from "react";
import "../css/personnelcard/formPerCard.css";
import axios from "axios";
import qs from "qs";
import * as GetCDTR from "../modules/getCDTR";
import User from "../img/user.png";
import * as Cookie from "../cookies/cookies";
import bankCode from "../bankCode";


const App = ({ componentRef, sabun }) => {
  const [today, setToday] = useState(new Date());
  const [defaultYear, setDefaultYear] = useState("19");

  const [userData, setUserData] = useState();
  const [dept, setDept] = useState("");
  const [team, setTeam] = useState("");
  const [rank, setRank] = useState("");
  const [center, setCenter] = useState("");
  const [license, setLicense] = useState([]);
  const [family, setFamily] = useState([]);
  const [getBank, setGetBank] = useState([]);
  const [appointment, setAppointment] = useState([]);

  let relation = {
    "0": "부",
    "1": "모",
    "2": "배우자",
    "3": "자녀"
  }
  let cohabitation = {
    "0": "별거",
    "1": "동거"
  }
  const [picture, setPicture] = useState(null);

  function getParametersForUnsplash({ width, height, quality, format }) { //이미지 최적화
    return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`
  }

  function YMDFormatter(num) { //날짜 자동으로 하이픈 넣기
    if (!num) return "";
    var formatNum = '';
    // 공백제거
    num = num.replace(/\s/gi, "");
    try {
      if (num.length == 8) {
        formatNum = num.replace(/(\d{4})(\d{2})(\d{2})/, '$1년 $2월 $3일');
      }
    } catch (e) {
      formatNum = num;
      console.log(e);
    }
    return formatNum;
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


    postParam = {
      sabun: sabun
    }

    postParam = qs.stringify(postParam);
    axios.post("http://43.200.115.198:8080/getLicense.jsp", postParam).then((res) => {
      let data = res.data.ITEMS;
      console.log(data);
      setLicense(data);
    })

    axios.post("http://43.200.115.198:8080/getBank.jsp", postParam).then((res) => {
      let data = res.data.ITEMS;
      setGetBank(data);
    })

    axios.post("http://43.200.115.198:8080/getFamily.jsp", postParam).then((res) => {
      let data = res.data.ITEMS;
      setFamily(data);
    }).catch((Error) => {
      console.log(Error);
    })


    postParam = {
      sabunOrName: sabun
    }
    postParam = qs.stringify(postParam);
    axios.post("http://43.200.115.198:8080/getAppointment.jsp", postParam).then((res) => {
      let data = res.data.ITEMS;
      setAppointment(data);
    }).catch((Error) => {
      console.log(Error);
    })

      .catch((Error) => {
        alert("계좌정보 오류!!");
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
              <td rowSpan={4} style={{ padding: '0px', minWidth: '125px', height: '180px' }}>{picture === null ? (
                <img className="empimg" style={{ width: '100px', height: '100px', borderRadius: '0px' }} src={User + getParametersForUnsplash({ width: 240, height: 240, quality: 80, format: 'jpg' })} alt="이미지" />
              ) : (
                <img className="empimg" style={{ width: '110px', height: '150px', borderRadius: '0px' }} src={picture} alt={"사진"} />
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
              <td colSpan={3}>{userData ? userData["address"] : ""} {userData ? userData["address_detail"] : ""}</td>
            </tr>


            {
              family.length > 0 ? (
                <>
                  <tr className="firsttable family_td">
                    <td rowSpan={family.length + 1}>가족사항</td>
                    <td>관계</td>
                    <td>성명</td>
                    <td>생년월일</td>
                    <td>동거여부</td>
                  </tr>

                  {
                    family.map((item, index) => {
                      return (
                        <tr>
                          <td>{relation[item.relation]}</td>
                          <td>{item.name}</td>
                          <td>{YMDFormatter(item.identity)}</td>
                          <td>{item.cohabitation == "0" ? "별거" : "동거"}</td>
                        </tr>
                      )
                    })
                  }
                </>
              ) : (
                <>
                  <tr className="firsttable family_td">
                    <td rowSpan={2}>가족사항</td>
                    <td>관계</td>
                    <td>성명</td>
                    <td>생년월일</td>
                    <td>동거여부</td>
                  </tr>

                  <tr>
                    <td>&nbsp;</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </>
              )
            }


            {
              license.length > 0 ? (
                <>
                  <tr className="firsttable family_td">
                    <td rowSpan={license.length + 1}>자격사항</td>
                    <td>취득일자</td>
                    <td>자격면허명</td>
                    <td>자격번호</td>
                    <td>부여기관</td>
                  </tr>

                  {
                    license.map((item, index) => {
                      return (
                        <tr>
                          <td>{YMDFormatter(item.acq_date)}</td>
                          <td>{item.cer_title}</td>
                          <td>{item.cer_number}</td>
                          <td>{item.cer_center}</td>
                        </tr>
                      )
                    })
                  }
                </>
              ) : (
                <>
                  <tr className="firsttable family_td">
                    <td rowSpan={2}>자격사항</td>
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
                </>
              )
            }


            {
              getBank.length > 0 ? (
                <>
                  <tr className="firsttable family_td">
                    <td rowSpan={getBank.length + 1}>계좌정보</td>
                    <td>번호</td>
                    <td>은행코드</td>
                    <td>계좌번호</td>
                    <td>예금주</td>
                  </tr>

                  {
                    getBank.map((item, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{bankCode[String(item.bank).padStart(3, '0')]}</td>
                          <td>{item.ac_number}</td>
                          <td>{item.bank_nam}</td>
                        </tr>
                      )
                    })
                  }
                </>
              ) : (
                <>
                  <tr className="firsttable family_td">
                    <td rowSpan={2}>계좌정보</td>
                    <td>번호</td>
                    <td>은행코드</td>
                    <td>계좌번호</td>
                    <td>예금주</td>
                  </tr>

                  <tr>
                    <td>&nbsp;</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </>
              )
            }


            {
              appointment.length > 0 ? (
                <>
                  <tr className="firsttable family_td">
                    <td rowSpan={appointment.length + 1}>인사발령</td>
                    <td>발령구분</td>
                    <td>발령일자</td>
                    <td>발령소속</td>
                    <td>직책</td>
                  </tr>

                  {
                    appointment.map((item, index) => {
                      return (
                        <tr>
                          <td>{item.app_state == "1" ? "부서이동" : "승진"}</td>
                          <td>{item.app_date.slice(0, 4) + "년 " + item.app_date.slice(4, 6) + "월 " + item.app_date.slice(6, 8) + "일"}</td>
                          <td>{item.deptKR}</td>
                          <td>{item.rankKR}</td>
                        </tr>
                      )
                    })
                  }
                </>
              ) : (
                <>
                  <tr className="firsttable family_td">
                    <td rowSpan={2}>인사발령</td>
                    <td>발령구분</td>
                    <td>발령일자</td>
                    <td>발령소속</td>
                    <td>직책</td>
                  </tr>

                  <tr>
                    <td>&nbsp;</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
