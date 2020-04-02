export default class Entity 
{
    static IncrId = 0;
    Id;
    Position;
    VisionDistance;
    ActionDistance;
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
        this.ActionDistance = ActionDistance
        this.IsInActionRange = IsInActionRange
        this.VisionDistance = VisionDistance
        this.Name = Name;
    }


    toMapElement(){};
}

