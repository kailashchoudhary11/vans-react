import React from "react";
import { createBrowserRouter, RouterProvider, Routes, Route, createRoutesFromElements } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login, { loader as loginLoader, action as loginAction } from "./pages/Login";
import Error from "./components/Error";
import Vans, { loader as vansLoader } from "./pages/Vans/Vans";
import VanDetail, { loader as VanDetailLoader } from "./pages/Vans/VanDetail";
import Layout from "./components/Layout";
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import HostVans, { loader as hostVansLoader } from "./pages/Host/HostVans";
import HostVanDetail, { loader as hostVanDetailLoader } from "./pages/Host/HostVanDetail";
import HostVanPricing from "./pages/Host/HostVanPricing";
import HostVanPhotos from "./pages/Host/HostVanPhotos";
import HostVanInfo from "./pages/Host/HostVanInfo";
import HostLayout from "./components/HostLayout";
import { requireAuth } from "./utils";

const router = createBrowserRouter(createRoutesFromElements(
	<Route element={<Layout />}>
		<Route index element={<Home />} />
		<Route path="about" element={<About />} />
		<Route
			path="vans"
			element={<Vans />}
			loader={vansLoader}
			errorElement={<Error />}
		/>
		<Route
			loader={VanDetailLoader}
			path="vans/:id"
			element={<VanDetail />}
		/>
		<Route path="host" element={<HostLayout />} >
			<Route
				loader={async ({request}) => await requireAuth(request)}
				index
				element={<Dashboard />}
			/>

			<Route
				loader={async ({request}) => await requireAuth(request)}
				path="income"
				element={<Income />}
			/>
			<Route
				loader={async ({request}) => await requireAuth(request)}
				path="reviews"
				element={<Reviews />}
			/>
			<Route
				loader={hostVansLoader}
				path="vans"
				element={<HostVans />}
			/>
			<Route
				loader={hostVanDetailLoader}
				path="vans/:id"
				element={<HostVanDetail />}
			>
				<Route
					index
					loader={async ({request}) => await requireAuth(request)}
					element={<HostVanInfo />}
				/>
				<Route
					loader={async ({request}) => await requireAuth(request)}
					path="pricing"
					element={<HostVanPricing />}
				/>
				<Route
					loader={async ({request}) => await requireAuth(request)}
					path="photos"
					element={<HostVanPhotos />}
				/>
			</Route>
		</Route>
		<Route
			loader={loginLoader}
			action={loginAction}
			path="login"
			element={<Login />}
		/>
		<Route path="*" element={<NotFound />} />
	</Route>
));

export default function App() {

	return (
		<RouterProvider router={router} />
	);
}