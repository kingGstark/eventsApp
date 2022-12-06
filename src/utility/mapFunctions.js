import * as L from "leaflet";
export const getRoute = (arrayCoords) => {
  var pointList = [...arrayCoords];
  const firstpolyline = new L.Polyline(pointList, {
    color: "red",
    weight: 3,
    opacity: 0.5,
    smoothFactor: 1,
  });
  return firstpolyline;
};
