import Marker from "./Marker";
import IconItem from './IconItem'

class Item extends Marker
{
    Id;
    CaptureDate;
    UnavailableTime;
    Type;
    constructor(position,type,id)
    {
        super(position);
        super.Type = type;
        this.Id = id;
        this.VisionDistance=20;
    }

    getIcon()
    {
        var icon = IconItem[this.Type];
        return {url:icon.url,
        scaledSize: new window.google.maps.Size(icon.scaledSize[0], icon.scaledSize[1])};
    }
    
}

class ItemManager
{
    static IncrId=0;

    static createItem(position,type)
    {
        var item = new Item(position,type,this.IncrId);
        this.IncrId++;
        return item;
    }

    static getIcon(type)
    {
        var icon = IconItem[type];
        return {url:icon.url,
            scaledSize: new window.google.maps.Size(icon.scaledSize[0], icon.scaledSize[1])};
    }
}

export default ItemManager;