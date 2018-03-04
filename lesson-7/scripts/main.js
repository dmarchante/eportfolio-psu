require([
  "esri/Map",
  "esri/views/SceneView",
  "esri/layers/FeatureLayer",
  "esri/renderers/UniqueValueRenderer",
  "esri/widgets/Legend",
  "esri/widgets/BasemapToggle",
  "esri/widgets/Home",
  "esri/widgets/LayerList",
  "esri/widgets/ScaleBar",
  "dojo/dom",
  "dojo/on",
  "dojo/domReady!"
], function (
  Map,
  SceneView,
  FeatureLayer,
  UniqueValueRenderer,
  Legend,
  BasemapToggle,
  Home,
  LayerList,
  ScaleBar,
  dom,
  on
) { 

  const map = new Map({
    basemap: "streets"
  });

  const view = new SceneView({
    container: "viewDiv",
    map: map,
    center: [-97, 40],
    zoom: 5
  });

  const template = {
    title: 'Fuel Type: {Fuel_Type_Code}',
    content: 'Address: {Street_Address}<br/>City: {City} <br/> State: {State}<br/> Zipcode: {ZIP}<br/> Hours: {Access_Days_Time}'
  };

  const fuelRenderer = new UniqueValueRenderer({
    field: "Fuel_Type_Code",
    defaultSymbol: {
      type: "simple-marker",
      size: 5
    },
  });

  fuelClass = (fuelType, color, label, renderer) => {
    renderer.addUniqueValueInfo({
      value: fuelType,
      symbol: {
        type: "simple-marker",
        color: color,
        size: 5
      },
      label: label
    });
  };

  fuelClass("ELEC", "#e34a33", "Electric", fuelRenderer);
  fuelClass("LPG", "#43a2ca", "LPG", fuelRenderer);
  fuelClass("E85", "#2ca25f", "E85", fuelRenderer);
  fuelClass("CNG", "#c51b8a", "CNG", fuelRenderer);
  fuelClass("BD", "#feb24c", "BD", fuelRenderer);
  fuelClass("LNG", "#edf8b1", "LNG", fuelRenderer);
  fuelClass("HY", "#c994c7", "HY", fuelRenderer);

  view.when(function () {
    view.ui.add("optionsDiv", "bottom-right");
    on(dom.byId("doBtn"), "click", doQuery);
  });

  const fuels = new FeatureLayer({
    portalItem: {
      id: "3e833955c9b9410485afb723baca4fbe"
    },
    mode: FeatureLayer.MODE_ONDEMAND,
    renderer: fuelRenderer,
    definitionExpression: "State = 'AL'",
    outFields: ["Fuel_Type_Code", "State"],
    popupTemplate: template
  });

  fuels.when(() => {
    let states = document.querySelector("#stateSelect");
    let click = document.querySelector("#doBtn");

    on(click, "click", () => {
      fuels.definitionExpression = `State = '${states.value}'`;
    });
  });

  map.add(fuels);

  const layerList = LayerList({
    view: view
  });

  view.ui.add(layerList, {position: "bottom-left"});

  const legend = new Legend({
    view: view,
    layerInfos: [{
      layer: fuels,
      title: "Fuels Types by State"
    }]
  });

  view.ui.add(legend, "bottom-right");

  const toggle = new BasemapToggle({
    view: view,
    nextBasemap: "dark-gray"
  });

  view.ui.add(toggle, "top-right");

  const home = new Home({
    view: view
  });
  
  view.ui.add(home, "top-left");
});