require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/GraphicsLayer",
    "esri/tasks/QueryTask",
    "esri/tasks/support/Query",
    "dojo/_base/array",
    "dojo/dom",
    "dojo/on",
    "dojo/domReady!"
], function (
    Map, SceneView, GraphicsLayer,
    QueryTask, Query, arrayUtils, dom, on
) {

    // URL to feature service containing points representing the 50
    // most prominent peaks in the U.S.
    var fuelUrl =
    "https://services3.arcgis.com/EvmgEO8WtpouUbyD/arcgis/rest/services/alt_fuel_stations_(May_15_2017)/FeatureServer/0";
    // Define the popup content for each result
    var popupTemplate = { // autocasts as new PopupTemplate()
        title: "{State}",
        fieldInfos: [{
            fieldName: "Fuel_Code_Type",
            label: "Fuel Type",
        }],
    };

    var fuelSymbol = {
        type: "simple-marker", // autocasts as new PointSymbol3D()
        color: "red",
        size: 5
    };

    // Create graphics layer and symbol to use for displaying the results of query
    var resultsLyr = new GraphicsLayer();

    /*****************************************************************
     *  Point QueryTask to URL of feature service
     *****************************************************************/
    var qTask = new QueryTask({
        url: fuelUrl
    });

    /******************************************************************
     * Set the query parameters to always return geometry and all fields.
     * Returning geometry allows us to display results on the map/view
     ******************************************************************/
    var params = new Query({
        outFields: ["State"]
    });

    var map = new Map({
        basemap: "streets",
        layers: [resultsLyr] // add graphics layer to the map
    });

    var view = new SceneView({
        map: map,
        container: "viewDiv",
        center: [-100, 38],
        zoom: 4,
        popup: {
            dockEnabled: true,
            dockOptions: {
                position: "top-right",
                breakpoint: false
            }
        }
    });

    // Call doQuery() each time the button is clicked    
    view.when(function () {
        view.ui.add("optionsDiv", "bottom-right");
        on(dom.byId("doBtn"), "click", doQuery);
    });

    var field = "State = ";
    var stateName = dom.byId("stateSelect");
    var value = dom.byId("fuelSelect");

    // Executes each time the button is clicked
    function doQuery() {
        // Clear the results from a previous query
        resultsLyr.removeAll();
        /*********************************************
         *
         * Set the where clause for the query. This can be any valid SQL expression.
         * In this case the inputs from the three drop down menus are used to build
         * the query. For example, if "Elevation", "is greater than", and "10,000 ft"
         * are selected, then the following SQL where clause is built here:
         *
         * params.where = "ELEV_ft > 10000";
         *
         * ELEV_ft is the field name for Elevation and is assigned to the value of the
         * select option in the HTML below. Other operators such as AND, OR, LIKE, etc
         * may also be used here.
         *
         **********************************************/
        params.where = field + stateName.value;
        // executes the query and calls getResults() once the promise is resolved
        // promiseRejected() is called if the promise is rejected
        qTask.execute(params)
            .then(getResults)
            .otherwise(promiseRejected);
    }

    // Called each time the promise is resolved
    function getResults(response) {

        // Loop through each of the results and assign a symbol and PopupTemplate
        // to each so they may be visualized on the map
        var fuelResults = arrayUtils.map(response.features, function (feature) {

            // Sets the symbol of each resulting feature to a cone with a
            // fixed color and width. The height is based on the mountain's elevation
            feature.symbol = {
                type: "simple-fill", // autocasts as new PointSymbol3D()
                color: "yellow",
            };

            feature.popupTemplate = popupTemplate;
            return feature;
        });

        resultsLyr.addMany(fuelResults);

        // animate to the results after they are added to the map  
        view.goTo(fuelResults).then(function () {
            view.popup.open({
                features: fuelResults,
                featureMenuOpen: true,
                updateLocationEnabled: true
            });
        });

        // print the number of results returned to the user
        dom.byId("printResults").innerHTML = fuelResults.length +
            " results found!";
    }

    // Called each time the promise is rejected
    function promiseRejected(err) {
        console.error("Promise rejected: ", err.message);
    }
});