import React from "react";

import "../css/OrganizationChart/OrganizationChart.css";
//import organizationchart from "../src/img/organizationchart.png";
import organizationchart from "../img/organizationchart.png"
const App = () => {
    return ( 
    <div className="OrganiztaionChart_App">
        <div className="OrganizationChart_container">
        <div
          style={{
            padding: "15px",
            fontSize: "20px",
            fontWeight: "bold",
            }}>
            
            <h4>조직도</h4>
              <div className="OrganizationChart_Img">
                  <img className="organizationchart" src={organizationchart} alt={"사진"} />
                  <div className="OrganizationChart_Description_Container">
                  <h4>조직도 소개</h4>
                  <div className="OrganizationChart_Description"></div>
                </div>
              </div>
            </div>
            </div>
            </div>
       
    )
}

export default App;