import Marker from "./Marker";

class Player extends Marker
{
    Items;
    IsAFK;
    InventorySize;
    Team;
    VisibleEntities;
    constructor(position,name,team,visibleEntities,inventorySize,isAFK,items,id)
    {
        console.log("CreatePlayer",id);
        super(position,name,id);
        this.Team = team;
        this.VisibleEntities = visibleEntities;
        this.InventorySize = inventorySize;
        this.IsAFK = isAFK;
        this.Items = items;
    }

    getIcon()
    {
        if(this.Team == null)
        {
            return {
                
                url:`/mapMaker.png`,
                scaledSize: new window.google.maps.Size(100, 100)
            };
        }
        else
        {
            return {
                url:`/cultist_`+this.Team.Color.toLowerCase()+`.png`,
                scaledSize: new window.google.maps.Size(100, 100)
            }
        }
    }
    
}

class PlayerManager
{
    static createPlayer(position,name,team,visibleEntities,inventorySize,isAFK,items,id)
    {
        var item = new Player(position,name,team,visibleEntities,inventorySize,isAFK,items,id);
        return item;
    }

    static getIcon()
    {
        return {
            url:`/magazine_de_culte_c.png`,
            scaledSize: new window.google.maps.Size(100, 100)
        };
    }
}

export default PlayerManager;



