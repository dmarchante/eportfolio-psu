require([
    "esri/Map",
    "esri/views/MapView",
    "esri/geometry/Point",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/Graphic",
    "dojo/domReady!"
  ], function(Map, MapView, Point, SimpleMarkerSymbol, Graphic) {

    var home = {
      city: 'Naples',
      state: 'Florida',
      county: 'Collier',
      lat: 26.200,
      lon: -81.739,
      est: 1949,
      population: 357305
    };

    var map = new Map({
      basemap: "terrain",

    });

    var view = new MapView({
      container: "viewDiv",
      map: map,
      zoom: 9,
      center: [home.lon, home.lat] // longitude, latitude
    });

    var pt = new Point ({
      latitude: home.lat,
      longitude: home.lon
    });

    var sym = new SimpleMarkerSymbol ({
      color: "blue",
      style: "square",
      size: 12
    });

    var ptGraphic = new Graphic ({
      geometry: pt,
      symbol: sym
    });

    view.graphics.add(ptGraphic);

});