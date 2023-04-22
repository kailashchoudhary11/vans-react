import React from "react";
import "../../server/server";
import "./Vans.css";
import { Link } from "react-router-dom";

export default function Vans() {
    const [vansData, setVansData] = React.useState([]);

    React.useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setVansData(data.vans));
    }, []);

    const vansComps = vansData.map((van, i) =>
        <Link key={i} to={`/vans/${van.id}`}>
            <div className="van">
                <img className="van-pic" src={van.imageUrl} />
                <div className="info">
                    <span className="name">
                        {van.name}
                    </span>
                    <span className="price">
                        ${van.price}/day
                    </span>
                </div>
                <button className="type">
                    {van.type.charAt(0).toUpperCase() + van.type.slice(1)}
                </button>
            </div>
        </Link>
    );

    return (
        <>
            <h1>Explore our Vans</h1>
            {
                vansData.length > 0 ?
                    <div className="vans">
                        {vansComps}
                    </div>
                    :
                    <h1>Loading...</h1>
            }
        </>
    );
}