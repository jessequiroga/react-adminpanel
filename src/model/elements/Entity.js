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

    constructor(position,actionDistance=null,isInActionRange=null,name=null,visionDistance=null,id=null)
    {   
        if(id!==null)
        {
            this.Id = id;
        }
        else
        {
            console.log(Entity.IncrId);
            console.log("new",id)
            this.Id = Entity.IncrId;
            Entity.IncrId++;
        }
        this.Position = position;
        if(actionDistance)this.ActionDistance = actionDistance
        if(isInActionRange)this.IsInActionRange = isInActionRange;
        if(visionDistance)this.VisionDistance = visionDistance
        if(name)this.Name = name; else this.Name = this.constructor.name;
    }


    toMapElement(){};
}

