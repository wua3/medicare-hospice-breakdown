var dataset = [
    ["Hospices", "only required to report to CMS in one narrow circumstance...", "...if allegation of harm + someone is furnishing services on behalf of the hospice + hospice has investigated and verified the allegation", "compare: at nursing facilities, all alleged (not just verified) violations must be reported"], 
    ["Surveyors", "requirements were, until March 5, 2019, barely specified beyond 'immediate jeopardy'...", "...were required to report to local law enforcement only if hospice refused to report", "more specific guidance for surveys for nursing facilities"], 
    ["Beneficiaries & caregivers", "instructions on how to do so were extremely confusing and unclear", "hospices not required to provide information on how to log a complaint and don’t always handle complaints properly", "information not easily accessible via CMS’s consumer website."], 
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
          
        
div.selectAll("div").append("li")
    .text(function(d) {
        return d[2];
    });
div.selectAll("div").append("li")
    .text(function(d) {
      return d[3];
    });