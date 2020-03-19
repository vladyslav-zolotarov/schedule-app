//Libraries
import React, {useContext, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChild, faQuestion, faChartLine, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

//Styles
import './style.scss'
import { BrowserRouter, Link, Redirect} from "react-router-dom";
import {userContext} from "../../context";

//Component

export default function Menu () {
    const { SelectADay, setS } = useContext(userContext);



    return(
        <BrowserRouter>
            <div className="menu">
                <div className="logo">
                    <FontAwesomeIcon icon={faChild} size="lg" color="gray"/>
                </div>
                <div className="main-content">
                    <Link to={'/'} onClick={() => SelectADay('')}>
                        <FontAwesomeIcon icon={faCalendarAlt} size="lg" color="gray"/>
                    </Link>
                    <Link to={'/report'} onClick={() => setS(true)}>
                        <FontAwesomeIcon icon={faChartLine} size="lg" color="gray"/>
                    </Link>
                </div>
                <div className="footer">
                    <FontAwesomeIcon icon={faQuestion} size="lg" color="gray"/>
                </div>
            </div>
        </BrowserRouter>

    )
}