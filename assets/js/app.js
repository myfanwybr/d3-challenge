// @TODO: YOUR CODE HERE!



// SVG wrapper dimensions are determined by the current width
// and height of the browser window.
var svgWidth = 1200;
var svgHeight = 660;


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
.attr("height", "600px")
.attr("width", "1200px");

var svgGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


//Import Data

d3.csv("assets/data/data.csv").then(function(demoData){

var circleGroup=svgGroup.append("circle")
    .data(demoData)
    .enter()
    .classed("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.income))
    .attr("r", "15")
    .attr("fill", "pink")
    .attr("opacity", ".5");
}
