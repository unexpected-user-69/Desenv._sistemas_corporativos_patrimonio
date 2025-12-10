// Bootstrap file to load crypto globally before starting the app
globalThis.crypto = require('crypto');
require('./dist/src/main.js');
