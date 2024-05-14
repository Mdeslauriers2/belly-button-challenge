// Read in Data
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function ({ names }) {
    names.forEach(id => {
        d3.select('select').append('option').text(id);
    });

    optionChanged(names[0])
});

const optionChanged = id => {
    d3.json(url).then(({metadata, samples})=>{
        let meta = metadata.find(dict => dict.id == id);
        let {otu_ids, sample_values, otu_labels} = samples.find(dict =>dict.id == id);        

        // Demographic
        d3.select(`#sample-metadata`).html("");
        Object.entries(meta).forEach(([key,val]) => {
                d3.select('#sample-metadata').append('h5').text(`${key.toUpperCase()}: ${val}`);
            });

        // Bar chart
        var data = [
            {
              x: sample_values.slice(0,10).reverse(),
              y: otu_ids.slice(0,10).reverse().map(x => `OTU ${x}`),
              text: otu_labels.slice(0,10).reverse(),
              orientation: 'h',
              type: 'bar'
            }
          ];
          
          Plotly.newPlot('bar', data);


        //   Bubble Chart
        var trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker:  { 
              color: otu_ids,
              size: sample_values,
              colorscale: 'Earth'
            
            }
          };
          
          var data = [trace1];
          
          var layout = {
            showlegend: false,
            xaxis: {title: "OTU ID"}
          };
          
          Plotly.newPlot('bubble', data, layout);



        console.log(meta)

        // Gauge
        var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: meta.wfreq,
              title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week" },
              type: "indicator",
              mode: "gauge+number",
              gauge: { 
                axis: { range: [0,9], tickmode: "linear", tick0: 1, dtick: 1 },
                bar: {color: "red"},
                steps: [
                    {range: [0, 1], color: "rgba(255, 255, 255, 0)"},
                    {range: [1, 2], color: "rgba(232, 226, 202, .5)"},
                    {range: [2, 3], color: "rgba(210, 206, 145, .5)"},
                    {range: [3, 4], color:  "rgba(202, 209, 95, .5)"},
                    {range: [4, 5], color:  "rgba(184, 205, 68, .5)"},
                    {range: [5, 6], color: "rgba(170, 202, 42, .5)"},
                    {range: [6, 7], color: "rgba(142, 178, 35 , .5)"},
                    {range: [7, 8], color:  "rgba(110, 154, 22, .5)"},
                    {range: [8, 9], color: "rgba(50, 143, 10, 0.5)"},
                  
            ]

            
            
            
            }
            }
          ];
          
          var layout = { width: 600, height: 400 };
          Plotly.newPlot('gauge', data, layout);



    });
};