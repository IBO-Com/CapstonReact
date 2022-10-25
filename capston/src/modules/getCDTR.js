import axios from "axios";
import qs from "qs";

/**
 * 코드값을 한글로 바꿔주는 함수
 * @param {*} code code 부분
 * @param {*} setCode useState의 setCode 부분
 */
export const getCode = (code, setCode) => {
  axios
    .post("http://43.200.115.198:8080/getAllCodeNm.jsp")
    .then((response) => {
      let data = response.data.ITEMS;
      setCode(data[code]);
  });
}


/**
 * Center, Dept, Team, Rank 전체를 입력 후 데이터를 받아내는 함수
 * @param {*} center Center 부분
 * @param {*} dept Dept 부분
 * @param {*} team Team 부분
 * @param {*} rank Rank 부분
 * @param {*} setCenter useState의 setCenter 부분
 * @param {*} setDept useState의 setDept 부분
 * @param {*} setTeam useState의 setTeam 부분
 * @param {*} setRank useState의 setRank 부분
 */
export const getCDTR = (center, dept, team, rank, setCenter, setDept, setTeam, setRank) => {
    axios
    .post("http://43.200.115.198:8080/getAllCodeNm.jsp")
    .then((response) => {
      let data = response.data.ITEMS;
      setCenter(data[center]);
      setDept(data[dept]);
      setTeam(data[team]);
      setRank(data[rank]);
      
  });
}