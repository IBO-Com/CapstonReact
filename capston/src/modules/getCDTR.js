import axios from "axios";
import qs from "qs";

/**
 * Center, Dept, Team, Rank 중 하나의 값을 통해 코드값을 찾아내는 함수
 * @param {*} code code 부분
 * @param {*} setCode useState의 setCode 부분
 */
export const getCode = (code, setCode) => {
    let postParam = qs.stringify({
        code: code,
      });

      axios
        .post("http://43.200.115.198:8080/empGetCode.jsp", postParam)
        .then((response) => {
          setCode(response.data.ITEMS[0]["code_nm"]);
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
    let postParam = qs.stringify({
        code: center,
      });

      axios
        .post("http://43.200.115.198:8080/empGetCode.jsp", postParam)
        .then((response) => {
          setCenter(response.data.ITEMS[0]["code_nm"]);
      });

    //
    postParam = qs.stringify({
        code: dept,
      });

      axios
        .post("http://43.200.115.198:8080/empGetCode.jsp", postParam)
        .then((response) => {
          setDept(response.data.ITEMS[0]["code_nm"]);
      });

    //
    postParam = qs.stringify({
        code: team,
      });

      axios
        .post("http://43.200.115.198:8080/empGetCode.jsp", postParam)
        .then((response) => {
          setTeam(response.data.ITEMS[0]["code_nm"]);
      });

    postParam = qs.stringify({
        code: rank,
    });

    axios
    .post("http://43.200.115.198:8080/empGetCode.jsp", postParam)
    .then((response) => {
        setRank(response.data.ITEMS[0]["code_nm"]);
    });

}