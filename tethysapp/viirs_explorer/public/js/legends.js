/*
    Script for custom legends.
    For more information, see https://leafletjs.com/examples/choropleth/
 */

// ~~~~~~~~~~~~~~~~~~~~ UNIQUE COLOR SCHEMES ~~~~~~~~~~~~~~~~~~~~

const legendInfo = {
    "flood": [
        {title: "<b>Flood Legend</b>"},
        {color: "#000064", label: "MS"},
        {color: "#c4a272", label: "LD"},
        {color: "#b400e6", label: "SI"},
        {color: "#ffffff", label: "SN"},
        {color: "#00ffff", label: "IC"},
        {color: "#c8c8c8", label: "CL"},
        {color: "#646464", label: "CS"},
        {color: "#0000ff", label: "WA"},
        {title: "<b>% Inundation</b>"},
        {color: "#ff0000", label: "90"},
        {color: "#ff6400", label: "80"},
        {color: "#ff9532", label: "70"},
        {color: "#ffc800", label: "60"},
        {color: "#ffff00", label: "50"},
        {color: "#ffff96", label: "40"},
        {color: "#c8ff00", label: "30"},
        {color: "#00ff00", label: "20"},
        {color: "#32ff65", label: "10"},
    ],
    "pop2020": [
        {title: "<b>Pop. Density</b>"},
        {title: "<b>per sq. km</b>"},
        {color: "#bd0026", label: ">1,000"},
        {color: "#f03b20", label: "250-1,000"},
        {color: "#fd8d3c", label: "25-250"},
        {color: "#fab855", label: "5-25"},
        {color: "#ffdaa6", label: "1-5"},
        {color: "#fff2d1", label: "<1"},
    ],
    "pop2000": [
        {title: "<b>Pop. Density</b>"},
        {title: "<b>per sq. km</b>"},
        {color: "#bd0026", label: ">1,000"},
        {color: "#f03b20", label: "250-1,000"},
        {color: "#fd8d3c", label: "25-250"},
        {color: "#fab855", label: "5-25"},
        {color: "#ffdaa6", label: "1-5"},
        {color: "#fff2d1", label: "<1"},
    ],
    "floodHazard": [
        {title: "<b>Flood Hazard</b>"},
        {color: "#0571b0", label: "High"},
        {color: "#74a9cf", label: "Med-High"},
        {color: "#bdc9e1", label: "Med-Low"},
        {color: "#f1eef6", label: "Low"},
    ],
    "propEcon": [
        {title: "<b>P. Econ. Risk</b>"},
        {color: "#2b8cbe", label: "High"},
        {color: "#a6bddb", label: "Med"},
        {color: "#ece7f2", label: "Low"},
    ],
    "totEcon": [
        {title: "<b>T. Econ. Risk</b>"},
        {color: "#2ca25f", label: "High"},
        {color: "#99d8c9", label: "Med"},
        {color: "#e5f5f9", label: "Low"},
    ],
};

// ~~~~~~~~~~~~~~~~~~~~ CREATE LEGEND ~~~~~~~~~~~~~~~~~~~~

const createLegend = function (layer) {
    let legend = L.control({position: 'bottomright'});
    legend.onAdd = function () {

        const div = L.DomUtil.create("div", "info legend");
        let labels = [];

        legendInfo[layer].forEach((row) => {
                if (row.title) {
                    labels.push(row.title);
                } else if (row.color && row.label) {
                    labels.push(
                        '<i style="background:' +
                        row.color +
                        '"></i> ' +
                        row.label
                    );
                }
            }
        );

        div.innerHTML = labels.join("<br>");
        return div;
    };

    return legend.addTo(mapObj);
};

// ~~~~~~~~~~~~~~~~~~~~ ADD LEGEND TO MAP ~~~~~~~~~~~~~~~~~~~~

let floodLegend = createLegend("flood");
let addLegend = createLegend($("#ad_select").val());

$("#ad_select").change(() => {
    mapObj.removeControl(addLegend);
    addLegend = createLegend($("#ad_select").val());
});



