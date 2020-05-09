import IconItem from './IconItem';
import CultMag from './Items/CultMag';
import PocheInterdimensionnelle from './Items/PocheInterdimensionnelle';

class ItemManager
{
    static TypesItem = {
        CultMag:"Magazine de cult",
        PocheInterdimensionnelle:"La poche interdimensionnelle"
    };
    static createItem(Position,Type,ActionDistance=null,AvailableDuration=null,CanChangeVisionDistance=null,CanTeleport=null,DeficiencyDuration=null,IsInActionRange=null,Name=null,Quantity=null,VisionDistance=null,Id=null)
    {
        var item;
        switch(Type)
        {   
            case "CultMag":
                item = new CultMag(Position,Type,ActionDistance,AvailableDuration,CanChangeVisionDistance,CanTeleport,DeficiencyDuration,IsInActionRange,Name,Quantity,VisionDistance,Id);
                break;
            case "PocheInterdimensionnelle":
                item = new PocheInterdimensionnelle(Position,Type,ActionDistance,AvailableDuration,CanChangeVisionDistance,CanTeleport,DeficiencyDuration,IsInActionRange,Name,Quantity,VisionDistance,Id);
                break;
            default:
                    throw new Error("this item type is not in the switch iteam Manager type: "+Type);
                break;

        }
        
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