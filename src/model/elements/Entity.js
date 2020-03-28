export default class Entity 
{
    static IncrId;
    Id;
    Position;
    VisionDistance;
    ActionDistance;
    Name;
    MapEntity=null;

    constructor(position,name=null,id=null)
    {
        if(id)
        {
            this.Id = id;
            Entity.IncrId = id+1;
        }
        else
        {
            this.Id = Entity.IncrId;
            Entity.IncrId++;
        }
            
        this.Position = position;
        this.Name = name;
    }


    toMapElement(){};
}

