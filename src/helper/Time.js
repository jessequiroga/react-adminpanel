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
            years = Math.round(time/31556925.216);
            res = years +" years left";
          }
          else
          {
            month = Math.round(time/2630016);
            if(month>0)
            {
                res = month + " month and ";
            }
            day = Math.round((time%2630016)/86400);
            res += day + " days left";
          }
        }
        else
        {
            hour = Math.round(time/3600);
            min = Math.round((time%3600)/60);
            sec =  Math.round((time%3600)%60);
            res =hour+":"+min+":"+sec;
        }
        
        return res;
    }

}