import Point from "../helper/Point";


import testPoint from "../test/pointMap";


describe('Point distanceTo', () => {
    
    it('should be 0', () => {
       let point1 = new Point(new testPoint({lat:0,lng:0}));
       let point2 = new Point(new testPoint({lat:0,lng:0}));

       let distance = point1.distanceTo(point2);

       expect(distance).to.equal(0);
    });

    it('should be equivalent', () => {
        let point1 = new Point(new testPoint({lat:1,lng:0}));
        let point2 = new Point(new testPoint({lat:2,lng:0}));
 
        let distance1 = point1.distanceTo(point2);
        let distance2 = point2.distanceTo(point1);
 
        expect(distance1).to.equal(distance2);
    });

});
