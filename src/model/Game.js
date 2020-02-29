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

    constructor(
        name,
        duration,
        beginDate,
        minPlayer,
        ip,
        players = [],
        zones = [],
        items = [],
        altars = [])
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
}
class SigletonGame { // Object Game to sigleton
        static instance;
     
        static createInstance() {
            var object = new Game("hug","60sec","aujourd'hui","3","127.0.0.1");
            return object;
        }
     

        static getInstance(){
            if (!this.instance) {
                this.instance = this.createInstance();
            }
            return this.instance;
        }
}

export default SigletonGame;
