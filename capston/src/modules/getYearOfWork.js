/**
 * 시작과 끝 날짜를 통해 일한 연도 구하는 함수
 * @param {Date} startDate 시작 연도
 * @param {Date} endDate 끝 연도
 * @param {*} setYear useState의 Year부분
 * @param {*} setMonth useState의 Month부분
 * @param {*} setDay useState의 Day부분
 */
export const getYearOfWork = (startDate, endDate, setWorkYear, setWorkMonth, setWorkDay) => {
    let subDate = Math.abs(endDate.getTime() - startDate.getTime());
    

    let tempDay = subDate / 1000 / 60 / 60 / 24;
    setWorkDay(parseInt(tempDay % 30))

    let tempMonth = subDate / 1000 / 60 / 60 / 24 / 30;
    setWorkMonth(parseInt(tempMonth % 12));
    setWorkYear(parseInt(tempMonth / 12));
    console.log("date : ", parseInt(tempMonth / 12) + "," + parseInt(tempMonth % 12) + "," + parseInt(tempDay % 30))
}