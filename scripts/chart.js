var dataset = [
              [87, "had a deficiency in quality of care"], 
              [70, "had multiple deficiencies"], 
              [59, "didn't provide services in their care plans"], 
              [53, "didn't train or manage their staff properly"], 
              [33, "had complaints filed against them"], 
              [20, "had 'serious' deficiencies"]
            ];

var h = 50;
var pad = 2;
      
var svg = d3.select("#main-chart")
  .append("svg")
    .attr("width", "100%")
    .attr("height", (h+pad) * 6);


svg.selectAll("g")
  .data(dataset)
  .enter().append("g");

// bar
svg.selectAll("g").append("rect")
    .attr("class", "bar")
    .attr("x", "12%")
    .attr("y", function(d, i) {
      return i * (h+pad);
    })
    .attr("width", function(d) {
      return d[0] / 100 * (100-12) + "%";
    })
    .attr("height", h);

// percent
svg.selectAll("g").append("text")
    .attr("class", "char-percent")
    .text(function(d) {
      return d[0] + "%";
    })
    .attr("x", "2%")
    .attr("y", function(d, i) {
      return i * (h+pad) + (h/2 + 3*pad);
    });

// caption    
svg.selectAll("g").append("g")
  .attr("class", "caption")
  .attr("id", function(d, i) {return "caption" + (i+1);});

svg.selectAll(".caption")
  .append("text")
    .attr("class", "line1")
    .text(function(d) {
      return d[1];
    })
    .attr("x", "14%")
    .attr("y", function(d, i) {
      return i * (h+pad) + (h/2 + 3*pad);
    })
