require([
  "esri/Map",
  "esri/views/SceneView",
  "esri/layers/FeatureLayer",
  "esri/renderers/UniqueValueRenderer",
  "dojo/domReady!"
], function (
  Map,
  SceneView,
  FeatureLayer,
  UniqueValueRenderer,
) {

  let stateId;

  activate();

  function activate() {

    this.stateId = window.prompt("What state do you want data from (i.e. FL, GA, CA, etc . . . )?");

    if (this.stateId.length != 2) {
      alert("Please enter the appropriate state abbreviation.");
    } else {
      return this.stateId;
    }

    activate();
  }

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
  };

  const fuelRenderer = new UniqueValueRenderer({
    field: "Fuel_Type_Code",
    defaultSymbol: {
      type: "simple-marker",
      color: "#e34a33",
      size: 5
    },
  });

  fuelRenderer.addUniqueValueInfo({
    value: "Electric",
    symbol: {
      type: "simple-marker",
      color: "#e34a33",
      size: 5
    }
  });

  fuelRenderer.addUniqueValueInfo({
    value: "LPG",
    symbol: {
      type: "simple-marker",
      color: "#43a2ca",
      size: 5
    }
  });

  fuelRenderer.addUniqueValueInfo({
    value: "E85",
    symbol: {
      type: "simple-marker",
      color: "#2ca25f",
      size: 5
    }
  });

  fuelRenderer.addUniqueValueInfo({
    value: "CNG",
    symbol: {
      type: "simple-marker",
      color: "#c51b8a",
      size: 5
    }
  });

  fuelRenderer.addUniqueValueInfo({
    value: "BD",
    symbol: {
      type: "simple-marker",
      color: "#feb24c",
      size: 5
    }
  });

  fuelRenderer.addUniqueValueInfo({
    value: "LNG",
    symbol: {
      type: "simple-marker",
      color: "#edf8b1",
      size: 5
    }
  });

  fuelRenderer.addUniqueValueInfo({
    value: "HY",
    symbol: {
      type: "simple-marker",
      color: "#c994c7",
      size: 5
    }
  });

  let stateWhere = `State = '${this.stateId}'`;

  const fuels = new FeatureLayer({
    portalItem: {
      id: "3e833955c9b9410485afb723baca4fbe"
    },
    renderer: fuelRenderer,
    definitionExpression: stateWhere,
    outFields: ["*"],
    popupTemplate: template
  });

  map.add(fuels);
});