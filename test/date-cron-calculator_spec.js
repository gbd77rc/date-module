var should = require('should');
var assert = require('assert');
var cron = require('../lib/date-cron-calculator');

describe("CRON Calculator", function(){
    describe('Increment formula for calculating next start value', function(){
        "use strict";
        it('t1 = 16, s1=0, i=15 would be 30',function(){
            var s2 = cron.incrementFormula(16, 0, 15);
            s2.should.be.equal(30);
        });

        it('t1 = 16, s1=20, i=15 would be 20',function(){
            var s2 = cron.incrementFormula(16, 20, 15);
            s2.should.be.equal(20);
        });

        it('t1 = 12, s1=0, i=15 would be 15',function(){
            var s2 = cron.incrementFormula(12, 0, 15);
            s2.should.be.equal(15);
        });

        it('t1 = 32, s1=0, i=15 would be 45',function(){
            var s2 = cron.incrementFormula(32, 0, 15);
            s2.should.be.equal(45);
        });

        it('t1 = 46, s1=0, i=15 would be 0',function(){
            var s2 = cron.incrementFormula(46, 0, 15);
            s2.should.be.equal(0);
        });

        it('t1 = 16, s1=5, i=15 would be 20',function(){
            var s2 = cron.incrementFormula(16, 5, 15);
            s2.should.be.equal(20);
        });

        it('t1 = 12, s1=5, i=15 would be 20',function(){
            var s2 = cron.incrementFormula(12, 5, 15);
            s2.should.be.equal(20);
        });

        it('t1 = 32, s1=5, i=15 would be 35',function(){
            var s2 = cron.incrementFormula(32, 5, 15);
            s2.should.be.equal(35);
        });

        it('t1 = 46, s1=5, i=15 would be 50',function(){
            var s2 = cron.incrementFormula(46, 5, 15);
            s2.should.be.equal(50);
        });

        it('t1 = 2, s1=0, i=1 would be 3',function(){
            var s2 = cron.incrementFormula(2, 0, 1);
            s2.should.be.equal(3);
        });

        it('t1 = 2, s1=2, i=1 would be 3',function(){
            var s2 = cron.incrementFormula(2, 2, 1);
            s2.should.be.equal(3);
        });

        it('t1 = 23, s1=0, i=1 would be 0 if 24hrs',function(){
            var s2 = cron.incrementFormula(23, 0, 1, 24);
            s2.should.be.equal(0);
        });

        it('t1 = 23, s1=0, i=2 would be 1 if 24hrs',function(){
            var s2 = cron.incrementFormula(23, 1, 2, 24);
            s2.should.be.equal(1);
        });

        it('t1 = 23, s1=23, i=1 would be 0 if 24hrs',function(){
            var s2 = cron.incrementFormula(23, 23, 1, 24);
            s2.should.be.equal(0);
        });

        it('t1 = 23, s1=23, i=2 would be 1 if 24hrs',function(){
            var s2 = cron.incrementFormula(23, 23, 2, 24);
            s2.should.be.equal(1);
        });

        it('t1 = 5, s1=1, i=1 would be 6 if 12 months',function(){
            var s2 = cron.incrementFormula(5, 1, 1, 12);
            s2.should.be.equal(6);
        });

        it('t1 = 12, s1=1, i=1 would be 1 if 12 months',function(){
            var s2 = cron.incrementFormula(12, 1, 1, 12);
            s2.should.be.equal(1);
        });

    });
    describe("Range formula for calculating next start value", function(){
        "use strict";
        it('t1 = 16, s1=15, s2 = 30 would be 17',function(){
            var s2 = cron.rangeFormula(16, 15, 30);
            s2.should.be.equal(17);
        });

        it('t1 = 31, s1=15, s2 = 30 would be 15',function(){
            var s2 = cron.rangeFormula(31, 15, 30);
            s2.should.be.equal(15);
        });

        it('t1 = 12, s1=15, s2 = 30 would be 15',function(){
            var s2 = cron.rangeFormula(12, 15, 30);
            s2.should.be.equal(15);
        });

        it('t1 = 12, s1=55, s2 = 15 would be 13',function(){
            var s2 = cron.rangeFormula(12, 55, 15);
            s2.should.be.equal(13);
        });

        it('t1 = 12, s1=55, s2 = 5 would be 55',function(){
            var s2 = cron.rangeFormula(12, 55, 5);
            s2.should.be.equal(55);
        });

        it('t1 = 2, s1=55, s2 = 05 would be 3',function(){
            var s2 = cron.rangeFormula(2, 55, 5);
            s2.should.be.equal(3);
        });

        it('t1 = 2, s1=0, s2 = 05 would be 3',function(){
            var s2 = cron.rangeFormula(2, 0, 5);
            s2.should.be.equal(3);
        });

        it('t1 = 2, s1=0, s2 = 05 would be 3',function(){
            var s2 = cron.rangeFormula(12, 10, 15);
            s2.should.be.equal(13);
        });
    });
    describe("Additional formula for calculating next start value", function() {
        "use strict";
        it('t1 = 16, extra = [12,14,16,18] would be 18', function () {
            var s2 = cron.additionalFormula(16, [12,14,16,18]);
            s2.should.be.equal(18);
        });
        it('t1 = 19, extra = [12,14,16,18] would be 12', function () {
            var s2 = cron.additionalFormula(19, [12,14,16,18]);
            s2.should.be.equal(12);
        });
        it('t1 = 15, extra = [12,14,16,18] would be 16', function () {
            var s2 = cron.additionalFormula(15, [12,14,16,18]);
            s2.should.be.equal(16);
        });
    });
    describe('will take a none repeatable rule',function(){
        it("The pattern should be 0 0 0 1 1 ? 2020", function(){
            var pattern = cron.calculator(new Date(2020,1,1,0,0,0));
            pattern.should.be.equal("0 0 0 1 1 ? 2020");
        });
        it("The pattern should be 30 59 12 1 1 ? 2020", function(){
            var pattern = cron.calculator(new Date(2020,1,1,12,59,30));
            pattern.should.be.equal("30 59 12 1 1 ? 2020");
        });
    });
    describe('will take a repeatable rule for every n momentType', function(){
        it("for every 30 seconds", function(){
            var rule = cron.createRule();
            rule.every = 30;
            var pattern = cron.calculator(rule);
            pattern.should.be.equal("0/30 * * * * * *");
        });

        it("for every 30 minutes starting on the minute", function(){
            var rule = cron.createRule();
            rule.every = 30;
            rule.momentType = 1;
            var pattern = cron.calculator(rule);
            pattern.should.be.equal("0 0/30 * * * * *");
        });

        it("for every 2 hours starting on the hour", function(){
            var rule = cron.createRule();
            rule.every = 2;
            rule.momentType = 2;
            var pattern = cron.calculator(rule);
            pattern.should.be.equal("0 0 0/2 * * * *");
        });

        it("for every 1 day at midnight", function(){
            var rule = cron.createRule();
            rule.every = 1;
            rule.momentType = 3;
            var pattern = cron.calculator(rule);
            pattern.should.be.equal("0 0 0 1/1 * ? *");
        });

        it("for every Monday at midnight", function(){
            var rule = cron.createRule();
            rule.every = 1;
            rule.momentType = 5;
            rule.daysTrigger = [2];
            var pattern = cron.calculator(rule);
            pattern.should.be.equal("0 0 0 ? * MON *");
        });

        it("for every weekend at midnight", function(){
            var rule = cron.createRule();
            rule.every = 1;
            rule.momentType = 5;
            rule.daysTrigger = [9];
            var pattern = cron.calculator(rule);
            pattern.should.be.equal("0 0 0 ? * SAT,SUN *");
        });
    });
});