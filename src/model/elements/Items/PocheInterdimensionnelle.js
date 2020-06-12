import Item from "./Item";
import React from "react";


class PocheInterdimensionnelle extends Item
{
    constructor(Position,Type,ActionDistance=null,AvailableDuration=null,CanChangeVisionDistance=null,CanTeleport=null,DeficiencyDuration=null,IsInActionRange=null,Name=null,Quantity=null,VisionDistance=null,Id=null)
    {
        super(Position,Type,ActionDistance,AvailableDuration,CanChangeVisionDistance,CanTeleport,DeficiencyDuration,IsInActionRange,Name,Quantity,VisionDistance,Id);
    }

    static description(imageUrl)
    {
        return  <div style={{fontSize:"1.2rem"}}>
                    <img style={{width: "60px",position: "absolute",right:"2%",top:"5%"}} alt="Interdimensional Pocket" src={imageUrl.url}></img>
                    <div style={{fontWeight:"bolder",position: "absolute",right:"28%",top:"12%"}}>
                        Interdimensional Pocket
                    </div>
                    <span style={{fontWeight:"bolder",position: "absolute",left:"0.6%",top:"20%"}}>
                        Description: 
                    </span>
                    <div style={{position: "absolute",left:"1.6%",top:"28%"}}>
                        This non-euclidian object allow you to store your items in a parallel plane of reality <br/>
                        (Don’t ask wich of them, you don’t want to know).
                    </div>
                    <span style={{fontWeight:"bolder",position: "absolute",left:"0.6%",top:"60%"}}>
                        Effects: 
                    </span>
                    <div style={{position: "absolute",left:"1.6%",top:"68%"}}>
                        Give you 2 more slots of inventory (max 4)
                    </div>
                </div>;
    }
}

export default PocheInterdimensionnelle;