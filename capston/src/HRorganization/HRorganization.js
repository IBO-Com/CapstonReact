import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "../css/HRorganization/HRorganization.css";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

const HRorganization = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="HRorganization_main">
      <div className="HRorganization_dateBox">
        <span>기준일자</span>

        <DatePicker
          locale={ko}
          dateFormat="yyyy-MM-dd"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </div>
  );
};

export default HRorganization;