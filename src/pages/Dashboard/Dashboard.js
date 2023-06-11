import React, { useEffect, useState } from "react";

import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";

import { useSelector } from "react-redux";

const center = { lat: 47.0105, lng: 28.8638 };
function Dashboard() {
  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB9K5uKIZHk4e5N2jKcgRvNgCZ7hpT4LeM",
    libraries: libraries,
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const { originPoint, destinationPoint } = useSelector(
    (state) => state.DashboardReducer
  );

  async function calculateRoute(originPoint, destinationPoint) {
  try{
  if (originPoint === "" || destinationPoint === "") {
      return setDirectionsResponse(null);
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originPoint,
      destination: destinationPoint,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    
      setDirectionsResponse(results);
    }
    catch{
                window.alert("Trip was not found");
    }
  }

  useEffect(() => {
    calculateRoute(originPoint, destinationPoint);
  }, [originPoint, destinationPoint]);

  if (!isLoaded) {
    return <div>Google Map Api is loading...</div>;
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
    </div>
  );
}
export default Dashboard;
