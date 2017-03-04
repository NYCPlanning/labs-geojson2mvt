var helpers = {
  //given a bounding box and zoom level, calculate x and y tile ranges
  getTileBounds(bbox, zoom) {
      var tileBounds = {  
        xMin: this.long2tile(bbox[1], zoom),
        xMax: this.long2tile(bbox[3], zoom),
        yMin: this.lat2tile(bbox[2], zoom),
        yMax: this.lat2tile(bbox[0], zoom), 
      };
      return tileBounds;
  },

  //lookup tile name based on lat/lon, courtesy of http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Lon..2Flat._to_tile_numbers
  long2tile(lon,zoom) { 
    return (Math.floor((lon+180)/360*Math.pow(2,zoom)));
  },

  lat2tile(lat,zoom) { 
    return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); 
  },
};


module.exports = helpers;
