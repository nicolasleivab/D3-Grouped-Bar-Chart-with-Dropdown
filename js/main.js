/* Main JS */

//** tabletop init function **//
function init() {     
  Tabletop.init( { key: '10g_TGtruCriERlXJurPZQk76pvk30U0pkWgbbfzPrjA', //google sheet key
                   callback: function(data, tabletop) { 
                       console.log(data)


//** D3.js code **//

//* Filter and format data *//
var data = data.filter(function(d){return d.ID == '10574525';});

    data.forEach(function(d) {
        d.Functions = +d.Functions;
        d.Loops = +d.Loops;
        d.Movement = +d.Movement;
        d.PickDrop = +d.PickDrop;
        d.Cycles = +d.Cycles;
        d.minL = +d.minL;
        d.avgL = +d.avgL;
        d.minF = +d.minF;
        d.avgF = +d.avgF;
        d.minC = +d.minC;
        d.avgC = +d.avgC; 
        d.minP = +d.minP;
        d.avgP = +d.avgP;
        d.minM = +d.minM;
        d.avgM = +d.avgM;

    });

var instructions = ['Functions', 'Loops', 'Cycles', 'Movement', 'PickDrop'];

var selected = instructions[0];


//*Chart code*//

var margin = { left:80, right:20, top:50, bottom:100 };
var width = 600 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

var g = d3.select("#chart")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

//Append and class for each axis to reuse later

var xAxisApp = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height +")");

var yAxisApp = g.append("g")
    .attr("class", "y axis");

//X and Y scales
var x0 = d3.scaleBand()
    .range([0, width])
    .padding(0.2)

var x1 = d3.scaleBand();

var y = d3.scaleLinear()
    .range([height, 0]);

// Color scheme
var z = d3.scaleOrdinal(d3.schemePastel1);

//Transition
var t = d3.transition().duration(750);


// X and Y Labels

var xLabel = g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + margin.left + ", " + margin.top +  ")")
    .text("Level");

var yLabel = g.append("text")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Rounds");

//Run visualization for the first time
update(data);

//*Update Function*//

function update(data){

var dropSelector = d3.select("#drop") //dropdown change selection
    .append("select")
    .attr("id","dropdown")
    .on("change", function(d){
         selected = document.getElementById("dropdown");
            y.domain([0, d3.max(data, function(d){return +d[selected.value];})]);
                console.log(selected.value);

            

            if(selected.value == 'Loops'){
              var minLmax = d3.max(data, function(d) { return d.minL; })
              var avgLmax = d3.max(data, function(d) { return d.avgL; })
              y.domain([0, d3.max(data, function(d) { return d[selected.value] + avgLmax + minLmax;})]);
              var xFilter = ['Loops', 'minL', 'avgL'];
            }
            else if(selected.value == 'Functions'){
              var minFmax = d3.max(data, function(d) { return d.minF; })
              var avgFmax = d3.max(data, function(d) { return d.avgF; })
              y.domain([0, d3.max(data, function(d) { return d[selected.value] + avgFmax + minFmax;})]);
              var xFilter = ['Functions', 'minF', 'avgF'];
            }
            else if(selected.value == 'Cycles'){
              var minCmax = d3.max(data, function(d) { return d.minC; })
              var avgCmax = d3.max(data, function(d) { return d.avgC; })
              y.domain([0, d3.max(data, function(d) { return d[selected.value] + avgCmax + minCmax;})]);
              var xFilter = ['Cycles', 'minC', 'avgC'];;
            }
            else if(selected.value == 'PickDrop'){
              var minPmax = d3.max(data, function(d) { return d.minP; })
              var avgPmax = d3.max(data, function(d) { return d.avgP; })
              y.domain([0, d3.max(data, function(d) { return d[selected.value] + avgPmax + minPmax;})]);
              var xFilter = ['PickDrop', 'minP', 'avgP'];;
            }
            else if(selected.value == 'Movement'){
              var minMmax = d3.max(data, function(d) { return d.minM; })
              var avgMmax = d3.max(data, function(d) { return d.avgM; })
              y.domain([0, d3.max(data, function(d) { return d[selected.value] + avgMmax + minMmax;})]);
              var xFilter = ['Movement', 'minM', 'avgM'];;
            }
  
        x1.domain(xFilter).range([0, x0.bandwidth()]);










});

//Get values for the dropdown (instructions)
dropSelector.selectAll("option")
      .data(instructions)
      .enter().append("option")
      .attr("value", function(d){
        return d;
      })
      .text(function(d){
        return d;
      })

x0.domain(data.map(function(d) { return d.level; }));


//Call X Axis
var xAxisCall = d3.axisBottom(x0);
    xAxisApp.transition(t).call(xAxisCall).selectAll("text") 
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-40)" 
                );;;

// Call Y Axis
var yAxisCall = d3.axisLeft(y)
        .tickFormat(function(d){ return d; });
        yAxisApp.transition(t).call(yAxisCall);



}

//** end of D3.js code **//

                   },
                   simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init)
//** end of tabletop init function **//