import React from 'react';

class Zone 
{
    Id;
    Coordinates;
    Forbidden;
    MapEntity=null;
    constructor(coordinates,id){
        this.Coordinates = coordinates;
        this.Id = id;
    }

    toMapElement(map=null){
        let poly = this.MapEntity;
        if(poly == null )
        {
            var coordinates =[];
            this.Coordinates.forEach(coordinate => {
                coordinates.push({lat:coordinate[0],lng:coordinate[1]});
            });
            poly = new window.google.maps.Polygon({
                paths:coordinates, // Initiate the coordinates of the marker with the json altar.geometry.coordinates
                type:this.constructor.name,
                id: this.Id,
                map: map,
                strokeColor: "#FF0000",
                strokeOpacity: 1,
                strokeWeight: 3,
                fillColor: "#FF0000",
                fillOpacity: 0.30,    
            });
            this.MapEntity = poly;
        }

        return poly;
    }
}

class ZoneManager
{
    static IncrId=0;

    static createZone(coordinates,Id=null)
    {
        var zone = null;
        if(Id!= null)
            zone = new Zone(coordinates,Id);
        else
        {
            zone = new Zone(coordinates,this.IncrId);
            this.IncrId++;
        }
        return zone;
    }

    static getIcon()
    {
        return {   
            url:`/zone.png`,
            scaledSize: new window.google.maps.Size(80, 80)
        };
    }

    static description()
    {
        return  <div style={{fontSize:"1.2rem"}}>
                    <img style={{width: "60px",position: "absolute",right:"2%",top:"5%"}} alt="Altars" src={ZoneManager.getIcon().url}></img>
                    <div style={{fontWeight:"bolder",position: "absolute",right:"36%",top:"12%"}}>
                        Resurgence zone 
                    </div>
                    <span style={{fontWeight:"bolder",position: "absolute",left:"1%",top:"20%"}}>
                        Description: 
                    </span>
                    <div style={{position: "absolute",left:"2%",top:"28%"}}>
                        Some old strange energy is merging in this part of our reality plan.<br/>
                        The old ones claims this area in their realm.
                    </div>
                    <span style={{fontWeight:"bolder",position: "absolute",left:"1%",top:"60%"}}>
                        Effects: 
                    </span>
                    <div style={{position: "absolute",left:"2%",top:"68%"}}>
                        The resurgence area is the playing zone.<br/>
                        Outside it, all the player powers are inefficient.
                    </div>
                </div>;
    }

}

export default ZoneManager;