var fs = require('fs');
var geojson2mvt = require('../src');

var options = {
  rootDir: 'tiles',
  bbox : [40.426042,-74.599228,40.884448,-73.409958], //[south,west,north,east]
  zoom : {
    min : 8,
    max : 18,
  },
  layerNames: ['lines', 'stops'],
};

var lines = JSON.parse(fs.readFileSync('bus_routes.geojson', "utf8"));
var stops = JSON.parse(fs.readFileSync('stops.geojson', "utf8"));

// build the static tile pyramid
geojson2mvt([lines, stops], options);
