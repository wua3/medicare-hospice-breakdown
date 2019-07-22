/* MAP */

// var tooltip = d3.select("#map")
// .append("div")
// .style("position", "absolute")
// .style("z-index", "10")
// .style("visibility", "hidden")
// .style("visibility", "visible")
// .text("a simple tooltip");


var svg = d3
  .select("#map")
  .append("svg")
    .attr("width", $("#map").width())
    .attr("height", .8*$("#map").width())
    .attr("viewBox", "0 0 960 600");

var path = d3.geoPath();

var data = d3.map();
var colorScale = d3.scaleLinear()
  .domain([50, 100])
  .range(["#fff2ac", "#fc9b46"]);

d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/wua3/medicare-hospice-breakdown/master/map-data/us-10m.v1.json")
  .defer(d3.csv, "https://raw.githubusercontent.com/wua3/medicare-hospice-breakdown/master/map-data/state-deficiencies.csv", function(d) { data.set(d.id, +d.def);})
  .await(ready);

function ready(error, us) {
  if (error) throw error;

  // map
  svg.append("g")
      .attr("class", "states")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("d", path)
      .attr('fill', function (d, i) {
        d.total = data.get(d.id) || 0;
        if (d.total != 0) {
          d3.select(this)
            .attr("class", "statesVisible");
        }
        return colorScale(d.total);
      });

  // borders    
  svg.append("path")
      .attr("class", "state-borders")
      .attr("d", path(topojson.mesh(us, us.objects.states, function (a, b) { return a !== b; })));
  
  var legendset = [50, 60, 70, 80, 90, 100];
    
  // // legend
  var legend = d3
      .select("#legend")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "20px");
  
  legend.selectAll("rect")
      .data(legendset)
      .enter().append("rect")
      .attr("class", "legend-square")
      .attr("fill", function(d) {
        return colorScale(d);
      })
      .attr("x", function(d, i) {
        return (20 * i);
      })
      ;
  

    
      // //    
  // svg.append("rect")
  //     .attr("class", "label")
  //     .attr("x", "5%")
  //     .attr("y", "90%")
  //     .attr("width", "30%")
  //     .attr("height", "25%");
    
  // svg.selectAll(".label")
  //   .append("text")
  //     .attr("class", "state-name")
  //     .attr("x", "5%")
  //     .attr("y", "90%")
  //     .text("Testing");
  
  // svg.selectAll(".label")
  //   .append("text")
  //     .attr("class", "num-hospice")
  //     .attr("x", "5%")
  //     .attr("y", "90%")
  //     .text("0 hospices surveyed");

  // svg.selectAll(".label")
  //   .append("text")
  //     .attr("class", "perc-def")
  //     .attr("x", "5%")
  //     .attr("y", "90%")
  //     .text("90% had a deficiency between 2012 and 2016");
}


/* Description */

/*
 * Puerto Rico: 41 hospices surveyed, 98% deficiencies
 * Hawaii, Alaska, Delaware, and Rhode Island excluded because < 10 hospice b/n 2012-2016.
 */