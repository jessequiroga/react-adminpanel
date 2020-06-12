import Item from "./Item";
import React from "react";

class VisionOrb extends Item
{
    constructor(Position,Type,ActionDistance=null,AvailableDuration=null,CanChangeVisionDistance=null,CanTeleport=null,DeficiencyDuration=null,IsInActionRange=null,Name=null,Quantity=null,VisionDistance=null,Id=null)
    {
        super(Position,Type,ActionDistance,AvailableDuration,CanChangeVisionDistance,CanTeleport,DeficiencyDuration,IsInActionRange,Name,Quantity,VisionDistance,Id);
    }

    static description()
    {
        return<></>;
    }
}

export default VisionOrb;