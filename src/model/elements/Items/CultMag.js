import Item from "./Item";

class CultMag extends Item
{
    $type = "CultWars.Model.Entities.Items.MagazineDeCulte, CultWars.Model";
    IsActive= false;
    Team;
    constructor(Position,Type,ActionDistance=null,AvailableDuration=null,CanChangeVisionDistance=null,CanTeleport=null,DeficiencyDuration=null,IsInActionRange=null,Name=null,Quantity=null,VisionDistance=null,Id=null,IsActive=null,Team=null)
    {
        if(IsActive!==null){this.IsActive = IsActive;}
        if(Team!==null){this.Team = Team;}
        super(Position,Type,ActionDistance,AvailableDuration,CanChangeVisionDistance,CanTeleport,DeficiencyDuration,IsInActionRange,Name,Quantity,VisionDistance,Id);
    }
    
    getIcon()
    {
        if(this.IsActive && this.Team)
        {
            return {url:`/magazine_de_culte_`+this.Team.Color.toLowerCase()+`.png`,
                scaledSize: new window.google.maps.Size(70, 70)};
        }
        else
            return super.getIcon();
    }
}

export default CultMag;