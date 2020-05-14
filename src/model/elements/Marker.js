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
    var conflict = withColision?DrawConflict.isConflict(marker.position,marker.visionCircle.radius,listVisionMarkerWithoutCurrent):false;
    var isInRegion = DrawConflict.isInRegion(listZone,marker);
    if(withColision && !conflict && isInRegion)
    {
      marker.visionCircle.setCenter(marker.position);
    }
    else if(!withColision && isInRegion)
    {
      marker.visionCircle.setCenter(marker.position);
    }
  }

const markerDragStop = (marker,map) => {
    if(marker.position !== marker.visionCircle.center)
    {
      marker.setPosition(marker.visionCircle.center);
    }
}


export default class Marker extends Entity
{
    Icon;
    constructor(Position,ActionDistance=null,IsInActionRange=null,Name=null,VisionDistance=null,Id=null)
    {     
      super(Position,ActionDistance,IsInActionRange,Name,VisionDistance,Id);
    }

    toMapElement(map,setSelectedDrawed={},withVisionCircle=false,withColision=false){
        
        let marker = this.MapEntity;
        if (marker === null)
        {
          var conflict = false;

          let visionCircle = new window.google.maps.Circle({
              strokeColor: '#01A9DB',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#01A9DB',
              fillOpacity: 0.35,
              center: {lat:this.Position[0],lng:this.Position[1]},
              radius: this.VisionDistance
            });
          marker = new window.google.maps.Marker({
              position: {lat:this.Position[0],lng:this.Position[1]},
              title: (this.constructor.name == "Player")?this.Name:this.constructor.name,
              type: this.constructor.name,
              icon: this.getIcon(),
              visionCircle:visionCircle,
              id : this.Id
          });
          
          if(withColision){
              conflict = DrawConflict.isConflict(visionCircle.center,this.VisionDistance);    
              if(!conflict)
              {
                marker.setMap(map);
                visionCircle.setMap(map);
                if(this.constructor.name != "Player")
                {
                  window.google.maps.event.addListener(marker, 'click',()=>setSelectedDrawed(marker));
                }
                window.google.maps.event.addListener(marker, "position_changed",()=>visionCircleDragChange(marker,true));
                window.google.maps.event.addListener(marker, "dragend",()=>markerDragStop(marker,map));
              }
          }
          else
          {
              marker.setMap(map);
              if(this.constructor.name != "Player")
                  window.google.maps.event.addListener(marker, 'click',()=>setSelectedDrawed(marker));
              if (withVisionCircle)
              {
                  visionCircle.setMap(map);
                  window.google.maps.event.addListener(marker, "position_changed",()=>visionCircleDragChange(marker,true));
                  window.google.maps.event.addListener(marker, "dragend",()=>markerDragStop(marker,map));
              }
          }
          this.MapEntity = marker;
        }
        return marker;
    }
}