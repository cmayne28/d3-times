// @TODO: YOUR CODE HERE!
// Step 1: Set up our chart
//=================================
var svgWidth = 960;
var svgHeight = 600;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};


var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

console.log(chartGroup);

// Step 3:
// Import data from the data.csv file
// =================================
d3.csv("assets/js/data.csv").then(function(newsData) {

// Step 4: Parse the data
  // Format the data and convert to numerical
  newsData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.povertyMoe = +data.povertyMoe;
    data.age = +data.age;
    data.ageMoe = +data.ageMoe;
    data.income = +data.income;
    data.incomeMoe = +data.incomeMoe;
    data,noHealthInsurance = +data.noHealthInsurance;
    data.obesity = +data.obesity;
    data.smokes = +data.smokes;
  });

  // Step 5: Create the scales for the chart
  // =================================
  var xLinearScale = d3.scaleLinear()
      .domain([8, (d3.max(newsData, d => d.smokes)+2)])
      .range([0, width]);

  var yLinearScale = d3.scaleLinear()
      .domain([15, (d3.max(newsData, d => d.obesity)+2)])
      .range([height, 0]);

// Step 7: Create the axes
    // ==============================
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Step 8: Append the axes to the chartGroup
  // ==============================================
  // Add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g").call(leftAxis);

// Circle generator for morning data
  var circlesGroup = chartGroup.selectAll("circle")
    .data(newsData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.smokes))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "15")
    .attr("fill", "DodgerBlue")
    .attr("opacity", ".5");

  var circlesText = chartGroup.selectAll(".label")
    .data(newsData)
    .enter()
    .append("text").text(d=>d.abbr)
    .attr("x", d => xLinearScale(d.smokes))
    .attr("y", d => yLinearScale(d.obesity-.2))
    .attr("class", "label")
    .style("font-size","12px")
    .style("fill", "white")
    .style("text-anchor", "middle")
    .classed("fill-text", false);
    

   // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Obesity (%)");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Smokers (%)");
});