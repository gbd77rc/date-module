// Copyright (C) 2014 Richard Clarke (Based on MIT)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
// Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
// WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
// OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE

var utils = require('util');

var checkDate = function(date){
    if ( date.getUTCFullYear == undefined) {
        // ok more then likely we are a string
        if ( typeof date == "string"){
            date = new Date(date);
        } else {
            // Default to today
            date = new Date();
        }
    }
    return date;
}

var toFileDateString = function (date) {
    date = checkDate(date);
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth();
    var day = date.getUTCDate();
    var hour = date.getUTCHours();
    var minute = date.getUTCMinutes();

    var string = year.toString();
    string += (month < 10) ? "0" + month.toString() : month.toString();
    string += (day < 10) ? "0" + day.toString() : day.toString();
    string += "-";
    string += (hour < 10) ? "0" + hour.toString() : hour.toString();
    string += (minute < 10) ? "0" + minute.toString() : minute.toString();
    return string;
};
var toDateOnly = function (date) {
    date = checkDate(date);
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth();
    var day = date.getUTCDate();

    return new Date(Date.UTC(year, month, day,0,0,0));
};

var toDateString = function(date){
    date= checkDate(date);
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth();
    var day = date.getUTCDate();
    return utils.format('%s-%s-%s', year, month < 10 ? "0" + month : month, day < 10 ? "0" + day : day);
};

var convertPropertyToDate = function(item, propertyName){
    if ( item != undefined ) {
        for (var prop in item) {
            if (item.hasOwnProperty(prop) && prop === propertyName && typeof item[prop] === "string") {
                item[prop] = new Date(item[prop]);
            }
        }
    }
};

module.exports = {
    toFileDateString : toFileDateString,
    toDateOnly : toDateOnly,
    toDateString : toDateString,
    convertPropertyToDate : convertPropertyToDate
};