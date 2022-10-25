import { Checkbox } from '@material-ui/core';
import React from 'react';
import "./css/empBasicInfo/empBasicInfo.css";

const App = () => {
	return (
		<div className="empBasic_container">
			<div className="empBasicBox">
				<div className="empBasicInfoTop">
					<span>기본사항</span>
					<hr className="empBasicLine" align="left"></hr>
					<button className="empBasic_editBtn">수정</button>
				</div>

				<div className="empBasicBox_divSection">
					<table className="empBasicTableBox">
						<tbody className="empBasicInfoList">
							<tr className="empBasic1">
								<td>성명</td>
								<td>김명지</td>
								<td>영문성명</td>
								<td>Kim Myoung Ji</td>
								<td>고용구분</td>
								<td>공개채용</td>
							</tr>
							<br></br>
							<tr className="empBasic2">
								<td>성별</td>
								<td>여</td>
								<td>주민등록번호</td>
								<td>000000-0000000</td>
								<td>생년월일</td>
								<td>2000-00-00</td>
							</tr>
							<br></br>
							<tr className="empBasic2">
								<td>그룹입사일</td>
								<td>2022-10-00</td>
								<td>입사일</td>
								<td>2022-10-00</td>
								<td>인정직급/년차</td>
								<td>000/0년차</td>
							</tr>
							<br></br>
							<tr className="empBasic3">
								<td>외국인여부</td>
								<td><Checkbox color="primary"></Checkbox></td>
								<td>결혼여부</td>
								<td><Checkbox color="primary"></Checkbox></td>
								<td>재직상태</td>
								<td>
									<select className="empBasicStatus">
										<option>재직</option>
										<option>퇴직</option>
									</select>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div >
	);
};

export default App;