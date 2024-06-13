const os = require('os');
const express = require('express');

const app = express();

const networkInterfaces = os.networkInterfaces();
  const macAddress = networkInterfaces; // Change 'eth0' to your network interface name
  console.log(networkInterfaces)

