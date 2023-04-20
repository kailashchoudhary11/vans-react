import React from "react";
import {BrowserRouter, Link, Routes, Route} from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Vans from "./pages/Vans";

export default function App() {
	return (
		<BrowserRouter>
		<Routes>
			<Route path="/">
				<Route index element={<Home />} />
				<Route path="about" element={<About />} />
				<Route path="vans" element={<Vans />} />
			</Route>
		</Routes>
	</BrowserRouter>
	);
}