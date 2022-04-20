// initialize the map
var map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -4
});
var bounds = [[0,0], [8192,8192]];
var image = L.imageOverlay('../Campaign Map 13.jpg', bounds).addTo(map);
map.fitBounds(bounds);

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
  markerDelAgain();
  var layertest = e.target;
  map.fitBounds(layertest.getBounds());
  info.update(layertest.feature.properties);
  itemWrap(layertest.feature.properties);
}

function onEachFeature(feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
  });
}

//marker handling
var marker = new Array();

// the way I understand is that for each lat and lang in items, this will create a marker and add it to the maker array
function itemWrap(items) {
  for(i=0;i<items.markerlatlonarray.length;i++){
      var coord = L.latLng(items.markerlatlonarray[i])
      var LamMarker = new L.marker(coord).addTo(map); //Var lammarker is the marker
      LamMarker.bindPopup("<b>" + items.markernames[i] + "</b><br>" + items.markersummary[i] +"</br>") //{offset: [100,0]}
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
// adds gimp created path to the map
var geojson;
geojson = L.geoJSON(region_pillar, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(map)

// this provides a useful debugging thing because I can output properties into the legend and see if they change
// correctly on a click or not

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
