import { Card } from "primereact/card";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import * as m from "moment";
import axios from "axios";
export default ({ country, map, panel, isInfo }) => {
  const [img, setimg] = useState("");

  return (
    <div className="container-event py-4">
      <article className="postcard dark red">
        <div className="postcard__text">
          <h1 className="postcard__title red">
            <a href="#">{country.type}</a>
          </h1>
          <div className="postcard__subtitle small">
            <time datetime="2020-05-25 12:00:00">
              <i className="fa fa-calendar-alt me-2"></i>Mon, May 25th 2020
            </time>
          </div>
          <div className="postcard__bar"></div>
          <div className="postcard__preview-txt">{country.display_name}</div>
          <ul className="postcard__tagbox">
            <li className="tag__item">
              <i className="fa fa-tag me-2"></i>
              {country.category}
            </li>
            <li className="tag__item">
              <i className="fa fa-clock me-2"></i>
              {country.type}
            </li>
            <li className="tag__item play red">
              <a
                style={{ cursor: "pointer" }}
                onClick={() => {
                  map.flyTo([country.lat, country.lon], 18);
                  panel();
                }}
              >
                <i className="fa fa-plane me-2"></i>Go to Location
              </a>
            </li>
          </ul>
        </div>
      </article>
    </div>
  );
};
