import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  InfoWindow
} from "react-google-maps";
import {Card,Navbar,NavbarToggler,Button,Nav,Collapse,NavItem} from 'reactstrap';
import {
  DrawingManager
} from "react-google-maps/lib/components/drawing/DrawingManager";
import myStyle from "./style";
import Game from "./model/Game.js";
import ZoneManager from "./model/Zone.js";

import DrawManager from "./DrawManager.js";
import MapControl from "./MapControl.js"

function Map() {
  const [selectedDrawed, setSelectedDrawed] = useState(null); // Triger if an Altar is selected
  const [selectedEdited, setSelectedEdited] = useState(null); // Triger if an Altar is selected
  const [canDrawMapZone, setCanDrawMapZone] = useState(false); // Triger if the DrawingManger Map Zone is active
  const [canDrawAltar, setCanDrawAltar] = useState(false); // Triger if the DrawingManger Altar is active
  const [canDrawItem, setCanDrawItem] = useState(false); // Triger if the DrawingManger Item is active
  const [isOpen, changeIsOpen] = useState(false); // Trigger toogle menu
  const [listZone, setListZone] = useState([]); // Listing of all the Component google-maps polygon

  const toggle = () => { // Open/Close the menu
     changeIsOpen(!isOpen); // set true/false isOpen
  }

  const canDraw = () => {
      return (canDrawMapZone || canDrawAltar || canDrawItem);
  }

  const cantDraw = () => 
  {
    setCanDrawAltar(false); // Hidde the DrawingManager Altar
    setCanDrawMapZone(false); // Hidde the DrawingManager Map Zone
    setCanDrawItem(false); // Hidde the DrawingManager Item
  }

  const changeCanDrawItem = () => { // Show the DrawingManager item and hidde the other DrawingManager
    canDrawItem?setCanDrawItem(false):setCanDrawItem(true); // Show the DrawingManager item
    setCanDrawMapZone(false); // Hidde the DrawingManager Map Zone
    setCanDrawAltar(false); // Hidde the DrawingManager Altar 
  }

  const changeCanDrawAltar = () => { // Show the DrawingManager item and hidde the other DrawingManager
    canDrawAltar?setCanDrawAltar(false):setCanDrawAltar(true); // Show the DrawingManager Altar
    setCanDrawMapZone(false); // Hidde the DrawingManager Map Zone
    setCanDrawItem(false); // Hidde the DrawingManager Item
  }

  const changeCanDrawMapZone = () => { // Show the DrawingManager item and hidde the other DrawingManager
    canDrawMapZone?setCanDrawMapZone(false):setCanDrawMapZone(true); // Show the DrawingManager Map Zone
    setCanDrawAltar(false); // Hidde the DrawingManager Altar
    setCanDrawItem(false); // Hidde the DrawingManager Item
  }

  const google = window.google; // The constructor of the lib googgle map

  useEffect(() => { // On Map open
    const listener = e => { // Event on press Escape unselect all selected Map component
      if (e.key === "Escape") {
        setSelectedDrawed(null); // Unselect Drawed component
        setSelectedEdited(null); // Unselect Edited component
        cantDraw();
      }
    };
    window.addEventListener("keydown", listener); // Set event keydown escape on this window

    return () => { // On window change
      window.removeEventListener("keydown", listener); // UnSet event keydown escape on this window
    };
  }, []);

  const suppressComponent = (component) => { // Remove the Map component (Map component: component)

    let err = false;
    switch(component.type)
    {
      case 'zone':
        err = Game.getInstance().removeZone(component);
        var index = listZone.indexOf(component);
        console.log("index",index);
        if(index > -1)
          setListZone(listZone.splice(index,1));
        break;

      case 'item':
        err = Game.getInstance().removeItem(component);
        break;

      case 'altar':
        err = Game.getInstance().removeAltar(component);
        break;

      default:
        err = true;
        console.log("pas de type");
        break;
    }
    console.log(err);
    if(!err){
      component.setMap(null); // Unset the map attribut of the component for remove it
    }
    console.log("zoneMap",listZone);
  }

  const beginEditing = (component) => { // Begin the Map component edition (Map Component component)
    component.setEditable?component.setEditable(true):component.setDraggable(true); // if it's an editing Map component we set the editing on true else we set the component draggable
    cantDraw();
    /**
     * Replace the elemnt on click by the editing popup validation
     **/ 
    google.maps.event.clearListeners(component, 'click'); // Unset the old event onClick of the Map component
    google.maps.event.addListener(component, 'click', function (event) { // Set the new event onClick of the Map component
      setSelectedEdited(component); // Select the edited component
    });
  }

  const confirmeEditing = (component) => { // End the Map component edition (Map Component component)
    component.setEditable?component.setEditable(false):component.setDraggable(false); // if it's an editing Map component we set the editing on false else we set the component undraggable

    /**
     * Replace the elemnt on click by the menu popup
     **/
    google.maps.event.clearListeners(component, 'click'); // Unset the old event onClick of the Map component
    google.maps.event.addListener(component, 'click', function (event) { // Set the new event onClick of the Map component
      setSelectedDrawed(component); // Select the drawed component
    });

    let err = false;
    console.log(component);
    switch(component.type)
    {
      case 'zone':
        err = Game.getInstance().editZone(component);
        break;

      case 'item':
        err = Game.getInstance().editItem(component);
        break;

      case 'altar':
        err = Game.getInstance().editAltar(component);
        break;

      default:
        err = true;
        console.log("pas de type");
        break;
    }

    if(err)
    {
      console.log("erreur lors de la modif");
    }

  }

  const onPolygonComplete = React.useCallback(function onPolygonComplete(poly) { // Event when a polygon is created
    const polyArray = poly.getPath().getArray(); // Get all the coordinates of the polygone
    if(polyArray.length >= 3 ) // If the polygone have more/or 3 coordinates it's a polygone
    {
      let paths = []; // all the coordinates
      polyArray.forEach(function (path) { // For each coordinates we publish an array with only the latitude and the longitude of this coordinate
        paths.push({ lat: path.lat(), lng: path.lng() }); // save the latitude and the longitude of this coordinate
      });

      google.maps.event.addListener(poly, 'click', function (event) { // Add Event onClick to the polygon selectedDrawed: the new polygon can be selected
        setSelectedDrawed(poly); // Select the drawed componenet: polygon
      });
      poly['type'] = 'zone';
      poly['id'] = ZoneManager.IncrId;

      Game.getInstance().addZone(ZoneManager.createZone(paths));
      setListZone(listZone.concat(poly));
    }
    else // If the polygone have less of 3 coordinates it's not a polygone
    {
      poly.setMap(null); // The polygone is remove
    }
    setCanDrawMapZone(false); // Hidde the DrawingManager Map Zone
  }, []);
 
  
  return (
    <GoogleMap
      defaultZoom={17} // Initiate the defalt zoom view on the map
      defaultCenter={{ lat: 48.529377, lng: 7.73689 }} // Initiate the begin coordonate on the Iut pos
      //defaultCenter={{ lat: 45.421532, lng: -75.967189 }} //Ottawa
      options= // Initiate all the option of the map
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

      {/**
       * Create an Drawing Manager for the game zone
       * Can draw an polygon or an rectangle
       */}
      {canDrawMapZone && (
        <DrawingManager // Create a new Drawing Manager
          defaultDrawingMode={google.maps.drawing.OverlayType.POLYGON} // Set the defalt Drawing mode to polygon
          onPolygonComplete={onPolygonComplete} // Set the new Event onPolygonComplete with our custom onPolygonComplete
          defaultOptions={{ // Initiate the Drawing Manager options
            drawingControl: false, // Show the Drawing Manager
            drawingControlOptions: { // Initiate the button and drawing options
              position: google.maps.ControlPosition.TOP_CENTER, // Set the drawing manager on the center of the map
              drawingModes: [ // Set the drawing options
                google.maps.drawing.OverlayType.POLYGON, // We can draw polygons
              ],
            },
          }}     
        />
      )}

      <MapControl listZone={listZone} canDraw={canDraw} setSelectedDrawed={setSelectedDrawed}/>

      <DrawManager listZone={listZone} canDraw={canDraw} setSelectedEdited={setSelectedEdited} 
      setSelectedDrawed={setSelectedDrawed} canDrawMapZone={canDrawMapZone} 
      canDrawAltar={canDrawAltar} canDrawItem={canDrawItem}  
      position={google.maps.ControlPosition.TOP_LEFT}>
         {/* Menu Show DrawingManager */}
        <Card className="border-1">
        <Navbar color="faded" className="border-1" light>
            <NavbarToggler className="mb-2" onClick={toggle}/>
            <Collapse isOpen={isOpen} navbar>
                <Nav  navbar>
                    <NavItem className="mb-2">
                      {canDrawMapZone?<Button color="warning" onClick={changeCanDrawMapZone}>X</Button>:<Button onClick={changeCanDrawMapZone}>Draw Map Zone</Button>}
                    </NavItem>
                    <NavItem className="mb-2">
                      {(listZone.length > 0) ?canDrawAltar?<Button color="warning" onClick={changeCanDrawAltar}>X</Button>:<Button onClick={changeCanDrawAltar}>Put Altar</Button>:null}
                    </NavItem>
                    <NavItem className="mb-2">
                        {(listZone.length > 0) ?canDrawItem?<Button color="warning" onClick={changeCanDrawItem}>X</Button>:<Button onClick={changeCanDrawItem}>Put Item</Button>:null}
                        <Collapse className="mt-2" isOpen={canDrawItem} navbar>
                            <Nav  navbar>
                                <NavItem className="mb-2">
                                    <Button onClick={() => console.log("Item 1")}>Item 1</Button>
                                </NavItem>
                                <NavItem className="mb-2">
                                    <Button onClick={() => console.log("Item 2")}>Item 2</Button>
                                </NavItem>
                                <NavItem className="mb-2">
                                    <Button onClick={() => console.log("Item 3")}>Item 3</Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
        </Card>
      </DrawManager>
      
      {selectedDrawed && ( // If an drawed component was select
          <InfoWindow // Show a new Info Window
            onCloseClick={() => { // Initiate an Event on click to the x to close it
              setSelectedDrawed(null); // unselect the drawed component: close the Info Window
            }}
            position={{ // Initiate the Info Windows coordinates with the altar coordinates
              lat: selectedDrawed.getPath?selectedDrawed.getPath().getArray()[0].lat():selectedDrawed.position.lat(), // lat: Marker and polygon don't have the same coordinates: array for polygon
              lng: selectedDrawed.getPath?selectedDrawed.getPath().getArray()[0].lng():selectedDrawed.position.lng() // lng: Marker and polygon don't have the same coordinates: array for polygon
            }}
          >
            
            <div> {/* Info Window body */}
              <div>
                <button onClick={()=>{suppressComponent(selectedDrawed); setSelectedDrawed(null);}}>Supprimer</button>{/* add an button to remove the drawed component */}
                <button onClick={()=>{beginEditing(selectedDrawed); setSelectedDrawed(null);}}>Edit</button>{/* add an button to edit the drawed component */}
              </div>
            </div>
          </InfoWindow>
        )}

      {selectedEdited && ( // If an edited component was select
          <InfoWindow // Show a new Info Window
            onCloseClick={() => { // Initiate an Event on click to the x to close it
              setSelectedEdited(null); // unselect the edited component: close the Info Window
            }}
            position={{ // Initiate the Info Windows coordinates with the altar coordinates
              lat: selectedEdited.getPath?selectedEdited.getPath().getArray()[0].lat():selectedEdited.position.lat(), // lat: Marker and polygon don't have the same coordinates: array for polygon
              lng: selectedEdited.getPath?selectedEdited.getPath().getArray()[0].lng():selectedEdited.position.lng() // lng: Marker and polygon don't have the same coordinates: array for polygon
            }}
          >
            
            <div>
              <div>
                <button onClick={()=>{confirmeEditing(selectedEdited); setSelectedEdited(null);}}>Validate</button> {/* add an button to validated the edited component */}
              </div>
            </div>
          </InfoWindow>
        )}
    </GoogleMap>
  );
}
export default Map;