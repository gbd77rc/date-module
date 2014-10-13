// Copyright © 2009-2014 E-Tale Marketing Solutions Ltd.
// All rights are reserved. Reproduction or transmission in whole or in part, in
// any form or by any means, electronic, mechanical or otherwise, is prohibited
// without the prior written consent of the copyright owner.

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
    var month = date.getUTCMonth() +  1;
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

var toEndOfDayOnly = function (date) {
    date = checkDate(date);
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth();
    var day = date.getUTCDate();

    return new Date(Date.UTC(year, month, day,23,59,59,999));
};

var toDateString = function(date){
    date= checkDate(date);
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth() +  1;
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
    toEndOfDayOnly : toEndOfDayOnly,
    toDateString : toDateString,
    convertPropertyToDate : convertPropertyToDate
};