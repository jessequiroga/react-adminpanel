export default class Team 
{
    Id;
    Color;
    Players;
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

