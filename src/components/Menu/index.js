//Libraries
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChild,
  faQuestion,
  faChartLine,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";

//Styles
import "./style.scss";
import { Link } from "react-router-dom";

//Component

export default function Menu() {
  return (
    <div className="menu">
      <div className="logo">
        <FontAwesomeIcon icon={faChild} size="lg" color="gray" />
      </div>
      <div className="main-content">
        <Link to={"/"}>
          <FontAwesomeIcon icon={faCalendarAlt} size="lg" color="gray" />
        </Link>
        <Link to={"/report"}>
          <FontAwesomeIcon icon={faChartLine} size="lg" color="gray" />
        </Link>
      </div>
      <div className="footer">
        <FontAwesomeIcon icon={faQuestion} size="lg" color="gray" />
      </div>
    </div>
  );
}
