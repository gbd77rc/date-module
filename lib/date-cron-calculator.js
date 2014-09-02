// This module will allow the user to create an object that will represent a CRON pattern. It will take the pattern in
// and produce the next valid date/time based on the pattern.
//
// The object has various methods to allow the user to workout the next valid date/time.  It will allow the user to
// pass in a scheduling rule and from this a CRON pattern will be created.

var scheduleRule = {
    triggerDate : new Date(),
    repeatable : false
}

var createRule = function(date){
    "use strict";
    var rule = {
        triggerDate : date,
        repeatable : false,
        cronPattern : "",
        every : 0,
        momentStart: true,  // True = start on the minute, hour or midnight.
        momentType: 0,  // 0 = seconds, 1 = minutes, 2 = hours, 3 = days, 4 = months
        daysTrigger : [0], // 0 = Any, 1 = Sun, 2 = Mon, 3 = Tue, 4 = Wed, 5 = Thu, 6 = Fri, 7 = Sat, 8 = Weekdays, 9 = Weekends
        momentDay : 0, // 0 = none, 1 = first, 2 = second, 3 = third, 4 = last
        monthTrigger : [0] // 0 = Any, 1 = Jan, 2 = Feb, 3 = Mar, 4 = Apr, 5 = May, 6 = Jun, 7 = Jul, 8 = Aug, 9 = Sep, 10 = Oct, 11 = Nov, 12 = Dec
    }
    return rule;
}
var ops = ['-',',', '/', '*', '?', 'L', 'W', '#'];
var dayFullNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
var dayAbrNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
var monthFullNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthAbrNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var monthDays = [31, 28, 31,30, 31,30, 31, 31, 30, 31, 30, 31];
var leapYear = 2012;

var workoutRule = function(info){
    "use strict";
    if ( typeof info == "object" && info.getUTCDate != undefined ){
        // Must be a date, therefore a specific date and time to trigger
        return createRule(info);
    }
    return info;
}

var getSpecificDate = function(rule) {
    "use strict";
    rule.cronPattern = "";
    if (rule.repeatable == false && typeof rule.triggerDate == "object") {
        // Ok we have a single date/time so lets break it down
        // UTC only
        rule.cronPattern = rule.triggerDate.getUTCSeconds();
        rule.cronPattern += " ";
        rule.cronPattern += rule.triggerDate.getUTCMinutes();
        rule.cronPattern += " ";
        rule.cronPattern += rule.triggerDate.getUTCHours();
        rule.cronPattern += " ";
        rule.cronPattern += rule.triggerDate.getUTCDate();
        rule.cronPattern += " ";
        rule.cronPattern += rule.triggerDate.getUTCMonth();
        rule.cronPattern += " ?"
        rule.cronPattern += " ";
        rule.cronPattern += rule.triggerDate.getUTCFullYear();
    }
    return rule.cronPattern;
}

var workOutSecondPattern = function(rule){
    "use strict";
    var cron = "";
    var valueMarker = rule.momentStart ? "0" : "*";
    // Check if the rule is second based or not.
    if ( rule.momentType == 0 ){
        cron = valueMarker + "/" + rule.every;
    } else {
        cron = valueMarker;
    }
    return cron;
}

var workOutMinutePattern = function(rule){
    "use strict";
    var cron = "";
    var valueMarker = rule.momentStart ? (rule.momentType < 1 ? "*"  : "0" ): "*";
    // Check if the rule is minute based or not.
    if ( rule.momentType == 1 ){
        cron = valueMarker + "/" + rule.every;
    } else {
        cron = valueMarker;
    }
    return cron;
}

var workOutHourPattern = function(rule) {
    "use strict";
    var cron = "";
    var valueMarker = rule.momentStart ? (rule.momentType < 2 ?  "*"  : "0" ): "*";
    // Check if the rule is minute based or not.
    if ( rule.momentType == 2 ){
        cron = valueMarker + "/" + rule.every;
    } else {
        cron = valueMarker;
    }
    return cron;
}

