import Marker from "./Marker";

export default class Item extends Marker
{
    CaptureDate;
    UnavailableTime;
    constructor(position,icon)
    {
        super(position);
        super.Icon = icon;
    }
}
