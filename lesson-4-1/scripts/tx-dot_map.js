require([
  "esri/Map",
  "esri/views/SceneView",
  "esri/layers/VectorTileLayer",
  "dojo/domReady!"
], function(
  Map,
  SceneView,
  VectorTileLayer
) {

  var map = new Map({
    basemap: "streets",
    
  });

  var view = new SceneView({
    container: "viewDiv",
    map: map,
    center: [-95.36, 29.76],
    zoom: 12
  });

  var layer = new VectorTileLayer({
   url: "https://tiles.arcgis.com/tiles/KTcxiTD9dsQw4r7Z/arcgis/rest/services/TxDOT_Vector_Tile_Basemap/VectorTileServer",
    
  });

  layer.opacity = 0.5;
  map.add(layer);

});