# geojson2mvt

Cuts a file pyramid of static vector tiles (.mvt) from a geojson file

# Why

We are using mapboxGL in [The Capital Planning Platform](http://capitalplanning.nyc.gov), and needed an alternative to downloading large static data files for local rendering on the map.  We didn't want to put them into a service that would require $ and maintenance, so static vector tiles seemed like a useful alternative for data that will not change very often.

## How to Use

Install
`npm install geojson2mvt`

`geojson2mvt` takes a geojson object and a config object, and builds the the pyramid in the specified output directory

```
var fs = require('fs');
var geojson2mvt = require('geojson2mvt');

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
```
Check out `/example` for a test project that you can try locally

## Options

`rootDir` - string (required) - the filepath of the directory that will be the root of the file pyramid.  It will be created if it doesn't exist.

`bbox` - array (required) - array of lat/lon bounds like `[s,w,n,e]`

`zoom` - object (required) - object with `min` and `max` properties for the desired zoom levels in the tile pyramid

`layername` - string (required) - the name of the layer in the vector tile that the data will be stored in.  When displaying data from an MVT, you must specify which layer to use.  
