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
 var color = 'red'; //Can also use hex for colors
 var fillColor = 'red';
 var fillOpacity = 0.5;

//Variables for layer management of data
var singleFamilyArr = [];

//Add every entry in the data to the map
data.data.forEach(function(entry) {
  //Check to see that there is a latlong address
  if(entry[11][1] != null) {
    var dot = L.circle([entry[11][1], entry[11][2]], size, {
      color: color,
      fillColor: fillColor,
      fillOpacity: fillOpacity
    }).addTo(map).bindPopup("I am a circle.");

    if(entry[10] == "Single Family") {
      singleFamilyArr.push(dot);
      dot.setStyle({color:'blue', fillColor: 'blue'});
    }
  }
});

var singleFamily = L.layerGroup(singleFamilyArr);

//Add all the layers into base map or overlay map
var baseMaps = {
};
var overlayMaps = {
    "Single-Family": singleFamily
};

//Add the layers on the map
L.control.layers(baseMaps, overlayMaps).addTo(map);







//Debug statement to console to see formatting of data
console.log(data.data[0]);