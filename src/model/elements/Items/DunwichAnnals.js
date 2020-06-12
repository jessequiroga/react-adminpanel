import React from "react";
import Item from "./Item";

class DunwichAnnals extends Item
{
    constructor(Position,Type,ActionDistance=null,AvailableDuration=null,CanChangeVisionDistance=null,CanTeleport=null,DeficiencyDuration=null,IsInActionRange=null,Name=null,Quantity=null,VisionDistance=null,Id=null)
    {
        super(Position,Type,ActionDistance,AvailableDuration,CanChangeVisionDistance,CanTeleport,DeficiencyDuration,IsInActionRange,Name,Quantity,VisionDistance,Id);
    }

    static description(imageUrl)
    {
        return  <div style={{fontSize:"1.2rem"}}>
                    <img style={{width: "60px",position: "absolute",right:"2%",top:"5%"}} alt="Dunwich’s Annals" src={imageUrl.url}></img>
                    <div style={{fontWeight:"bolder",position: "absolute",right:"36%",top:"12%"}}>
                        Dunwich’s Annals
                    </div>
                    <span style={{fontWeight:"bolder",position: "absolute",left:"1%",top:"20%"}}>
                        Description: 
                    </span>
                    <div style={{position: "absolute",left:"2%",top:"28%"}}>
                        This old book is filled with a lot of strange writing and oddly pleasant sketches.<br/> 
                        You need to hide yourself to study this book more deeply.
                    </div>
                    <span style={{fontWeight:"bolder",position: "absolute",left:"1%",top:"60%"}}>
                        Effects: 
                    </span>
                    <div style={{position: "absolute",left:"2%",top:"68%"}}>
                        You’re invisible to other player for 10 minutes.
                    </div>
                </div>;
    }
}

export default DunwichAnnals;