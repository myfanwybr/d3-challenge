// @TODO: YOUR CODE HERE!

d3.select(window).on("resize", handleResize);

loadChart();

function handleResize() {
  var svgArea = d3.select("body").select("svg");
  // If there is already an svg container on the page, remove it and reload the chart
  if (!svgArea.empty()) {
    svgArea.remove();
    loadChart();
  }

};


function loadChart() {

  // SVG wrapper dimensions are determined by the current width
  // and height of the browser window.
////var txt = "Height with padding: " + elmnt.clientHeight + "px<br>";
  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;


  var margin = {
      top: 80,
      right: 50,
      bottom: 180,
      left: 50
    };
    
  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;

  var svg=d3.select("#scatter")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 500 500")
  .classed("scaled-svg", true)
  .attr("height", svgHeight)
  .attr("width", svgWidth)
;

  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left+30}, ${margin.top -40})`);


  //Import Data

  d3.csv("assets/data/data.csv").then(demoData=>{


    // cast the data from the csv as integer numbers
    demoData.forEach(function(data) {
      data.healthcare = +data.healthcare;
      data.income= +data.income;
console.log(data.healthcare)
    });
    
    // Create a scale for your independent (x) coordinates

    var xScale=d3.scaleLinear()
      .domain(d3.extent(demoData, d=>d.healthcare))
      .range([0, svgWidth/2])


    // Create a scale for your dependent (y) coordinates

    var yScale=d3.scaleLinear()
    .domain([d3.min(demoData, d=>d.income), d3.max(demoData, d=>d.income)])
    .range([svgHeight/2, 0])


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
        .attr("cx", d => xScale(d.healthcare))
        .attr("cy", d => yScale(d.income))
        .attr("r", "10")
        .attr("fill", "lightblue")
        .attr("opacity", "0.75")
      ;
      
    var textGroup= chartGroup.selectAll(".text")
    .data(demoData)
    .enter()
    .append("text")
    .attr("x", d => xScale(d.healthcare))
    .attr("y", d => yScale(d.income)+3)
    .text(d=>(d.abbr))
    .attr("class", "text")
    .attr("font-size", "11.5px")
    .attr("fill", "white")
    .attr("text-anchor", "middle")





    // Create axes labels
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left -20)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Income ($)");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 4}, ${height + margin.top-35})`)
    .attr("class", "axisText")
    .text("Lacks Healthcare (%)");

  }
  ).catch(function(error) {
    console.log(error);
  });

}


