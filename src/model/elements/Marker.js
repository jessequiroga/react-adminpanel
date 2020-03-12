import Entity from "./Entity";

export default class Marker extends Entity
{
    Icon;
    constructor(position)
    {
        super(position);
    }
    toMapElement(){
        console.log({lat:this.Position});
        let marker = new window.google.maps.Marker({
            position: {lat:this.Position[0],lng:this.Position[1]},
            title: 'new',
            icon: this.getIcon()
        });
        return marker;
    }
}