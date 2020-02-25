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
  const [selectedAutel, setSelectedAutel] = useState(null);
  const [selectedDrawing, setSelectedDrawing] = useState(null);
  const [selectedEdition, setSelectedEdition] = useState(null);


  const google = window.google;


  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedAutel(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const suppressionComponent = (component) => {
    component.setMap(null);
  }

  const beginEdition = (component) => {
    component.setEditable?component.setEditable(true):component.setDraggable(true);
    google.maps.event.clearListeners(component, 'click');
    google.maps.event.addListener(component, 'click', function (event) {
      setSelectedEdition(component);
    });
  }

  const confirmeEdition = (component) => {
    component.setEditable?component.setEditable(false):component.setDraggable(false);
    google.maps.event.clearListeners(component, 'click');
    google.maps.event.addListener(component, 'click', function (event) {
      setSelectedDrawing(component);
    });
  }

  const onNewAutel = (autel) => {
    google.maps.event.addListener(autel, 'click', function (event) {
      setSelectedDrawing(autel);
    });
  }

  const onNewItem = (item) => {
    google.maps.event.addListener(item, 'click', function (event) {
      setSelectedDrawing(item);
    });
  }

  const onPolygonComplete = React.useCallback(function onPolygonComplete(poly) {
    const polyArray = poly.getPath().getArray();
    if(polyArray.length >= 3 )
    {
      let paths = [];
      polyArray.forEach(function (path) {
        paths.push({ latitude: path.lat(), longitude: path.lng() });
      });

      google.maps.event.addListener(poly, 'click', function (event) {
        setSelectedDrawing(poly);
      });
    }
    else
    {
      poly.setMap(null);
    }
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
            setSelectedAutel(autel);
          }}
          icon={{
            url: `/mapMarker.png`,
            scaledSize: new window.google.maps.Size(100, 100)
          }}
        />
      ))}

      {selectedAutel && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedAutel(null);
          }}
          position={{
            lat: selectedAutel.geometry.coordinates[0],
            lng: selectedAutel.geometry.coordinates[1]
          }}
        >
          <div>
            <h2>{selectedAutel.properties.NAME}</h2>
            <p>{selectedAutel.properties.DESCRIPTIO}</p>
          </div>
        </InfoWindow>
      )}
      <div id="DrawingManager_zone">
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
      </div>
      <div id="DrawingManager_autel">
        <DrawingManager
          defaultDrawingMode={google.maps.drawing.OverlayType.POLYGON}
          onMarkerComplete={onNewAutel}
          defaultOptions={{
            drawingControl: true,
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [
                google.maps.drawing.OverlayType.MARKER
              ],
            },
            markerOptions:{
              icon:{
                url: `/mapMarker.png`,
                scaledSize: new window.google.maps.Size(100, 100)
              }
            }  
          }}
             
        />
      </div>

      <div id="DrawingManager_item">
        <DrawingManager
          defaultDrawingMode={google.maps.drawing.OverlayType.POLYGON}
          onMarkerComplete={onNewItem}
          defaultOptions={{
            drawingControl: true,
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [
                google.maps.drawing.OverlayType.MARKER,
              ],
            },
            markerOptions:{
              icon:{
                url: `/skateboarding.svg`,
                scaledSize: new window.google.maps.Size(50, 50)
              }
            }
          }}     
        />
      </div>
      
      {selectedDrawing && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedDrawing(null);
            }}
            position={{
              lat: selectedDrawing.getPath?selectedDrawing.getPath().getArray()[0].lat():selectedDrawing.position.lat(),
              lng: selectedDrawing.getPath?selectedDrawing.getPath().getArray()[0].lng():selectedDrawing.position.lng()
            }}
          >
            
            <div>
              <div>
                <button onClick={()=>{suppressionComponent(selectedDrawing); setSelectedDrawing(null);}}>Supprimer</button>
                <button onClick={()=>{beginEdition(selectedDrawing); setSelectedDrawing(null);}}>Edition</button>
              </div>
            </div>
          </InfoWindow>
        )}

      {selectedEdition && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedEdition(null);
            }}
            position={{
              lat: selectedEdition.getPath?selectedEdition.getPath().getArray()[0].lat():selectedEdition.position.lat(),
              lng: selectedEdition.getPath?selectedEdition.getPath().getArray()[0].lng():selectedEdition.position.lng()
            }}
          >
            
            <div>
              <div>
                <button onClick={()=>{confirmeEdition(selectedEdition); setSelectedEdition(null);}}>Valider</button>
              </div>
            </div>
          </InfoWindow>
        )}
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
