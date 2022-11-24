import React from "react";

import "../css/OrganizationChart/OrganizationChart.css";
//import organizationchart from "../src/img/organizationchart.png";
import organizationchart from "../img/organizationchart.png"
const App = () => {
    return (
        <div className="OrganiztaionChart_App">
            <div className="OrganizationChart_container">
                <div className="OrganizationChart_Flex">
                    <div className="OrganizationChart_Img_container">
                        <span>조직도</span>
                        <div className="OrganizationChart_Img">
                            <img className="organizationchart" src={organizationchart} alt={"사진"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;