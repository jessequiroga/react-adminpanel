import Marker from "./Marker";
import React from "react";

class Altar extends Marker
{
    CaptureDate;
    UnavailableTime = 300;
    Available = true;
    Team;

    constructor(Position,ActionDistance,IsInActionRange,Name,VisionDistance,UnavailableTime,CaptureDate,Id,Team,Available)
    {
        if(!VisionDistance)VisionDistance = 300;
        if(!ActionDistance)ActionDistance = 100;
        //console.log(VisionDistance);
        super(Position,ActionDistance,IsInActionRange,Name,VisionDistance,Id);
        if(UnavailableTime)this.UnavailableTime=UnavailableTime;
        if(CaptureDate)this.CaptureDate=CaptureDate;
        if(Team)this.Team=Team;
        if(Available!=null)this.Available = Available;
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
    static createAltar(Position,ActionDistance=null,IsInActionRange=null,Name=null,VisionDistance=null,UnavailableTime=null,CaptureDate=null,Id=null,Team=null,Available=null)
    {
        var altar = new Altar(Position,ActionDistance,IsInActionRange,Name,VisionDistance,UnavailableTime,CaptureDate,Id,Team,Available);
        return altar;
    }

    static getIcon()
    {
        return {   
            url:`/altar_unreached.png`,
            scaledSize: new window.google.maps.Size(80, 80)
        };
    }

    static description()
    {
        return  <div style={{fontSize:"1.2rem"}}>
                    <img style={{width: "60px",position: "absolute",right:"2%",top:"5%"}} alt="Altars" src={AltarManager.getIcon().url}></img>
                    <div style={{fontWeight:"bolder",position: "absolute",right:"46%",top:"12%"}}>
                        Altars
                    </div>
                    <span style={{fontWeight:"bolder",position: "absolute",left:"1%",top:"20%"}}>
                        Description: 
                    </span>
                    <div style={{position: "absolute",left:"2%",top:"28%"}}>
                        They contain good old fashion magic.<br/>
                        Although it’s so advanced tech we think this is magic.<br/>
                        Who knows ?
                    </div>
                    <span style={{fontWeight:"bolder",position: "absolute",left:"1%",top:"60%"}}>
                        Effects: 
                    </span>
                    <div style={{position: "absolute",left:"2%",top:"68%"}}>
                        This is the main goal of a Cultwars game. <br/>
                        Gotta capture them all !
                    </div>
                </div>;
    }
}

export default AltarManager;
