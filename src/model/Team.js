class Team 
{
    Id;
    Color;
    Name;

    constructor(Color,Name,Id=null)
    {

        this.Id =  Id;
        this.Color = Color;
        this.Name = Name;
    }


    toMapElement(){};
}

export default class TeamManager
{
   static IncrId=0;
   static create(Color,Name,Id=null)
   {

       Id = Id?Id:this.IncrId;
       this.IncrId++;
       return new Team(Color,Name,Id);
   }
}
