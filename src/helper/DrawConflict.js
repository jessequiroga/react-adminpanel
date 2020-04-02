import Point from './Point.js';
import Game from '../model/Game';

export default class DrawConflict {
    static isConflict(visionCircleCenter,visionCircleRadius,listVisionMarker=null) {
        if(listVisionMarker == null)
        {
            listVisionMarker = [];
            Game.getInstance().Items.forEach(item => {
                if(item.toMapElement)listVisionMarker.push(item.toMapElement());
            });
            Game.getInstance().Flags.forEach(flag => {
                if(flag.toMapElement)listVisionMarker.push(flag.toMapElement());
            });
        }
        var result = false;
        listVisionMarker.forEach((m) => {
            var visionMarker = m.visionCircle;
            var pointVisionMarker = new Point(visionMarker.center);
            var pointNewMarker = new Point(visionCircleCenter);
            if (pointVisionMarker.distanceTo(pointNewMarker) <= (visionMarker.radius + visionCircleRadius)) {
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