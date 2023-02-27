import React from "react";
import GoogleMapReact from "google-map-react";
import google from "google-map-react"
const AnyReactComponent = ({ text }) => <div>{text}</div>;
function Dashboard() {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 0,
  };
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let labelIndex = 0;
  
  function initMap() {
    const bangalore = { lat: 12.97, lng: 77.59 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: bangalore,
    });
  
    // This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(map, "click", (event) => {
      addMarker(event.latLng, map);
    });
    // Add a marker at the center of the map.
    addMarker(bangalore, map);
  }
  
  // Adds a marker to the map.
  function addMarker(location, map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    new google.maps.Marker({
      position: location,
      label: labels[labelIndex++ % labels.length],
      map: map,
    });
  }
  
  window.initMap = initMap;
  return (
    // Important! Always set the container height explicitly
    <div style={{ marginLeft: "-30px",height: "100vh", width: "105%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBtPv38YMZZ8RASgT4za9oaTgMsv7zlKHs" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}
export default Dashboard;
