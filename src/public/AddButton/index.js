import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";

import './style.scss'

export default function AddButton () {
    return(
        <>
            <button className="button-add">
                <FontAwesomeIcon icon={faPlusCircle} size="2x" color="gray"/>
                <p>Add new task</p>
            </button>
        </>
    )
}