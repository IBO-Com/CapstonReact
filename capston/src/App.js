import React, { useState } from 'react';
import Login from "./login";
import Empinfo from "./empinfo";
import Findpw from "./login/findpw";
import MainNav from "./mainNav";

import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import NotFound from './NotFound';


const App = () => {
	//로그인 관련 트리거
	
	const [isLogin, setIsLogin] = useState(false);

	return (

		<BrowserRouter>
			<Routes>
			
				<Route path="/" element={<Login isLogin={isLogin} setIsLogin={setIsLogin}/>}/>

				{
					isLogin ? (
					<>
						{/* 비밀번호 찾기 */ }
						<Route path="/findpw/" element={<Findpw/>}/>

						{/* 네비게이션으로 이동 */}
						<Route path="/mainNav/*" element={<MainNav/>}/>
					</>
					) : (
						<>
							<Route path="*" element={<NotFound/>}/>
						</>
					)
				}

				

				
				
			</Routes>
		</BrowserRouter>
		//<Empinfo />
	);
};

export default App;