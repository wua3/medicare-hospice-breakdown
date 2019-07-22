var dataset = [
    ["Hospices", "Only requirement to report was in one specific, narrow circumstance"], 
    ["Surveyors", "Until March 5, 2019, requirements were barely specified"], 
    ["Beneficiaries & caregivers", "Instructions on how to report were extremely confusing and unclear"], 
  ];


var div = d3.select("#reporting")
  .append("div")
    .attr("width", "100%");

div.selectAll("div")
  .data(dataset)
  .enter().append("div")
  .attr("class", "reporting-circle");

div.selectAll("div").append("p")
    .attr("class", "stake-title")
    .text(function(d) {
        return d[0];
    });
        
div.selectAll("div").append("p")
    .text(function(d) {
        return d[1];
    });
          