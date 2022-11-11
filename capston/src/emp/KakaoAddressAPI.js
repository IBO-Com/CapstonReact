import React from "react";
import "../css/emp/empRegister/kakaoAddressApi.css";
import Postcode from 'react-daum-postcode';
import CloseBtn from "../img/closeBtn.png";

const App = ({setModal, address, postcode}) => {
    return(
    <div className="kakaoAddressApi_div">
        <div className="kakaoAddressApi_title">
            <div className="kakaoAddressApi_addTitle"><span>주소찾기</span></div>
            <div className="kakaoAddressApi_closeTitle"><img src={CloseBtn} width={30} height={30} onClick={() => {setModal(false)}}></img></div>
        </div>

        <div className="kakaoAddressApi_contents">
        <Postcode
            style={{width: 320, height: 480}}
            jsOptions={{ animation: true }}
            onSelected={data => {
            console.log(data);
            //address.current.value = data.address;
           // postcode.current.value = data.zonecode;
            //setModal(false);

            }}
        />
        </div>
    </div>
    );
}

export default App;