// ********************DEFINE VARIABLES***********************

// global variables used for array lists
var flavorsIn = [];
var regionsIn = [];

// variable for routes
var url_flavors = '/api/v1.0/flavors';
var url_regions = '/api/v1.0/regions';

var urls = [url_flavors, url_regions];

var promises = [];

urls.forEach(function(url){promises.push(d3.json(url))});

// console.log(promises);
Promise.all(promises).then(data => init(data));


// variables to hold the HTML IDs that will be updated with new data
let dropdownFlavor = d3.select("#selFlavor");
let dropdownRegion = d3.select("#selRegion");
let barPoints = d3.select("#barPoints");
let barPrices = d3.select("#barPrices");

var wineSelected = `/api/v1.0/filteredwine/all/all`; // keeping it all for now since filter isn't working

// ********************TESTING THE DATA FILE********************

// d3.json(wineSelected).then((data) => {
//     console.log('data', data)}); // this works!

// ********************BUILD CHARTS*****************************


// function buildCharts(flavor, region) {


//     d3.json(wineSelected).then((data) => {

//         let resultArray = data[0];

//         let name = resultArray.name;
//         let points = resultArray.points;
//         let prices = resultArray.price;
//         let description = resultArray.description;
//         let region = resultArray.region;
//         let state = resultArray.state;
//         let variety = resultArray.variety;
//         let winery = resultArray.winery;

//         let tracePoints = {

//             x: points,
//             y: name,
//             text: description,
//             type: 'bar',
//             orientation: 'h'
//         };

//         let tracePoints = [tracePoints];
        
//         let trace1layout = {
//             margin: { t: 30, l: 30 } 
//         };
        
//         Plotly.newPlot("barPoints", tracePoints, trace1Layout);

//         let trace2 = {

//             x: prices,
//             y: name,
//             text: description,
//             type: 'bar',
//             orientation: 'h'
//         };

//         let tracePrices = [trace2];
        
//         let trace2layout = {
//             margin: { t: 30, l: 30 } 
//         };
        
//         Plotly.newPlot("barPrices", tracePricesS, trace2Layout);

//     });

// };

    
function init(promisedata) {

    // read in data from flavors
    // d3.json('/api/v1.0/flavors').then((data => {
    //     console.log(data);
    //     // for loop to fill in the drop down lists
    //     data.flavor.forEach((name => {
    //         let option = dropdownFlavor.append("option");
    //         // console.log(name)
    //         option.text(name);
    //     }));
    // }));

    flavorsIn = promisedata[0];
    regionsIn = promisedata[1];

    console.log('flavors', flavorsIn);
    console.log('regions', regionsIn);

    flavorsIn.forEach((flavor => {
        let option = dropdownFlavor.append("option");
        option.text(flavor);
    }));

    regionsIn.forEach((region => {
        let option = dropdownRegion.append("option");
        option.text(region);
    }));

    // d3.json('/api/v1.0/regions').then((data => {

    //     // for loop to fill in the drop down lists
    //     data.region.forEach((name => {
    //         let option = dropdownRegion.append("option");
    //         option.text(name);
    //     }));

    // }));
    
    // set the default to all
    let defaultFlavor = dropdownFlavor.property("all");
    let defaultRegion = dropdownRegion.property("all");

    // plot charts with defaults
    buildCharts(defaultFlavor, defaultRegion);

};

function flavorChanged(newFlavor, newRegion) {

    buildCharts(newFlavor, newRegion);

};

// Initialize the dashboard
init();