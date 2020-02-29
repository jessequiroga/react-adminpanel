import Marker from "./Marker";

class Item extends Marker
{
    Id;
    CaptureDate;
    UnavailableTime;
    constructor(position,icon,id)
    {
        super(position);
        super.Icon = icon;
        this.Id = id;
    }       
}

class ItemManager
{
    static IncrId=0;

    static createItem(position,icon)
    {
        var item = new Item(position,icon,this.IncrId);
        this.IncrId++;
        return item;
    }
}

export default ItemManager;