require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/MapImageLayer",
  "dojo/domReady!"
], function(
  Map,
  MapView,
  MapImageLayer
) {

  var map = new Map({
    basemap: "streets",
    
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-100, 40],
    zoom: 5
  });

  var layer = new MapImageLayer({
   url: "http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Hurricanes/NOAA_Tracks_1851_2007/MapServer",
    sublayers: [
      {
        id: 3,
        visible: true
      },
      {
        id: 2,
        visible: false
      },
      {
        id: 1,
        visible: false
      },
      {
        id: 0,
        visible: false
      },
    ],
    
  });

  layer.opacity = 0.5;
  map.add(layer);

});