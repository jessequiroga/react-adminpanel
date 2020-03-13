export default class Point {
    x;
    y;

    constructor({lat,lng})
    {
        this.x = lat();
        this.y = lng();
    }

    distanceTo(point){
        var R = 6378137; // Earth’s mean radius in meter
        var d2r = Math.PI/180.0;
        var dlong = (point.y- this.y) *d2r;
        var dlat = (point.x - this.x) *d2r;
        var a = Math.pow(Math.sin(dlat/2.0), 2) + Math.cos(this.x*d2r) * Math.cos(point.x*d2r) * Math.pow(Math.sin(dlong/2.0), 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; 

        return d;
    } 
}