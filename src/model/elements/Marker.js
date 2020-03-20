import Entity from "./Entity";
import DrawConflict from '../../helper/DrawConflict.js';

const visionCircleDragChange= (marker,map,listVisionMarker,listZone,withColision) =>
  {   
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
    constructor(position)
    {
        super(position);
    }

    toMapElement(map,canDraw={},setSelectedDrawed={},withVisionCircle=false,listZone=[],withColision=false,listVisionMarker=[]){
        
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
        let marker = new window.google.maps.Marker({
            position: {lat:this.Position[0],lng:this.Position[1]},
            title: 'new',
            type: this.constructor.name,
            icon: this.getIcon(),
            visionCircle:visionCircle,
            id : this.Id
        });
        visionCircle.marker = marker;

        
        if(withColision){
            conflict = DrawConflict.isConflict(listVisionMarker,visionCircle);    
            if(!conflict)
            {
                marker.setMap(map);
                visionCircle.setMap(map);
                window.google.maps.event.addListener(marker, 'click',()=>!canDraw()&&setSelectedDrawed(marker));
                window.google.maps.event.addListener(marker, "position_changed",()=>visionCircleDragChange(marker,map,listVisionMarker,listZone,withColision));
                window.google.maps.event.addListener(marker, "dragend",()=>markerDragStop(marker,map));
                listVisionMarker.push(marker);
            }
        }
        else
        {
            marker.setMap(map);
            if(this.constructor.name != "Player")
                window.google.maps.event.addListener(marker, 'click',()=>!canDraw()&&setSelectedDrawed(marker));
            if (withVisionCircle)
            {
                visionCircle.setMap(map);
                window.google.maps.event.addListener(marker, "position_changed",()=>visionCircleDragChange(marker,map,listVisionMarker,listZone,withColision));
                window.google.maps.event.addListener(marker, "dragend",()=>markerDragStop(marker,map));
            }
        }
        

        return marker;
    }
}