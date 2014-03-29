var Launchpad = require('./lib/launchpad.js');

var LaunchpadApp = function (listeners) {
  var pad = new Launchpad();

  for (ev in listeners)
    pad.on(ev, listeners[ev].bind(pad));

  process.on('SIGINT', pad.stop.bind(pad));
  pad.midi.get.on('message', function (delta, msg) {
    var pos = (msg[0] == 144)
            ? [msg[1] % 16, 8 + ~(msg[1] / 16)]
            : [msg[1] - 104, 8];
    pad.emit('key', (msg[2] == 127), pos);
  });

  pad.emit('start');
  return pad;
}

LaunchpadApp.colors = require('./lib/colors.js');
LaunchpadApp.buttons = require('./lib/buttons.js');

module.exports = LaunchpadApp;
