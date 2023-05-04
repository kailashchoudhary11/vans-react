import React from "react";
import "../../server/server";
import "./HostVans.css";
import { Link, useLoaderData } from "react-router-dom";
import { fetchData } from "../../api";
import { requireAuth } from "../../utils";

export async function loader({request}) {
    await requireAuth(request);
    return fetchData("/api/host/vans");
}

export default function HostVans() {
    const loaderData = useLoaderData();
    const hostVans = loaderData.vans;

    const hostVanEls = hostVans.map(van => (
        <Link
            to={van.id}
            key={van.id}
            className="host-van-link-wrapper"
        >
            <div className="host-van-single" key={van.id}>
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                </div>
            </div>
        </Link>
    ));
    
    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <div className="host-vans-list">
                {
                    hostVans.length > 0 ? (
                        <section>
                            {hostVanEls}
                        </section>

                    ) : (
                            <h2>Loading...</h2>
                        )
                }
            </div>
        </section>
    );
}