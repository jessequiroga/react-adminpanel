import Marker from "./Marker";

class Player extends Marker
{
    Id;
    Items;
    IsAFK;
    InventorySize;
    Team;
    VisibleEntities;
    constructor(position,team,visibleEntities,inventorySize,isAFK,items,id)
    {
        super(position);
        this.Id = id;
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
                url:`/cultist_`+this.Team.Color+`.png`,
                scaledSize: new window.google.maps.Size(100, 100)
            }
        }
    }
    
}

class PlayerManager
{
    static IncrId=0;

    static createPlayer(position,team,visibleEntities,inventorySize,isAFK,items)
    {
        var item = new Player(position,team,visibleEntities,inventorySize,isAFK,items,this.IncrId);
        this.IncrId++;
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



