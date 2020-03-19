import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import './style.scss'


export default function TopBar ({ text }) {
    return(
            <div className="top-content">
                <h3>{text}</h3>
                <div className="user-content">
                    <FontAwesomeIcon icon={faUser} color="black" size="lg"/>
                    <p>User Name</p>
                </div>
            </div>
    )
}