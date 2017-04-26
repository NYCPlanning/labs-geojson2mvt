var fs = require('fs');
var vtpbf = require('vt-pbf');
var geojsonvt =  require('geojson-vt');

var helpers = require('./helpers.js');

var geojson2mvt = function(geoJson, options) {

    var tileIndex = geojsonvt(geoJson, {
        maxZoom: options.zoom.max,
        indexMaxZoom: options.zoom.max,
        indexMaxPoints: 0
    });

    // create the "root directory" to place downloaded tiles in
    try {fs.mkdirSync(options.rootDir, 0777);}
    catch(err){
        if (err.code !== 'EEXIST') callback(err);
    }

    var tileCount = 0,
      tileCoords = {},
      tileBounds;

    for(var z=options.zoom.min; z<=options.zoom.max; z++) {

        //create z directory in the root directory
        var zPath = `${options.rootDir}/${z.toString()}/`;
        try{ fs.mkdirSync(zPath, 0777) }
        catch (err){
            if (err.code !== 'EEXIST') callback(err);
        }

        // get the x and y bounds for the current zoom level
        var tileBounds = helpers.getTileBounds(options.bbox, z);
        console.log(tileBounds)

        // x loop
        for(var x=tileBounds.xMin; x<=tileBounds.xMax; x++) {

            // create x directory in the z directory
            var xPath = zPath + x.toString();
            try{ fs.mkdirSync(xPath, 0777) }
            catch (err){
                if (err.code !== 'EEXIST') callback(err);
            }


            // y loop
            for(var y=tileBounds.yMin; y<=tileBounds.yMax; y++) {

                console.log(`Getting tile ${z} ${x} ${y} `)
                var mvt = getTile(z, x, y, tileIndex, options);

                // TODO what should be written to the tile if there is no data?
                var output = mvt !== null ? mvt : '';
                fs.writeFileSync(`${xPath}/${y}.mvt`, output);
                tileCount++;

            }
        }
    }

    console.log('Done! I made ' + tileCount + ' tiles!');
};




 function getTile(z, x, y, tileIndex, options) {
    var tile = tileIndex.getTile(z, x, y);

    if (tile != null) {
        var pbfOptions = {};

        pbfOptions[options.layerName] = tile;
        var pbf = vtpbf.fromGeojsonVt(pbfOptions);

        return pbf;
    }

    return null;
};


module.exports = geojson2mvt;
