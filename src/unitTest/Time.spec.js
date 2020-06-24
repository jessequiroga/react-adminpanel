import Time from "../helper/Time";


describe('Time addDays', () => {
    
    it('should be equivalent', () => {
       let today = new Date();
       let result = Time.addDays(today,0);

       expect(result.getDate()).to.equal(today.getDate());
    });

    it('should be tomorrow', () => {
       let today = new Date("2012-03-29");
       let result = Time.addDays(today,1);

       expect(result.getDate()).to.equal(new Date("2012-03-30").getDate());
    });

    it('should be nextMonth', () => {
        let today = new Date("2012-03-29");
        let result = Time.addDays(today,31);
 
        expect(result.getDate()).to.equal(new Date("2012-04-29").getDate());
    });

});

describe('Time addTime', () => {
    
    it('should be equivalent', () => {
        let today = new Date();
        let result = Time.addTime(today,"0:0");
 
        expect(result.getDate()).to.equal(today.getDate());
    });
 
    it('should be tomorrow', () => {
        let today = new Date("2012-03-29");
        let result = Time.addTime(today,"24:00");
 
        expect(result.getDate()).to.equal(new Date("2012-03-30").getDate());
    });

});

describe('Time showTime', () => {
    
    it('should be 00:00:00', () => {
        let result = Time.showTime(0);

        expect(result).to.equal("00:00:00");
    });

    it('should be 00:00:01', () => {
        let result = Time.showTime(1);

       expect(result).to.equal("00:00:01");
    });

    it('should be 00:01:00', () => {
        let result = Time.showTime(60);

       expect(result).to.equal("00:01:00");
    });

    it('should be 01:00:00', () => {
        let result = Time.showTime(3600);

       expect(result).to.equal("01:00:00");
    });

    it('should be Days', () => {
        let result = Time.showTime(86401);

       expect(result).to.equal("01 days left");
    });

    it('should be Months', () => {
        let result = Time.showTime(2630016);

       expect(result).to.equal("01 month and 00 days left");
    });
    
    it('should be Years', () => {
        let result = Time.showTime(31556925.217);

       expect(result).to.equal("01 years left");
    });

});

describe('Time diffTime', () => {
    
    it('should be 00:00:00', () => {
        let result = Time.diffTime(new Date(),new Date());

        expect(result).to.equal("00:00:00");
    });

    it('Time be distinct by one day', () => {
        let tomorrow = Time.addDays(new Date(),1);
        let result = Time.diffTime(tomorrow,new Date());

       expect(result).to.equal("24:00:00");
    });

});
