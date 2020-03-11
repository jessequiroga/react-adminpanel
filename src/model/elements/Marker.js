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
            icon:{ // Initaite the icon of the markers
                url: this.Icon.url, // take the icon on /public
                scaledSize: this.Icon.scaledSize // resize the icon
            },
        });
        return marker;
    }
}