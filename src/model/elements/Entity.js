export default class Entity 
{
    Position;
    VisionDistance;
    ActionDistance;
    Name;
    MapEntity=null;

    constructor(position)
    {
        this.Position = position;
    }


    toMapElement(){};
}

