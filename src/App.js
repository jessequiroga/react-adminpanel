import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import {
  DrawingManager
} from "react-google-maps/lib/components/drawing/DrawingManager";
import * as parkData from "./data/autel.json";
import myStyle from "./style";

function Map() {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const google = window.google;


  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedMarker(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const onPolygonComplete = React.useCallback(function onPolygonComplete(poly) {
    const polyArray = poly.getPath().getArray();
    let paths = [];
    polyArray.forEach(function (path) {
      paths.push({ latitude: path.lat(), longitude: path.lng() });
    });
    console.log("onPolygonComplete", paths);
  }, []);

  return (
    <GoogleMap
      defaultZoom={17}
      defaultCenter={{ lat: 48.529377, lng: 7.73689 }} // Iut pos
      //defaultCenter={{ lat: 45.421532, lng: -75.967189 }} //Ottawa
      options=
      {{
        disableDefaultUI: true, // disable default map UI
        draggable: true, // make map draggable
        keyboardShortcuts: false, // disable keyboard shortcuts
        scaleControl: true, // allow scale controle
        scrollwheel: true, // allow scroll wheel
        streetViewControl: false, // Enlève la possibilité d'utilisé la fonction streetview
        styles: myStyle // change default map styles
      }}
    >
      {parkData.features.map(autel => (
        <Marker
          key={autel.properties.AUTEL_ID}
          position={{
            lat: autel.geometry.coordinates[0],
            lng: autel.geometry.coordinates[1]
          }}
          onClick={() => {
            setSelectedMarker(autel);
          }}
          icon={{
            url: `/mapMarker.png`,
            scaledSize: new window.google.maps.Size(100, 100)
          }}
        />
      ))}

      {selectedMarker && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedMarker(null);
          }}
          position={{
            lat: selectedMarker.geometry.coordinates[0],
            lng: selectedMarker.geometry.coordinates[1]
          }}
        >
          <div>
            <h2>{selectedMarker.properties.NAME}</h2>
            <p>{selectedMarker.properties.DESCRIPTIO}</p>
          </div>
        </InfoWindow>
      )}
      <DrawingManager
        defaultDrawingMode={google.maps.drawing.OverlayType.POLYGON}
        onPolygonComplete={onPolygonComplete}
        defaultOptions={{
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              google.maps.drawing.OverlayType.POLYGON,
              google.maps.drawing.OverlayType.RECTANGLE,
            ],
          },
        }}
      />
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div id="map" style={{ width: "100vw", height: "100vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDWq5pZcRKig9OuOck6qsEEfAE-Um9n1hE
        `}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
