import React, { Component } from 'react';
import { Routes, Route, Router, BrowserRouter } from 'react-router-dom';

//각 탭 임포트
import Empinfo from "./empinfo";
import Test from "./Test";

import NotFound from './NotFound';
import Nav from './nav/nav';
import "./css/main.css";

import UserHeader from "./userHeader";

const App = () => {
	return (
		<div className='mainApp'>
			<BrowserRouter>
				<div className='mainNavBox'>
					<Nav />
				</div>

				<div className='mainContetnsBox'>
					<UserHeader/>

					<Routes>
						<Route path="/" element={<Test />}></Route>
						<Route path="/1" element={<Test />}></Route>
						<Route path="/empinfo" element={<Empinfo />}></Route>
						<Route path="*" element={<NotFound />}></Route>
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
};

export default App;