import Marker from "./Marker";
import React from "react";

class Altar extends Marker
{
    CaptureDate;
    UnavailableTime;
    Team;

    constructor(Position,ActionDistance,IsInActionRange,Name,VisionDistance,UnavailableTime,CaptureDate,Id,Team)
    {
        if(!VisionDistance)VisionDistance = 300;
        if(!ActionDistance)ActionDistance = 100;
        //console.log(VisionDistance);
        super(Position,ActionDistance,IsInActionRange,Name,VisionDistance,Id);
        if(UnavailableTime)this.UnavailableTime=UnavailableTime;
        if(CaptureDate)this.CaptureDate=CaptureDate;
        if(Team)this.Team=Team;
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
    static createAltar(Position,ActionDistance=null,IsInActionRange=null,Name=null,VisionDistance=null,UnavailableTime=null,CaptureDate=null,Id=null,Team=null)
    {
        var altar = new Altar(Position,ActionDistance,IsInActionRange,Name,VisionDistance,UnavailableTime,CaptureDate,Id,Team);
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
                    <div style={{fontWeight:"bolder",position: "absolute",right:"52%",top:"12%"}}>
                        Altars
                    </div>
                    <span style={{fontWeight:"bolder",position: "absolute",left:"0.6%",top:"20%"}}>
                        Description: 
                    </span>
                    <div style={{position: "absolute",left:"1.6%",top:"28%"}}>
                        They contain good old fashion magic.<br/>
                        Although it’s so advanced tech we think this is magic.<br/>
                        Who knows ?
                    </div>
                    <span style={{fontWeight:"bolder",position: "absolute",left:"0.6%",top:"60%"}}>
                        Effects: 
                    </span>
                    <div style={{position: "absolute",left:"1.6%",top:"68%"}}>
                        This is the main goal of a Cultwars game. <br/>
                        Gotta capture them all !
                    </div>
                </div>;
    }
}

export default AltarManager;
