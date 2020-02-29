import Marker from "./Marker";

class Altar extends Marker
{
    Id;
    Icon = {
        url:`/mapMarker.png`,
        scaledSize: new window.google.maps.Size(100, 100)
    };
    CaptureDate;
    UnavailableTime;

    constructor(position,id)
    {
        super(position);
        this.Id = id;
    }

}

class AltarManager
{
    static IncrId=0;

    static createAltar(position)
    {
        var altar = new Altar(position,this.IncrId);
        this.IncrId++;
        return altar;
    }
}

export default AltarManager;
