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

    static isInRegion(regionsCoordinates, marker) {
        var point = new Point(marker.position);
        var result =false;
        console.log(regionsCoordinates);
        regionsCoordinates.forEach((regionCoordinates)=>{
            var regionCoordinate = regionCoordinates.getPath().getArray();
            result = false;
            var j = regionCoordinate.length - 1;
            for (var i = 0; i < regionCoordinate.length; i++)
            {
                if ((new Point(regionCoordinate[i])).y < point.y && (new Point(regionCoordinate[j])).y >= point.y || (new Point(regionCoordinate[j])).y < point.y && (new Point(regionCoordinate[i])).y >= point.y)
                {
                    if ((new Point(regionCoordinate[i])).x+ (point.y - (new Point(regionCoordinate[i])).y) / ((new Point(regionCoordinate[j])).y - (new Point(regionCoordinate[i])).y) * ((new Point(regionCoordinate[j])).x - (new Point(regionCoordinate[i])).x) < point.x)
                    {
                        result = !result;
                    }
                }
                j = i;
            }
            if(result == true)
                return;
        });
        return result;
    }
}