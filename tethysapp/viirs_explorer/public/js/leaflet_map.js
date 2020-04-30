// ~~~~~~~~~~~~~~~~~~~~  VARIABLES ~~~~~~~~~~~~~~~~~~~~
let controlsObj;
let newFloodLayer;
let newAdditionalLayer;


// ~~~~~~~~~~~~~~~~~~~~  MAP & BASE-MAP FUNCTIONS ~~~~~~~~~~~~~~~~~~~~

const map = function() {
    "use strict";
    return L.map('map', {
        zoom: 3,
        minZoom: 2,
        zoomSnap: .5,
        boxZoom: true,
        maxBounds: L.latLngBounds(L.latLng(-100.0, -270.0), L.latLng(100.0, 270.0)),
        center: [10, 0],
    });
};

const createBasemaps = function() {
    "use strict";
    let esri_imagery = L.esri.basemapLayer('Imagery');
    let esri_gray = L.esri.basemapLayer('Gray');
    let esri_streets = L.esri.basemapLayer('Streets');
    let esri_topo = L.esri.basemapLayer('Topographic');

    return {
        "ESRI Imagery": L.layerGroup([esri_imagery]).addTo(mapObj),
        "ESRI Gray": L.layerGroup([esri_gray]),
        "ESRI Streets": L.layerGroup([esri_streets]),
        "ESRI Topo": L.layerGroup([esri_topo]),
    }
};

// ~~~~~~~~~~~~~~~~~~~~  CREATE LAYERS ~~~~~~~~~~~~~~~~~~~~

const createFloodLayer = function() {
    "use strict";

    let selectedFloodLayer = $("#fl_select").val();

    let floodURLs = {
        comp5: "https://floods.ssec.wisc.edu/tiles/RIVER-FLDglobal-composite/{z}/{x}/{y}.png",
        comp1: "https://floods.ssec.wisc.edu/tiles/RIVER-FLDglobal-composite1/{z}/{x}/{y}.png",
        jointABI: "https://floods.ssec.wisc.edu/tiles/RIVER-FLD-joint-ABI/{z}/{x}/{y}.png",
        jointAHI: "https://floods.ssec.wisc.edu/tiles/RIVER-FLD-joint-AHI/{z}/{x}/{y}.png",
    };

    let attStr = '&copy; <a href="https://www.ssec.wisc.edu/flood-map-demo/flood-products/">NOAA JPSS GOES-R CIMSS GMU</a>';

    let floodMapLayer = L.tileLayer(floodURLs[selectedFloodLayer], {
        attribution: attStr,
        opacity: $("#fl_opacity").val(),
    });

    return floodMapLayer.addTo(mapObj);
};

const createAdditionalLayer = function() {
    "use strict";

    // let selectedAdditionalLayer = $("ad_select").val();
    let selectedAdditionalLayer = $("#ad_select").val();

    let layerOptions = {
        "pop2020": {
            url: "https://sedac.ciesin.columbia.edu/geoserver/wms?",
            layers: "gpw-v4:gpw-v4-population-density_2020",
            attLink: "https://doi.org/10.7927/H49C6VHW",
            attText: "CIESIN SEDAC",
        },
        "pop2000": {
            url: "https://sedac.ciesin.columbia.edu/geoserver/wms?",
            layers: "gpw-v4:gpw-v4-population-density_2000",
            attLink: "https://doi.org/10.7927/H49C6VHW",
            attText: "CIESIN SEDAC",
        },
        "floodHazard": {
            url: "https://sedac.ciesin.columbia.edu/geoserver/wms?",
            layers: "ndh:ndh-flood-hazard-frequency-distribution",
            attLink: "https://doi.org/10.7927/H4668B3D",
            attText: "CHRR CIESIN SEDAC World Bank",
        },
        "totEcon": {
            url: "https://sedac.ciesin.columbia.edu/geoserver/wms?",
            layers: "ndh:ndh-flood-total-economic-loss-risk-deciles",
            attLink: "https://doi.org/10.7927/H4T151KP",
            attText: "CHRR CIESIN SEDAC World Bank",
        },
        "propEcon": {
            url: "https://sedac.ciesin.columbia.edu/geoserver/wms?",
            layers: "ndh:ndh-flood-proportional-economic-loss-risk-deciles",
            attLink: "https://doi.org/10.7927/H4XS5S9Q",
            attText: "CHRR CIESIN SEDAC World Bank",
        },
    };

    let url = layerOptions[selectedAdditionalLayer]["url"];
    let layers = layerOptions[selectedAdditionalLayer]["layers"];
    let attLink = layerOptions[selectedAdditionalLayer]["attLink"];
    let attText = layerOptions[selectedAdditionalLayer]["attText"];
    let attStr = `&copy; <a href=${attLink}>${attText}</a>`;

    let addMapLayer = L.tileLayer.wms(url, {
        layers: layers,
        attribution: attStr,
        opacity: $("#ad_opacity").val(),
        crossOrigin: false,
        format: "image/png",
        transparent: true,
        useCache: true,
    });

    return addMapLayer.addTo(mapObj);
};

// ~~~~~~~~~~~~~~~~~~~~  Layer Control ~~~~~~~~~~~~~~~~~~~~

// the layers box on the top right of the map
const createLayerControl = function () {
    return L.control.layers(
        basemapObj, {
            'Flood layer': newFloodLayer,
            'Additional layer': newAdditionalLayer,
        }, {
            collapsed: false,
        },
    ).addTo(mapObj);
};



// ~~~~~~~~~~~~~~~~~~~~ LOAD THE MAP AND INITIAL LAYERS ~~~~~~~~~~~~~~~~~~~~

const mapObj = map();                               // used by legend and draw controls
const basemapObj = createBasemaps();                // used in the make controls function

newAdditionalLayer = createAdditionalLayer();   // used in the make controls function
newFloodLayer = createFloodLayer();             // used in the make controls function

controlsObj = createLayerControl();

let setZIndex = newFloodLayer.setZIndex(10);

// ~~~~~~~~~~~~~~~~~~~~ EVENT LISTENERS & UPDATES ~~~~~~~~~~~~~~~~~~~~

$("#ad_select").change(() => { updateAdditionalLayer() });
$("#ad_opacity").change(() => { newAdditionalLayer.setOpacity($("#ad_opacity").val()) });
$("#fl_select").change(() => { updateFloodLayer() });
$("#fl_opacity").change(() => { newFloodLayer.setOpacity($("#fl_opacity").val()) });


const updateAdditionalLayer = function() {
    mapObj.removeLayer(newAdditionalLayer);
    mapObj.removeControl(controlsObj);

    newAdditionalLayer = createAdditionalLayer();
    controlsObj = createLayerControl();
    setZIndex = newFloodLayer.setZIndex(10);
};

const updateFloodLayer = function() {
    mapObj.removeLayer(newFloodLayer);
    mapObj.removeControl(controlsObj);

    newFloodLayer = createFloodLayer();
    controlsObj = createLayerControl();
    setZIndex = newFloodLayer.setZIndex(10);
};