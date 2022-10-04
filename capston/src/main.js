import React, { Component } from 'react';
import { Routes, Route, Router, BrowserRouter } from 'react-router-dom';

//각 탭 임포트
import Empinfo from "./empinfo";

import NotFound from './NotFound';
import Nav from './nav/nav';
import "./css/main.css";

const App = () => {
	return (
		<div className='mainApp'>
		<BrowserRouter>
			<div className='mainNavBox'>
          		<Nav />
        	</div>

			<div className='mainContetnsBox'>
				<Routes>
					<Route path="/" element={<Empinfo />}></Route>
					<Route path="/empinfo" element={<Empinfo />}></Route>
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</div>
			</BrowserRouter>
		</div>
	);
};

export default App;