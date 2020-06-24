import DrawConflict from "../helper/DrawConflict";

import Cirle from "../test/circleMapObject";
import Point from "../test/pointMap";
import Region from "../test/region";



describe('DrawConflict Collision', () => {
    
    let circle1  = new Cirle(new Point({lat:0.1,lng:0.3}),5);

    it('should be in collision', () => {
        let circle2  = new Cirle(new Point({lat:0.1,lng:0.3}),5);
        let listVisionMarker = [{actionCircle:circle2}];

        let result =DrawConflict.isConflict(circle1.center,circle1.radius,listVisionMarker);

        expect(result).to.equal(true);
    });

    it('should not be in collision', () => {
        let circle3  = new Cirle(new Point({lat:5.1,lng:6.3}),5);
        let listVisionMarker = [{actionCircle:circle3}];

        let result = DrawConflict.isConflict(circle1.center,circle1.radius,listVisionMarker);

        expect(result).to.equal(false);
    });


});

describe('DrawConflict Zone', () => {
    
    let marker = {position:new Point({lat:0,lng:0})};
    it('should be in zone', () => {
        let region  = new Region([{lat:0,lng:1},{lat:1,lng:0},{lat:-1,lng:0},{lat:0,lng:-1}]);
        let regionInArray = [];
        regionInArray[1] = region;

        let listregions = [regionInArray];
        let regions = {entries:() =>{return listregions}};
        let result = DrawConflict.isInRegion(regions,marker);

        expect(result).to.equal(true);
    });

    it('should not be in zone', () => {
        let region  = new Region([{lat:1,lng:1},{lat:2,lng:2},{lat:3,lng:3},{lat:4,lng:4}]);
        let regionInArray = [];
        regionInArray[1] = region;

        let listregions = [regionInArray];
        let regions = {entries:() =>{return listregions}};
        let result = DrawConflict.isInRegion(regions,marker);

        expect(result).to.equal(false);
    });

});