import Marker from "../Marker";
import IconItem from '../IconItem'

class Item extends Marker
{
    CaptureDate;
    AvailableDuration=0;
    UnavailableTime;
    CanTeleport=false;
    CanChangeVisionDistance = false;
    DeficiencyDuration=0;
    Quantity=1;
    Type;
    constructor(Position,Type,ActionDistance=null,AvailableDuration=null,CanChangeVisionDistance=null,CanTeleport=null,DeficiencyDuration=null,IsInActionRange=null,Name=null,Quantity=null,VisionDistance=null,Id=null)
    {
        if(!VisionDistance)VisionDistance = 120;
        if(!ActionDistance)ActionDistance = 50;
        super(Position,ActionDistance,IsInActionRange,Name,VisionDistance,Id);
        if(AvailableDuration)this.AvailableDuration=AvailableDuration;
        if(CanChangeVisionDistance)this.CanChangeVisionDistance=CanChangeVisionDistance;
        if(DeficiencyDuration)this.DeficiencyDuration=DeficiencyDuration;
        if(CanTeleport)this.CanTeleport=CanTeleport;
        if(Quantity)this.Quantity=Quantity;
        super.Type = Type;
    }

    getIcon()
    {
        var icon = IconItem[this.Type];
        return {url:icon.url,
        scaledSize: new window.google.maps.Size(icon.scaledSize[0], icon.scaledSize[1])};
    }
    
}

export default Item;