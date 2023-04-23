import React from "react";
import {useOutletContext} from "react-router-dom";
import "./HostVanPhotos.css";

export default function HostVanPhotos() {
    const {van} = useOutletContext();

    return (
        <img src={van.imageUrl} className="host-van-detail-image" />
    );
}