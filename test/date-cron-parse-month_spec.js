var should = require('should');
var assert = require('assert');
var cron = require('../lib/date-cron-calculator');

describe("Parse Month", function(){
    "use strict";
    describe("Parse as single value", function(){
        it("pattern = * on date of 01-08-2014 should return -1",function(){
            var s2 = cron.parseMonth("*",new Date(Date.UTC(2014,7,1,0,0,0)));
            s2.should.be.equal(-1);
        });
        it("pattern = 5 on date of 01-08-2014 should return 5",function(){
            var s2 = cron.parseMonth("5",new Date(Date.UTC(2014,7,1,0,0,0)));
            s2.should.be.equal(5);
        });
    });
    describe("Parse as increment value",function(){
        it("pattern = 1/1 on date of 01-08-2014 should return 9",function(){
            var s2 = cron.parseMonth("1/1",new Date(Date.UTC(2014,7,1,0,0,0)));
            s2.should.be.equal(9);
        });
        it("pattern = JAN/1 on date of 01-08-2014 should return 9",function(){
            var s2 = cron.parseMonth("JAN/1",new Date(Date.UTC(2014,7,1,0,0,0)));
            s2.should.be.equal(9);
        });
        it("pattern = JAN/1 on date of 01-12-2014 should return 1",function(){
            var s2 = cron.parseMonth("JAN/1",new Date(Date.UTC(2014,11,1,0,0,0)));
            s2.should.be.equal(1);
        });
    });

    describe("Parse as range value",function(){
        it("pattern = 5-9 on date of 01-08-2014 should return 9",function(){
            var s2 = cron.parseMonth("5-10",new Date(Date.UTC(2014,7,1,0,0,0)));
            s2.should.be.equal(9);
        });
        it("pattern = MAY-SEP on date of 01-08-2014 should return 9",function(){
            var s2 = cron.parseMonth("MAY-SEP",new Date(Date.UTC(2014,7,1,0,0,0)));
            s2.should.be.equal(9);
        });
        it("pattern =  11-2 on date of 01-12-2014 should return 1",function(){
            var s2 = cron.parseMonth("11-2",new Date(Date.UTC(2014,11,1,0,0,0)));
            s2.should.be.equal(1);
        });
        it("pattern =  NOV-FEB on date of 01-12-2014 should return 1",function(){
            var s2 = cron.parseMonth("NOV-FEB",new Date(Date.UTC(2014,11,1,0,0,0)));
            s2.should.be.equal(1);
        });

    });

    describe("Parse as specific value",function(){
        it("pattern = 5,6,8,10 on date of 01-08-2014 should return 10",function(){
            var s2 = cron.parseMonth("5,6,8,10",new Date(Date.UTC(2014,7,1,0,0,0)));
            s2.should.be.equal(10);
        });
        it("pattern = JAN,MAY,SEP,NOV on date of 01-08-2014 should return 9",function(){
            var s2 = cron.parseMonth("JAN,MAY,SEP,NOV",new Date(Date.UTC(2014,7,1,0,0,0)));
            s2.should.be.equal(9);
        });
        it("pattern =  JAN,MAY,SEP,NOV on date of 01-12-2014 should return 1",function(){
            var s2 = cron.parseMonth("JAN,MAY,SEP,NOV",new Date(Date.UTC(2014,11,1,0,0,0)));
            s2.should.be.equal(1);
        });
        it("pattern = 1,5,9,11 on date of 01-12-2014 should return 1",function(){
            var s2 = cron.parseMonth("1,5,9,11",new Date(Date.UTC(2014,11,1,0,0,0)));
            s2.should.be.equal(1);
        });

    });
});