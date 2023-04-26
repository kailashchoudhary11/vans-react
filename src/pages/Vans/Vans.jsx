import React from "react";
import "../../server/server";
import "./Vans.css";
import { Link, useSearchParams } from "react-router-dom";

export default function Vans() {
    const [vansData, setVansData] = React.useState([]);

    const [searchParams, setSearchParams] = useSearchParams();
    const typeFilter = searchParams.get("type");

    React.useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setVansData(data.vans));
    }, []);

    const filteredVansData =  typeFilter ? 
        vansData.filter(van => van.type.toLowerCase() == typeFilter) :
        vansData;


    const vansComps = filteredVansData.map(van =>
        <div key={van.id} className="van-tile">
            <Link to={van.id}>
                <img src={van.imageUrl} />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    );

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
    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">
                <button className={`van-type simple ${typeFilter == "simple" ? "selected" : ""}`} onClick={() => handleFilterChange("type", "simple")}>Simple</button>
                <button className={`van-type rugged ${typeFilter == "rugged" ? "selected" : ""}`} onClick={() => handleFilterChange("type", "rugged")}>Rugged</button>
                <button className={`van-type luxury ${typeFilter == "luxury" ? "selected" : ""}`} onClick={() => handleFilterChange("type", "luxury")}>Luxury</button>
                {
                    typeFilter  && 
                    <button className="van-type clear-filters" onClick={() => handleFilterChange("type", null)}>Clear</button>
                }
            </div>
            <div className="van-list">
                {vansComps}
            </div>
        </div>
    );
}