require([
  "esri/views/SceneView",
  "esri/WebMap",
  "dojo/domReady!"
], function (
  SceneView, 
  WebMap
) {

  var webmap = new WebMap({
    portalItem: { // autocasts as new PortalItem()
      id: "76f4919f2fdf42dfae2dbbeac3100dd4"
    }
  });

  var view = new SceneView({
    map: webmap,
    container: "viewDiv"
  });
});