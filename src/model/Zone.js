class Zone 
{
    Id;
    Coordinates;
    Forbidden;
    constructor(coordinates,id){
        this.Coordinates = coordinates;
        this.Id = id;
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