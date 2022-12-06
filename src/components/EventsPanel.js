import React from "react";
import { Panel, PanelHeaderTemplateOptions } from "primereact/panel";
import { Ripple } from "primereact/ripple";
import { FaCalendarDay } from "react-icons/fa";
import { ScrollPanel } from "primereact/scrollpanel";
import { FaPlaneDeparture } from "react-icons/fa";
import Lottie from "lottie-react";
import EventCard from "./EventCard";
import personEvent from "../assets/lottieJson/person-events.json";
import people from "../assets/lottieJson/people.json";
import christmas from "../assets/lottieJson/christmas.json";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

export default ({ events, map, panel }) => {
  const [first, setfirst] = useState(false);
  const renderList = () => {
    return events?.map((event) => {
      return <EventCard key={event.id} event={event} panel={panel} map={map} />;
    });
  };

  return (
    <div class="">
      <div class="sticky-top px-4" style={{ background: "white" }}>
        <Carousel interval={4000}>
          <Carousel.Item>
            <div className="d-flex justify-content-between">
              <div
                className="text-start align-self-center"
                style={{ width: "400px", fontSize: "1.5rem" }}
              >
                Go out with to events, meet people, make friends, and go outside
                your confort zone.
              </div>
              <Lottie
                animationData={people}
                style={{ height: "200px", width: "400px" }}
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="d-flex justify-content-between">
              <div
                className="text-start align-self-center"
                style={{ width: "400px", fontSize: "1.5rem" }}
              >
                Connect with people, support noble couses events or just be
                present for someone havind a bad time.
              </div>
              <Lottie
                animationData={personEvent}
                style={{ height: "200px", width: "400px" }}
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="d-flex justify-content-between">
              <div
                className="text-start align-self-center"
                style={{ width: "400px", fontSize: "1.5rem" }}
              >
                Stop feeling down and be part of group holiday parties and fun
                activities.
              </div>
              <Lottie
                animationData={christmas}
                style={{ height: "200px", width: "400px" }}
              />
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
      {events && <div className="px-4">{renderList()}</div>}
    </div>
  );
};
