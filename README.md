# geojson2mvt

Cuts a file pyramid of static vector tiles (.mvt) from a geojson file

# Why

We are using mapboxGL in [The Capital Planning Platform](http://capitalplanning.nyc.gov), and needed an alternative to downloading large static data files for local rendering on the map.  We didn't want to put them into a service that would require $ and maintenance, so static vector tiles seemed like a useful alternative for data that will not change very often.

## How to Use

Install
`npm install geojson2mvt`

`geojson2mvt` takes an array of geojson objects and a config object, and builds the the pyramid in the specified output directory

```
var fs = require('fs');
var geojson2mvt = require('geojson2mvt');

var options = {
  rootDir: 'tiles',
  bbox : [40.426042,-74.599228,40.884448,-73.409958], //[south,west,north,east]
  zoom : {
    min : 8,
    max : 18,
  },
  layerNames: ['layer0', 'layer1']
};

var geoJsons = [
  JSON.parse(fs.readFileSync('bus_routes.geojson', "utf8")),
  JSON.parse(fs.readFileSync('stops.geojson', "utf8")),
]

// build the static tile pyramid
geojson2mvt(geoJsons, options);
```
Check out `/example` for a test project that you can try locally

## Options

`rootDir` - string (required) - the filepath of the directory that will be the root of the file pyramid.  It will be created if it doesn't exist.

`bbox` - array (required) - array of lat/lon bounds like `[s,w,n,e]`

`zoom` - object (required) - object with `min` and `max` properties for the desired zoom levels in the tile pyramid

`layerNames` - Array<string> (required) - names of the layers in the vector tile that the data will be stored in.  Names are in the same order as the provided `geoJsons`. When displaying data from an MVT, you must specify which layer to use.

## Backwards compatibility

Instead of providing an array of `geoJsons`, a single geoJson can also be provided. In that case, the `options` have to contain a `layerName` property with the name for the imported geoJson as value.
