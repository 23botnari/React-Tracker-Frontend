import React from "react";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const center = { lat: 47.0105, lng: 28.8638 };

function Dashboard() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB9K5uKIZHk4e5N2jKcgRvNgCZ7hpT4LeM",
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const originRef = useRef();

  const destiantionRef = useRef();

  if (!isLoaded) {
    return <div>aaaaaaaaaaaaaaa</div>;
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <GoogleMap
        center={center}
        zoom={8}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
      <div style={{height:"300px"}}>

        <div>Distance: {distance} </div>
        <div>Duration: {duration} </div>
        <Autocomplete>
          <InputText type="text" placeholder="Origin" ref={originRef} />
        </Autocomplete>
        <Autocomplete>
          <InputText
            type="text"
            placeholder="Destination"
            ref={destiantionRef}
          />
        </Autocomplete>
        <Button type="submit" onClick={calculateRoute}>
          Calculate Route
        </Button>
        <Button aria-label="center back" onClick={clearRoute}>
          Clear
        </Button>
      </div>
    </div>
  );
}
export default Dashboard;
