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
            if(pointVisionMarker.distanceTo(pointNewMarker) <= (visionMarker.radius+visionCircle.radius))
            {
                conflict = true;
            }
        });
        return conflict;
    }
}