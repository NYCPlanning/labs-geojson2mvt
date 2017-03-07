var fs = require('fs');
var geojson2mvt = require('../src');

const filePath = './bus_routes.geojson';

var options = {
  rootDir: 'tiles',
  bbox : [40.426042,-74.599228,40.884448,-73.409958], //[south,west,north,east]
  zoom : {
    min : 8,
    max : 18,
  },
  layerName: 'layer0',
};

var geoJson = JSON.parse(fs.readFileSync(filePath, "utf8"));

// build the static tile pyramid
geojson2mvt(geoJson, options);