var workOutDayPattern = function(rule){
    "use strict";
    var cron = "";
    var valueMarker = rule.momentStart ? (rule.momentType < 3 ?  "*"  : "1" ): "*";

    if (rule.momentType == 5){
        valueMarker = "?";
    }
    // Check if the rule is minute based or not.
    if ( rule.momentType == 3 ){
        cron = valueMarker + "/" + rule.every;
    } else {
        cron = valueMarker;
    }
    return cron;
}

var workOutMonthPattern = function(rule){
    "use strict";
    var cron = "";
    var valueMarker = rule.momentStart ? (rule.momentType < 4 ?  "*"  : "1" ): "*";
    if ( rule.momentType == 5){
        valueMarker = "*";
    }
    // Check if the rule is minute based or not.
    if ( rule.momentType == 4 ){
        cron = valueMarker + "/" + rule.every;
    } else {
        cron = valueMarker;
    }
    return cron;
}

var workOutDayOfWeekPattern = function(rule){
    "use strict";
    var cron = "";
    var valueMarker = rule.momentStart ? (rule.momentType < 6 ?  "*"  : "1" ): "*";
    if ( rule.momentType == 3) {
        valueMarker = "?";
    }
    // Check if the rule is minute based or not.
    if ( rule.momentType == 5 ){
        // work out the day(s)
        for( var j = 0; j < rule.daysTrigger.length; j++){
            var day = rule.daysTrigger[j];
            if ( day == 0 ){
                break;
            }
            if ( day == 9 ){
                cron = "SAT,SUN";
                break;
            }

            if ( day == 8 ){
                cron = "MON,TUE,WED,THU,FRI";
                break;
            }

            cron += dayAbrNames[day-1].toUpperCase();

            if ( j < rule.daysTrigger.length -1 ){
                cron += ",";
            }
        }

        if ( cron === "" ){
            cron ="*";
        }
    } else {
        cron = valueMarker;
    }
    return cron;
}

var workOutYearPattern = function(rule){
    "use strict";
    var cron = "";
    var valueMarker = "*";
    // Check if the rule is minute based or not.
    if ( rule.momentType == 6 ){
        cron = valueMarker + "/" + rule.every;
    } else {
        cron = valueMarker;
    }
    return cron;
}

var getRepeatDate = function(rule){
    "use strict";
    if ( rule.every > 0 ){
        // Ok we know its an every n type.
        rule.cronPattern = workOutSecondPattern(rule) + " ";
        rule.cronPattern += workOutMinutePattern(rule) + " ";
        rule.cronPattern += workOutHourPattern(rule) + " ";
        rule.cronPattern += workOutDayPattern(rule) + " ";
        rule.cronPattern += workOutMonthPattern(rule) + " ";
        rule.cronPattern += workOutDayOfWeekPattern(rule) + " ";
        rule.cronPattern += workOutYearPattern(rule);
    }
    return rule.cronPattern.trim();
}

