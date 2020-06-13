import React,{ Component } from 'react';
import { createPortal } from 'react-dom';
import { Card, Nav, NavItem } from 'reactstrap';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';
import ManagerItems from './model/elements/ItemManager';
import ManagerAltars from './model/elements/Altar';
import ManagerZones from './model/Zone';
import Game from './model/Game.js';
import Entity from './model/elements/Entity';
import Time from './helper/Time';



export default class MapControl extends Component {

  static contextTypes = { [MAP]: PropTypes.object }
  
  removeElement = (element) => {
    element.toMapElement().setMap(null);
    if(element.toMapElement().visionCircle)
      element.toMapElement().visionCircle.setMap(null);
    if(element.toMapElement().actionCircle)
      element.toMapElement().actionCircle.setMap(null);
  }

  findById= (table,id)=>
  {
    let result = null;
    var index = table.findIndex( ({ Id }) => Id === id);
    if(index !==-1)
      result = table[index];
    return result;
  }

  isDiff = (mapUpdate) =>
  {
    let log = false; //Show what is the diff in the game
    let result = false;
    let _mapUpdate =this._mapUpdate;

    if(_mapUpdate === null)
    {
      if(log)
        console.log("Init");
      return true
    }
    /**
     * Flags
     */
    if((mapUpdate.Flags === null && _mapUpdate.Flags !== null) || (_mapUpdate.Flags === null && mapUpdate.Flags !== null))
    {
      if(log)
        console.log((_mapUpdate.Flags !== null)?"There is no more flags":"Now We had Flags");
      return true
    }
    if(mapUpdate.Flags !== null && typeof mapUpdate.Flags != "undefined" && _mapUpdate.Flags !== null && typeof _mapUpdate.Flags != "undefined")
    {
      Object.keys(mapUpdate.Flags).map(x=>{
          let newFlag = mapUpdate.Flags[x];
          let _currentFlag = this.findById(_mapUpdate.Flags,mapUpdate.Flags[x].Id);
          if( JSON.stringify(newFlag) !== JSON.stringify(_currentFlag))
          {
            if(log)
              console.log("This Flag is Different: ",newFlag);
            result = true;
            return true;
          }
          return true;
      });

      Object.keys(_mapUpdate.Flags).map(x=>{
          let _newFlag = _mapUpdate.Flags[x];
          let currentFlag = this.findById(mapUpdate.Flags,_mapUpdate.Flags[x].Id);
          if(JSON.stringify(_newFlag) !== JSON.stringify(currentFlag))
          {
            if(log)
              console.log("This Flag is Different: ",_newFlag);
            result = true;
            return true;
          }
          return true;
      });
    }

    /**
     * Items
     */
    if((mapUpdate.Items === null && _mapUpdate.Items !== null) || (_mapUpdate.Items === null && mapUpdate.Items !== null))
    {
      if(log)
        console.log((_mapUpdate.Items !== null)?"There is no more flags":"Now We had Flags");
      return true
    }
    if(mapUpdate.Items !== null && typeof mapUpdate.Items != "undefined" && _mapUpdate.Items !== null && typeof _mapUpdate.Items != "undefined" )
    {
      Object.keys(mapUpdate.Items).map(x=>{
        let newItem = mapUpdate.Items[x];
        let _currentItem = this.findById(_mapUpdate.Items,mapUpdate.Items[x].Id);
        if(JSON.stringify(newItem) !== JSON.stringify(_currentItem ))
        {
          if(log)
          {
              console.log("This Item is Different: ",newItem);
              /*console.log("Diff curr: ",JSON.stringify(_currentItem));
              console.log("Diff new : ",JSON.stringify(newItem));
              throw new Error();*/
          }
          result = true;
          return true;
        }
        return true;
      });

      Object.keys(_mapUpdate.Items).map(x=>{
        let _newItem = _mapUpdate.Items[x];
        let currentItem = this.findById(mapUpdate.Items,_mapUpdate.Items[x].Id);
        if(JSON.stringify(_newItem) !== JSON.stringify(currentItem ))
        {
          if(log)
          {
              console.log("This Item is Different: ",_newItem);
              /*console.log("Diff curr: ",JSON.stringify(_currentItem));
              console.log("Diff new : ",JSON.stringify(newItem));
              throw new Error();*/
          }
          result = true;
          return true;
        }
        return true;
      });
    }


    /**
     * Zones
     */
    if((mapUpdate.Zones === null && _mapUpdate.Zones !== null) || (_mapUpdate.Zones === null && mapUpdate.Zones !== null))
    {
      if(log)
        console.log((_mapUpdate.Zones !== null)?"There is no more flags":"Now We had Flags");
      return true
    }
    if(mapUpdate.Zones !== null && typeof mapUpdate.Zones != "undefined" && _mapUpdate.Zones !== null && typeof _mapUpdate.Zones != "undefined")
    {
      Object.keys(mapUpdate.Zones).map(x=>{
        let newZone = mapUpdate.Flags[x];
        let _currentZone = this.findById(_mapUpdate.Zones,mapUpdate.Zones[x].Id);
        if(JSON.stringify(newZone) !== JSON.stringify(_currentZone) )
        {
          if(log)
              console.log("This Zone is Different: ",newZone);
          result = true;
          return true;
        }
        return true;
      });

      Object.keys(_mapUpdate.Zones).map(x=>{
        let _newZone = _mapUpdate.Flags[x];
        let currentZone = this.findById(mapUpdate.Zones,_mapUpdate.Zones[x].Id);
        if(JSON.stringify(_newZone) !== JSON.stringify(currentZone) )
        {
          if(log)
              console.log("This Zone is Different: ",_newZone);
          result = true;
          return true;
        }
        return true;
      });
    }
    return result;
  }

