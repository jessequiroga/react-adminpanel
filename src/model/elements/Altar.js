import Marker from "./Marker";

class Altar extends Marker
{
    CaptureDate;
    UnavailableTime;
    Team;

    constructor(Position,ActionDistance,IsInActionRange,Name,VisionDistance,UnavailableTime,CaptureDate,Id)
    {
        if(!VisionDistance)VisionDistance = 300;
        if(!ActionDistance)VisionDistance = 100;
        super(Position,ActionDistance,IsInActionRange,Name,VisionDistance,Id);
        if(UnavailableTime)this.UnavailableTime=UnavailableTime;
        if(CaptureDate)this.CaptureDate=CaptureDate;
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
    static createAltar(Position,ActionDistance=null,IsInActionRange=null,Name=null,VisionDistance=null,UnavailableTime=null,CaptureDate=null,Id=null)
    {
        var altar = new Altar(Position,ActionDistance,IsInActionRange,Name,VisionDistance,UnavailableTime,CaptureDate,Id);
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
