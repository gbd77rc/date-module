var should = require('should');
var assert = require('assert');
var formatter = require('../lib/date-formats');

describe("Format Date", function() {
    "use strict";
    var date = new Date(2014,9,2,15,30,30);  // UTC +1:00

    it('fileDate should be 20140902-1430', function () {
        var actual = formatter.toFileDateString(date);
        actual.should.be.exactly("20140902-1430");
    });
    it('dateString should be 2014-09-02', function () {
        var actual = formatter.toDateString(date);
        actual.should.be.exactly("2014-09-02");
    });
});