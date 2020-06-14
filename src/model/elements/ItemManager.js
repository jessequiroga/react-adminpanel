import React from "react";

import IconItem from './IconItem';
import CultMag from './Items/CultMag';
import PocheInterdimensionnelle from './Items/PocheInterdimensionnelle';
import VisionOrb from './Items/VisionOrb';
import DunwichAnnals from './Items/DunwichAnnals';

class ItemManager
{
    static TypesItem = {
        CultMag:"Cult Magazine",
        PocheInterdimensionnelle:"Interdimensional Pocket",
        VisionOrb:"Vision Orb",
        DunwichAnnals:"Dunwich’s Annals"
    };
    static createItem(Position,Type,ActionDistance=null,AvailableDuration=null,CanChangeVisionDistance=null,CanTeleport=null,DeficiencyDuration=null,IsInActionRange=null,Name=null,Quantity=null,VisionDistance=null,Id=null,IsActive=null,Team=null,CanPickUp=null,EndEffectTime=null)
    {
        var item;
        switch(Type)
        {   
            case "CultMag":
                Name = ItemManager.TypesItem[Type];
                item = new CultMag(Position,Type,ActionDistance,AvailableDuration,CanChangeVisionDistance,CanTeleport,DeficiencyDuration,IsInActionRange,Name,Quantity,VisionDistance,Id,IsActive,Team,CanPickUp,EndEffectTime);
                break;

            case "PocheInterdimensionnelle":
                Name = ItemManager.TypesItem[Type];
                item = new PocheInterdimensionnelle(Position,Type,ActionDistance,AvailableDuration,CanChangeVisionDistance,CanTeleport,DeficiencyDuration,IsInActionRange,Name,Quantity,VisionDistance,Id,CanPickUp,EndEffectTime);
                break;

            case "VisionOrb":
                Name = ItemManager.TypesItem[Type];
                item = new VisionOrb(Position,Type,ActionDistance,AvailableDuration,CanChangeVisionDistance,CanTeleport,DeficiencyDuration,IsInActionRange,Name,Quantity,VisionDistance,Id,CanPickUp,EndEffectTime); 
                break;

            case "DunwichAnnals":
                Name = ItemManager.TypesItem[Type];
                item = new DunwichAnnals(Position,Type,ActionDistance,AvailableDuration,CanChangeVisionDistance,CanTeleport,DeficiencyDuration,IsInActionRange,Name,Quantity,VisionDistance,Id,CanPickUp,EndEffectTime);
                break;

            default:
                    throw new Error("this item type is not in the switch iteam Manager type: "+Type);

        }
        
        return item;
    }

    static getIcon(type)
    {
        var icon = IconItem[type];
        return {url:icon.url,
            scaledSize: new window.google.maps.Size(icon.scaledSize[0], icon.scaledSize[1])};
    }

    static description(type)
    {
        let desc = <></>;
        let imageUrl = ItemManager.getIcon(type);
        switch(type)
        {   
            case "CultMag":
                desc = CultMag.description(imageUrl);
                break;

            case "PocheInterdimensionnelle":
                desc = PocheInterdimensionnelle.description(imageUrl);
                break;

            case "VisionOrb":
                desc = VisionOrb.description(imageUrl); 
                break;

            case "DunwichAnnals":
                desc = DunwichAnnals.description(imageUrl);
                break;

            default:
                    throw new Error("this item type is not in the switch item Manager type: "+type);

        }
        return desc;
    }
}

export default ItemManager;