  findById(array, id){
    var index = array.findIndex( ({ Id }) => Id === id);
    return index;
}

  configMap = (mapUpdate =null) => {
    if(Object.keys(Game.getInstance()).length >0)
    {
      let game;
      if(mapUpdate != null)
      {
        game = mapUpdate;
      }
      else
        game = Game.getInstance();

      if(mapUpdate && Object.keys(mapUpdate).length >0)
      {
        if(Game.getInstance().Flags && (Object.keys(Game.getInstance().Flags).length) > 0 )
        {
         Game.getInstance().Flags.map(altar => {
            if(altar.Id == null)
            {
              if(altar.MapEntity !==null)
              {
                altar.toMapElement().setMap(null);
              }
              Game.getInstance().removeAltar(altar);
            }
            else if (Object.keys(game.Flags).length > 0)
            {
              if(this.findById(game.Flags,altar.Id)==null)
              {
                if(altar.MapEntity !==null)
                {
                  this.removeElement(altar);
                }
                Game.getInstance().removeAltar(altar);
              }
            }
            return true;
          });
        }
      }

      if(game.Flags && (Object.keys(game.Flags).length) > 0 )
      {
        game.Flags.map(altar => { // For each altar on the websocket message
          let exist =false;
          if(altar.Id != null)
          {
            var indexA = Game.getInstance().findAltarById(altar.Id);
            if(indexA !== -1)
            {
              exist = true;
              if(Entity.IncrId<altar.Id)
                Entity.IncrId = altar.Id+1;
            }
            else
            {
              Entity.IncrId++;
            }
            let newAltar = ManagerAltars.createAltar(altar.Position,altar.ActionDistance,altar.IsInActionRange,altar.Name,altar.VisionDistance,altar.UnavailableTime,altar.CaptureDate,altar.Id,altar.Team);
            var withVisionCircle=true;
            if(exist && Game.getInstance().Flags[indexA].toMapElement)
            {
              let altar = Game.getInstance().Flags[indexA].toMapElement();
              altar.setIcon(newAltar.getIcon());
              altar.setPosition({lat:newAltar.Position[0],lng:newAltar.Position[1]});
              if(altar.visionCircle)
              {
                altar.visionCircle.setCenter({lat:newAltar.Position[0],lng:newAltar.Position[1]});
              }
              if(altar.actionCircle)
              {
                altar.actionCircle.setCenter({lat:newAltar.Position[0],lng:newAltar.Position[1]});
              }
              altar.id = newAltar.Id;
              newAltar.MapEntity=altar;
            }
            else{
              newAltar.toMapElement(this.map,this.props.setSelectedDrawed,withVisionCircle);
            }
            if(exist)
            {
              Game.getInstance().replaceAltar(indexA,newAltar);
            }
          }
          else
            console.log("erreur pas d'id pour l'altar:",altar);

            return true;
        });
      }

      if(mapUpdate && Object.keys(mapUpdate).length >0)
      {
        if(Game.getInstance().Items && (Object.keys((Game.getInstance().Items)).length) > 0)
        {
         Game.getInstance().Items.map(item => {
            if(item.Id == null)
            {
              if(item.MapEntity !==null)
              {
                item.toMapElement().setMap(null);
              }
              Game.getInstance().removeItem(item);
            }
            else if (Object.keys(game.Items).length > 0)
            {
              if(this.findById(game.Items,item.Id)==null)
              {
                if(item.MapEntity !==null)
                {
                  this.removeElement(item);
                }
                Game.getInstance().removeItem(item);
              }
            }
            return true;
          });
        }
      }

      if(game.Items && (Object.keys(game.Items).length) > 0)
      {
       game.Items.map(item => { // For each item on the websocket message
          let exist =false;
          if(item.Id != null)
          {
            var indexI = Game.getInstance().findItemById(item.Id);
            //console.log("Index",indexI)
            if(indexI !== -1)
            {
              if(Entity.IncrId<item.Id)
                Entity.IncrId = item.Id+1;
              exist = true;
            }
            else
            {
              Entity.IncrId++;
            }
      
            let newItem = ManagerItems.createItem(item.Position,item.Type,item.ActionDistance,item.AvailableDuration,item.CanChangeVisionDistance,item.CanTeleport,item.DeficiencyDuration,item.IsInActionRange,item.Name,item.Quantity,item.VisionDistance,item.Id,item.IsActive,item.Team);
            var withVisionCircle=true;
            if(exist && Game.getInstance().Items[indexI].toMapElement)
            {
              let item = Game.getInstance().Items[indexI].toMapElement();
              item.setIcon(newItem.getIcon());
              item.setPosition({lat:newItem.Position[0],lng:newItem.Position[1]});

              if(item.visionCircle)
              {
                item.visionCircle.setCenter({lat:newItem.Position[0],lng:newItem.Position[1]});
              }
              
              if(item.actionCircle)
              {
                item.actionCircle.setCenter({lat:newItem.Position[0],lng:newItem.Position[1]});
              }

              item.id = newItem.Id;
              newItem.MapEntity=item;
            }
            else{
              newItem.toMapElement(this.map,this.props.setSelectedDrawed,withVisionCircle);
            }
            if(exist)
              Game.getInstance().replaceItem(indexI,newItem);
          }
          else
            console.log("erreur pas d'id pour l'item:",item);

          return true;
        });
      }

      if(mapUpdate && Object.keys(mapUpdate).length >0 )
      {
        if(Game.getInstance().Regions && (Object.keys((Game.getInstance().Regions)).length) > 0)
        {
         Game.getInstance().Regions.map(zone => {
            if(zone.Id == null)
            {
              if(zone.MapEntity !==null)
              {
                zone.toMapElement().setMap(null);
              }
              Game.getInstance().removeZone(zone);
            }
            else if (Object.keys(game.Regions).length > 0)
            {
              if(this.findById(game.Regions,zone.Id)==null)
              {
                if(zone.MapEntity !==null)
                {
                  this.removeElement(zone);
                }
                Game.getInstance().removeZone(zone);
              }
            }
            return true;
          });
        }
      }

      if(game.Regions && (Object.keys(game.Regions).length) > 0)
      {
        game.Regions.map(zone => { // For each zone on the websocket message
          let exist =false;
          if(zone.Id != null)
          {
            var indexZ = Game.getInstance().findZoneById(zone.Id);
            if(indexZ !== -1)
            {
              if(ManagerZones.IncrId<zone.Id)
                ManagerZones.IncrId = zone.Id+1;
              exist=true;
            }
            else
            {
              ManagerZones.IncrId++;
            }

            let newZone = ManagerZones.createZone(zone.Coordinates,zone.Id);
            let poly;
            let coordinates=[];
            if(exist && Game.getInstance().Regions[indexZ].toMapElement)
            {
              poly = Game.getInstance().Regions[indexZ].toMapElement();
              newZone.Coordinates.forEach(coordinate => {
                coordinates.push({lat:coordinate[0],lng:coordinate[1]});
                });
              poly.id = newZone.Id;
              poly.setPath(coordinates);
              newZone.MapEntity=poly;
            }
            else{
              poly = newZone.toMapElement(this.map);
              window.google.maps.event.addListener(poly, 'click',()=>{!this.props.canDraw() && this.props.setSelectedDrawed(poly)});
            }
            if(exist)
              Game.getInstance().replaceRegion(indexZ,newZone);
          }
          else
            console.log("erreur pas d'id pour la zone:",zone);

          return true;
        });
      }
    }
  }

