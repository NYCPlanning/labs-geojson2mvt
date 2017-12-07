# geojson2mvt

Cuts a file pyramid of static vector tiles (.mvt) from a geojson file

# Why

We are using mapboxGL in [The Capital Planning Platform](http://capitalplanning.nyc.gov), and needed an alternative to downloading large static data files for local rendering on the map.  We didn't want to put them into a service that would require $ and maintenance, so static vector tiles seemed like a useful alternative for data that will not change very often.

## How to Use

Install
`npm install geojson2mvt`

`geojson2mvt` takes a config object with the GeoJSONs to encode and other options, and builds the pyramid in the specified output directory

```
var fs = require('fs');
var geojson2mvt = require('geojson2mvt');

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
```
Check out `/example` for a test project that you can try locally

## Options

`layers` - Object<string,Object> (required) - GeoJSONs to create a vector tileset from. Keys are the layer names that will be used to access data from the respective GeoJSON when displaying data from the MVT.

`rootDir` - string (required) - the filepath of the directory that will be the root of the file pyramid.  It will be created if it doesn't exist.

`bbox` - array (required) - array of lat/lon bounds like `[s,w,n,e]`

`zoom` - object (required) - object with `min` and `max` properties for the desired zoom levels in the tile pyramid

## Backwards compatibility

Instead of providing a single config object, you can provide two arguments: a geoJson and config object without a `layers` property, but instead with a `layerName` property for the name for the imported geoJson in the MVT.
