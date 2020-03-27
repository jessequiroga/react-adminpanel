import Marker from "./Marker";

class Altar extends Marker
{
    Id;
    CaptureDate;
    UnavailableTime;
    Team;

    constructor(position,id)
    {
        super(position);
        this.Id = id;
        this.VisionDistance=30;
    }

    getIcon()
    {
        if(this.Team == null)
        {
            return {    
                url:`/altar_unreached.png`,
                scaledSize: new window.google.maps.Size(80, 80)
            };
        }
        else
        {
            return {
                url:`/altar_captured_`+this.Team.Color.toLowerCase()+`.png`,
                scaledSize: new window.google.maps.Size(80, 80)
            }
        }
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
            url:`/altar_unreached.png`,
            scaledSize: new window.google.maps.Size(80, 80)
        };
    }
}

export default AltarManager;
