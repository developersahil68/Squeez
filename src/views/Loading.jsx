import React from "react"
import spinner from '../img/favicon.png'

function Loading() {
    return (
    <div className="flex spinner-overlay">
        <div className="spinner-popup--container">
        <div className="flex spinner--container">
        <img src={spinner} alt="spinner" title="spinner"/>
        </div>
        <h2>Loading...</h2>
    </div>
    </div>
    )
}

export default Loading;