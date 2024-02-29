// Function to handle link clicks and trigger a full page reload
function handleLinkClick(event) {
    event.preventDefault(); // Prevent the default link behavior
    const targetPage = event.target.getAttribute('href');
    window.location.href = targetPage; // Navigate to the target page, triggering a full reload
}

// Attach the click event handler to all anchor tags in the document
document.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', handleLinkClick);
});

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Style, Icon } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

// Create OpenLayers map on the map element
const map = new Map({
    layers: [
        new TileLayer({
            source: new OSM(),
        }),
    ],
    target: 'osm-map',
    view: new View({
        center: fromLonLat([17.93242, 59.44424]),
        zoom: 10,
    }),
});

function setMapLocation(location) {
    const mapContainerId = location === 'haggvik' ? 'osm-map' : 'osm3-map';
    const coordinates = location === 'haggvik' ? [17.93242, 59.44424] : [17.91465, 59.47586];

    const mapInstance = new Map({
        layers: [
            new TileLayer({
                source: new OSM(),
            }),
        ],
        target: mapContainerId,
        view: new View({
            center: fromLonLat(coordinates),
            zoom: 10,
        }),
    });
}



// Add a marker with a custom icon, ulriksdal
const marker9 = new Feature({
    geometry: new Point(fromLonLat([18.0096, 59.3664])),
});


// Add a marker with a custom icon, ulriksdal
const marker8 = new Feature({
    geometry: new Point(fromLonLat([17.4184, 59.0473])),
});

// Add a marker with a custom icon, helenelund
const marker7 = new Feature({
    geometry: new Point(fromLonLat([17.9624, 59.409])),
});

// Add a marker with a custom icon, sollentuna
const marker2 = new Feature({
    geometry: new Point(fromLonLat([17.9482, 59.4287])),
});

// Add a marker with a custom icon, häggvik
const marker = new Feature({
    geometry: new Point(fromLonLat([17.93242, 59.44424])),
});

// Add a marker with a custom icon, Rotebro
const marker3 = new Feature({
    geometry: new Point(fromLonLat([17.91465, 59.47586])),
}); 

// Add a marker with a custom icon, Upplands Väsby
const marker4 = new Feature({
    geometry: new Point(fromLonLat([17.899, 59.5208])),
});

// Add a marker with a custom icon, Rosersberg
const marker5 = new Feature({
    geometry: new Point(fromLonLat([17.8801, 59.5836])),
});


// Add a marker with a custom icon, Märsta
const marker6 = new Feature({
    geometry: new Point(fromLonLat([17.86122, 59.62734])),
});

const markerStyle = new Style({
    image: new Icon({
        anchor: [0.5, 1],
        src: 'https://www.openrailwaymap.org/js/images/marker-icon-2x.png',
        scale: 0.3, // Adjust the scale to make the marker smaller
    }),
});


marker.setStyle(markerStyle);// Apply the same style to both markers
marker2.setStyle(markerStyle);
marker3.setStyle(markerStyle);
marker4.setStyle(markerStyle);
marker5.setStyle(markerStyle);
marker6.setStyle(markerStyle);
marker7.setStyle(markerStyle);
marker8.setStyle(markerStyle);
marker9.setStyle(markerStyle);


const vectorLayer = new VectorLayer({
    source: new VectorSource({
        features: [marker, marker2, marker3, marker4, marker5, marker6, marker7, marker8, marker9], // Add both markers to the source
    }),
});

map.addLayer(vectorLayer);



