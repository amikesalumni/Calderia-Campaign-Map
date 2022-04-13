
// initialize the map
var map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -4
});
var bounds = [[0,0], [8192,8192]];
var image = L.imageOverlay('Campaign Map 13.jpg', bounds).addTo(map);
map.fitBounds(bounds);

function style() {
  return {
      fillColor: '#800026',
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
  }
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
  });
}
var geojson;
geojson = L.geoJSON(region_pillar, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(map)

var pillars = L.latLng([0,0 ]);
L.marker(pillars).addTo(map);
