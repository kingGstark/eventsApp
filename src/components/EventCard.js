import { Card } from "primereact/card";
import { Button } from "primereact/button";
import React from "react";
import * as m from "moment";
import { useDispatch, useSelector } from "react-redux";
import { changeTo } from "../store/index";
export default ({ event, map, panel, isInfo }) => {
  const dispatch = useDispatch();
  const { from } = useSelector((states) => states.route);
  const getRoute = (position) => {
    const userL = [from.lat, from.lon];
    const toL = [position.lat, position.lng];
    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${userL}&destination=${toL}&travelmode=car`
    );
    console.log(from, position);

  };
  return (
    <div>
      {!isInfo ? (
        <div className="container-event py-4">
          <article className="postcard dark blue">
            <a className="postcard__img_link" href="#">
              <img
                className="postcard__img"
                src="https://picsum.photos/1000/1000"
                alt="Image Title"
              />
            </a>
            <div className="postcard__text">
              <h1 className="postcard__title-white">{event.name}</h1>
              <div className="postcard__subtitle small">
                <time>
                  <i className="fa fa-calendar me-2"></i>
                  {m(event.date).format("MMMM Do YYYY").toString()}
                </time>
              </div>
              <div className="postcard__bar"></div>
              <div className="postcard__preview-txt">{event.description}</div>
              <ul className="postcard__tagbox">
                <li className="tag__item">
                  <i className={`fa fa-${event.icon.code} me-2`}></i>
                  {event.icon.name}
                </li>
                <li className="tag__item">
                  <i className="fa fa-clock me-2"></i>55 mins.
                </li>
                <li className="tag__item play blue">
                  <a
                    className="pointer-auto"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      panel();
                      map.flyTo(event.position, 18);
                    }}
                  >
                    <i className="fa fa-plane me-2"></i>Go to Event
                  </a>
                </li>
              </ul>
            </div>
          </article>
        </div>
      ) : (
        <div className="container-event">
          <article className="postcard dark blue info m-0">
            <div className="postcard__text">
              <h1 className="postcard__title-white">{event.name}</h1>
              <div className="postcard__subtitle small">
                <time>
                  <i className="fa fa-calendar me-2"></i>
                  {m(event.date).format("MMMM Do YYYY").toString()}
                </time>
              </div>
              <div className="postcard__bar"></div>
              <div className="postcard__preview-txt">{event.description}</div>
              <ul className="postcard__tagbox">
                <li className="tag__item">
                  <i className={`fa fa-${event.icon.code} me-2`}></i>
                  {event.icon.name}
                </li>
                <li className="tag__item">
                  <i className="fa fa-clock-o me-2"></i>55 mins.
                </li>
                <li className="tag__item play blue">
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      getRoute(event.position);
                    }}
                  >
                    <i className="fa fa-location-arrow me-2"></i>show directions
                  </a>
                </li>
              </ul>
            </div>
          </article>
        </div>
      )}
    </div>
  );
};
