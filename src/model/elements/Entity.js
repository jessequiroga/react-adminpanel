export default class Entity 
{
    Position;
    VisionDistance=30;
    ActionDistance;
    Name;

    constructor(position)
    {
        this.Position = position;
    }


    toMapElement(){};
}

