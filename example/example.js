var geojson2mvt = require('./src');

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

geojson2mvt(filePath, options);

