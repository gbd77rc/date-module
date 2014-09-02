var should = require('should');
var assert = require('assert');
var cron = require('../lib/date-cron-calculator');

describe("Parse DayMonth", function(){
    "use strict";
    describe("Parse as single value", function(){
        it("pattern = * on date of 01-08-2014 with a month of Aug should return -1",function(){
            var s2 = cron.parseDayMonth("*", 8, new Date(Date.UTC(2014,7,1,0,0,0)));
            s2.should.be.equal(-1);
        });
        it("pattern = 5 on date of 01-08-2014 should return 5",function(){
            var s2 = cron.parseDayMonth("5",8,new Date(Date.UTC(2014,7,1,0,0,0)));
            s2.should.be.equal(5);
        });
    });
    describe("Parse as increment value",function(){
        it("pattern = 1/1 on date of 01-08-2014 should return 2",function(){
            var s2 = cron.parseDayMonth("1/1", 8,new Date(Date.UTC(2014,7,1,0,0,0)));
            s2.should.be.equal(2);
        });
        it("pattern = 1/3 on date of 01-08-2014 should return 3",function(){
            var s2 = cron.parseDayMonth("1/3",8,new Date(Date.UTC(2014,7,1,0,0,0)));
            s2.should.be.equal(4);
        });
        it("pattern = 1/3 on date of 31-8-2014 should return 1",function(){
            var s2 = cron.parseDayMonth("1/3",8,new Date(Date.UTC(2014,7,31,0,0,0)));
            s2.should.be.equal(1);
        });
        it("pattern = */3 on date of 6-8-2014 should return 1",function(){
            var s2 = cron.parseDayMonth("*/3",8,new Date(Date.UTC(2014,7,6,0,0,0)));
            s2.should.be.equal(9);
        });
    });

    describe("Parse as range value",function(){
        it("pattern = 5-9 on date of 01-08-2014 should return 5",function(){
            var s2 = cron.parseDayMonth("5-9",8,new Date(Date.UTC(2014,7,1,0,0,0)));
            s2.should.be.equal(5);
        });
        it("pattern =  31-2 on date of 01-12-2014 should return 2",function(){
            var s2 = cron.parseDayMonth("31-2",12,new Date(Date.UTC(2014,11,1,0,0,0)));
            s2.should.be.equal(2);
        });
        it("pattern =  31-2 on date of 30-11-2014 should return 1",function(){
            var s2 = cron.parseDayMonth("31-2",11,new Date(Date.UTC(2014,10,30,0,0,0)));
            s2.should.be.equal(1);
        });
    });

    describe("Parse as specific value",function(){
        it("pattern = 5,6,8,10 on date of 01-08-2014 should return 10",function(){
            var s2 = cron.parseDayMonth("5,6,8,10",8,new Date(Date.UTC(2014,7,8,0,0,0)));
            s2.should.be.equal(10);
        });
        it("pattern = 1,5,9,11 on date of 01-12-2014 should return 1",function(){
            var s2 = cron.parseDayMonth("1,5,9,11",12,new Date(Date.UTC(2014,11,12,0,0,0)));
            s2.should.be.equal(1);
        });

    });


});