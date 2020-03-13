import Point from './Point.js';

export default class DrawConflict
{
    static isConflict(listVisionMarker,visionCircle)
    {
        var conflict = false;
        listVisionMarker.forEach((m) => {
            var visionMarker= m.visionCircle;
            var pointVisionMarker = new Point(visionMarker.center);
            var pointNewMarker = new Point(visionCircle.center);
            console.log("distance",pointVisionMarker.distanceTo(pointNewMarker));
            console.log("porté",(visionMarker.radius+visionCircle.radius));
            if(pointVisionMarker.distanceTo(pointNewMarker) <= (visionMarker.radius+visionCircle.radius))
            {
                console.log("conflict");
                conflict = true;
            }
        });
        console.log(conflict);
        return conflict;
    }
}