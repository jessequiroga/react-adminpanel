export default class Entity 
{
    static IncrId = 0;
    Id;
    Position;
    VisionDistance;
    ActionDistance=10;
    Name;
    MapEntity=null;
    IsInActionRange = false;

    constructor(Position,ActionDistance=null,IsInActionRange=null,Name=null,VisionDistance=null,Id=null)
    {
        
        if(Id!==null)
        {
            this.Id = Id;
        }
        else
        {
            this.Id = Entity.IncrId;
            Entity.IncrId++;
        }
        this.Position = Position;
        if(ActionDistance)this.ActionDistance = ActionDistance
        if(IsInActionRange)this.IsInActionRange = IsInActionRange;
        if(VisionDistance)this.VisionDistance = VisionDistance
        if(Name)this.Name = Name; else this.Name = this.constructor.name;
    }


    toMapElement(){};
}