var calculator = function(info){
    "use strict";
    var rule = workoutRule(info);
    if (getSpecificDate(rule).length > 0 ){
        return rule.cronPattern;
    } else if ( getRepeatDate(rule).length > 0 ){
        return rule.cronPattern;
    }
}
var parseCron = function(pattern){
    "use strict";
    // Ops meaning
    // , = specific values
    // - = range of values
    // * = all values
    // / = start value/increment by
    // ? = no specific value as it defined in the other day field
    // L = Last day of
    // W = Weekdays only
    // # = nth day of the month

    // s = seconds         ops : , - * /
    // m = minutes         ops : , - * /
    // h = hours           ops : , - * /
    // d = day of month    ops : , - * / ? L W
    // M = month           ops : , - * /
    // w = day of week     ops : , - * / ? L #
    // y = year            ops : , - * /

    // 5 pattern cron is m h d M w
    // 6 pattern cron is s m h d M w
    // 7 pattern cron is s m h d M w y

    // Each parse will return the number of seconds before the next trigger for that time part.
    // Take pattern  0/30 * * * * * *  Trigger every 30 seconds
    // Current time is 12:34:10
    // Parsing would return 20 -1 -1 -1 -1 -1 -1
    // 20 seconds before we trigger.
    // Take pattern 0 0 4 * * * * Trigger at every 4am
    // Current time is 12:34:10
    // Parsing would return 0 0


    if ( pattern.indexOf(" ") > -1){
        var parts = pattern.split(" ");
        var current = new Date();
        var timeIdx = parts.length > 5 ? 1 : 0;

        if ( parts.length > 5) {
            var second = parseMoment(parts[0], current.getUTCSeconds());
        }
        var minute = parseMoment(parts[timeIdx++], current.getUTCMinutes());
        var hour = parseMoment(parts[timeIdx++], current.getUTCHours(), 24);

        var dayIdx = timeIdx;
        var monthIdx = dayIdx + 1;
        var dayWeekIdx = dayIdx + 2;
        var yearIdx = dayIdx + 3;

        var month = parseMonth(parts[monthIdx], current);
        var day = parts[dayIdx] == "?" ? -1 :  parseMoment(parts[dayIdx], current.getUTCDate(), 24);
        var dayOfWeek = parts[dayWeekIdx] == "?" ? -1 : parseMoment(parts[dayWeekIdx++], current.getUTCDay(), 24);

        if ( parts.length > 6 ) {
            var year = parseMoment(parts[yearIdx], current.getUTCFullYear());
        }
    }
}

var parseMoment = function(part, moment, maxMoment){
    // Allowed operators =  , - * /
    "use strict";
    if( maxMoment === undefined){
        maxMoment = 60;
    }
    if ( part !== "*" ){
        // Check if we are increment
        if ( part.indexOf("/") > -1){
            var incs = part.split("/");

            // Workout the starting point.
            var start = incs[0] == "*" ? moment :  parseInt(incs[0]);
            var inc = parseInt(incs[1]);
            return incrementFormula(moment, start, inc, maxMoment );
        }

        // Check if we are range
        if (part.indexOf("-") > -1){
            var ranges = part.split("-");
            var start = parseInt(ranges[0]);
            var end = parseInt(ranges[1]);
            return rangeFormula(moment, start, end, maxMoment);
        }

        // Check if we are additional values
        if ( part.indexOf(",") > -1){
            var extras =  part.split(",");
            return additionalFormula(moment, extras);
        } else {
            var num = parseInt(part);
            if ( isNaN(num)== false ){
                return num;
            }
        }
    }
    return -1;
}

var capitalizeString = function(string){
    "use strict"
    var newString = string.toLowerCase();
    return newString.charAt(0).toUpperCase() + newString.substr(1);
}

var parseDayMonth = function(pattern, month, date){
    // Allowed operators =  , - * / ? L W
    // allowed values 1 - 31
    "use strict";
    if ( pattern != "*"){
        var maxDays = monthDays[month-1];  // month is 1 based index
        var currentDay = date.getUTCDate();
        if ( month == 2 && ((date.getUTCFullYear() - leapYear) % 4) == 0 ){
            maxDays = 29;
        }
        // Check if we are increment
        if ( pattern.indexOf("/") > -1){
            var incs = pattern.split("/");
            var start = currentDay;
            var startPart = parseInt(incs[0]);
            if( isNaN(startPart)) {
                if (incs[0] === "*") {
                    startPart = start;
                }
            }
            var incPart = parseInt(incs[1]);
            return incrementFormula(start, startPart, incPart,maxDays);
        }

        // Check if we are range
        if (pattern.indexOf("-") > -1){
            var ranges = pattern.split("-");
            var start = currentDay;
            var startPart = parseInt(ranges[0]);
            var endPart = parseInt(ranges[1]);
            return rangeFormula(start, startPart, endPart, maxDays);
        }

        // Check if we are additional values
        if ( pattern.indexOf(",") > -1){
            var extras =  pattern.split(",");
            //  Convert to numbers if Months
            for(var i = 0; i < extras.length; i++){
                extras[i] = parseInt(extras[i]);
            }
            return additionalFormula(currentDay, extras);
        } else {
            var num = parseInt(pattern);
            if ( isNaN(num)== false ){
                return num;
            }
        }
    }
    return -1;
}



