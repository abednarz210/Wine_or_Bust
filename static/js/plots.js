// ********************DEFINE VARIABLES***********************

// variables to hold the HTML IDs that will be updated with new data
let dropdownFlavor = d3.select("#selFlavor");
let dropdownRegion = d3.select("#selRegion");
let barPoints = d3.select("#barPoints");
let barPrices = d3.select("#barPrices");

var wineSelected = `/api/v1.0/filteredwine/all/all`; // keeping it all for now since filter isn't working

// ********************TESTING THE DATA FILE********************

d3.json(wineSelected).then((data) => {
    console.log('data', data)}); // this works!

// ********************BUILD CHARTS*****************************

function buildCharts(flavor, region) {

    d3.json(wineSelected).then((data) => {

        var resultArray = data[0];

        var name = resultArray.name;
        var points = resultArray.points;
        var description = resultArray.description;
        var region = resultArray.region;
        var state = resultArray.state;
        var variety = resultArray.variety;
        var winery = resultArray.winery;

        var yticks = name;
        var barData = [
        {
            y: yticks,
            x: points,
            text: name,
            type: "bar",
            orientation: "h",
        }
        ];

        var barLayout = {
            title: "Top Wines",
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("barPoints", barData, barLayout);

    });

};

function init() {

  
    // Use the list of sample names to populate the select options
    d3.json("/api/v1.0/flavors").then((data) => {
      var flavors = data;
  
      // Use the first sample from the list to build the initial plots
      var defaultFlavor = 'all';
      var defaultRegion = 'all';
      var selectedData = buildCharts(defaultFlavor, defaultRegion);
  
    });
  }
  
  function optionChanged(newFlavor, newRegion) {
    // Fetch new data each time a new sample is selected
    console.log(`change ${{newFlavor}}, ${{newRegion}}`)
    buildCharts(newFlavor, newRegion);
  
  }
  
  // Initialize the dashboard
  init();