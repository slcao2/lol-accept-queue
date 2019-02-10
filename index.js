'use strict';

const fs = require('fs');
const ioHook = require('iohook');
const request = require('request');

const ENTER_KEY_CODE = 28;
const SPACE_KEY_CODE = 57;

const lockFileLocationOverride = process.argv[2];
const cleanedDirname = __dirname.slice(9);
const lockFileLocation = lockFileLocationOverride || cleanedDirname;
const lockFileName = 'lockfile';
const lockFileFull = `${lockFileLocation}${lockFileName}`;
const username = 'riot';
let password;
let port;

function btoa(string) {
  return Buffer.from(string).toString('base64');
}

function acceptQueue() {
  const url = `https://127.0.0.1:${port}/lol-matchmaking/v1/ready-check/accept`;
  const auth = btoa(`${username}:${password}`);
  const options = {
    url,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${auth}`
    },
    rejectUnauthorized: false,
  }

  request(options);
}

function fileExists(filepath, callback) {
  fs.access(filepath, (err) => {
    if (err) {
      callback(false);
    }
    else {
      callback(true);
    }
  });
}

function readLockFile(leaguePath) {
  fs.readFile(leaguePath, 'utf-8', (err, data) => {
    let dataArray;
    if (err) {
      throw err
    }
    dataArray = data.split(':');
    port = dataArray[2];
    password = dataArray[3];
  });
}

function startOrStopHook(exists) {
  if (exists) {
    readLockFile(lockFileFull);
    ioHook.start();
  }
  else {
    ioHook.stop();
  }
}

ioHook.on('keydown', event => {
  if (event && (event.keycode === ENTER_KEY_CODE || event.keycode === SPACE_KEY_CODE) && password && port) {
    acceptQueue();
  }
});

try {
  fs.watch(lockFileLocation, (eventType, filename) => {
    if (filename === lockFileName && eventType === 'rename') {
      fileExists(lockFileFull, exists => {
        startOrStopHook(exists);
      });
    }
  });
}
catch(error) {
  throw error;
}

fileExists(lockFileFull, exists => {
  startOrStopHook(exists);
});
