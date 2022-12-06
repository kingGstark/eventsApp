import { Popup, Marker, useMapEvents } from "react-leaflet";
import EventCard from "./EventCard";
import * as L from "leaflet";
import { useState, useRef, useEffect } from "react";
import EventForm from "./EventForm";
import { useDispatch, useSelector } from "react-redux";
import { changeFrom } from "../store/index";
import UserInfoCard from "./UserInfoCard";
let DefaultIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [21, 41],
  iconAnchor: [11, 41],
});

let UserIcon = L.icon({
  iconUrl:
    "https://cdn0.iconfinder.com/data/icons/user-icons-4/100/user-17-512.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [51, 51],
  iconAnchor: [25, 51],
  shadowAnchor: [15, 55],
  shadowSize: [51, 51],
});
L.Icon.Default.imagePath =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-icon.png";
L.AwesomeMarkers.Icon.prototype.options.prefix = "fa";

export const EventsMarkers = (props) => {
  const eventMarkerRef = useRef();
  let icon = L.AwesomeMarkers.icon({
    icon: props.event?.icon?.code || "trash",
    markerColor: props.event?.icon?.color || "red",
  });

  return (
    <Marker icon={icon} ref={eventMarkerRef} position={props.event.position}>
      <Popup className="event-info-popup">
        <EventCard isInfo={true} event={props.event} />
      </Popup>
    </Marker>
  );
};

export const LocationMarker = ({ markers }) => {
  const [position, setPosition] = useState(null);
  const markerRef = useRef();
  const map = useMapEvents({
    contextmenu(e) {
      setPosition(e.latlng);
      this.markers.clearLayers();
      const { lat, lng } = e.latlng;
    },
  });
  if (!position) {
    return;
  }
  if (position && markerRef) {
    return (
      <Marker ref={markerRef} icon={DefaultIcon} position={position}>
        <Popup>
          <EventForm markers={markers} position={position} />
        </Popup>
      </Marker>
    );
  }
};

export const UserMarker = () => {
  const dispatch = useDispatch();
  const from = useSelector((states) => {
    return states.route.from;
  });
  navigator.geolocation.getCurrentPosition((e) => {
    dispatch(changeFrom({ lat: e.coords.latitude, lon: e.coords.longitude }));
  });
  return (
    <div>
      {from && (
        <Marker icon={UserIcon} position={from}>
          <Popup className="event-info-popup">
            <UserInfoCard position={from} />
          </Popup>
        </Marker>
      )}
    </div>
  );
};
