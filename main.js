// button functions
document.getElementById("Map_button").onclick = function() {mapfunction()};
function mapfunction() {
  var x = document.getElementById("map");
  var y = document.getElementById("calendar");
  x.style.display = "block";
  y.style.display = "none"
  document.getElementById('explore').innerHTML = 'Click on a Region or Marker'
  document.getElementById("marker_name").innerHTML = '';
  document.getElementById("summary").innerHTML = '';
}

document.getElementById("Calendar_button").onclick = function() {calendarFunction()};
function calendarFunction() {
  var x = document.getElementById("map");
  var y = document.getElementById("calendar");
  x.style.display = "none";
  y.style.display = "block"
  document.getElementById('explore').innerHTML = 'Click on a Date'
  document.getElementById("region_name").innerHTML = '';
  document.getElementById("marker_name").innerHTML = '';
  document.getElementById("summary").innerHTML = '';
}

/**
 * MAPPING INFORMATION
 */
// initialize the map
var bounds = [[0,0], [8192,8192]];
var map = L.map('map', {
  crs: L.CRS.Simple,
  zoomSnap: 0.25,
  minZoom: -3.5,
  maxBounds: bounds, // might have to set larger bounds than actually present for map if I want to prevent scrolling off
  maxBoundsViscosity: 1.0, // prevent use from scrolling off map, tentatively less useful without map margins
  preferCanvas: true // for some reason this prevents the polygons from lagging when you zoom in on the map
});

var image = L.imageOverlay('./Player Release 14.jpg', bounds).addTo(map);
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
  document.getElementById("marker_name").innerHTML = '<h6>Discovered Locations</h6>';
  document.getElementById("summary").innerHTML = '<p>' + layertest.feature.properties.maps + '</p>';
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
    marker.summary = props[i].properties.markersummary[j]
    marker.region = props[i].properties.name
    marker.coord = coord
    marker.addTo(mlayer)
  }};
map.addLayer(mlayer);

// control for toggling regions and markers
var markers ={
  "Sessions": mlayer,
  "Regions" : geojson
};
var layerControl = L.control.layers(null,markers).addTo(map);

// populates detail on the left with information for the corresponding marker when clicked
function markerclick(e) {
  document.getElementById("region_name").innerHTML = '<h4>'+ this.region + '</h4>';
  document.getElementById("marker_name").innerHTML = '<h6>'+ this.name + '</h6>';
  document.getElementById("summary").innerHTML = '<p>'+ this.summary + '</p>';
  map.setView(this.coord, zoom=0);
}

//distance measurement tool 
L.control.measure({
  position: 'topright',
  lineColor: 'white',
  disableOtherClicksWhileMeasuring: true,
  formatDistance: function (val) {
    return Math.round(7.20 * val )/1000 + 'mile';
  }
}).addTo(map)

