// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
// import L from "leaflet";
// import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
// import "leaflet-geosearch/dist/geosearch.css";


// // Fix marker icon
// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });


// // 🔁 Convert lat/lng → Address
// const getAddress = async (lat, lng, setLocation) => {
//   try {
//     const res = await fetch(
//       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
//     );
//     const data = await res.json();

//     setLocation(data.display_name); // ✅ full address
//   } catch (err) {
//     console.log(err);
//   }
// };


// // 📍 Click Marker
// const LocationMarker = ({ setLocation, setPosition }) => {

//   useMapEvents({
//     click(e) {
//       const { lat, lng } = e.latlng;

//       setPosition(e.latlng);
//       getAddress(lat, lng, setLocation); // ✅ convert to address
//     }
//   });

//   return null;
// };


// // 🔍 Search
// const SearchField = ({ setLocation, setPosition }) => {

//   const map = useMap();

//   useEffect(() => {

//   const provider = new OpenStreetMapProvider();

//   const searchControl = new GeoSearchControl({
//     provider: provider,
//     style: "bar",
//     showMarker: false,
//     showPopup: false,
//   });

//   map.addControl(searchControl);

//   map.on("geosearch/showlocation", (result) => {
//     const lat = result.location.y;
//     const lng = result.location.x;

//     setPosition({ lat, lng });
//     getAddress(lat, lng, setLocation);
//   });

//   return () => map.removeControl(searchControl);

// }, [map, setLocation, setPosition]); // ✅ FIX

//   return null;
// };


// // 🌍 Auto Location Button
// const LocateUser = ({ setPosition, setLocation }) => {

//   const map = useMap();

//   const handleLocate = () => {

//     if (!navigator.geolocation) {
//       alert("Geolocation not supported");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (pos) => {

//         const lat = pos.coords.latitude;
//         const lng = pos.coords.longitude;

//         const userPos = { lat, lng };

//         map.setView(userPos, 15); // zoom to user
//         setPosition(userPos);

//         getAddress(lat, lng, setLocation); // ✅ get address

//       },
//       () => {
//         alert("Unable to fetch location");
//       }
//     );
//   };

//   return (
//     <button
//       onClick={handleLocate}
//       style={{
//         position: "absolute",
//         top: "10px",
//         right: "10px",
//         zIndex: 1000,
//         padding: "6px 10px",
//         background: "blue",
//         color: "white",
//         border: "none",
//         cursor: "pointer"
//       }}
//     >
//       📍 My Location
//     </button>
//   );
// };


// // 🌍 Main Component
// const MapPopup = ({ setLocation, closeMap }) => {

//   const [position, setPosition] = useState(null);

//   return (
//     <div className="map-overlay">

//       <div className="map-container">

//         <button className="close-map" onClick={closeMap}>
//           Close
//         </button>

//         <MapContainer
//           center={[22.5726, 88.3639]}
//           zoom={13}
//           style={{ height: "400px", width: "100%", position: "relative" }}
//         >

//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//           {/* 🔍 Search */}
//           <SearchField setLocation={setLocation} setPosition={setPosition} />

//           {/* 📍 Click */}
//           <LocationMarker setLocation={setLocation} setPosition={setPosition} />

//           {/* 📍 Auto Detect */}
//           <LocateUser setPosition={setPosition} setLocation={setLocation} />

//           {/* 📍 Marker */}
//           {position && <Marker position={position} />}

//         </MapContainer>

//       </div>

//     </div>
//   );
// };

// export default MapPopup;

import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap
} from "react-leaflet";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

import "leaflet/dist/leaflet.css"; // ✅ MUST
import "leaflet-geosearch/dist/geosearch.css";

// ✅ Fix marker icon
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

// 🔁 Convert lat/lng → Address
const getAddress = async (lat, lng) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await res.json();
    return data.display_name || `${lat}, ${lng}`;
  } catch (err) {
    console.log(err);
    return `${lat}, ${lng}`;
  }
};

// 📍 Click Marker
const LocationMarker = ({ setPosition, setTempLocation }) => {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);

      const address = await getAddress(lat, lng);
      setTempLocation(address); // store temp only
    }
  });

  return null;
};

// 🔍 Search
const SearchField = ({ setPosition, setTempLocation }) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: false,
      showPopup: false
    });

    map.addControl(searchControl);

    const handler = async (result) => {
      const lat = result.location.y;
      const lng = result.location.x;

      const pos = { lat, lng };
      map.setView(pos, 15);
      setPosition(pos);

      const address = await getAddress(lat, lng);
      setTempLocation(address);
    };

    map.on("geosearch/showlocation", handler);

    return () => {
      map.removeControl(searchControl);
      map.off("geosearch/showlocation", handler); // ✅ CLEANUP FIX
    };
  }, [map, setPosition, setTempLocation]);

  return null;
};

// 📍 Auto Location
const LocateUser = ({ setPosition, setTempLocation }) => {
  const map = useMap();

  const handleLocate = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        const userPos = { lat, lng };

        map.setView(userPos, 15);
        setPosition(userPos);

        const address = await getAddress(lat, lng);
        setTempLocation(address);
      },
      () => alert("Unable to fetch location")
    );
  };

  return (
    <button
      onClick={handleLocate}
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 1000,
        padding: "6px 10px",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
      }}
    >
      📍 My Location
    </button>
  );
};

// 🌍 MAIN POPUP
const MapPopup = ({ setLocation, closeMap }) => {
  const [position, setPosition] = useState(null);
  const [tempLocation, setTempLocation] = useState("");

  return (
    <div className="map-overlay">
      <div className="map-container">

        <button className="close-map" onClick={closeMap}>
          ✖
        </button>

        <MapContainer
          center={[22.5726, 88.3639]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <SearchField
            setPosition={setPosition}
            setTempLocation={setTempLocation}
          />

          <LocationMarker
            setPosition={setPosition}
            setTempLocation={setTempLocation}
          />

          <LocateUser
            setPosition={setPosition}
            setTempLocation={setTempLocation}
          />

          {position && <Marker position={position} />}
        </MapContainer>

        {/* ✅ SHOW SELECTED ADDRESS */}
        <div style={{ marginTop: "10px" }}>
          <p><b>Selected:</b> {tempLocation || "Click map or search"}</p>

          <button
            onClick={() => {
              if (!tempLocation) return alert("Select location first");
              setLocation(tempLocation); // send to parent
              closeMap(); // close popup
            }}
            style={{
              padding: "8px 12px",
              background: "green",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "6px"
            }}
          >
            ✅ Confirm Location
          </button>
        </div>

      </div>
    </div>
  );
};

export default MapPopup;