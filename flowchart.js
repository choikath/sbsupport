// Reference: https://github.com/d3/d3-selection#selection_data

var ds;
var filteredList;
var filters = ["All", "Cardiology", "GI", "ICU", "new"];
var t, f; //listings parent table
var selectedColor = "#ffc107";
    
function showList(list) {

    sortList();

    t = d3.select("body").append("table");
    
    var tr=t.selectAll("tr") 
        .data(list, d=>d['title']);
    
    console.log("tr");
    console.log(tr);

    tr.exit().remove();
    tr.enter()
        .append("tr")
        .append("td")
        .append("h6")
        .append("a").attr("href", d => d.path).attr("style", "color:#5bc0de").text(d => d.title + " ").append("span").attr("class", "badge badge-pill badge-primary").text(d => d.new);
  
    
        // .each(function(d) {
        //   	var self = d3.select(this);
            
        //     self.append("td")
        //     	.append("h6")
            	    
        //     	.append("a")
        //     		.attr("href", d.path)
        //     		.attr("style", "color:#5bc0de")
        //     		.text(d.title + "  ")
        //     	.append("span")
        //         .attr("class", "badge badge-pill badge-primary")
        //         .text(d.new);
                
            // self.append("td")
            // 	.html();
        
    // });
    
}

function sortList() {
     filteredList.sort(function (a, b) {
        return a.title.localeCompare( b.title );
    });
}

function updateList() {
    
    console.log("filteredList");
    console.log(filteredList);
    const listings = t.selectAll("tr").data(filteredList);
    listings.exit().remove();
    listings.enter().append("tr").append("td").append("h6").append("a").attr("href", d => d.path).attr("style", "color:#5bc0de").text(d => d.title + " ").append("span").attr("class", "badge badge-pill badge-primary").text(d => d.new);
    
    
    // const titles = filteredList.map(function(e) {return e.title;});
    sortList();
    const texts = t.selectAll("a")
        .data(filteredList)
        .text(d => d.title);
    texts.exit().remove();

    // const badges = t.selectAll("span")
    //     .data(filteredList)
    //     .enter()
    //     .text(d => d.new);
    // badges.exit().remove();


}




function showFilters() {
    
    var f = d3.select("#list").append("table");
        
    var tr = f.selectAll("tr")
        .data(filters)
        .enter()
        .append("td")
    
    tr.each(function(d) {
        var self = d3.select(this);
        var list = ds.filter(function(x){ 
            if (x.new === d || x.tags === d) {
                return x;
            }
        }); 
        
        console.log(list);
        
        self.append("td")
            .append("h4")
            .append("span")
            .attr("class", "btn badge badge-pill badge-primary")
            .attr("id", d)
            .on("click", function(e) {
                
                var currentClass = d3.select(this).attr("class");
                // console.log(currentClass);
                currentClass = currentClass == "btn badge badge-pill badge-primary" ? "btn badge badge-pill badge-success" : "btn badge badge-pill badge-primary"; //toggle
                f.selectAll("span").attr("class", "btn badge badge-pill badge-primary"); // wipe and override by unselecting all, in case others were selected
                d3.select(this).attr("class", currentClass); // update this badge
                
                console.log(d);
                if (d === "All") {
                    d3.select(this).transition().delay(1000).attr("class", "btn badge badge-pill badge-primary"); //slow reset
                    filteredList = ds;
                    updateList();
                }
                else if (currentClass === "btn badge badge-pill badge-success") { // selected
                    filteredList=list;
                    updateList();
                }
                else { //unselected
                    filteredList = ds;
                    updateList();
                }
                
                
            })
            .text(function(d) {return d;});
    });
        
        
        
        
    
    
}



d3.json("FlowchartList.json", function(error, data) {
 if(error) {
     console.log("ERROR: ");
     console.log(error);
 } else {
     console.log("DATA: ");
     console.log(data);
     ds=data;
     filteredList=data;
 }

 showFilters();
 showList(ds);
}); //pulls csv data into dictionary for us.  treats whatever incoming data as an Object or array
// runs asynchronously with other functions
// JavaScript File
