import Item from "./Item";
import React from "react";

class VisionOrb extends Item
{
    constructor(Position,Type,ActionDistance=null,AvailableDuration=null,CanChangeVisionDistance=null,CanTeleport=null,DeficiencyDuration=null,IsInActionRange=null,Name=null,Quantity=null,VisionDistance=null,Id=null)
    {
        super(Position,Type,ActionDistance,AvailableDuration,CanChangeVisionDistance,CanTeleport,DeficiencyDuration,IsInActionRange,Name,Quantity,VisionDistance,Id);
    }

    static description(imageUrl)
    {
        return  <div style={{fontSize:"1.2rem"}}>
                    <img style={{width: "60px",position: "absolute",right:"2%",top:"5%"}} alt="Vision Orb" src={imageUrl.url}></img>
                    <div style={{fontWeight:"bolder",position: "absolute",right:"40%",top:"12%"}}>
                        Vision Orb
                    </div>
                    <span style={{fontWeight:"bolder",position: "absolute",left:"0.6%",top:"20%"}}>
                        Description: 
                    </span>
                    <div style={{position: "absolute",left:"1.6%",top:"28%"}}>
                        This little sphere is not a plagiarism of the Lord of the Rings’ Palantir.<br/>
                        Not at all.
                    </div>
                    <span style={{fontWeight:"bolder",position: "absolute",left:"0.6%",top:"60%"}}>
                        Effects: 
                    </span>
                    <div style={{position: "absolute",left:"1.6%",top:"68%"}}>
                        Give you better range of vision for 10 minutes.
                    </div>
                </div>;
    }
}

export default VisionOrb;