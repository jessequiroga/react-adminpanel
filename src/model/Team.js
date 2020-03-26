export default class Team 
{
    Id;
    Color;
    Players;
    Markers;
    Name;

    constructor(position)
    {
        this.Position = position;
    }


    toMapElement(){};

    addPlayer(player){
        this.Players.push(player);
    }
}

