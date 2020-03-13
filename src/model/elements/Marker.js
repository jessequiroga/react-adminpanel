import Entity from "./Entity";

export default class Marker extends Entity
{
    Icon;
    constructor(position)
    {
        super(position);
    }
    toMapElement(){
        var visionCircle = new window.google.maps.Circle({
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
            icon: this.getIcon(),
            visionCircle:visionCircle
        });
        

        return marker;
    }
}