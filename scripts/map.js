/* TITLE */


/* MAP */
var svg = d3
  .select("#map")
  .append("svg")
    .attr("width", $("#map").width())
    .attr("height", .625 * $("#map").width())
    .attr("viewBox", "0 0 960 600");

var path = d3.geoPath();

var data = d3.map();
var colorScale = d3.scaleLinear()
  .domain([50, 100])
  .range(["#BDC8FF", "#002BFF"]);

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
}


/* Description */

/*
 * Puerto Rico: 41 hospices surveyed, 98% deficiencies
 * Hawaii, Alaska, Delaware, and Rhode Island excluded because < 10 hospice b/n 2012-2016.
 */