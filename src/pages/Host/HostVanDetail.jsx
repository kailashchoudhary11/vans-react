import React, { Suspense } from "react";
import { Link, NavLink, Outlet, useLoaderData, defer, Await } from "react-router-dom";
import "../../server/server";
import "./HostVanDetail.css";
import { fetchData } from "../../api";
import { requireAuth } from "../../utils";

export async function loader({ request, params }) {
    await requireAuth(request);
    const { id } = params;
    return defer({ data: fetchData(`/api/host/vans/${id}`) });
}

export default function HostVanDetail() {
    const dataPromises = useLoaderData();

    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616",
    };

    function renderVanDetail(data) {
        const van = data.vans;
        return (
            <>
                <div className="host-van-detail-layout-container">
                    <div className="host-van-detail">
                        <img src={van.imageUrl} />
                        <div className="host-van-detail-info-text">
                            <i
                                className={`van-type van-type-${van.type}`}
                            >
                                {van.type}
                            </i>
                            <h3>{van.name}</h3>
                            <h4>${van.price}/day</h4>
                        </div>
                    </div>
                    <nav className="host-van-detail-nav">
                        <NavLink
                            to="."
                            end
                            style={({ isActive }) => isActive ? activeStyle : null}
                        >
                            Details
                        </NavLink>
                        <NavLink
                            to="pricing"
                            style={({ isActive }) => isActive ? activeStyle : null}
                        >
                            Pricing
                        </NavLink>
                        <NavLink
                            to="photos"
                            style={({ isActive }) => isActive ? activeStyle : null}
                        >
                            Photos
                        </NavLink>
                    </nav>
                    <Outlet context={{ van }} />
                </div>
            </>
        );
    }

    return (
        <section>
            <Link
                relative="path"
                to=".."
                className="back-button"
            >&larr; <span>Back to all vans</span></Link>
            <Suspense fallback={<h1>Loading Van...</h1>}>
                <Await resolve={dataPromises.data}>
                    {renderVanDetail}
                </Await>
            </Suspense>
        </section>
    );
}