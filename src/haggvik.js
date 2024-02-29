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


// Import necessary OpenLayers modules
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import VectorLayer from 'ol/layer/Vector.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import { Style, Icon } from 'ol/style.js';
import VectorSource from 'ol/source/Vector.js';
import { fromLonLat } from 'ol/proj.js';
import Overlay from 'ol/Overlay.js';


import Select from 'ol/interaction/Select.js';
import { pointerMove } from 'ol/events/condition.js';

// För att kunna ladda om sidan


// polygonLayers.js
import Polygon from 'ol/geom/Polygon.js';
import Fill from 'ol/style/Fill.js';
import { getCenter } from 'ol/extent.js';
//import VectorLayer from 'ol/layer/Vector.js';
//import Feature from 'ol/Feature.js';
//import VectorSource from 'ol/source/Vector.js';
//import { Style, Icon } from 'ol/style.js';
//import { fromLonLat } from 'ol/proj.js';

// Add this at the beginning of your main.js file

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded event triggered.');


    const element = document.getElementById('osm-map');

    const map = new Map({
        layers: [
            new TileLayer({
                source: new OSM(),
            }),
        ],
        target: element,
        view: new View({
            center: fromLonLat([17.93242, 59.44424]),
            zoom: 16,
        }),
    });


    // Declare selectClick at the beginning
    const selectClick = new Select({
        condition: pointerMove,
    });

    // Interaction for selecting features on click
    map.addInteraction(selectClick);

    // Add this at the beginning of your main.js file
    // Marker coordinates
    const markerCoordinates = fromLonLat([17.93242, 59.44424]);

    // Marker feature
    const markerFeature = new Feature(new Point(markerCoordinates));

    // Configure marker style
    const defaultStyle = new Style({
        image: new Icon({
            anchor: [0.5, 1],
            src: './location-dot-solid.svg', // Replace with the path to your marker icon
            scale: 1, // Adjust the scale as needed
        }),
    });

    const hoverStyle = new Style({
        image: new Icon({
            anchor: [0.5, 0.5],
            src: './pan_tool_alt_white_24dp.svg', // Replace with the path to your finger icon
            scale: 1,
        }),
    });

    markerFeature.setStyle(defaultStyle);

    // Vector layer for the marker
    const markerVectorLayer = new VectorLayer({
        source: new VectorSource({
            features: [markerFeature],
        }),
    });

    // Add the marker Vector Layer to the map
    map.addLayer(markerVectorLayer);

    // Interaction to change the icon on hover
    const select = new Select({
        layers: [markerVectorLayer],
        condition: pointerMove,
    });

    select.on('select', (event) => {
        if (event.selected.length > 0) {
            // Change the style on hover
            markerFeature.setStyle(hoverStyle);
        } else {
            // Revert to the default style when not hovering
            markerFeature.setStyle(defaultStyle);
        }
    });

    map.addInteraction(select);

    // Add click event listener to the map view
    map.on('click', function (event) {
        // För att ta bort highlight om kartan zoomas, deklarerad i index.html
        // Get the clicked coordinate
        if (flag == 10) {
            flag = 2; //Zoomar inte mer (om anv. ej dubbelklickar)
            document.getElementById('reloadButton').addEventListener('click', function () {
                location.reload();
            });
            //Nedan rensa vid zoom
            document.getElementById("reloadButton").hidden = "";
            document.getElementById("popup-container4").style.display = "none";
            document.getElementById("popup-container5").style.display = "none";
            document.getElementById("popup-container2").style.display = "none";
            document.getElementById("popup-container3").style.display = "none";
            document.getElementById("popup-container6").style.display = "none";
            document.getElementById("popup-container7").style.display = "none";
            const clickedCoord = event.coordinate;

            // Adjust the clicked coordinate (move slightly to the left and up)
            const adjustedCoord = [clickedCoord[0] + 400, clickedCoord[1] + 250]; // You can adjust these values

            // Get the current zoom level
            const currentZoom = map.getView().getZoom();

            // Set the new zoom level (you can adjust this value)
            const newZoom = currentZoom + 1;

            // Set the new zoom level and center the map on the adjusted coordinate
            map.getView().animate({ zoom: newZoom, center: adjustedCoord });
        };
    });

    // Andelsvägen
    // New Vector Layer setup with a square polygon
    const squarePolygon = new Polygon([
        [
            fromLonLat([17.93128, 59.4449]),
            fromLonLat([17.9309, 59.4448]),
            fromLonLat([17.93104, 59.44446]),
            fromLonLat([17.93146, 59.44454]),
            fromLonLat([17.93128, 59.4449]),
        ],
    ]);

    // Configure the vector layer without style
    const vectorLayer = new VectorLayer({
        source: new VectorSource({
            features: [
                new Feature({
                    geometry: squarePolygon,
                }),
            ],
        }),
    });

    // Add the Vector Layer to the map
    map.addLayer(vectorLayer);

    // Andelsvägen
    // Create a new Polygon feature
    const newPolygonFeature = new Feature({
        geometry: new Polygon([
            [
                fromLonLat([17.93121, 59.44431]),
                fromLonLat([17.93155, 59.44403]),
                fromLonLat([17.93167, 59.44409]),
                fromLonLat([17.93138, 59.44436]),
                fromLonLat([17.93121, 59.44431]),
            ],
        ]),
    });


    // Create a new Vector Layer with the new polygon
    const newVectorLayer = new VectorLayer({
        source: new VectorSource({
            features: [newPolygonFeature],
        }),
    });

    // Add the new Vector Layer to the map
    map.addLayer(newVectorLayer);


    // Andelsvägen
    // Create a new Polygon feature
    const newPolygonFeatureII = new Feature({
        geometry: new Polygon([
            [
                fromLonLat([17.93065, 59.44481]),
                fromLonLat([17.93038, 59.44478]),
                fromLonLat([17.93049, 59.44448]),
                fromLonLat([17.93078, 59.44451]),
                fromLonLat([17.93065, 59.44481]),
            ],
        ]),
    });

    // Create a new Vector Layer with the new polygon
    const newVectorLayerII = new VectorLayer({
        source: new VectorSource({
            features: [newPolygonFeatureII],
        }),
    });

    // Add the new Vector Layer to the map
    map.addLayer(newVectorLayerII);

    // Hammarbacken
    // Create a new Polygon feature
    const newPolygonFeatureIII = new Feature({
        geometry: new Polygon([
            [
                fromLonLat([17.92448, 59.44455]),
                fromLonLat([17.92387, 59.44685]),
                fromLonLat([17.92374, 59.44683]),
                fromLonLat([17.92434, 59.4445]),
                fromLonLat([17.92448, 59.44455]),
            ],
        ]),
    });

    // Create a new Vector Layer with the new polygon
    const newVectorLayerIII = new VectorLayer({
        source: new VectorSource({
            features: [newPolygonFeatureIII],
        }),
    });

    // Add the new Vector Layer to the map
    map.addLayer(newVectorLayerIII);

    // Smedjevägen
    // Create a new Polygon feature
    const newPolygonFeatureIIII = new Feature({
        geometry: new Polygon([
            [
                fromLonLat([17.93392, 59.44458]),
                fromLonLat([17.93292, 59.44431]),
                fromLonLat([17.93303, 59.44426]),
                fromLonLat([17.93397, 59.44453]),
                fromLonLat([17.93392, 59.44458]),
            ],
        ]),
    });

    // Create a new Vector Layer with the new polygon
    const newVectorLayerIIII = new VectorLayer({
        source: new VectorSource({
            features: [newPolygonFeatureIIII],
        }),
    });

    // Add the new Vector Layer to the map
    map.addLayer(newVectorLayerIIII);

    // Configure the same vector layer with a style
    vectorLayer.setStyle(new Style({
        fill: new Fill({
            color: 'rgba(0, 0, 255, 0.5)', // Red fill with 30% opacity
        }),
    }));

    // Configure the same vector layer with a style
    newVectorLayer.setStyle(new Style({
        fill: new Fill({
            color: 'rgba(0, 0, 255, 0.5)', // Red fill with 30% opacity
        }),
    }));

    // Configure the same vector layer with a style
    newVectorLayerII.setStyle(new Style({
        fill: new Fill({
            color: 'rgba(0, 0, 255, 0.5)', // Red fill with 30% opacity
        }),
    }));

    // Configure the same vector layer with a style
    newVectorLayerIII.setStyle(new Style({
        fill: new Fill({
            color: 'rgba(0, 0, 255, 0.3)', // Red fill with 30% opacity
        }),
    }));

    // Configure the same vector layer with a style
    newVectorLayerIIII.setStyle(new Style({
        fill: new Fill({
            color: 'rgba(0, 0, 255, 0.3)', // Red fill with 30% opacity
        }),
    }));


    // ... (previous code)

    // Create a new Feature for the icon
    const iconFeatures = [
        new Feature({
            geometry: new Point(fromLonLat([17.93119, 59.44468])),// Andelsvägen
        }),
        new Feature({
            geometry: new Point(fromLonLat([17.93058, 59.44465])),
        }),
        new Feature({
            geometry: new Point(fromLonLat([17.93139, 59.44423])),
        }),
        new Feature({
            geometry: new Point(fromLonLat([17.93352, 59.44441])),// Smedjevägen
        }),
        new Feature({
            geometry: new Point(fromLonLat([17.92426, 59.4451])),// Hammarbacken
        }),
    ];

    //Create an array to store icon styles
    const iconStyles = [
        new Style({
            image: new Icon({
                anchor: [0.5, 1],
                src: 'parking.svg', // Replace with the path to your test.svg file
                scale: 1, // Adjust the scale as needed
            }),
        }),
        new Style({
            image: new Icon({
                anchor: [0.5, 1],
                src: 'parking.svg', // Replace with the path to your test.svg file
                scale: 1, // Adjust the scale as needed
            }),
        }),
        new Style({
            image: new Icon({
                anchor: [0.5, 1],
                src: 'parking.svg', // Replace with the path to your test.svg file
                scale: 1, // Adjust the scale as needed
            }),
        }),
        new Style({
            image: new Icon({
                anchor: [0.5, 1],
                src: 'parking2.svg', // Replace with the path to your test.svg file
                scale: 1, // Adjust the scale as needed
            }),
        }),
        new Style({
            image: new Icon({
                anchor: [0.5, 1],
                src: 'parking2.svg', // Replace with the path to your test.svg file
                scale: 1, // Adjust the scale as needed
            }),
        }),
        // Add more styles as needed
        // new Style({ image: new Icon({ anchor: [0.5, 1], src: 'path/to/your/icon.svg', scale: 1 }) }),
    ];

    // Create an array to store icon vector layers
    /*   const iconVectorLayers = iconFeatures.map((feature, index) => {
           const iconVectorLayer = new VectorLayer({
               source: new VectorSource({
                   features: [feature],
               }),
           });*/

    // Set the style for the icon
    /* feature.setStyle(iconStyles[index]);

     // Add the icon Vector Layer to the map
     map.addLayer(iconVectorLayer);
     return iconVectorLayer;
 });*/
    // var map = new OpenLayers.Map('map', { controls: [] });  


});

// ... (continue with your code)
