import React, { useState } from "react";
import "../css/vactionManage/vactionManage.css";
import VacationManageCard from "../vacationManage/vacationManageCard";
import { FormControl, Select, MenuItem, TextField, Button } from "@mui/material";

const App = () => {
    const [selectDep, setSelectDep] = useState('*');
    const [textName, setNameText] = useState('');

    const handleChange = (event) => {
        setSelectDep(event.target.value)
    };

    const textNameHandle = (event) => {
        setNameText(event.target.value)
        console.log(event.target.value);
    }


    return (
        <div className="vactionManage_App">         
            <FormControl sx={{ m: 1, minWidth: 150, display: 'flex', flexDirection:'row'}}>
                <Select
                value={selectDep}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{height:'40px', marginRight: '30px'}}
                >

                <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"*"}>
                  전체부서
                </MenuItem>

                <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"01"}>
                  경영지원부
                </MenuItem>

                <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"02"}>
                  경영관리부
                </MenuItem>

                <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"03"}>
                  침해대응부
                </MenuItem>

                <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"04"}>
                  관제센터
                </MenuItem>

                <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"05"}>
                  보안연구부
                </MenuItem>

                <MenuItem sx={{ minWidth: "153px", height: 30 }} value={"06"}>
                  보안취약점연구부
                </MenuItem>
                </Select>

                <TextField
                    sx={{width: '200px', height:'40px', marginRight: '30px'}}
                    id="outlined-basic"
                    label="사번/성명"
                    variant="outlined"
                    size="small"
                    onChange={textNameHandle}
                />

                <Button variant="contained" sx={{height: '40px', width: '100px'}}>검색</Button>
            </FormControl>

            <div className="vactionManage_line"></div>
            
            <div className="vacationManage_contents">
                <div className="vacationManage_contents_left">
                    <p>휴가 요청 ( 2 )</p>
                    
                    <VacationManageCard/>
                    <VacationManageCard/>   
                </div>

                <div className="vacationManage_contents_right">
                    <p>완료된 요청 ( 2 )</p>
                    
                    <VacationManageCard/>    
                </div>
            
            </div>

           
        </div>
    )
}

export default App;