import Item from "./Item";
import React from "react";

class CultMag extends Item
{
    $type = "CultWars.Model.Entities.Items.MagazineDeCulte, CultWars.Model";
    IsActive= false;
    Team;
    constructor(Position,Type,ActionDistance=null,AvailableDuration=null,CanChangeVisionDistance=null,CanTeleport=null,DeficiencyDuration=null,IsInActionRange=null,Name=null,Quantity=null,VisionDistance=null,Id=null,isActive=null,team=null,CanPickUp=null,EndEffectTime=null)
    {
        super(Position,Type,ActionDistance,AvailableDuration,CanChangeVisionDistance,CanTeleport,DeficiencyDuration,IsInActionRange,Name,Quantity,VisionDistance,Id,CanPickUp,EndEffectTime);
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

    static description(imageUrl)
    {
        return  <div style={{fontSize:"1.2rem"}}>
                    <img style={{width: "60px",position: "absolute",right:"2%",top:"5%"}} alt="Cult Magazine" src={imageUrl.url}></img>
                    <div style={{fontWeight:"bolder",position: "absolute",right:"40%",top:"12%"}}>
                        Cult Magazine
                    </div>
                    <span style={{fontWeight:"bolder",position: "absolute",left:"1%",top:"20%"}}>
                        Description: 
                    </span>
                    <div style={{position: "absolute",left:"2%",top:"28%"}}>
                        This viscous magazine will present your great old one in a suggestive way that will bring doubt in your foe’s faith and confuse him.
                    </div>
                    <span style={{fontWeight:"bolder",position: "absolute",left:"1%",top:"60%"}}>
                        Effects: 
                    </span>
                    <div style={{position: "absolute",left:"2%",top:"68%"}}>
                        You can drop off this item somewhere. When a foe enter in the effect area, he will lose his map vision for 10 minutes.
                    </div>
                </div>;
    }
}

export default CultMag;