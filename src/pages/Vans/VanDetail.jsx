import React from "react";
import {Link, useParams, useLocation } from "react-router-dom";
import "../../server/server";
import "./VanDetail.css";

export default function VanDetail() {
    const { id } = useParams();
    const [van, setVan] = React.useState({});
    const {state} = useLocation();

    React.useEffect(() => {
        fetch(`/api/vans/${id}`)
            .then(res => res.json())
            .then(data => setVan(data.vans));
    }, []);

    return (
        <div className="van-detail-container">
            <Link
            relative="path"
            to={`../?${state?.searchParams ? state.searchParams : ""}`}
            className="back-button"
        >
            &larr; <span>Back to {`${state?.type ? state.type : "all"}`} vans</span>
        </Link>

            {van ? (
                <div className="van-detail">
                    <img src={van.imageUrl} />
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            ) : <h2>Loading...</h2>}
        </div>
    );
}