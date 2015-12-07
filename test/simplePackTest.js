'use strict';

var assert = require('assert');
var TestData = require('./../thrift_files/gen-nodejs/test_types.js').TestData;
var serialize = require('./../lib/serializer.js').serialize;
var deserialize = require('./../lib/serializer.js').deserialize;

describe('serializer tests.', function () {
    describe('serialize / deserialize.', function () {
        it('general test', function () {
            var source = new TestData();
            source.id = 1;
            source.name = "testData";

            var encodedBinary = serialize(source);
            assert.ok(!!encodedBinary);

            var dest = new TestData();
            deserialize(dest, encodedBinary);

            assert.strictEqual(dest.id, 1);
            assert.strictEqual(dest.name, "testData");
        });
    });
});

