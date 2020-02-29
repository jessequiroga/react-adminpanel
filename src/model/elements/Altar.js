import Marker from "./Marker";

export default class Altar extends Marker
{
    Icon = {
        url:`/mapMarker.png`,
        scaledSize: new window.google.maps.Size(100, 100)
    };
    CaptureDate;
    UnavailableTime;

    constructor(position)
    {
        super(position);
    }

}
