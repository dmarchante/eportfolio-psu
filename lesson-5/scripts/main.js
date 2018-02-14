require([
  "esri/Map",
  "esri/views/SceneView",
  "esri/layers/FeatureLayer",
  "esri/renderers/ClassBreaksRenderer",
  "esri/renderers/SimpleRenderer",
  "esri/symbols/PointSymbol3D",
  "esri/symbols/IconSymbol3DLayer",
  "dojo/domReady!"
], function (
  Map,
  SceneView,
  FeatureLayer,
  ClassBreaksRenderer,
  SimpleRenderer,
  PointSymbol3D,
  IconSymbol3DLayer
) {
  
  var map = new Map({
    basemap: "streets" 
  });

  var view = new SceneView({
    container: "viewDiv",
    map: map,
    center: [-83.5, 28],
    zoom: 7.2
  });

  var template = {
    title: "Florida Population:<br /> {NAMELSAD}",
    content: "Population: {TotalPopul}<br />Median Household: {Median_Hou}<br />Unemployment: {Unemployme}",
    fieldInfos: [{
      fieldName: "TOTAL POPULATION",
      format: {
        digitSeparator: true, 
        places: 0 
      }
    },
    {
      fieldName: "MEDIAN HOUSEHOLD",
      format: {
        digitSeparator: true,
        places: 0   
      }
    },
    {
      fieldName: "UNEMPLOYMENT",
      format: {
        digitSeparator: true,
        places: 2   
      }
    }
  ]
  };

  var popRenderer = new ClassBreaksRenderer({
    field: "TotalPopul"
  });

  popRenderer.addClassBreakInfo({
    minValue: 8000,
    maxValue: 100000,
    symbol: new PointSymbol3D({
      symbolLayers: [
        new IconSymbol3DLayer({
          material: { color: "blue" },
          resource: { primitive: "circle" },
          size: 5
      })]
    })
  });

  popRenderer.addClassBreakInfo({
    minValue: 100000,
    maxValue: 350000,
    symbol: new PointSymbol3D({
      symbolLayers: [
        new IconSymbol3DLayer({
          material: { color: "blue" },
          resource: { primitive: "circle" },
          size: 10
      })]
    })
  });

  popRenderer.addClassBreakInfo({
    minValue: 350000,
    maxValue: 650000,
    symbol: new PointSymbol3D({
      symbolLayers: [
        new IconSymbol3DLayer({
          material: { color: "blue" },
          resource: { primitive: "circle" },
          size: 15
      })]
    })
  });

  popRenderer.addClassBreakInfo({
    minValue: 650000,
    maxValue: 1350000,
    symbol: new PointSymbol3D({
      symbolLayers: [
        new IconSymbol3DLayer({
          material: { color: "blue" },
          resource: { primitive: "circle" },
          size: 20
      })]
    })
  });

  popRenderer.addClassBreakInfo({
    minValue: 1350000,
    maxValue: 2550000,
    symbol: new PointSymbol3D({
      symbolLayers: [
        new IconSymbol3DLayer({
          material: { color: "blue" },
          resource: { primitive: "circle" },
          size: 25
      })]
    })
  });


  var populationLayer = new FeatureLayer({
    portalItem: { 
      id: "61a30fb3ea4c43e4854fbb4c1be57394"
    },
    renderer: popRenderer,
    outFields: ["*"],
    popupTemplate: template
  });
  
  map.add(populationLayer);
});