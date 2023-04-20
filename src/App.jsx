import React from "react";
import {BrowserRouter, Link, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

export default function App() {
	return (
		<BrowserRouter>
		<Routes>
			<Route path="/">
				<Route index element={<Home />} />
				<Route path="about" element={<About />} />
			</Route>
		</Routes>
	</BrowserRouter>
	);
}