require([
  "esri/views/MapView",
  "esri/WebMap",
  "dojo/domReady!"
], function (
  MapView,
  WebMap
) {

  var webmap = new WebMap({
    portalItem: { // autocasts as new PortalItem()
      id: "76f4919f2fdf42dfae2dbbeac3100dd4"
    }
  });


  var view = new MapView({
    map: webmap,
    container: "viewDiv"
  });
});