import React from "react";
import Navbar from "../components/Navbar";
import "../server/server";
import "./Vans.css";

export default function Vans() {
    const [vansData, setVansData] = React.useState([]);

    React.useEffect(() => {
        fetch("/api/vans")
        .then(res => res.json())
        .then(data => setVansData(data.vans));
    }, []); 
    console.log(vansData);
    const vansComps = vansData.map((van, i) => 
            <div className="van" key={i}>
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
        );

    return (
        <>
            <Navbar />
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