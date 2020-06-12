import Item from "./Item";
import React from "react";

class CultMag extends Item
{
    $type = "CultWars.Model.Entities.Items.MagazineDeCulte, CultWars.Model";
    IsActive= false;
    Team;
    constructor(Position,Type,ActionDistance=null,AvailableDuration=null,CanChangeVisionDistance=null,CanTeleport=null,DeficiencyDuration=null,IsInActionRange=null,Name=null,Quantity=null,VisionDistance=null,Id=null,isActive=null,team=null)
    {
        super(Position,Type,ActionDistance,AvailableDuration,CanChangeVisionDistance,CanTeleport,DeficiencyDuration,IsInActionRange,Name,Quantity,VisionDistance,Id);
        if(isActive!==null){this.IsActive = isActive;}
        if(team!==null){this.Team = team;}
    }
    
    getIcon()
    {
        if(this.IsActive && this.Team)
        {
            return {url:`/magazine_de_culte_`+this.Team.Color.toLowerCase()+`.png`,
                scaledSize: new window.google.maps.Size(70, 70)};
        }
        else
            return super.getIcon();
    }

    static description()
    {
        return<></>;
    }
}

export default CultMag;