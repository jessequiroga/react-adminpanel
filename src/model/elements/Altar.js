import Marker from "./Marker";

class Altar extends Marker
{
    CaptureDate;
    UnavailableTime;
    Team;

    constructor(position)
    {
        super(position);
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
    static createAltar(position)
    {
        var altar = new Altar(position);
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
