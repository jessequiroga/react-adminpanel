import Point from './Point.js';

export default class DrawConflict {
    static isConflict(listVisionMarker, visionCircle) {
        var result = false;
        listVisionMarker.forEach((m) => {
            var visionMarker = m.visionCircle;
            var pointVisionMarker = new Point(visionMarker.center);
            var pointNewMarker = new Point(visionCircle.center);
            if (pointVisionMarker.distanceTo(pointNewMarker) <= (visionMarker.radius + visionCircle.radius)) {
                result = true;
                return;
            }
        });
        return result;
    }

    static isInRegion(regions, marker) {
        var point = new Point(marker.position);
        var result =false;
        for (const [index, regionCoordinates] of regions.entries()) {
            var Coordinates = regionCoordinates.getPath().getArray();
            result = false;
            var j = Coordinates.length - 1;
            for (var i = 0; i < Coordinates.length; i++)
            {
                if ((new Point(Coordinates[i])).y < point.y && (new Point(Coordinates[j])).y >= point.y || (new Point(Coordinates[j])).y < point.y && (new Point(Coordinates[i])).y >= point.y)
                {
                    if ((new Point(Coordinates[i])).x+ (point.y - (new Point(Coordinates[i])).y) / ((new Point(Coordinates[j])).y - (new Point(Coordinates[i])).y) * ((new Point(Coordinates[j])).x - (new Point(Coordinates[i])).x) < point.x)
                    {
                        result = !result;
                    }
                }
                j = i;
            }
            if(result == true)
            {
                break;
            }
        };
        return result;
    }
}