export default class Point{
    la;
    ln;
    constructor(point){
        this.la = point.lat;
        this.ln = point.lng;
    }

    lat(){
        return this.la;
    }

    lng(){
        return this.ln;
    }
}