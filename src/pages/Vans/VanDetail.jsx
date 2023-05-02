import React from "react";
import { Link, useParams, useLocation, useLoaderData } from "react-router-dom";
import "../../server/server";
import "./VanDetail.css";
import { fetchData } from "../../api";

export function loader(req) {
    const { id } = req.params;
    return fetchData(`/api/vans/${id}`);
}

export default function VanDetail() {
    // const { id } = useParams();
    const { state } = useLocation();
    const loaderData = useLoaderData();
    const van = loaderData.vans;

    return (
        <div className="van-detail-container">
            <Link
                relative="path"
                to={`../?${state?.searchParams ? state.searchParams : ""}`}
                className="back-button"
            >
                &larr; <span>Back to {`${state?.type ? state.type : "all"}`} vans</span>
            </Link>

            <div className="van-detail">
                <img src={van.imageUrl} />
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
                <h2>{van.name}</h2>
                <p className="van-price"><span>${van.price}</span>/day</p>
                <p>{van.description}</p>
                <button className="link-button">Rent this van</button>
            </div>

        </div>
    );
}