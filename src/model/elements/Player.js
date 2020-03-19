import Marker from "./Marker";

class Player extends Marker
{
    Id;
    Items;
    IsAFK;
    InventorySize;
    Team;
    VisibleEntities;
    constructor(position,id)
    {
        super(position);
        this.Id = id;
    }
    
}

class PlayerManager
{
    static IncrId=0;

    static createPlayer(position)
    {
        var item = new Player(position,this.IncrId);
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



