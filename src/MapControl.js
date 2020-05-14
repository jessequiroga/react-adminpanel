import React,{ Component } from 'react';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';
import ManagerItems from './model/elements/ItemManager';
import ManagerAltars from './model/elements/Altar';
import ManagerZones from './model/Zone';
import Game from './model/Game.js';
import Entity from './model/elements/Entity';

export default class MapControl extends Component {

  static contextTypes = { [MAP]: PropTypes.object }

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
    let result = false;
    let _mapUpdate =this._mapUpdate;

    if(_mapUpdate === null)
    {
      console.log("pas de variable definie");
      return true
    }
    /**
     * Flags
     */
    if((mapUpdate.Flags === null && _mapUpdate.Flags !== null) || (_mapUpdate.Flags === null && mapUpdate.Flags !== null))
    {
      console.log("Flags null");
      return true
    }
    if(mapUpdate.Flags !== null && typeof mapUpdate.Flags != "undefined")
    {
      Object.keys(mapUpdate.Flags).map(x=>{
          let newFlag = mapUpdate.Flags[x];
          let _currentFlag = this.findById(_mapUpdate.Flags,mapUpdate.Flags[x].Id);
          if( JSON.stringify(newFlag) !== JSON.stringify(_currentFlag))
          {
            console.log("difference d'un Flag",newFlag,_currentFlag);
            result = true;
            return;
          }
      });
    }

    /**
     * Items
     */
    if((mapUpdate.Items === null && _mapUpdate.Items !== null) || (_mapUpdate.Items === null && mapUpdate.Items !== null))
    {
      console.log("Items null");
      return true
    }
    if(mapUpdate.Items !== null && typeof mapUpdate.Items != "undefined" )
    {
      Object.keys(mapUpdate.Items).map(x=>{
        let newItem = mapUpdate.Items[x];
        let _currentItem = this.findById(_mapUpdate.Items,mapUpdate.Items[x].Id);
        if(JSON.stringify(newItem) !== JSON.stringify(_currentItem ))
        {
          console.log("difference d'un Item",newItem,_currentItem);
          result = true;
          return;
        }
      });
    }


    /**
     * Zones
     */
    if((mapUpdate.Zones === null && _mapUpdate.Zones !== null) || (_mapUpdate.Zones === null && mapUpdate.Zones !== null))
    {
      console.log("Zones null");
      return true
    }
    if(mapUpdate.Zones !== null && typeof mapUpdate.Zones != "undefined")
    {
      Object.keys(mapUpdate.Zones).map(x=>{
        let newZone = mapUpdate.Flags[x];
        let _currentZone = this.findById(_mapUpdate.Zones,mapUpdate.Zones[x].Id);
        if(JSON.stringify(newZone) !== JSON.stringify(_currentZone) )
        {
          console.log("difference d'une Zone",newZone,_currentZone);
          result = true;
          return;
        }
      });
    }
    
    return result;
  }

  initConfigMap = (mapUpdate) => {
    if(Object.keys(Game.getInstance()).length >0)
    {
      let game;
      if(mapUpdate)
      {
        game = mapUpdate;
      }
      else
        game = Game.getInstance();
      (Object.keys(game.Flags).length > 0) && game.Flags.map(altar => { // For each altar on the websocket message
        let exist =false;
        if(altar.Id != null)
        {
          var indexA = Game.getInstance().findAltarById(altar.Id);
          if(indexA !== -1)
          {
            if(Entity.IncrId<altar.Id)
              Entity.IncrId = altar.Id;
            exist = true;
          }

          let newAltar = ManagerAltars.createAltar(altar.Position,altar.ActionDistance,altar.IsInActionRange,altar.Name,altar.VisionDistance,altar.UnavailableTime,altar.CaptureDate,altar.Id,altar.Team);
          var withVisionCircle=true;
          if(exist && Game.getInstance().Flags[indexA].toMapElement)
          {
            let altar = Game.getInstance().Flags[indexA].toMapElement();
            console.log("Team",altar.Team);
            if(altar.Team)
              console.log(newAltar.getIcon());
            altar.setIcon(newAltar.getIcon());
            altar.setPosition({lat:newAltar.Position[0],lng:newAltar.Position[1]});
            if(altar.visionCircle)
              altar.visionCircle.setCenter({lat:newAltar.Position[0],lng:newAltar.Position[1]});
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
      });

      (Object.keys(game.Items).length > 0) && game.Items.map(item => { // For each item on the websocket message
        let exist =false;
        if(item.Id != null)
        {
          var indexI = Game.getInstance().findItemById(item.Id);
          if(indexI !== -1)
          {
            if(Entity.IncrId<item.Id)
              Entity.IncrId = item.Id;
            exist = true;
          }
          let newItem = ManagerItems.createItem(item.Position,item.Type,item.ActionDistance,item.AvailableDuration,item.CanChangeVisionDistance,item.CanTeleport,item.DeficiencyDuration,item.IsInActionRange,item.Name,item.Quantity,item.VisionDistance,item.Id);
          var withVisionCircle=true;
          if(exist && Game.getInstance().Items[indexI].toMapElement)
          {
            let item = Game.getInstance().Items[indexI].toMapElement();
            item.setIcon(newItem.getIcon());
            item.setPosition({lat:newItem.Position[0],lng:newItem.Position[1]});
            if(item.visionCircle)
              item.visionCircle.setCenter({lat:newItem.Position[0],lng:newItem.Position[1]});
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
      });

      (Object.keys(game.Regions).length > 0) && game.Regions.map(zone => { // For each zone on the websocket message
        let exist =false;
        if(zone.Id != null)
        {
          var indexZ = Game.getInstance().findZoneById(zone.Id);
          if(indexZ !== -1)
          {
            if(Entity.IncrId<zone.Id)
              Entity.IncrId = zone.Id;
            exist=true;
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
      });
    }
  }

  componentWillMount() {
    this.map = this.context[MAP];
    this._mapUpdate = null;
    this.initConfigMap();
  }

  componentDidUpdate() {
    if(this.isDiff(this.props.gameUpdate))
    {
      this._mapUpdate = this.props.gameUpdate;
      this.initConfigMap(this.props.mapUpdate);
    }
  }

  render()
  {
    return <div></div>
  }

}