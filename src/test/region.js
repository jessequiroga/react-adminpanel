import Point from "./pointMap";

export default class Region{
    coordinates = [];
    constructor(coordinates){
        coordinates.forEach(cord => {
            let point = new Point(cord);
            this.coordinates.push(point); 
        });
    }

    getPath()
    {
        return {getArray:()=>{return this.coordinates}};
    }
    
}