var parseMonth = function(pattern, date){
    "use strict";
    // ops , - * /
    // allowed values 1-31, JAN-DEC
    // JavaScript months start at Zero, also the arrays start at 0 as well.
    var month = date.getUTCMonth()+ 1;
    if ( pattern !== "*" ){
        // Check if we are increment
        if ( pattern.indexOf("/") > -1){
            var incs = pattern.split("/");
            var start = month;
            var startPart = parseInt(incs[0]);
            var incPart = parseInt(incs[1]);

            // Workout the starting point.  It can be number of a month abbreviated name
            if ( isNaN(startPart)){
                startPart = incs[0] == "*" ? start : monthAbrNames.indexOf(capitalizeString(incs[0])) + 1;
            }
            return incrementFormula(start, startPart, incPart,12);
        }

        // Check if we are range
        if (pattern.indexOf("-") > -1){
            var ranges = pattern.split("-");
            var start = date.getUTCMonth() + 1;
            var startPart = parseInt(ranges[0]);
            var endPart = parseInt(ranges[1]);
            if ( isNaN(startPart)){
                startPart = monthAbrNames.indexOf(capitalizeString(ranges[0])) + 1;
            }
            if ( isNaN(endPart)){
                endPart = monthAbrNames.indexOf(capitalizeString(ranges[1])) + 1;
            }
            return rangeFormula(start, startPart, endPart, 12);
        }

        // Check if we are additional values
        if ( pattern.indexOf(",") > -1){
            var extras =  pattern.split(",");
            //  Convert to numbers if Months
            for(var i = 0; i < extras.length; i++){
                if ( isNaN(extras[i])){
                    extras[i] = monthAbrNames.indexOf(capitalizeString(extras[i])) + 1;
                } else {
                    extras[i] = parseInt(extras[i]);
                }
            }
            return additionalFormula(date.getUTCMonth() + 1, extras);
        } else {
            var num = parseInt(pattern);
            if ( isNaN(num)== false ){
                return num;
            }
        }
    }
    return -1;
}

var parseDayOfMonth = function(dayPart, monthPart, date){
    "use strict";
    // Ops ? L W
    // We can have 1 to 31W or LW
    // LW mean last working day.
    var ops = dayPart.toUpperCase();
    if (ops.indexOf("W") > -1 ){
        if ( ops.indexOf("L") == 0  ){
            // Need to work out the last working day of the month.

        }
    }
}

var additionalFormula = function(t1, extras){
    "use strict";
    for(var i = 0; i < extras.length; i++ ){
        var num = parseInt(extras[i]);
        if ( isNaN(num) == false ){
            if ( t1 < num ){
                return num;
            }
        }
    }
    return extras[0];
}
// t1 = current time part
// s1 = start time part
// i = increment
// m = maximum Value
var incrementFormula = function(t1, s1, i, m){
    "use strict";
    if ( m === undefined){
        m = 60;
    }
    var inc = Math.floor((t1 - s1)/i)+ 1;
    var result = s1 + (i * inc);
    if ( result >= m ){
        result = s1 == t1 ? (result - m) : s1;
    }
    return result;
}

// t1 = current time part
// s1 = range start time part
// s2 = range end time part
// m = maximum Value
var rangeFormula = function(t1, s1, s2, m){
    "use strict";
    if ( m === undefined){
        m = 60;
    }
    var i = 1;
    var inc = Math.floor((t1 - s1)/i)+ 1;
    var result = s1 + (i * inc);

    var lower = s1;
    var upper = s2 < s1 ?  m + s2 : s2;
    var test = result < s1 ? result + m : result;

    // Is result inside the range
    if (test >= lower && test <= upper){
        if ( result >= m ){
            result = (result - m);
        }
    } else {
        result = s1;
    }
    return result;
}

exports.createRule = createRule;
exports.calculator = calculator;
exports.parser = parseCron;
exports.incrementFormula = incrementFormula;
exports.rangeFormula = rangeFormula;
exports.additionalFormula = additionalFormula;
exports.parseMonth = parseMonth;
exports.parseDayMonth = parseDayMonth;