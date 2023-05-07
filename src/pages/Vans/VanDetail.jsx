import React, { Suspense } from "react";
import { Link, useLocation, useLoaderData, defer, Await } from "react-router-dom";
import "../../server/server";
import "./VanDetail.css";
import { getVan } from "../../api";

export function loader(req) {
    const { id } = req.params;
    return defer({ van: getVan(id) });
}

export default function VanDetail() {
    const { state } = useLocation();
    const dataPromises = useLoaderData();

    function renderVan(van) {

        return (
            <div className="van-detail">
                <img src={van.imageUrl} />
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
                <h2>{van.name}</h2>
                <p className="van-price"><span>${van.price}</span>/day</p>
                <p>{van.description}</p>
                <button className="link-button">Rent this van</button>
            </div>
        );
    }

    return (
        <div className="van-detail-container">
            <Link
                relative="path"
                to={`../?${state?.searchParams ? state.searchParams : ""}`}
                className="back-button"
            >
                &larr; <span>Back to {`${state?.type ? state.type : "all"}`} vans</span>
            </Link>
            <Suspense fallback={<h1>Loading Van...</h1>}>
                <Await resolve={dataPromises.van}>
                    {renderVan}
                </Await>
            </Suspense>
        </div>
    );
}