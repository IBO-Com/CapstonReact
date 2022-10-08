import React from 'react';

import Login from "./login";
import Empinfo from "./empinfo";
import Findpw from "./findpw/findpw";
import MainNav from "./mainNav";

import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

const App = () => {
	return (

		<BrowserRouter>
			<Routes>
			
				<Route path="/" element={<Login/>}/>

				{/* 비밀번호 찾기 */ }
				<Route path="/findpw" element={<Findpw/>}/>

				<Route path="/mainNav/*" element={<MainNav/>}/>
				
			</Routes>
		</BrowserRouter>
		//<Empinfo />
	);
};

export default App;