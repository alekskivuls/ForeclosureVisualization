//Initialize the map and set the view location
var map = L.map('map').setView([33.94279, -118.24379], 10);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
  id: 'mapbox.streets',
}).addTo(map);

//Default dot settings 
 var size = 10;
 var color = 'blue'; //Can also use hex for colors
 var fillColor = 'blue';
 var fillOpacity = 0.5;

//Variables for layer management of data
var singleFamilyArr = [];
var multiFamilyArr = [];
var nonResidentialArr = [];
var vacantResidentialArr = [];

//Add every entry in the data to the map
data.data.forEach(function(entry) {
  //Check to see that there is a latlong address
  if(entry[11][1] != null) {
    var dot = L.circle([entry[11][1], entry[11][2]], size, {
      color: color,
      fillColor: fillColor,
      fillOpacity: fillOpacity
    }).addTo(map).bindPopup(JSON.parse(entry[11][0]).address + ",\n" +JSON.parse(entry[11][0]).city);

    if(entry[10] == "Single Family") {
      singleFamilyArr.push(dot);
      dot.setStyle({color:'red', fillColor: 'red'});
    }

    if(entry[10] == "Multi-Family") {
      multiFamilyArr.push(dot);
      dot.setStyle({color:'orange', fillColor: 'orange'});
    }

    if(entry[10] == "Non-Residential") {
      nonResidentialArr.push(dot);
      dot.setStyle({color:'purple', fillColor: 'purple'});
    }

     if(entry[10] == "Vacant Residential") {
      vacantResidentialArr.push(dot);
      dot.setStyle({color:'green', fillColor: 'green'});
    }
  }
});

//Group the dots by their arrays
var singleFamily = L.layerGroup(singleFamilyArr);
var multiFamily = L.layerGroup(multiFamilyArr);
var nonResidential = L.layerGroup(nonResidentialArr);
var vacantResidential = L.layerGroup(vacantResidentialArr);

//Add all the layers into base map or overlay map
var baseMaps = {
};
var overlayMaps = {
    "Single-Family": singleFamily,
    "Multi-Family": multiFamily,
    "Non-Residential": nonResidential,
    "Vacant-Residential": vacantResidential
};

//Add the layers on the map
L.control.layers(baseMaps, overlayMaps).addTo(map);







//Debug statement to console to see formatting of data
console.log(data.data[0]);
console.log(JSON.parse(data.data[0][11][0]).address);