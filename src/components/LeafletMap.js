import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import SearchForm from "./SearchForm";
import { useState, useRef } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";
import { useFetchEventsQuery } from "../store";
import EventsPanel from "./EventsPanel";
import { SpeedDial } from "primereact/speeddial";
import { Tooltip } from "primereact/tooltip";
import { Dialog } from "primereact/dialog";
import FilterEvents from "./FilterEvents";
import { useDispatch, useSelector } from "react-redux";
import { EventsMarkers, LocationMarker, UserMarker } from "./markers";
require("leaflet-routing-machine");
require("react-leaflet-markercluster/dist/styles.min.css");

const LeafletMap = () => {
  console.log(LeafletMap);
  const { from, to, points } = useSelector((states) => states.route);
  const [t, sett] = useState([]);
  const [displayEventsPanel, setDisplayEventsPanel] = useState(false);
  const [displaySearchPanel, setDisplaySearchPanel] = useState(false);
  const toast = useRef(null);
  let { data, error, isLoading } = useFetchEventsQuery();
  const markers = L.markerClusterGroup();
  const events = L.markerClusterGroup();
  const [map, setMap] = useState();
  const filteredData = data?.filter((e) => !t.includes(e.icon?.code));

  const polyLine = () => {
    const isRouteSet = from && to;
    const position = points[0]?.legs[0]?.steps.map((p) => [
      p.intersections[0]?.location[1],
      p.intersections[0]?.location[0],
    ]);
    if (isRouteSet && position) {
      return (
        <div>
          <Polyline positions={position} />
        </div>
      );
    }
  };
  const items = [
    // {
    //   label: "Add",
    //   icon: "pi pi-calendar",
    //   command: () => {
    //     toast.current.show({
    //       severity: "info",
    //       summary: "Add",
    //       detail: "Data Added",
    //     });
    //   },
    // },
    {
      label: "search",
      icon: "pi pi-search",
      command: () => {
        setDisplaySearchPanel(true);
      },
    },
    {
      label: "Events",
      icon: "pi pi-list",
      command: () => {
        setDisplayEventsPanel(true);
      },
    },
    // {
    //   label: "Update",
    //   icon: "pi pi-google",
    //   command: () => {
    //     toast.current.show({
    //       severity: "success",
    //       summary: "Update",
    //       detail: "Data Updated",
    //     });
    //   },
    // },
  ];
  const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: "customMarker",
      iconSize: L.point(40, 40, true),
    });
  };

  const renderMarkers = () => {
    return filteredData?.map((event) => {
      return <EventsMarkers key={event.id} event={event} cluster={events} />;
    });
  };

  return (
    <div>
      {data && <FilterEvents events={data} exclude={sett} />}
      <Dialog
        draggable={false}
        header="Events"
        visible={displayEventsPanel}
        style={{ width: "55vw" }}
        onHide={() => setDisplayEventsPanel(false)}
      >
        <EventsPanel
          events={data}
          map={map}
          panel={() => {
            setDisplayEventsPanel();
          }}
        />
      </Dialog>
      <Dialog
        draggable={false}
        header="Locations"
        visible={displaySearchPanel}
        style={{ width: "55vw" }}
        onHide={() => setDisplaySearchPanel(false)}
      >
        <SearchForm
          map={map}
          panel={() => {
            setDisplaySearchPanel(false);
          }}
        />
      </Dialog>
      <MapContainer
        ref={setMap}
        style={{ height: "100vh" }}
        center={[18.473191344014168, -69.94550928398863]}
        zoom={13}
        scrollWheelZoom={true}
      >
        {polyLine()}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
          showCoverageOnHover={false}
          iconCreateFunction={createClusterCustomIcon}
        >
          {data && renderMarkers()}
        </MarkerClusterGroup>
        <LocationMarker markers={markers}></LocationMarker>
        <UserMarker />
      </MapContainer>

      <div className="speeddial-tooltip-demo">
        <Tooltip
          target=".speeddial-tooltip-demo .speeddial-right .p-speeddial-action"
          position="left"
        />
        <SpeedDial
          model={items}
          radius={120}
          className="buttons-panel"
          direction="up-left"
          type="quarter-circle"
          buttonClassName="p-button-primary"
        />
      </div>
    </div>
  );
};

export default LeafletMap;
