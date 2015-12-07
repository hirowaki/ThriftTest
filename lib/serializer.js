'use strict';

var thrift = require('thrift');

function serialize(source) {
    var binary = null;

    // hook up onFlush.
    function _onFlush(msg, seqid) {
        // see framed_transport.js in thrift.
        // >     var msg = new Buffer(out.length + 4);
        // >     binary.writeI32(msg, out.length);
        // >     out.copy(msg, 4, 0, out.length);
        // >         this.onFlush(msg, seqid);

        void(seqid);
        binary = msg;

        // flush added binary.length at the top. let's remove it.
        binary = binary.slice(4);
    }

    var transport = new thrift.TFramedTransport(null, _onFlush);
    var protocol = new thrift.TBinaryProtocol(transport);

    // this will generate a binary image in outBuffers which is pile of Buffer.
    source.write(protocol);

    // this will serialize outBuffers to binary and will pass it to onFlush.
    transport.flush();

    return binary;
}

function deserialize(dest, binary) {
    // set binary to inBuf.
    var transport = new thrift.TFramedTransport(binary);
    var protocol = new thrift.TBinaryProtocol(transport);

    // read data from transport.inBuf.
    dest.read(protocol);
}

module.exports = {
    serialize:  serialize,
    deserialize: deserialize
};
