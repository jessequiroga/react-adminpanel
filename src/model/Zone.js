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

    toMapElement(map=null){
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
                map: map,
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

    static createZone(coordinates,Id=null)
    {
        var zone = null;
        if(Id!= null)
            zone = new Zone(coordinates,Id);
        else
        {
            zone = new Zone(coordinates,this.IncrId);
            this.IncrId++;
        }
        return zone;
    }

}

export default ZoneManager;