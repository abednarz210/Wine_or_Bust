// ********************DEFINE VARIABLES***********************

// global variables used for array lists
var flavorsIn = [];
var regionsIn = [];
var winesIn = [];

// variable for routes
var url_flavors = '/api/v1.0/flavors';
var url_regions = '/api/v1.0/regions';
var url_wines = '/api/v1.0/filteredwine/all/all';

var urls = [url_flavors, url_regions, url_wines];

var promises = [];

urls.forEach(function(url){promises.push(d3.json(url))});

console.log(promises);
Promise.all(promises).then(data => init(data));


// variables to hold the HTML IDs that will be updated with new data
let dropdownFlavor = d3.select("#selFlavor");
let dropdownRegion = d3.select("#selRegion");
let barPoints = d3.select("#barPoints");
let barPrices = d3.select("#barPrices");

function init(promisedata) {

    flavorsIn = promisedata[0];
    regionsIn = promisedata[1];
    winesIn = promisedata[2];
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

    

    // plot charts
    buildChartPoints(winesIn);
    buildChartPrices(winesIn);


};

function flavorChanged(newFlavor) {
    // console.log(`change ${newFlavor}`)

    let changeRegion = document.getElementById("selRegion").value;
    urls[2]=(`/api/v1.0/filteredwine/${newFlavor}/${changeRegion}`)

    // console.log('region value', changeRegion);

    // console.log(urls[2]);
    // console.log(winesIn);
    // window.open(urls[2]);

    d3.json(urls[2]).then(data => buildChartPoints(data));
    d3.json(urls[2]).then(data => buildChartPrices(data));
    // buildCharts(newFlavor, newRegion);

};

function regionSelected(newRegion) {
    // console.log(`change ${newRegion}`)
    let changeFlavor = document.getElementById("selFlavor").value;
    urls[2]=(`/api/v1.0/filteredwine/${changeFlavor}/${newRegion}`)

    // console.log(urls[2]);
    // console.log(winesIn);
    // window.open(urls[2]);

    d3.json(urls[2]).then(data => buildChartPoints(data));
    d3.json(urls[2]).then(data => buildChartPrices(data));
    // buildCharts(newFlavor, newRegion);

};

// Initialize the dashboard
init();


// ********************BUILD CHARTS*****************************


function buildChartPoints(wineData) {

var wine_name = [];
var points = [];

    wineData.forEach((wine => {
        wine_name.push(wine.name);
        points.push(wine.points);
    }));

    let trace1 = {

        x: points.reverse(),
        y: wine_name,
        type: 'bar',
        orientation: 'h'
    };

    let tracePoints = [trace1];
    
    let trace1Layout = {
        margin: { t: 30, l: 30 } 
    };
    
    Plotly.newPlot("barPoints", tracePoints, trace1Layout);

};

function buildChartPrices(wineData) {

    var wine_name = [];
    var price = [];
    
        wineData.forEach((wine => {
            wine_name.push(wine.name);
            price.push(wine.price);
        }));
    
        let trace2 = {
    
            x: price,
            y: wine_name,
            type: 'bar',
            orientation: 'h'
        };
    
        let tracePrices = [trace2];
        
        let trace2Layout = {
            margin: { t: 30, l: 30 } 
        };
        
        Plotly.newPlot("barPrices", tracePrices, trace2Layout);
    
    };