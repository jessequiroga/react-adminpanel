import Marker from "./Marker";
import IconItem from './IconItem'
import { NavbarText } from "reactstrap";

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
    constructor(Position,Type,ActionDistance,AvailableDuration,CanChangeVisionDistance,CanTeleport,DeficiencyDuration,IsInActionRange,Name,Quantity,VisionDistance,Id)
    {
        if(!VisionDistance)VisionDistance = 20;
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

class ItemManager
{

    static createItem(Position,Type,ActionDistance=null,AvailableDuration=null,CanChangeVisionDistance=null,CanTeleport=null,DeficiencyDuration=null,IsInActionRange=null,Name=null,Quantity=null,VisionDistance=null,Id=null)
    {
        var item = new Item(Position,Type,ActionDistance,AvailableDuration,CanChangeVisionDistance,CanTeleport,DeficiencyDuration,IsInActionRange,Name,Quantity,VisionDistance,Id);
        return item;
    }

    static getIcon(type)
    {
        var icon = IconItem[type];
        return {url:icon.url,
            scaledSize: new window.google.maps.Size(icon.scaledSize[0], icon.scaledSize[1])};
    }
}

export default ItemManager;