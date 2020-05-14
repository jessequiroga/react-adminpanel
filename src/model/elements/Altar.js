import Marker from "./Marker";

class Altar extends Marker
{
    CaptureDate;
    UnavailableTime;
    Team;

    constructor(Position,ActionDistance,IsInActionRange,Name,VisionDistance,UnavailableTime,CaptureDate,Id,Team)
    {
        if(!VisionDistance)VisionDistance = 300;
        if(!ActionDistance)ActionDistance = 100;
        //console.log(VisionDistance);
        super(Position,ActionDistance,IsInActionRange,Name,VisionDistance,Id);
        if(UnavailableTime)this.UnavailableTime=UnavailableTime;
        if(CaptureDate)this.CaptureDate=CaptureDate;
        if(Team)this.Team=Team;
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
                url:`/autel_captured_`+this.Team.Color.toLowerCase()+`.png`,
                scaledSize: new window.google.maps.Size(80, 80)
            }
        }
    }

}

class AltarManager
{
    static createAltar(Position,ActionDistance=null,IsInActionRange=null,Name=null,VisionDistance=null,UnavailableTime=null,CaptureDate=null,Id=null,Team=null)
    {
        var altar = new Altar(Position,ActionDistance,IsInActionRange,Name,VisionDistance,UnavailableTime,CaptureDate,Id,Team);
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