  componentWillMount() {
    this.map = this.context[MAP];
    //window.google.maps.event.addListener(this.map,'zoom_changed',()=>this.props.onZoom(this.map.zoom));
    this.divMapControl = window.document.createElement('div'); // create a body div
    this.map.controls[this.props.position].push(this.divMapControl); // put the body div on the map
    this._mapUpdate = null;
    this.configMap();
  }

  componentDidUpdate() {
    if(this.isDiff(this.props.gameUpdate))
    {
      this._mapUpdate = this.props.gameUpdate;
      this.configMap(this.props.gameUpdate);
    }
    if(Game.getInstance() && (Game.getInstance().Type === Game.GameType.TIME || Game.getInstance().Type === Game.GameType.FLAG ) && (this.tick == null || typeof this.tick == "undefined") && !this.props.endGame)
    {
      this.tick = setInterval(() => {
        this.time = Time.diffTime((new Date(Game.getInstance().EndDate)),(new Date()));
        if(parseInt(this.time.split(":")[2])<0)
        {
           this.props.setEndGame(true);
           this.time = "The game is finish";
           clearInterval(this.tick);
        }
      }, 2000);
    }
  }

  render()
  {
    if(this.tick !== null && typeof this.tick !== "undefined")
    {
      let timer  = <Card style={{backgroundColor: "#6c757d"}} className="timer">
                    <Nav navbar>
                        <NavItem className="text-center" style={{color:"#fff",fontSize:"1rem",height:"55px",width:"250px"}}>
                          <span>Time Left:</span>
                          <div>{this.time}</div>
                        </NavItem>
                    </Nav>
                  </Card>;
      return createPortal(timer,this.divMapControl);
    }
    else
     return <></>;
  }

  componentWillUnmount() {
    if(this.tick !== null && typeof this.tick !=="undefined")
    clearInterval(this.tick);
  }

}