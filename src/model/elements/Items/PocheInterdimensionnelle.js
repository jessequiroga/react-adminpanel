import Item from "./Item";

class PocheInterdimensionnelle extends Item
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
        super(Position,ActionDistance,IsInActionRange,Name,VisionDistance,Id);
        if(AvailableDuration)this.AvailableDuration=AvailableDuration;
        if(CanChangeVisionDistance)this.CanChangeVisionDistance=CanChangeVisionDistance;
        if(DeficiencyDuration)this.DeficiencyDuration=DeficiencyDuration;
        if(CanTeleport)this.CanTeleport=CanTeleport;
        if(Quantity)this.Quantity=Quantity;
        super.Type = Type;
    }
}

export default PocheInterdimensionnelle;