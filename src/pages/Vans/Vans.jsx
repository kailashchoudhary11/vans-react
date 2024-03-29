import React, { Suspense } from "react";
import "../../server/server";
import "./Vans.css";
import { Link, useSearchParams, useLoaderData, defer, Await } from "react-router-dom";
import { getVans } from "../../api";

export async function loader() {
    return defer({ vans: getVans() });
}

export default function Vans() {
    const dataPromises = useLoaderData();

    const [searchParams, setSearchParams] = useSearchParams();
    const typeFilter = searchParams.get("type");

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value == null) {
                prevParams.delete(key);
            } else {
                prevParams.set(key, value);
            }
            return prevParams;
        });
    }

    function renderVanElements(vansData) {
        const filteredVansData = typeFilter ?
            vansData.filter(van => van.type.toLowerCase() == typeFilter) :
            vansData;

        const vansComps = filteredVansData.map(van =>
            <div key={van.id} className="van-tile">
                <Link
                    to={van.id}
                    state={{ searchParams: searchParams.toString(), type: typeFilter }}
                >
                    <img src={van.imageUrl} />
                    <div className="van-info">
                        <h3>{van.name}</h3>
                        <p>${van.price}<span>/day</span></p>
                    </div>
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                </Link>
            </div>
        );
        return (
            <>
                <div className="van-list-filter-buttons">
                    <button className={`van-type simple ${typeFilter == "simple" ? "selected" : ""}`} onClick={() => handleFilterChange("type", "simple")}>Simple</button>
                    <button className={`van-type rugged ${typeFilter == "rugged" ? "selected" : ""}`} onClick={() => handleFilterChange("type", "rugged")}>Rugged</button>
                    <button className={`van-type luxury ${typeFilter == "luxury" ? "selected" : ""}`} onClick={() => handleFilterChange("type", "luxury")}>Luxury</button>
                    {
                        typeFilter &&
                        <button className="van-type clear-filters" onClick={() => handleFilterChange("type", null)}>Clear</button>
                    }
                </div>
                <div className="van-list">
                    {vansComps}
                </div>
            </>
        );
    }

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <Suspense fallback={<h2>Loading Vans...</h2>}>
                <Await resolve={dataPromises.vans}>
                    {
                        renderVanElements
                    }
                </Await>
            </Suspense>
        </div>
    );
}