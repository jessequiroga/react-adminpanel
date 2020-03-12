 class Game
{
    Name;
    Duration;
    BeginDate;
    MinPlayer;
    IP;
    Players = [];
    Regions = [];
    Items = [];
    Flags = [];
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
        flags = [],
        teams=[])
    {      
        this.Name = name;
        this.Duration = duration;
        this.BeginDate = beginDate;
        this.MinPlayer = minPlayer;
        this.Ip = ip;
        this.BeginDate = players;
        this.Regions = zones;
        this.Items = items;
        this.Flags = flags;
        this.Teams = teams;
    }

    addZone(region){
        this.Regions.push(region);
    }

    addItem(item){
        this.Items.push(item);
    }

    addAltar(flag){
        this.Flags.push(flag);
    }

    addTeam(team){
        this.Teams.push(team);
    }

    removeZone(region){
        var err = false;

        var indexZ = this.Regions.findIndex( ({ Id }) => Id === region.id);
        if(indexZ!==-1)
        {
            this.Regions=this.Regions.filter( ({ Id }) => Id !== region.id);
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

    removeAltar(flag){
        var err = false;

        var indexA = this.Flags.findIndex( ({ Id }) => Id === flag.id);
        if(indexA!==-1)
        {
            this.Flags=this.Flags.filter( ({ Id }) => Id !== flag.id);
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

    editZone(region){
        var err = false;

        var indexZ = this.Regions.findIndex( ({ Id }) => Id === region.id);
        if(indexZ!==-1)
        {
            this.Regions[indexZ].Position = region.position;
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

    editAltar(flag){
        var err = false;

        var indexA = this.Flags.findIndex( ({ Id }) => Id === flag.id);
        if(indexA!==-1)
        {
            this.Flags[indexA].Position = flag.position;
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
                                        game.default.Regions,
                                        game.default.Items,
                                        game.default.Flags,
                                        game.default.Teams);
                                            }
            if (!this.instance) {
                this.instance = this.createInstance();
            }
            return this.instance;
        }
}

export default SigletonGame;
