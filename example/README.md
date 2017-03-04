#geojson2mvt example

This example will cut vector tiles from a geojson file of NYC's bus routes.  

## How to Use

Be sure to install dependencies on the `geojson2mvt` root directory
`npm install`

Run the script
`node script.js`

## How it works

```
// require geojson2mvt
var geojson2mvt = require('./src');

// specify the path to the geojson file
const filePath = './bus_routes.geojson';

// create an options object
var options = {
  rootDir: 'tiles',
  bbox : [40.426042,-74.599228,40.884448,-73.409958], //[south,west,north,east]
  zoom : {
    min : 8,
    max : 18,
  },
  layerName: 'layer0',
};

// call geojson2mvt
geojson2mvt(filePath, options);
```
##Try them out with Maputnik
Also in this example directory is a modified python SimpleHTTPServer that will not have any CORS issues.  Run it like `python cors_server.py` and it will create a webserver in this directory.  The tile pyramid should now be available at `http://localhost:31338/tiles/{z}/{x}/{y}.mvt`

Create a new xyz Vector Tile source in Maputnik with this template, and you should be able to add a style with your freshly cut vector tiles.

Happy Mapping!
