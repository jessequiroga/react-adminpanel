 class Game
{
    Name;
    Duration;
    BeginDate;
    MinPlayer;
    IP;
    Players = [];
    Zones = [];
    Items = [];
    Altars = [];
    Teams=[];

    constructor(
        name,
        duration,
        beginDate,
        minPlayer,
        ip,
        players = [],
        zones = [],
        items = [],
        altars = [],
        teams=[])
    {      
        this.Name = name;
        this.Duration = duration;
        this.BeginDate = beginDate;
        this.MinPlayer = minPlayer;
        this.Ip = ip;
        this.BeginDate = players;
        this.Zones = zones;
        this.Items = items;
        this.Altars = altars;
        this.Teams = teams;
    }

    addZone(zone){
        this.Zones.push(zone);
    }

    addItem(item){
        this.Items.push(item);
    }

    addAltar(altar){
        this.Altars.push(altar);
    }

    addTeam(team){
        this.Teams.push(team);
    }

    removeZone(zone){
        var err = false;

        var indexZ = this.Zones.findIndex( ({ Id }) => Id === zone.id);
        if(indexZ!==-1)
        {
            this.Zones=this.Zones.filter( ({ Id }) => Id !== zone.id);
        }
        else err=true;

        return err;
    }

    removeItem(item){
        var err = false;

        var indexI = this.Items.findIndex( ({ Id }) => Id === item.id);
        if(indexI!==-1)
        {
            this.Items=this.Items.filter( ({ Id }) => Id !== item.id);
        }
        else err=true;

        return err;
    }

    removeAltar(altar){
        var err = false;

        var indexA = this.Altars.findIndex( ({ Id }) => Id === altar.id);
        if(indexA!==-1)
        {
            this.Altars=this.Altars.filter( ({ Id }) => Id !== altar.id);
        }
        else err=true;

        return err;

    }

    removeTeam(team){
        var err = false;

        var indexT = this.Teams.findIndex( ({ Id }) => Id === team.id);
        if(indexT!==-1)
        {
            this.Teams=this.Teams.filter( ({ Id }) => Id !== team.id);
        }
        else err=true;

        return err;

    }

    editZone(zone){
        var err = false;

        var indexZ = this.Zones.findIndex( ({ Id }) => Id === zone.id);
        if(indexZ!==-1)
        {
            this.Zones[indexZ].Position = zone.position;
        }
        else err=true;

        return err;
    }

    editItem(item){
        var err = false;

        var indexI = this.Items.findIndex( ({ Id }) => Id === item.id);
        if(indexI!==-1)
        {
            this.Items[indexI].Position = item.position;
        }
        else err=true;

        return err;
    }

    editAltar(altar){
        var err = false;

        var indexA = this.Altars.findIndex( ({ Id }) => Id === altar.id);
        if(indexA!==-1)
        {
            this.Altars[indexA].Position = altar.position;
        }
        else err=true;

        return err;

    }
}
class SigletonGame { // Object Game to sigleton
        static instance;
     
        static createInstance() {
            var object = new Game("hug","60sec","aujourd'hui","3","127.0.0.1");
            return object;
        }
     

        static getInstance(game=null){
            if(game!=null)
            {
                this.instance = new Game(game.default.Name,
                                        game.default.Duration,
                                        game.default.BeginDate,
                                        game.default.MinPlayer,
                                        game.default.Ip,
                                        game.default.Players,
                                        game.default.Zones,
                                        game.default.Items,
                                        game.default.Altars);
                                            }
            if (!this.instance) {
                this.instance = this.createInstance();
            }
            return this.instance;
        }
}

export default SigletonGame;
