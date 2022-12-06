import { FaSearch } from "react-icons/fa";
import { changeSearch } from "../store";
import { useDispatch, useSelector } from "react-redux";
import fetchLocation from "../store/thunks/fetchLocation";
import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import Lottie from "lottie-react";
import Location from "../assets/lottieJson/location.json";
export default ({ map, panel }) => {
  console.log(map);
  const dispatch = useDispatch();
  const { searchText, results } = useSelector((state) => state.search);

  const changeText = (event) => {
    dispatch(changeSearch(event.target.value));
  };
  const handleSubmit = () => {
    dispatch(fetchLocation(searchText));
  };

  //const map = useMap();

  const renderList = () => {
    return results?.map((country) => {
      return (
        <CountryCard
          key={country.place_id}
          country={country}
          map={map}
          panel={() => {
            panel();
          }}
        />
      );
    });
  };

  useEffect(() => {
    // if (results.length) {
    //   const firstLocation = results[0];
    //   map.current.flyTo([firstLocation.lat, firstLocation.lon], 13, {
    //     duration: 2,
    //   });
    // }
  }, [results]);

  return (
    <div class="">
      <div class="sticky-top" style={{ background: "white" }}>
        <div className="search-panel shadow p-3 mb-5 bg-body rounded">
          <h5 className="mb-2 text-center"> Search a Location</h5>
          <div className="input-group">
            <input
              type="email"
              className="form-control d-flex"
              id="exampleFormControlInput1"
              placeholder="new york, united states"
              value={searchText}
              onChange={changeText}
            />
            <button
              onClick={handleSubmit}
              type="button"
              className="btn btn-outline-secondary"
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4">
        {results.length ? (
          renderList()
        ) : (
          <div className="d-flex justify-content-center">
            <div>
              <Lottie
                animationData={Location}
                style={{ height: "200px", width: "400px", margin: "none" }}
              />
              <div style={{ width: "400px", textAlign: "center" }}>
                Search a Location and Start Creating Events and Add to the
                community.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
