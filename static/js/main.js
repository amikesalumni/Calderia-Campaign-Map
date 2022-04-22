// initialize the map
var map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -4//,
  //maxBounds: bounds, // might have to set larger bounds than actually present for map if I want to prevent scrolling off
  //maxBoundsViscosity: 1.0 prevent use from scrolling off map, tentatively less useful without map margins
});

var bounds = [[0,0], [8192,8192]];
var image = L.imageOverlay('../Campaign Map 13.jpg', bounds).addTo(map);
map.fitBounds(bounds);

// adds gimp created path to the map
var geojson;
geojson = L.geoJSON(region_pillar, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(map)

// Functions governing mouse hover and click behavior
function style() {
  return {
      fillColor: 'grey',
      weight: 3,
      opacity: 1,
      color: 'white',
      fillOpacity: 0
  };
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
      weight: 8,
      color: 'black',
      dashArray: '',
      fillColor: 'white',
      fillOpacity: 0.5
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
  }
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
}

function zoomToFeature(e) {
  //markerDelAgain();
  var layertest = e.target;
  document.getElementById("output").innerHTML = '<h1>'+ layertest.feature.properties.name + '</h1>';
  map.fitBounds(layertest.getBounds());

}

function onEachFeature(feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature,
  });}

// add all the markers to their own layer group and put them on the map
var mlayer = new L.LayerGroup()
var props = region_pillar.features;
var mprops = new Array()
for(i=0; i<props.length; i++) {
  for(j=0; j<props[i].properties.markernames.length;j++) {
    var coord = L.latLng(props[i].properties.markerlatlonarray[j])
    var marker = L.marker(coord).on('click',markerclick)
    marker.bindTooltip(props[i].properties.markernames[j]).openTooltip();
    marker.name = props[i].properties.markernames[j]
    marker.key = 'marker key'
    marker.addTo(mlayer)
  }};

map.addLayer(mlayer);
var markers ={
  "Markers": mlayer
};

var layerControl = L.control.layers(null,markers).addTo(map);
function markerclick(e) {
  document.getElementById("output").innerHTML = '<h1>'+ this.name + '</h1>';
}

/*
//marker handling
var markersLayer = new L.LayerGroup();
//markersLayer.on("click", markerOnClick);
function markerOnClick(e) {
  var attributes = e.layer.properties;
  console.log('markerclicked')
  document.getElementById("output").innerHTML = '<h1>'+ 'attributes.name' + '</h1>';
}

var marker = new Array();
//map.addLayer(markersLayer);

// the way I understand is that for each lat and lang in items, this will create a marker and add it to the maker array
function itemWrap(items) {
  for(i=0;i<items.markerlatlonarray.length;i++){
      var coord = L.latLng(items.markerlatlonarray[i])
      var LamMarker = new L.marker(coord,label=items.markernames[i]).addTo(map); //Var lammarker is the marker
      //LamMarker.properties = {}
      //LamMarker.properties.name = items.markernames[i]
      //LamMarker.properties.description = items.markersummary[i]
      //LamMarker.on('click',markerOnClick);
      // for the time being I don't want to use popups for the session summary, but I probably will want them for something else
      //LamMarker.bindPopup("<b>" + items.markernames[i] + "</b><br>" + items.markersummary[i] +"</br>") //{offset: [100,0]}
      marker.push(LamMarker); // the marker gets put in the array maker
      //map.addLayer(marker[i]); // all markers in the array marker get added to map
      //I'm not certain the bottom line above was important, so I added .addTo(map) to the marker creation event instead
      }
  }

// This function should remove all markers on the map on a click
function markerDelAgain() {
  for(i=0;i<marker.length;i++) {
      map.removeLayer(marker[i]);
       // this should clear the marker array 
      }
  marker = [];    
  }
*/

// this provides a useful debugging thing because I can output properties into the legend and see if they change
// correctly on a click or not
/*
var info = L.control();
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

info.update = function (props) {
  this._div.innerHTML = '<h4>Region Information </h4>' +  (props ?
      '<b>' + props.name + '</b><br />': 'click on something');
};

info.addTo(map);

var scale = L.control.scale(metric=false, imperial=true);
scale.addTo(map);
*/
