import React, { Component } from 'react';
import { Routes, Route, Router, BrowserRouter } from 'react-router-dom';
import Test from './Test';
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
					<Route path="/" element={<Test />}></Route>
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</div>
			</BrowserRouter>
		</div>
	);
};

export default App;