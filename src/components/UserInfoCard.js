import { useEffect, useState } from "react";
import axios from "axios";
export default ({ position }) => {
  const [userInfo, setuserInfo] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: {
            lat: position.lat,
            lon: position.lon,
            format: "jsonv2",
            addressdetails: "1",
          },
        }
      );

      setuserInfo(response.data);
      console.log(response.data);
    })();
  }, []);

  return (
    <div className="container-event">
      <article className="postcard dark blue info m-0">
        <div className="postcard__text">
          <h1 className="postcard__title-white">User`s Location</h1>
          <div className="postcard__subtitle small">
            {/* <time>
              <i className="fa fa-calendar me-2"></i>
              {m(event.date).format("MMMM Do YYYY").toString()}
            </time> */}
          </div>
          <div className="postcard__bar"></div>
          <div className="postcard__preview-txt">{userInfo?.display_name}</div>
          {/* <ul className="postcard__tagbox">
            <li className="tag__item">
              <i className={`fa fa- me-2`}></i>
              {}
            </li>
            <li className="tag__item">
              <i className="fa fa-clock me-2"></i>55 mins.
            </li>
          </ul> */}
        </div>
      </article>
    </div>
  );
};
