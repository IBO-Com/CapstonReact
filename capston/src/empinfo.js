import React, { useEffect, useState } from 'react';

import testimg from "./img/testimg.jpg";
import "./css/empinfo/empinfo.css";
import Empbase from "./empInfo_detail/Empbase";
import Appointment from './empInfo_detail/Appointment';
import Account from './empInfo_detail/Account';

import axios from "axios";
import qs from "qs";
import * as Cookie from "./cookies/cookies";

const App = () => {
	const url = "http://43.200.115.198:8080/empselect.jsp";
	const [today, setToday] = useState(new Date());
	const [defaultYear, setDefaultYear] = useState("19");
	const [workMonth, setWorkMonth] = useState("0");
	const [workYear, setWorkYear] = useState("0");

	const [toogleState, setToggleState] = useState(1);
	const [userData, setUserData] = useState({});
	
	useEffect(() => {
		let data = Cookie.getCookie("loginInfo");
		let userInfo = {};

		let postParam = qs.stringify({
            sabunOrName: data["id"]
          });

          axios.post(url, postParam).then((response) => {
			userInfo = response.data.ITEMS[0];
			let startDate = new Date(userInfo["start_date"].slice(0, 4), userInfo["start_date"].slice(4, 6), userInfo["start_date"].slice(6, 8));
			let subDate = today - startDate;

			let tempMonth = subDate / 1000 / 60 / 60 / 24 / 30;
			setWorkMonth(parseInt(tempMonth % 12));
			setWorkYear(parseInt(tempMonth / 12)); 

			if(today.getFullYear() - 2000 < parseInt(userInfo["identity"].slice(0, 2))) {
				setDefaultYear("19");
			} else {
				setDefaultYear("20");
			}
			setUserData(response.data.ITEMS[0]);
          });
	}, []);


	const toggleTab = (index) => {
		setToggleState(index);
	}

	return (
		<div className='empInfo'>
			<div className='plzEmp'>
				<div>
					<div className="empWrapimg">
						<img className="empimg" src={testimg} alt="이미지" />
					</div>
				</div>

				<div className='nameAnddept'>
					<p className='empinfoName'>{userData["name"] ? userData["name"] : "로딩중"}</p>
					<p className='empinfoDept'>[경영관리본부]</p>
				</div>

				<div class="empBox">
					<table class="empFirstTable">
						<tbody class="empinfoList">
							<tr>
								<td>ㆍ사번</td>
								<td>ㆍ재직상태</td>
								<td>ㆍ부서명</td>
								<td>ㆍ직책</td>
								<td>ㆍ사원구분</td>
							</tr>
							<tr>
								<td>{userData["sabun"] ? userData["sabun"] : "로딩중"}</td>
								<td>[재직]</td>
								<td>[경영지원부]</td>
								<td>[사원]</td>
								<td>[임원]</td>
							</tr>
							<br></br>
							<tr>
								<td>ㆍ생년월일</td>
								<td>ㆍ입사일</td>
								<td>ㆍ근속기간</td>
								<td>ㆍ현부서발령일</td>
								<td>ㆍ퇴사일</td>
							</tr>
							<tr>
								<td>{userData["identity"] ? defaultYear +  userData["identity"].slice(0,2) + "-" + userData["identity"].slice(2, 4) + "-" + userData["identity"].slice(4, 6): "로딩중"}</td>
								<td>{userData["start_date"] ? userData["start_date"].slice(0,4) + "-" + userData["start_date"].slice(4, 6) + "-" + userData["start_date"].slice(6, 8): "로딩중"}</td>
								<td>{workYear}년 {workMonth}개월</td>
								<td>[2022-10-01]</td>
								<td>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

			</div>

			<div className='empLine'>
				<hr className="empFirstLine" align="left"></hr>
				<div className='empTabFlex'>
					<div class="empBasic btn" onClick={()=>{toggleTab(1)}}>인사기본</div>
					<div class="appoint btn" onClick={()=>{toggleTab(2)}}>발령</div>
					<div class="account btn" onClick={()=>{toggleTab(3)}}>계좌</div>
				</div>

				<hr className="empFirstLine" align="left"></hr>
				<div>
					{toogleState === 1 ? <Empbase userData={userData} defaultYear={defaultYear}/> : ""}
					{toogleState === 2 ? <Appointment /> : ""}
					{toogleState === 3 ? <Account /> : ""}
				</div>
			</div>
		</div>
	);
};

export default App;