mapboxgl.accessToken = mapToken; // mapToken is coming from the script at the bottom of show.ejs
//vscode reads ejs delimiters as an error when in script tags.
//The following was to parse the string used in show.ejs to avoid the error warning
const coordinates = campCoord.split(',').map((x) => +x); //campCoord is coming from show.ejs as well
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  center: coordinates, // starting position [lng, lat]
  zoom: 9 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
  .setLngLat(coordinates)
  // .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>${campground.title}</h3>`))
  .addTo(map);
