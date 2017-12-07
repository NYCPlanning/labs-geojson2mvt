var fs = require('fs');
var geojson2mvt = require('../src');

var options = {
  layers: {
    layer0: JSON.parse(fs.readFileSync('bus_routes.geojson', "utf8")),
    layer1: JSON.parse(fs.readFileSync('stops.geojson', "utf8"))
  },
  rootDir: 'tiles',
  bbox : [40.426042,-74.599228,40.884448,-73.409958], //[south,west,north,east]
  zoom : {
    min : 8,
    max : 18,
  }
};
// build the static tile pyramid
geojson2mvt(options);
