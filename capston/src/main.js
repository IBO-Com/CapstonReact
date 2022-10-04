import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Test from './Test';
import NotFound from './NotFound';
import Nav from './nav/nav';

import "./css/app.css";

const App = () => {
	return (
		<div className='App'>

			<BrowserRouter className="AppRouter">
        <div>
          <Nav />
        </div>
        
				<Routes>
					<Route path="/1" element={<Test />}></Route>
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;