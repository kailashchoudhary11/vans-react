import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Vans from "./pages/Vans/Vans";
import VanDetail from "./pages/Vans/VanDetail";
import Layout from "./components/Layout";
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import HostLayout from "./components/HostLayout";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="about" element={<About />} />
					<Route path="vans" element={<Vans />} />
					<Route path="vans/:id" element={<VanDetail />} />
					<Route path="host" element={<HostLayout />} >
						<Route index element={<Dashboard />} />
						<Route path="income" element={<Income />} />
						<Route path="reviews" element={<Reviews />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}