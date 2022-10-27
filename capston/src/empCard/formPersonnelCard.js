import React, { useEffect, useState } from "react";
import "../css/personnelcard/formPerCard.css";
import axios from "axios";
import qs from "qs";
import * as GetCDTR from "../modules/getCDTR";

const App = ({ componentRef, sabun }) => {
  const [today, setToday] = useState(new Date());
  const [defaultYear, setDefaultYear] = useState("19");

  const [userData, setUserData] = useState();
  const [dept, setDept] = useState("");
  const [team, setTeam] = useState("");
  const [rank, setRank] = useState("");
  const [center, setCenter] = useState("");

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
  }, [sabun]);

  return (
    <div className="perCard_box" ref={componentRef}>
      <div className="perCardtitle">
        <p>인사기록카드</p>
      </div>

      <div className="perCard_data">
        {/* {!peopleData ? ("No data found") : (
                    <table>
                        <thead>
                            <tr>
                                <th>사진</th>
                                <th>한글 성명</th>
                                <th>영문 성명</th>
                                <th>부서명</th>
                                <th>입사년월일</th>
                                <th>직책</th>                                
                                <th>사번</th>
                                <th>생년월일</th>
                                <th>연락처</th>
                                <th>결혼</th>
                                <th>재직구분</th>
                                <th>주소</th>
                            </tr>
                        </thead>
                        <tbody>
                            {peopleData.map(function (name, index) {
                                return (
                                    <>
                                        <tr>
                                            <td>사진</td>
                                            <td>{name.name}</td>
                                            <td>{name.eng_name}</td>
                                            <td>{name.dept === "01" ? "경영지원부" : "" || name.dept === "02" ? "경영관리" : "" || name.dept === "03" ? "침해대응부" : "" || name.dept === "04" ? "관제센터" : "" || name.dept === "05" ? "보안연구부" : "" || name.dept === "06" ? "보안취약점연구부" : ""}</td>
                                            <td>{name.start_date.slice(0, 4)}년{name.start_date.slice(4, 6)}월{name.start_date.slice(6, 8)}일</td>
                                            <td>{name.rank === "1" ? "사원" : "" || name.rank === "2" ? "대리" : "" || name.rank === "3" ? "과장" : "" || name.rank === "4" ? "차장" : "" || name.rank === "5" ? "부장" : "" || name.rank === "6" ? "이사" : "" || name.rank === "7" ? "상무" : ""}</td>
                                            <td>{name.sabun}</td>
                                            <td>{name.identity.slice(0, 2)}년{name.identity.slice(2, 4)}월{name.identity.slice(4, 6)}일</td>
                                            <td>{name.tel_no.slice(0, 3)}-{name.tel_no.slice(3, 7)}-{name.tel_no.slice(7, 11)}</td>
                                            <td>{name.married === "0" ? "미혼" : "기혼"}</td>
                                            <td>{name.retire_cls === "0" ? "재직" : "퇴직"}</td>
                                            <td>{name.address}</td>
                                        </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                )
                } */}

        <table>
          <thead>
            <tr>
              <td colSpan={5}>사원정보</td>
            </tr>
          </thead>
          <tbody>
            <tr className="firsttable">
              <td rowSpan={4}>사진</td>
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
              <td>현직책발령일</td>
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
              <td>직책</td>
              <td>{rank}</td>
              <td>주소</td>
              <td>{userData ? userData["address"] : ""}</td>
            </tr>
            <tr className="table_bg">
              <td>주민등록번호</td>
              <td>
                {userData
                  ? userData["identity"].slice(0, 6) +
                    "-" +
                    userData["identity"].slice(6, 13)
                  : ""}
              </td>
              <td>생년월일</td>
              <td>
                {userData
                  ? defaultYear +
                    userData["identity"].slice(0, 2) +
                    "-" +
                    userData["identity"].slice(2, 4) +
                    "-" +
                    userData["identity"].slice(4, 6)
                  : ""}
              </td>
            </tr>

            <tr className="firsttable family_td">
              <td rowSpan={3}>가족사항</td>
              <td>관계</td>
              <td>성명</td>
              <td>생년월일</td>
              <td>동기여부</td>
            </tr>
            <tr>
              <td>빈칸</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>빈칸</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr className="firsttable family_td">
              <td rowSpan={4}>경력사항</td>
              <td>기간</td>
              <td>학교명</td>
              <td>전공</td>
              <td>학위</td>
            </tr>

            <tr>
              <td>빈칸</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>빈칸</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>빈칸</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr className="firsttable family_td">
              <td rowSpan={4}>자격사항</td>
              <td>취득일자</td>
              <td>자격면허명</td>
              <td>직책</td>
              <td>담당업무</td>
            </tr>

            <tr>
              <td>빈칸</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>빈칸</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>빈칸</td>
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
