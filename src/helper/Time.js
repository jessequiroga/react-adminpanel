import moment from 'moment-timezone';
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

    static diffTime(date1, date2){
        let years = 0;
        let month = 0;
        let day = 0;
        let hour = 0;
        let min = 0;
        let sec = 0;
        let res = "";
        let time = (date1.getTime()- date2.getTime())/1000;
        if(time>86400)
        {
          if(time>31556925.216)
          {
            years = Math.floor(time/31556925.216);
            res = ((years<9)?"0":"")+ years +" years left";
          }
          else
          {
            month = Math.floor(time/2630016);
            if(month>0)
            {
                res = ((month<9)?"0":"")+ month + " month and ";
            }
            day = Math.floor((time%2630016)/86400);
            res += ((day<9)?"0":"")+ day + " days left";
          }
        }
        else
        {
            hour = Math.floor(time/3600);
            min = Math.floor((time%3600)/60);
            sec =  Math.floor((time%3600)%60);
            res = ((hour<9)?"0":"")+ hour+":"+ ((min<9)?"0":"")+ min +":"+ ((sec<9)?"0":"")+ sec;
        }
        
        return res;
    }

}