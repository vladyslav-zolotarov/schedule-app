import React from "react";
import "./style.scss"
import { FaTrashAlt } from 'react-icons/all'


export default function Card () {
    return(
        <div className="card">
            <div className="card-content">
                <h3 className="card-head">20 March 2020</h3>
                <p>Tasks: 4</p>
                <p>From 07:00 to 22:00</p>
            </div>
            <div className="card-footer">
                <div className="card-butt-1">
                    <button className="card-butt">Show</button>
                    <button className="card-butt">Print</button>
                </div>
                <div className="card-butt-2">
                    <button className="card-butt-remove">
                        <FaTrashAlt />
                    </button>
                </div>
            </div>
        </div>
    )
}