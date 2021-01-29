// @TODO: YOUR CODE HERE!



// SVG wrapper dimensions are determined by the current width
// and height of the browser window.
var svgWidth = 400;
var svgHeight = 410;


var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };
  
var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

var svg=d3.select("#scatter")
.append("svg")
.attr("height", svgWidth)
.attr("width", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left+30}, ${margin.top -40})`);


//Import Data

d3.csv("assets/data/data.csv").then(demoData=>{


  // cast the data from the csv as integer numbers
  demoData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.income = +data.income;

   console.log(data.poverty)
  });
  
  // Create a scale for your independent (x) coordinates

  var xScale=d3.scaleLinear()
    .domain(d3.extent(demoData, d=>d.poverty))
    .range([0, svgWidth])


  // Create a scale for your dependent (y) coordinates

  var yScale=d3.scaleLinear()
  .domain([0, d3.max(demoData, d=>d.income)])
  .range([svgHeight, 0])


  // Create axis functions
  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);

  //  Append Axes to the chart
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);


  var circleGroup=chartGroup.selectAll("circle")
      .data(demoData)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.poverty))
      .attr("cy", d => yScale(d.income))
      .attr("r", "15")
      .attr("fill", "pink")
      .attr("opacity", ".5");

  // Create axes labels
  chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left -10)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .attr("class", "axisText")
  .text("Income ($)");

chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
  .attr("class", "axisText")
  .text("Hair Metal Band Hair Length (inches)");

}
).catch(function(error) {
  console.log(error);
});