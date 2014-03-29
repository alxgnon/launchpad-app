var Launchpad = function () {
  var RtMidi = require('midi');
  this.midi = {get: new RtMidi.input(), put: new RtMidi.output()};
  this.midi.get.openPort(0);
  this.midi.put.openPort(0);
  this.reset();
}

require('util').inherits(Launchpad, require('events').EventEmitter);

proto = Launchpad.prototype;

proto.set = function (pos, color) {
  var msg = (pos[1] == 8)
          ? [176, 104 + pos[0], color]
          : [144, 112 + pos[0] - 16 * pos[1], color];
  this.midi.put.sendMessage(msg);
  return this;
}

proto.fill = function (color) {
  for (var i = 0; i < 32; i++)
    this.midi.put.sendMessage([146, color, color]);
  return this;
}

proto.reset = function () {
  this.midi.put.sendMessage([176, 0, 0]);
  return this;
}

proto.stop = function () {
  setTimeout(process.exit, 1000);
  this.emit('stop');
  this.reset();
  this.midi.get.closePort();
  this.midi.put.closePort();
}

module.exports = Launchpad;
