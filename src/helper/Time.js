export default class Time {
    static addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    static addTime(date, time) {
        var result = new Date(date);
        const [hour,min] = time.split(':');
        result.setTime(result.getTime() + parseInt(hour)*60*60*1000 + parseInt(min)*60*1000);
        return result;
    }

    static getTime(strTime){
        let[hour,min] = strTime.split(':');

        return parseInt(hour)*60*60 + (min)*60;
    }
}