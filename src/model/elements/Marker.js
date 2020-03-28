import Entity from "./Entity";
import Game from "../Game";
import DrawConflict from '../../helper/DrawConflict.js';

const visionCircleDragChange= (marker,map,withColision) =>
  { 
    let listVisionMarker = [];
    Game.getInstance().Items.forEach(item => {
      listVisionMarker.push(item.toMapElement());
    });
    Game.getInstance().Flags.forEach(flag => {
      listVisionMarker.push(flag.toMapElement());
    });
    let listZone = [];
    Game.getInstance().Regions.forEach(zone => {
      listZone.push(zone.toMapElement());
    });

    let visionCircle = new window.google.maps.Circle({
      strokeColor: '#01A9DB',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#01A9DB',
      fillOpacity: 0.35,
      center: marker.position,
      radius: marker.visionCircle.radius
    });
    var listVisionMarkerWithoutCurrent= listVisionMarker.filter( (fmarker) => fmarker !== marker);
    var conflict = withColision?DrawConflict.isConflict(listVisionMarkerWithoutCurrent,visionCircle):false;
    var isInRegion = DrawConflict.isInRegion(listZone,marker);
    if(withColision && !conflict && isInRegion)
    {
      marker.visionCircle.setMap(null);
      marker.visionCircle=visionCircle;
      marker.visionCircle.setMap(map);
    }
    else if(!withColision && isInRegion)
    {
      marker.visionCircle.setMap(null);
      marker.visionCircle=visionCircle;
      marker.visionCircle.setMap(map);
    }
  }

const markerDragStop = (marker,map) => {
    if(marker.position !== marker.visionCircle.center)
    {
      marker.position= marker.visionCircle.center;
      marker.setMap(null);
      marker.setMap(map);
    }
}


export default class Marker extends Entity
{
    Icon;
    constructor(position,name=null,id=null)
    {
        super(position,name,id);
    }

    toMapElement(map,setSelectedDrawed={},withVisionCircle=false,withColision=false){
        
        let marker = this.MapEntity;

        if (marker == null)
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
              title: 'new',
              type: this.constructor.name,
              icon: this.getIcon(),
              visionCircle:visionCircle,
              id : this.Id
          });
          visionCircle.marker = marker;

          
          if(withColision){
              conflict = DrawConflict.isConflict(visionCircle);    
              if(!conflict)
              {
                marker.setMap(map);
                visionCircle.setMap(map);
                if(this.constructor.name != "Player")
                  window.google.maps.event.addListener(marker, 'click',()=>setSelectedDrawed(marker));
                window.google.maps.event.addListener(marker, "position_changed",()=>visionCircleDragChange(marker,map,withColision));
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
                  window.google.maps.event.addListener(marker, "position_changed",()=>visionCircleDragChange(marker,map,withColision));
                  window.google.maps.event.addListener(marker, "dragend",()=>markerDragStop(marker,map));
              }
          }
          this.MapEntity = marker;
        }
        return marker;
    }
}