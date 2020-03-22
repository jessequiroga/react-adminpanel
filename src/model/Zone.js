class Zone 
{
    Id;
    Coordinates;
    Forbidden;
    MapEntity=null;
    constructor(coordinates,id){
        this.Coordinates = coordinates;
        this.Id = id;
    }

    toMapElement(){

        let poly = this.MapEntity;
        if(poly == null )
        {
            var coordinates =[];
            this.Coordinates.forEach(coordinate => {
            coordinates.push({lat:coordinate[0],lng:coordinate[1]});
            });
            poly = new window.google.maps.Polygon({
                paths:coordinates, // Initiate the coordinates of the marker with the json altar.geometry.coordinates
                type:this.constructor.name,
                id: this.Id,
                strokeColor: "#FF0000",
                strokeOpacity: 1,
                strokeWeight: 3,
                fillColor: "#FF0000",
                fillOpacity: 0.30,    
            });
            this.MapEntity = poly;
        }
        return poly;
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