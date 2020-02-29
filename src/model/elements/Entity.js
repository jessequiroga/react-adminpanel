export default class Entity 
{
    Position;
    VisionDistance;
    ActionDistance;
    Name;

    constructor(position)
    {
        this.Position = position;
    }

    toMapElement(){};
}

