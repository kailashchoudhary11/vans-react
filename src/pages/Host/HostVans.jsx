import React, { Suspense } from "react";
import "../../server/server";
import "./HostVans.css";
import { Link, useLoaderData, defer, Await } from "react-router-dom";
import { getHostVans } from "../../api";
import { requireAuth } from "../../utils";

export async function loader({ request }) {
    await requireAuth(request);
    return defer({ vans: getHostVans(null, true) });
}

export default function HostVans() {
    const dataPromises = useLoaderData();

    function renderHostVans(hostVans) {
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
        );
    }

    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <Suspense fallback={<h2>Loading Host Vans...</h2>}>
                <Await resolve={dataPromises.vans}>
                    {renderHostVans}
                </Await>
            </Suspense>
        </section>
    );
}