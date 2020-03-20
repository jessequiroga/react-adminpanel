class Zone 
{
    Id;
    Coordinates;
    Forbidden;
    constructor(coordinates,id){
        this.Coordinates = coordinates;
        this.Id = id;
    }

    toMapElement(){
        return new window.google.maps.Polygon({
            paths:this.Coordinates, // Initiate the coordinates of the marker with the json altar.geometry.coordinates
            type:this.constructor.name,
            id: this.Id,
            strokeColor: "#FF0000",
            strokeOpacity: 1,
            strokeWeight: 3,
            fillColor: "#FF0000",
            fillOpacity: 0.30,    
        });
    }
}

class ZoneManager
{
    static IncrId=0;

    static createZone(coordinates)
    {
        var zone = new Zone(coordinates,this.IncrId);
        this.IncrId++;
        return zone;
    }

}

export default ZoneManager;