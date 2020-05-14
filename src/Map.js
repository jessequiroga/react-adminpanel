import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  InfoWindow
} from "react-google-maps";
import { Card, Navbar, NavbarToggler, Button, Nav, Collapse, NavItem } from 'reactstrap';
import {
  DrawingManager
} from "react-google-maps/lib/components/drawing/DrawingManager";
import myStyle from "./style";
import Game from "./model/Game.js";
import ZoneManager from "./model/Zone.js";

import DrawManager from "./DrawManager.js";
import MapControl from "./MapControl.js"
import PlayersControl from "./PlayersControl";
import SocketMessage from "./model/SocketMessage";
import SocketController from "./model/SocketController";
import ItemManager from "./model/elements/ItemManager";

import TextDisplay from "./components/TextDisplay";
import SelectDisplay from "./components/SelectDisplay";

function Map() {
  const [selectedDrawed, setSelectedDrawed] = useState(null); // Triger if an Altar is selected
  const [selectedMove, setSelectedMoved] = useState(null); // Triger if an Altar is selected
  const [selectedEdited, setSelectedEdited] = useState(null); // Triger if an Altar is selected
  const [canDrawMapZone, setCanDrawMapZone] = useState(false); // Triger if the DrawingManger Map Zone is active
  const [canDrawAltar, setCanDrawAltar] = useState(false); // Triger if the DrawingManger Altar is active
  const [canDrawItem, setCanDrawItem] = useState(false); // Triger if the DrawingManger Item is active
  const [typeItemDraw, setTypeItemDraw] = useState(null); // Triger if the DrawingManger Item is active
  const [isOpen, changeIsOpen] = useState(false); // Trigger toogle menu
  const [listVisionMarker, setListVisionMarker] = useState([]); // Listing of all the VisionMarker
  const [listPlayer, setListPlayer] = useState([]); // Listing of all the VisionMarker
  const [listMarkerPlayer, setListMarkerPlayer] = useState([]);
  const [listPlayerPos, setListPlayerPos] = useState([]);
  const [gameUpdate, setGameUpdate] =useState({});


  const [formularAttributeItem, setFormularAttributeItem] = useState({
                                                                      captureDateChang: {value: '',errorMessage :'',isValid : true},
                                                                      availableDurationChang: {value: '',errorMessage :'',isValid : true},
                                                                      quantityChang: {value: '',errorMessage :'',isValid : true},
                                                                      canTeleportChang: {value: '',errorMessage :'',isValid : true},
                                                                      deficiencyDurationChang: {value: '',errorMessage :'',isValid : true}
                                                                    }); // Formular to change all the selected entity attributes for an Item

const [formularAttributeAltar, setFormularAttributeAltar] = useState({
                                                                      captureDateChang: {value: '',errorMessage :'',isValid : true},
                                                                      unvailableTimeChang: {value: '',errorMessage :'',isValid : true},
                                                                      teamChang: {value: '',errorMessage :'',isValid : true}
                                                                    }); // Formular to change all the selected entity attributes for an Altar


  const connectWebsocket = () => {
    var socket = SocketController.getSocket();

    socket.onmessage = function (event) {
      let message = new SocketMessage(event.data);
      switch (message.MessageType) {
        case SocketMessage.TypeMessage.PLAYERCONNECT:
          let players = message.ContainedEntity;
          setListPlayer(listPlayer.concat(players));
          break;
        case SocketMessage.TypeMessage.GAMEUPDATE:
          let playersPos = message.ContainedEntity.Players;
          setGameUpdate(message.ContainedEntity);
          
          let _listPlayerPos = listPlayerPos.slice(0);
          playersPos.forEach(function (player) {
            _listPlayerPos[player.Id] = player;
          });
          setListPlayerPos(_listPlayerPos);
          break;
        case SocketMessage.TypeMessage.OK:
          break;
        default:
          if (message.MessageType != null)
            console.log("pas d'action pour ce type de message:", message.MessageType);
          else
            console.log("message non traitable: ", event.data);
          break;
      }
    }
  }

  const toggle = () => { // Open/Close the menu
    changeIsOpen(!isOpen); // set true/false isOpen
  }

  const canDraw = () => {
    return (canDrawMapZone || canDrawAltar || (canDrawItem && typeItemDraw));
  }

  const cantDraw = () => {
    setCanDrawAltar(false); // Hidde the DrawingManager Altar
    setCanDrawMapZone(false); // Hidde the DrawingManager Map Zone
    setCanDrawItem(false); // Hidde the DrawingManager Item
  }

  const changeCanDrawItem = () => { // Show the DrawingManager item and hidde the other DrawingManager
    canDrawItem ? setCanDrawItem(false) : setCanDrawItem(true); // Show the DrawingManager item
    setTypeItemDraw(null);
    setCanDrawMapZone(false); // Hidde the DrawingManager Map Zone
    setCanDrawAltar(false); // Hidde the DrawingManager Altar 
  }

  const changeCanDrawAltar = () => { // Show the DrawingManager item and hidde the other DrawingManager
    canDrawAltar ? setCanDrawAltar(false) : setCanDrawAltar(true); // Show the DrawingManager Altar
    setCanDrawMapZone(false); // Hidde the DrawingManager Map Zone
    setCanDrawItem(false); // Hidde the DrawingManager Item
  }

  const changeCanDrawMapZone = () => { // Show the DrawingManager item and hidde the other DrawingManager
    canDrawMapZone ? setCanDrawMapZone(false) : setCanDrawMapZone(true); // Show the DrawingManager Map Zone
    setCanDrawAltar(false); // Hidde the DrawingManager Altar
    setCanDrawItem(false); // Hidde the DrawingManager Item
  }

  const google = window.google; // The constructor of the lib googgle map

  useEffect(() => { // On Map open
    connectWebsocket(); //chargement du websocket

    const listener = e => { // Event on press Escape unselect all selected Map component
      if (e.key === "Escape") {
        setSelectedDrawed(null); // Unselect Drawed component
        setSelectedMoved(null); // Unselect Edited component
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
    console.log(component.type);
    let err = false;
    if(Object.keys(ItemManager.TypesItem).indexOf(component.type)!==-1)
    {
      err = Game.getInstance().removeItem(component);
    }
    else{
      switch(component.type)
      {
        case 'Zone':
          err = Game.getInstance().removeZone(component);
          break;

        case 'Altar':
          err = Game.getInstance().removeAltar(component);
          break;

        default:
          err = true;
          console.log("pas de type");
          break;
      }
    }
    if(!err){
      component.setMap(null); // Unset the map attribut of the component for remove it
      if(component.type != "Zone")
        component.visionCircle.setMap(null); // Unset the map attribut of the component for remove it
    }
  }

  const beginMove = (component) => { // Begin the Map component move (Map Component component)
    let err = false;
    if(Object.keys(ItemManager.TypesItem).indexOf(component.type)!==-1)
    {
      component.setDraggable(true);
    }
    else{
      switch(component.type)
      {
        case 'Zone':
          component.setEditable(true);
          break;

        case 'Altar':
          component.setDraggable(true);
          break;

        default:
          err = true;
          console.log("pas de type");
          break;
      } // if it's an editing Map component we set the editing on true else we set the component draggable
    }
    if(err)
    {
      console.log("erreur lors de la modif");
    }
    else
    {
      cantDraw();
      setSelectedEdited(null);
      setSelectedMoved(null);
      /**
       * Replace the elemnt on click by the editing popup validation
       **/ 
      google.maps.event.clearListeners(component, 'click'); // Unset the old event onClick of the Map component
      google.maps.event.addListener(component, 'click', function (event) { // Set the new event onClick of the Map component
        !canDraw()&&setSelectedMoved(component); // Select the moved component
      });
    }
  }

  const beginEditing = (component) => { // Begin the Map component edition (Map Component component)
    cantDraw();
    setSelectedEdited(component);
    /**
     * Replace the elemnt on click by the editing popup validation
     **/
    google.maps.event.clearListeners(component, 'click'); // Unset the old event onClick of the Map component
    google.maps.event.addListener(component, 'click', function (event) { // Set the new event onClick of the Map component
      !canDraw() && setSelectedEdited(component); // Select the edited component
    });
  }

  const confirmeMoving = (component) => { // End the Map component edition (Map Component component)
    let err = false;
    let message;
    var socket = SocketController.getSocket();
    if(Object.keys(ItemManager.TypesItem).indexOf(component.type)!==-1)
    {
      err = Game.getInstance().editItem(component);
      component.setDraggable(false);
      message = new SocketMessage(Game.getInstance().getItemById(component.id), SocketMessage.TypeMessage.ITEMUPDATE);
    }
    else{
      switch (component.type) // if it's an editing Map component we set the editing on true else we set the component draggable // if it's an editing Map component we set the editing on false else we set the component undraggable
      {
        case 'Zone':
          err = Game.getInstance().editZone(component);
          component.setEditable(false);
          message = new SocketMessage(Game.getInstance().getZoneById(component.id), SocketMessage.TypeMessage.ITEMUPDATE);
          break;

        case 'Altar':
          err = Game.getInstance().editAltar(component);
          component.setDraggable(false);
          message = new SocketMessage(Game.getInstance().getAltarById(component.id), SocketMessage.TypeMessage.FLAGUPDATE);
          break;

        default:
          err = true;
          console.log("pas de type");
          break;
      }
    }

    if (err) {
      console.log("erreur lors de la modif");
    }
    else {
      socket.send(message.toJson());
      /**
      * Replace the elemnt on click by the menu popup
      **/
      google.maps.event.clearListeners(component, 'click'); // Unset the old event onClick of the Map component
      google.maps.event.addListener(component, 'click', function (event) { // Set the new event onClick of the Map component
        !canDraw() && setSelectedDrawed(component); // Select the drawed component

      });
    }

  }

  const confirmeEditing = (component) => { // End the Map component edition (Map Component component)
    let err = false;
    /*switch(component.type) // if it's an editing Map component we set the editing on true else we set the component draggable // if it's an editing Map component we set the editing on false else we set the component undraggable
    {
      case 'Zone':
        err = Game.getInstance().editZone(component);
        component.setEditable(false);
        break;

      case 'Item':
        err = Game.getInstance().editItem(component);
        component.setDraggable(false);
        break;

      case 'Altar':
        err = Game.getInstance().editAltar(component);
        component.setDraggable(false);
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
    else
    { *//**
      * Replace the elemnt on click by the menu popup
      **/
    google.maps.event.clearListeners(component, 'click'); // Unset the old event onClick of the Map component
    google.maps.event.addListener(component, 'click', function (event) { // Set the new event onClick of the Map component
      !canDraw() && setSelectedDrawed(component); // Select the drawed component
    });
    //}

  }

  const onPolygonComplete = React.useCallback(function onPolygonComplete(poly) { // Event when a polygon is created
    const polyArray = poly.getPath().getArray(); // Get all the coordinates of the polygone
    if (polyArray.length >= 3) // If the polygone have more/or 3 coordinates it's a polygone
    {
      let paths = []; // all the coordinates
      polyArray.forEach(function (path) { // For each coordinates we publish an array with only the latitude and the longitude of this coordinate
        paths.push([path.lat(), path.lng()]); // save the latitude and the longitude of this coordinate
      });

      google.maps.event.addListener(poly, 'click', function (event) { // Add Event onClick to the polygon selectedDrawed: the new polygon can be selected
        !canDraw() && setSelectedDrawed(poly); // Select the drawed componenet: polygon
      });

      poly['type'] = 'Zone';
      poly['id'] = ZoneManager.IncrId;
      let polyObject = ZoneManager.createZone(paths);
      polyObject.MapEntity = poly;
      Game.getInstance().addZone(polyObject);
      let socket = SocketController.getSocket();
      socket.send((new SocketMessage(polyObject, SocketMessage.TypeMessage.FLAGADD)).toJson());
    }
    else // If the polygone have less of 3 coordinates it's not a polygone
    {
      poly.setMap(null); // The polygone is remove
    }
    setCanDrawMapZone(false); // Hidde the DrawingManager Map Zone
  }, []);

  const typesItem = Object.keys(ItemManager.TypesItem).map(key => {
    return <NavItem key={key} className="mb-2">
      <Button onClick={() => { setTypeItemDraw(key) }}>{ItemManager.TypesItem[key]}</Button>
    </NavItem>
  });

  const onSubmitEditAttributeAltar = (altarId) =>
  {
    let value = formularAttributeAltar.unvailableTimeChang.value;
    let valid = formularAttributeAltar.unvailableTimeChang.isValid;

    if(valid && value != "")
    {
      let altar = Game.getInstance().getAltarById(altarId);
      let indexA = Game.getInstance().findAltarById(altarId);
      altar.UnvailableTime = value;
      Game.getInstance().replaceAltar(indexA,altar);
    }
  
    setFormularAttributeAltar({
                                captureDateChang: {value: '',errorMessage :'',isValid : true},
                                unvailableTimeChang: {value: '',errorMessage :'',isValid : true},
                                teamChang: {value: '',errorMessage :'',isValid : true}
                              });
  }

  const onSubmitEditAttributeItem = (itemId) =>
  {

    let formulaireValide = true;
    let content = {};
    Object.keys(formularAttributeItem).map(x =>{
        if(x!=="captureDateChang")
        {
          if(formularAttributeItem[x].value !== "" )
            content[x] = formularAttributeItem[x].value

          if(!formularAttributeItem[x].isValid) // Si un champs n'est pas valide alors tout le formulaire ne l'est pas
              formulaireValide = false; // Le formulaire n'est pas valide
        }
    });

    if(formulaireValide)
    {
      let item = Game.getInstance().getItemById(itemId);
      let indexI = Game.getInstance().findAltarById(itemId);
      Object.keys(formularAttributeItem).map(x =>{
          item[x] = content[x];
      });
      Game.getInstance().replaceItem(indexI,item);
      setFormularAttributeItem({
                                captureDateChang: {value: '',errorMessage :'',isValid : true},
                                availableDurationChang: {value: '',errorMessage :'',isValid : true},
                                quantityChang: {value: '',errorMessage :'',isValid : true},
                                canTeleportChang: {value: '',errorMessage :'',isValid : true},
                                deficiencyDurationChang: {value: '',errorMessage :'',isValid : true}
                              });
    }
  }

  return (
    <GoogleMap
      defaultZoom={9} // Initiate the defalt zoom view on the map
      defaultCenter={{ lat: 48.529377, lng: 7.73689 }} // Initiate the begin coordonate on the Iut pos
      //defaultCenter={{ lat: 45.421532, lng: -75.967189 }} //Ottawa
      options= // Initiate all the option of the map
      {{
        disableDefaultUI: true, // disable default map UI
        draggable: true, // make map draggable
        keyboardShortcuts: false, // disable keyboard shortcuts
        scaleControl: true, // allow scale controle
        scrollwheel: true, // allow scroll wheel
        streetViewControl: false, // Disable the streetview
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
            polygonOptions: {
              strokeColor: "#FF0000",
              strokeOpacity: 1,
              strokeWeight: 3,
              fillColor: "#FF0000",
              fillOpacity: 0.30,
            }
          }}

        />
      )}

      <MapControl gameUpdate={gameUpdate} listVisionMarker={listVisionMarker} canDraw={canDraw} setSelectedDrawed={setSelectedDrawed} />

      <PlayersControl canDraw={canDraw} listMarkerPlayer={listMarkerPlayer} listPlayerPos={listPlayerPos} listPlayer={listPlayer} setSelectedDrawed={setSelectedDrawed} />

      <DrawManager listVisionMarker={listVisionMarker} canDraw={canDraw} setSelectedMoved={setSelectedMoved}
        setSelectedDrawed={setSelectedDrawed} canDrawMapZone={canDrawMapZone}
        canDrawAltar={canDrawAltar} canDrawItem={canDrawItem} typeItemDraw={typeItemDraw}
        position={google.maps.ControlPosition.TOP_LEFT}>
        {/* Menu Show DrawingManager */}
        <Card className="border-1">
          <Navbar color="faded" className="border-1" light>
            <NavbarToggler className="mb-2" onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav navbar>
                <NavItem className="mb-2">
                  {canDrawMapZone ? <Button color="warning" onClick={changeCanDrawMapZone}>X</Button> : <Button onClick={changeCanDrawMapZone}>Draw Map Zone</Button>}
                </NavItem>
                <NavItem className="mb-2">
                  {(Game.getInstance().Regions.length > 0) ? canDrawAltar ? <Button color="warning" onClick={changeCanDrawAltar}>X</Button> : <Button onClick={changeCanDrawAltar}>Put Altar</Button> : null}
                </NavItem>
                <NavItem className="mb-2">
                  {(Game.getInstance().Regions.length > 0) ? canDrawItem ? <Button color="warning" onClick={changeCanDrawItem}>X</Button> : <Button onClick={changeCanDrawItem}>Put Item</Button> : null}
                  <Collapse className="mt-2" isOpen={canDrawItem} navbar>
                    <Nav navbar>
                      {
                        typesItem
                      }
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
            lat: selectedDrawed.getPath ? selectedDrawed.getPath().getArray()[0].lat() : selectedDrawed.position.lat(), // lat: Marker and polygon don't have the same coordinates: array for polygon
            lng: selectedDrawed.getPath ? selectedDrawed.getPath().getArray()[0].lng() : selectedDrawed.position.lng() // lng: Marker and polygon don't have the same coordinates: array for polygon
          }}
        >

          <div> {/* Info Window body */}
            {(selectedDrawed.type && selectedDrawed.type === "Altar") ?
              <div>
                {Game.getInstance() && Game.getInstance().getAltarById(selectedDrawed.id).CaptureDate && (new Date(Game.getInstance().getAltarById(selectedDrawed.id).CaptureDate+"Z")).getTime() !== (new Date('0001-01-01T00:00:00Z')).getTime() ? <div><span>Capture Date: </span><span>{Game.getInstance().getAltarById(selectedDrawed.id).CaptureDate}</span></div> : <div><span>This Altar is free</span></div>}
                {Game.getInstance() && Game.getInstance().getAltarById(selectedDrawed.id).UnvailableTime ? <div><span>Unvailable Time: </span><span>{Game.getInstance().getAltarById(selectedDrawed.id).UnvailableTime}</span></div> : <div><span>This Altar is available</span></div>}
                {Game.getInstance() && Game.getInstance().getAltarById(selectedDrawed.id).Team ? <div><span>Team: </span><span>{Game.getInstance().getAltarById(selectedDrawed.id).Team.Name}</span></div> : <div><span>No Team had this Altar</span></div>}
              </div> : null}
            {(selectedDrawed.type && Object.keys(ItemManager.TypesItem).indexOf(selectedDrawed.type) !== -1) ?
              <div>
                {Game.getInstance() && Game.getInstance().getItemById(selectedDrawed.id).CaptureDate && (new Date(Game.getInstance().getItemById(selectedDrawed.id).CaptureDate+"Z")).getTime() !== (new Date('0001-01-01T00:00:00Z')).getTime() ? <div><span>Capture Date: </span><span>{Game.getInstance().getItemById(selectedDrawed.id).CaptureDate}</span></div> : <div><span>This Item is free</span></div>}
                {Game.getInstance() && Game.getInstance().getItemById(selectedDrawed.id).AvailableDuration ? <div><span>This item is available again: </span><span>{Game.getInstance().getItemById(selectedDrawed.id).AvailableDuration}</span></div> : <div><span>This Iteam is not available anymore</span></div>}
                {Game.getInstance() && Game.getInstance().getItemById(selectedDrawed.id).Quantity ? <div><span>Quantity: </span><span>{Game.getInstance().getItemById(selectedDrawed.id).Quantity}</span></div> : <div><span>There is no item left in this point</span></div>}
                {Game.getInstance() && Game.getInstance().getItemById(selectedDrawed.id).CanTeleport ? <div><span>This iteam can be teleported</span><span>{Game.getInstance().getItemById(selectedDrawed.id).CanTeleport}</span></div> : <div><span>There item can not be teleported</span></div>}
                {Game.getInstance() && Game.getInstance().getItemById(selectedDrawed.id).DeficiencyDuration ? <div><span>This iteam will be vailable in: </span><span>{Game.getInstance().getItemById(selectedDrawed.id).DeficiencyDuration} after some one take an item</span></div> : <div><span>There is no item left in this point</span></div>}
              </div> : null}
            <div>
              <button onClick={() => { suppressComponent(selectedDrawed); setSelectedDrawed(null); }}>Supprimer</button>{/* add an button to remove the drawed component */}
              <button onClick={()=>{beginMove(selectedDrawed); setSelectedDrawed(null);}}>Move</button>{/* add an button to move the drawed component */}
              <button onClick={()=>{beginEditing(selectedDrawed); setSelectedDrawed(null);}}>Edit</button>{/* add an button to edit the drawed component */}
            </div>
          </div>
        </InfoWindow>
      )}

      {selectedMove && ( // If an edited component was select
        <InfoWindow // Show a new Info Window
          onCloseClick={() => { // Initiate an Event on click to the x to close it
            setSelectedMoved(null); // unselect the edited component: close the Info Window
          }}
          position={{ // Initiate the Info Windows coordinates with the altar coordinates
            lat: selectedMove.getPath ? selectedMove.getPath().getArray()[0].lat() : selectedMove.position.lat(), // lat: Marker and polygon don't have the same coordinates: array for polygon
            lng: selectedMove.getPath ? selectedMove.getPath().getArray()[0].lng() : selectedMove.position.lng() // lng: Marker and polygon don't have the same coordinates: array for polygon
          }}
        >

          <div>
            <div>
              <button onClick={() => { confirmeMoving(selectedMove); setSelectedMoved(null); }}>Validate</button> {/* add an button to validated the edited component */}
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
            lat: selectedEdited.getPath ? selectedEdited.getPath().getArray()[0].lat() : selectedEdited.position.lat(), // lat: Marker and polygon don't have the same coordinates: array for polygon
            lng: selectedEdited.getPath ? selectedEdited.getPath().getArray()[0].lng() : selectedEdited.position.lng() // lng: Marker and polygon don't have the same coordinates: array for polygon
          }}
        >

          <div>
            {(selectedEdited.type && selectedEdited.type === "Altar")?
              <form onSubmit={() => onSubmitEditAttributeAltar(selectedEdited.id)}>
                <div>{Game.getInstance() && Game.getInstance().getAltarById(selectedEdited.id).CaptureDate?
                  <TextDisplay name="captureDateChang" type="date" style={{backgroundColor:"#b7b6b0d9"}} typeInput="" label="Capture Date:" formular={formularAttributeAltar} changeFormular={setFormularAttributeAltar} value={new Date(Game.getInstance().getAltarById(selectedEdited.id).CaptureDate)}/>:
                  <TextDisplay name="captureDateChang" typeInput="" style={{backgroundColor:"#b7b6b0d9"}}  label="Capture Date:" formular={formularAttributeAltar} changeFormular={setFormularAttributeAltar} value="This Altar is free"/>}
                </div>
                <div>{Game.getInstance() && Game.getInstance().getAltarById(selectedEdited.id).UnvailableTime?
                  <TextDisplay name="unvailableTimeChang" type="time" typeInput="time" label="Unvailable Time:" formular={formularAttributeAltar} changeFormular={setFormularAttributeAltar} placeHolder={new Date(Game.getInstance().getAltarById(selectedEdited.id).UnvailableTime)}/>:
                  <TextDisplay name="unvailableTimeChang" type="time" typeInput="time" label="Unvailable Time:" formular={formularAttributeAltar} changeFormular={setFormularAttributeAltar} placeHolder="This Altar is available"/>}
                </div>
                <div>{Game.getInstance() && Game.getInstance().getAltarById(selectedEdited.id).Team?
                  <TextDisplay name="teamChang" typeInput="" style={{backgroundColor:"#b7b6b0d9"}}  label="Team:" formular={formularAttributeAltar} changeFormular={setFormularAttributeAltar} value={Game.getInstance().getAltarById(selectedEdited.id).Team.Name}/>:
                  <TextDisplay name="teamChang" typeInput="" style={{backgroundColor:"#b7b6b0d9"}}  label="Team:" formular={formularAttributeAltar} changeFormular={setFormularAttributeAltar} value="No Team had this Altar"/>}
                </div>
                <button>Validate</button> {/* add an button to validated the edited component */}
              </form>
            :null}

            {(selectedEdited.type && Object.keys(ItemManager.TypesItem).indexOf(selectedEdited.type) !== -1)?
              <form onSubmit={() => onSubmitEditAttributeItem(selectedEdited.id)}>
                <div>
                  {Game.getInstance() && Game.getInstance().getItemById(selectedEdited.id).CaptureDate?
                  <TextDisplay name="captureDateChang" style={{backgroundColor:"#b7b6b0d9"}} typeInput="" type="date" label="Capture Date:" formular={formularAttributeItem} changeFormular={setFormularAttributeItem} value={new Date(Game.getInstance().getItemById(selectedEdited.id).CaptureDate)}/>:
                  <TextDisplay name="captureDateChang" style={{backgroundColor:"#b7b6b0d9"}} typeInput="" label="Capture Date:" formular={formularAttributeItem} changeFormular={setFormularAttributeItem} value="This Item is free"/>}
                </div>
                <div>
                  {Game.getInstance() && Game.getInstance().getItemById(selectedEdited.id).AvailableDuration?
                  <TextDisplay name="availableDurationChang" typeInput="time" type="time" label="This item is available again in:" formular={formularAttributeItem} changeFormular={setFormularAttributeItem} placeHolder={new Date(Game.getInstance().getItemById(selectedEdited.id).AvailableDuration)}/>:
                  <TextDisplay name="availableDurationChang" typeInput="time" type="time" label="This item is available again in:" formular={formularAttributeItem} changeFormular={setFormularAttributeItem} placeHolder=""/>}
                </div>
                <div>
                  {Game.getInstance() && Game.getInstance().getItemById(selectedEdited.id).Quantity?
                  <TextDisplay name="quantityChang" typeInput="number" label="Quantity:" formular={formularAttributeItem} changeFormular={setFormularAttributeItem} placeHolder={Game.getInstance().getItemById(selectedEdited.id).Quantity}/>:
                  <TextDisplay name="quantityChang" typeInput="number" label="Quantity:" formular={formularAttributeItem} changeFormular={setFormularAttributeItem} placeHolder="There is no item left in this point"/>}
                </div>
                <div>
                  {Game.getInstance() && console.log(Game.getInstance().getItemById(selectedEdited.id).CanTeleport)}
                  {Game.getInstance() && Game.getInstance().getItemById(selectedEdited.id).CanTeleport?
                  <SelectDisplay name="canTeleportChang" label="This iteam can be teleported" options={[{value:true,label:"True",selected:true},{value:false,label:"False",selected:false}]} formular={formularAttributeItem} changeFormular={setFormularAttributeItem}/> :
                  <SelectDisplay name="canTeleportChang" label="This iteam can be teleported" options={[{value:true,label:"True",selected:false},{value:false,label:"False",selected:true}]} formular={formularAttributeItem} changeFormular={setFormularAttributeItem}/>}
                </div>
                <div>
                  {Game.getInstance() && Game.getInstance().getItemById(selectedEdited.id).DeficiencyDuration?
                  <TextDisplay name="deficiencyDurationChang" typeInput="time" type="time" label="This iteam will be vailable in:" formular={formularAttributeItem} changeFormular={setFormularAttributeItem} placeHolder={new Date(Game.getInstance().getItemById(selectedEdited.id).DeficiencyDuration)}/>:
                  <TextDisplay name="deficiencyDurationChang" typeInput="time" type="time" label="This iteam will be vailable in:" formular={formularAttributeItem} changeFormular={setFormularAttributeItem} placeHolder="There is no item left in this point"/>}
                </div>
                <button>Validate</button> {/* add an button to validated the edited component */}
              </form>
            :null}
        </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
export default Map;