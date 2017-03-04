#geojson2mvt
Cuts a file pyramid of static vector tiles (.mvt) from a geojson file

##How to Use
Install
`npm install geojson2mvt`

`geojson2mvt` takes a filepath and a config object, and builds the the pyramid in the specified output directory

```
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
```

##Options

`rootDir` - string (required) - the filepath of the directory that will be the root of the file pyramid.  It will be created if it doesn't exist.