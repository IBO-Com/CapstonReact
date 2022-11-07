import React, { useEffect, useState } from "react";
import "../css/vactionManage/formVacationManage.css";
import * as GetCDTR from "../modules/getCDTR";
import axios from "axios";
import qs from "qs";

const App = ({ componentRef, sabun }) => {
    const todayTime = () => {
        let now = new Date();
        let todayYear = now.getFullYear();
        let todayMonth = now.getMonth() + 1;
        let toDayDate = now.getDate();

        return todayYear + "-" + todayMonth + "-" + toDayDate;
    }

    const [today, setToday] = useState(new Date());
    const [defaultYear, setDefaultYear] = useState("19");
    const [userData, setUserData] = useState();
    const [dept, setDept] = useState("");
    const [team, setTeam] = useState("");
    const [rank, setRank] = useState("");
    const [center, setCenter] = useState("");

    useEffect(() => {
        if (!sabun) return;
        let postParam = qs.stringify({
            sabunOrName: sabun
        });

        axios.post("http://43.200.115.198:8080/empselect.jsp", postParam).then((response) => {
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

            GetCDTR.getCDTR(userInfo["center"], userInfo["dept"], userInfo["team"], userInfo["rank"],
                setCenter, setDept, setTeam, setRank);
        });
    }, [sabun])


    return (
        <div ref={componentRef} className="formProofofempMain">
            <div className="perCardtitle">
                <p>휴가신청서</p>
            </div>
            <table className="formProofofeTable">
                <tr className="formProofofeFirst">
                    <td>성명</td>
                    <td>{userData ? userData["name"] : ""}</td>
                    <td>소속</td>
                    <td></td>
                </tr>

                <tr className="formProofofeFirst">
                    <td>휴가 구분</td>
                    <td></td>
                    <td>직책</td>
                    <td></td>
                </tr>

                <tr className="formProofofeFirst">
                    <td>연락처</td>
                    <td>{userData ? userData["tel_no"].slice(0, 3) + "-" + userData["tel_no"].slice(3, 7) + "-" + userData["tel_no"].slice(7, 11) : ""}</td>
                    <td>신청일자</td>
                    <td></td>
                </tr>

                <tr className="formProofofeFirst">
                    <td>기간</td>
                    <td colSpan={3}></td>
                </tr>

                <tr className="formProofofeFirst">
                    <td>비상연락망</td>
                    <td></td>
                    <td>대체 업무자</td>
                    <td></td>
                </tr>

                <tr className="formProofofeFirstZu">
                    <td>유의사항</td>
                    <td colSpan={3}>! 휴가 신청서는 휴가 시작일로부터 5일 전에 제출해야 합니다.<br></br>
                                    ! 대체 업무자를 지정하여 업무 중단이 일어나지 않도록 합니다.<br></br>
                                    ! 대체 업무자 지정은 같은 팀 직원만 가능합니다.<br></br><br></br>
                                    !! 휴가 직전 신청, 다른 팀 직원 지정시 신청이 반려될 수 있습니다. </td>
                </tr>
            </table>

            <div className="footer_vm_form">
                <p>상기와 같이 휴가신청서를 제출하오니 <br></br>허가하여 주시기 바랍니다.</p>
                <p>{todayTime().slice(0, 4)}년 {todayTime().slice(5, 7)}월 {todayTime().slice(8, 10)}일</p>
                <p className="mbt">IBO</p>
                <p>신청자 &nbsp; (인)</p>
                <div className="formProofDiv">
                    {/*<img className="formProof" src={IBOstamp} alt="직인" /> */}
                </div>
            </div>
        </div>
    );
};

export default App;
