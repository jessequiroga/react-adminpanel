import React from "react";
import {
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import "./app.css";
import Map from "./Map.js";
import Header from "./components/Header.js";

function App() {

  const MapWrapped = withScriptjs(withGoogleMap(Map)); // Build the map with the google map api

  return (
        <div id="map" style={{ width: "100vw", height: "100vh" }}>
          <Header/>
          <MapWrapped
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDWq5pZcRKig9OuOck6qsEEfAE-Um9n1hE`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      );

}
export default App;

