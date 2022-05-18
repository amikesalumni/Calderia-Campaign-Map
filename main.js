// initialize the map
var bounds = [[0,0], [8192,8192]];
var map = L.map('map', {
  crs: L.CRS.Simple,
  zoomSnap: 0.25,
  minZoom: -3.5,
  maxBounds: bounds, // might have to set larger bounds than actually present for map if I want to prevent scrolling off
  maxBoundsViscosity: 1.0 // prevent use from scrolling off map, tentatively less useful without map margins
});

var image = L.imageOverlay('./Player Release 8.jpg', bounds).addTo(map);
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
  var layertest = e.target;
  document.getElementById("region_name").innerHTML = '<h4>'+ layertest.feature.properties.name + '</h4>';
  document.getElementById("marker_name").innerHTML = '<h6>' + '</h6>';
  document.getElementById("summary").innerHTML = '<p>' + '</p>';
  map.fitBounds(layertest.getBounds());

}

function onEachFeature(feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature,
  });}
//custom markers
/*
var sessionmarker = L.AwesomeMarkers.icon({
  icon: 'home',
  color: 'red'
})
*/
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
    marker.summary = props[i].properties.markersummary[j]
    marker.region = props[i].properties.name
    marker.coord = coord
    marker.addTo(mlayer)
  }};

map.addLayer(mlayer);
var markers ={
  "Sessions": mlayer,
  "Regions" : geojson
};

var layerControl = L.control.layers(null,markers).addTo(map);
function markerclick(e) {
  document.getElementById("region_name").innerHTML = '<h4>'+ this.region + '</h4>';
  document.getElementById("marker_name").innerHTML = '<h6>'+ this.name + '</h6>';
  document.getElementById("summary").innerHTML = '<p>'+ this.summary + '</p>';
  map.setView(this.coord, zoom=0);
}

// i see, the red triangle appears next to a prior deletion for some reason
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

var scale = L.control.scale({ metric: false});
scale.addTo(map);
*/
L.control.measure({
  position: 'topright',
  lineColor: 'white',
  disableOtherClicksWhileMeasuring: true,
  formatDistance: function (val) {
    return Math.round(7.20 * val )/1000 + 'mile';
  }
}).addTo(map)

