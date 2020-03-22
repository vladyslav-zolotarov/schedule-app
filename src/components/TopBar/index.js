import React from "react";
import { FaUserCircle } from 'react-icons/all'
import './style.scss'


export default function TopBar ({ text }) {
    return(
            <div className="top-content">
                <h3>{text}</h3>
                <div className="user-content">
                    <FaUserCircle className="top-bar-icon"/>
                    {/*<FontAwesomeIcon icon={faUser} color="black" size="lg"/>*/}
                    <p>User Name</p>
                </div>
            </div>
    )
}