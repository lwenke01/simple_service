'use strict';

const angular = require('angular');
const app = angular.module('ArcadeApp', []);

require('./arcade-controller.js')(app);
require('./games-controller.js')(app);
require('./app-services.js')(app);