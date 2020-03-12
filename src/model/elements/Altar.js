import Marker from "./Marker";

class Altar extends Marker
{
    Id;
    CaptureDate;
    UnavailableTime;

    constructor(position,id)
    {
        super(position);
        this.Id = id;
    }

    getIcon()
    {
        return {
            url:`/mapMarker.png`,
            scaledSize: new window.google.maps.Size(100, 100)
        };
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

    static getIcon()
    {
        return {
            url:`/mapMarker.png`,
            scaledSize: new window.google.maps.Size(100, 100)
        };
    }
}

export default AltarManager;
