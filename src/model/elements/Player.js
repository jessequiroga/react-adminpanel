import Marker from "./Marker";

class Player extends Marker
{
    Items;
    IsAFK;
    InventorySize;
    Team;
    VisibleEntities;
    constructor(Position,ActionDistance,IsInActionRange,Name,VisionDistance,team,visibleEntities,inventorySize,isAFK,items,Id)
    {
        super(Position,ActionDistance,IsInActionRange,Name,VisionDistance,Id);
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
                
                url:`/mapMarker.png`,
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
    static createPlayer(Position,ActionDistance,IsInActionRange,Name,VisionDistance,team,visibleEntities,inventorySize,isAFK,items,Id)
    {
        var item = new Player(Position,ActionDistance,IsInActionRange,Name,VisionDistance,team,visibleEntities,inventorySize,isAFK,items,Id);
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



