import React, { useEffect, useState } from "react";
import "../css/severancePay/formRetire.css";
import * as GetCDTR from "../modules/getCDTR";
import axios from "axios";
import qs from "qs";
import IBOstamp from "../img/stamp.png";
import * as GetYearOfWork from "../modules/getYearOfWork";

const App = ({retirePayment, componentRef, sabun }) => {
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

    const [workYear, setWorkYear] = useState("0");
    const [workMonth, setWorkMonth] = useState("0");
    const [workDay, setWorkDay] = useState("0");

    useEffect(() => {
        if (!sabun) return;
        let postParam = qs.stringify({
            sabunOrName: sabun
        });

        axios.post("http://43.200.115.198:8080/empselect.jsp", postParam).then(async (response) => {
            setUserData(response.data.ITEMS[0]);
            let userInfo = response.data.ITEMS[0];
            let startDate = new Date(userInfo["start_date"].slice(0, 4), parseInt(userInfo["start_date"].slice(4, 6))-1, userInfo["start_date"].slice(6, 8));
            let endDate = new Date(userInfo["retire_date"].slice(0, 4), parseInt(userInfo["retire_date"].slice(4, 6))-1, userInfo["retire_date"].slice(6, 8));

            await axios.post("http://43.200.115.198:8080/retireselect.jsp", qs.stringify({
                sabunOrName: sabun
            }))
            .catch((Error) => {
                console.log(Error);
            });

            if (
                today.getFullYear() - 2000 <
                parseInt(userInfo["identity"].slice(0, 2))
            ) {
                setDefaultYear("19");
            } else {
                setDefaultYear("20");
            }

            GetYearOfWork.getYearOfWork(startDate, endDate, setWorkYear, setWorkMonth, setWorkDay);

            GetCDTR.getCDTR(userInfo["center"], userInfo["dept"], userInfo["team"], userInfo["rank"],
                setCenter, setDept, setTeam, setRank);
        });
    }, [sabun])


    return (
        <div ref={componentRef} className="formRetire_box">
            <div className="perCardtitle">
                <p>???????????????</p>
            </div>
            <table className="formRetireTable">
                <tr className="formRetire_boldcolor">
                    <td colSpan={5}>????????????</td>
                </tr>

                <tr className="formRetire_Info">
                    <td>??????</td>
                    <td>{userData ? userData["name"] : ""}</td>
                    <td>????????????</td>
                    <td>{userData ? userData["eng_name"] : ""}</td>
                </tr>

                <tr className="formRetire_Info">
                    <td>??????????????????</td>
                    <td>{userData ? userData["identity"].slice(0, 6) + " - " + "??? ??? ??? ??? ??? ??? ???" : ""}</td>
                    <td>????????????</td>
                    <td>{userData ? userData["tel_no"].slice(0, 3) + "-" + userData["tel_no"].slice(3, 7) + "-" + userData["tel_no"].slice(7, 11) : ""}</td>
                </tr>

                <tr className="formRetire_Info">
                    <td>??????</td>
                    <td colSpan={3}>{userData ? userData["address"] : ""} {userData ? userData["address_detail"] : ""}</td>
                </tr>


                <tr className="formRetire_boldcolor">
                    <td colSpan={5}>????????????</td>
                </tr>

                <tr className="formRetire_Info">
                    <td>??????</td>
                    <td>{userData ? userData["deptKR"] : ""} {userData ? userData["teamKR"] : ""}</td>
                    <td>??????</td>
                    <td>{userData ? userData["rankKR"] : ""}</td>
                </tr>

                <tr className="formRetire_Info">
                    <td>????????????</td>
                    <td colSpan={3}>{workYear}??? {workMonth}?????? {workDay}???</td>
                    {/* <td colSpan={3}>{userData ? userData["start_date"].slice(0, 4) + "??? " + userData["start_date"].slice(4, 6) + "??? " + userData["start_date"].slice(6, 8) + "??? ??????" : ""}</td> */}
                </tr>


                <tr className="formRetire_boldcolor">
                    <td colSpan={5}>?????? ????????????</td>
                </tr>

                <tr>
                    <td colSpan={5}>{
                        retirePayment ? (
                            (parseInt(retirePayment.retirePay) + parseInt(retirePayment.retireAllow) - parseInt(retirePayment.retireTax)).toLocaleString() + "???"
                        ) : (
                            ""
                        )
                    }</td>
                </tr>
            </table>

            <div className="formRetire_footer">
                <p>????????? ?????? ????????? ???????????????.</p>
                <p>{todayTime().slice(0, 4)}??? {todayTime().slice(5, 7)}??? {todayTime().slice(8, 10)}???</p>
                <p className="mbt">IBO</p>
                <p>???????????? ???  ???  ??? &nbsp;&nbsp; (???)</p>
                <div className="formRetireDiv">
                    <img className="formRetire" src={IBOstamp} alt="??????" />
                </div>
            </div>
        </div>
    );
};

export default App;
