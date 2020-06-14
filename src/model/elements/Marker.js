import Entity from "./Entity";
import Game from "../Game";
import DrawConflict from '../../helper/DrawConflict.js';

const visionCircleDragChange= (marker,withColision) =>
  { 
    let listVisionMarker = [];
    Game.getInstance().Items.forEach(item => {
      if(item.toMapElement)listVisionMarker.push(item.toMapElement());
    });
    Game.getInstance().Flags.forEach(flag => {
      if(flag.toMapElement)listVisionMarker.push(flag.toMapElement());
    });
    let listZone = [];
    Game.getInstance().Regions.forEach(zone => {
      if(zone.toMapElement)listZone.push(zone.toMapElement());
    });

    var listVisionMarkerWithoutCurrent= listVisionMarker.filter( (fmarker) => fmarker !== marker);
    var conflict = withColision?DrawConflict.isConflict(marker.position,marker.actionCircle.radius,listVisionMarkerWithoutCurrent):false;
    var isInRegion = DrawConflict.isInRegion(listZone,marker);
    if(withColision && !conflict && isInRegion)
    {
      marker.visionCircle.setCenter(marker.position);
      marker.actionCircle.setCenter(marker.position)
    }
    else if(!withColision && isInRegion)
    {
      marker.visionCircle.setCenter(marker.position);
      marker.actionCircle.setCenter(marker.position);
    }
  }

const markerDragStop = (marker,map) => {
    if(marker.position !== marker.actionCircle.center)
    {
      marker.setPosition(marker.actionCircle.center);
    }
}


export default class Marker extends Entity
{
    Icon;
    constructor(Position,ActionDistance=null,IsInActionRange=null,Name=null,VisionDistance=null,Id=null)
    {     
      super(Position,ActionDistance,IsInActionRange,Name,VisionDistance,Id);
    }

    toMapElement(map=null,setSelectedDrawed={},withVisionCircle=false,withColision=false){
        

        let marker = this.MapEntity;
        if (marker === null && map !==null)
        {
          if(!this.Position)
            console.log(this.Id);
            
          var conflict = false;

          let visionCircle = new window.google.maps.Circle({
              strokeColor: '#ccf3ff',
              strokeOpacity: 0.5,
              strokeWeight: 2,
              fillColor: '#01A9DB',
              fillOpacity: 0.35,
              center: {lat:this.Position[0],lng:this.Position[1]},
              radius: this.VisionDistance
            });
          let actionCircle = new window.google.maps.Circle({
              strokeColor: '#3A01DF',
              strokeOpacity: 0.7,
              strokeWeight: 2,
              fillColor: '#3A01DF',
              fillOpacity: 0.25,
              center: {lat:this.Position[0],lng:this.Position[1]},
              radius: this.ActionDistance
            });

          marker = new window.google.maps.Marker({
              position: {lat:this.Position[0],lng:this.Position[1]},
              title: this.Name,
              type: this.constructor.name,
              icon: this.getIcon(),
              visionCircle:visionCircle,
              actionCircle:actionCircle,
              id : this.Id
          });
          
          if(withColision){
              conflict = DrawConflict.isConflict(actionCircle.center,this.ActionDistance);    
              if(!conflict)
              {
                marker.setMap(map);
                window.google.maps.event.addListener(marker, 'click',()=>setSelectedDrawed(marker));
                if(this.constructor.name !== "Player")
                {
                  visionCircle.setMap(map);
                  actionCircle.setMap(map);
                  window.google.maps.event.addListener(marker, "position_changed",()=>visionCircleDragChange(marker,true));
                  window.google.maps.event.addListener(marker, "dragend",()=>markerDragStop(marker,map));
                }
              }
              else
              {
                marker = null; //Pas possible de crée le marker;
              }
          }
          else
          {
              marker.setMap(map);
              window.google.maps.event.addListener(marker, 'click',()=>setSelectedDrawed(marker));
              if(this.constructor.name !== "Player")
              {
                if (withVisionCircle)
                {
                    visionCircle.setMap(map);
                    actionCircle.setMap(map);
                    window.google.maps.event.addListener(marker, "position_changed",()=>visionCircleDragChange(marker,true));
                    window.google.maps.event.addListener(marker, "dragend",()=>markerDragStop(marker,map));
                }
              }
          }
          this.MapEntity = marker;
        }
        return marker;
    }
}