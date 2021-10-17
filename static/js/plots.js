// Reference the data py
var url = "../wine_data.py"


function init() {
    // Grab a reference to the dropdown select element
    var select_flavor = d3.select("#selFlavor");
  
    // Use the list of flavors to populate the select options
    d3.json(url).then((data) => {
      var flavors = data;
  
      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      var userData = buildCharts(firstSample);
  
    });
  }
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    console.log(`change ${{newSample}}`)
    buildCharts(newSample);
  
  }