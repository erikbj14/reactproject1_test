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

// Rotebro map

const hoverStyle = new Style({
    image: new Icon({
        anchor: [0.5, 0.5],
        src: './pan_tool_alt_white_24dp.svg',
        scale: 1,
    }),
});
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded event triggered.');

    const element = document.getElementById('osm3-map');

    const map3 = new Map({
        layers: [
            new TileLayer({
                source: new OSM(),
            }),
        ],
        target: element,
        view: new View({
            center: fromLonLat([17.91465, 59.47586]),
            zoom: 15,
        }),
    });

    // Marker feature
    const markerFeature = new Feature(new Point(fromLonLat([17.91465, 59.47586])));

    // Configure marker style
    const defaultStyle = new Style({
        image: new Icon({
            anchor: [0.5, 1],
            src: './location-dot-solid.svg',
            scale: 1 ,
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
    map3.addLayer(markerVectorLayer);


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

    map3.addInteraction(select); // Use map3.addInteraction since you're working with the map3 instance


    // Add click event listener to the map view
    map3.on('click', function (event) {
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
            document.getElementById("popup-container8").style.display = "none";
            document.getElementById("popup-container9").style.display = "none";
            document.getElementById("popup-container10").style.display = "none";
            document.getElementById("popup-container11").style.display = "none";
            const clickedCoord = event.coordinate;

            // Adjust the clicked coordinate (move slightly to the left and up)
            const adjustedCoord = [clickedCoord[0] + 400, clickedCoord[1] + 250]; // You can adjust these values

            // Get the current zoom level
            const currentZoom = map3.getView().getZoom();

            // Set the new zoom level (you can adjust this value)
            const newZoom = currentZoom + 1;

            // Set the new zoom level and center the map on the adjusted coordinate
            map3.getView().animate({ zoom: newZoom, center: adjustedCoord });
        };
    });


    // Staffans väg/ Norrvikenleden 9027
    // New Vector Layer setup with a square polygon
    const squarePolygon = new Polygon([
        [
            fromLonLat([17.91668, 59.47425]),
            fromLonLat([17.9172, 59.47368]),
            fromLonLat([17.91749, 59.47374]),
            fromLonLat([17.91754, 59.47439]),
            fromLonLat([17.91712, 59.4744]),
            fromLonLat([17.91668, 59.47425]),
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
    map3.addLayer(vectorLayer);



    // Rotebrovägen/ Kung Hans väg 9025
    // Create a new Polygon feature
    const newPolygonFeatureII = new Feature({
        geometry: new Polygon([
            [
                fromLonLat([17.91558, 59.47443]),
                fromLonLat([17.9154, 59.47438]),
                fromLonLat([17.915518, 59.47426]),
                fromLonLat([17.91543, 59.47424]),
                fromLonLat([17.91553, 59.47411]),
                fromLonLat([17.91537, 59.47395]),
                fromLonLat([17.91544, 59.47393]),
                fromLonLat([17.9154, 59.47387]),
                fromLonLat([17.91551, 59.47384]),
                fromLonLat([17.91582, 59.47416]),
                fromLonLat([17.91558, 59.47443]),

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
    map3.addLayer(newVectorLayerII);



    // Rotebrovägen/ Hertig Karls väg 9026 (laddstolpsidan)
    // Create a new Polygon feature
    const newPolygonFeatureIII = new Feature({
        geometry: new Polygon([
            [
                fromLonLat([17.91176, 59.47831]),
                fromLonLat([17.91166, 59.47826]),
                fromLonLat([17.91313, 59.47666]),
                fromLonLat([17.91327, 59.47668]),
                fromLonLat([17.91176, 59.47831]),


            ],
        ]),
    });
    // Configure the vector layer without style
    const vectorLayerIII = new VectorLayer({
        source: new VectorSource({
            features: [newPolygonFeatureIII],
        }),
    });

    // Add the new Vector Layer to the map
    map3.addLayer(vectorLayerIII);



    // Rotebrovägen/ Hertig Karls väg 9026
    // Create a new Polygon feature
    const newPolygonFeatureIIII = new Feature({
        geometry: new Polygon([
            [
                fromLonLat([17.91183, 59.47832]),
                fromLonLat([17.91272, 59.47734]),
                fromLonLat([17.91275,59.47738]),
                fromLonLat([17.91188, 59.47833]),
                fromLonLat([17.91183,59.47832]),
            ],
        ]),
    });
    // Configure the vector layer without style
    const vectorLayerIIII = new VectorLayer({
        source: new VectorSource({
            features: [newPolygonFeatureIIII],
        }),
    });

    // Add the new Vector Layer to the map
    map3.addLayer(vectorLayerIIII);

    // Staffans väg, 9028
    // Create a new Polygon feature
    const newPolygonFeatureIIIII = new Feature({
        geometry: new Polygon([
            [
                fromLonLat([17.91586,59.47575]),
                fromLonLat([17.91637, 59.47518]),
                fromLonLat([17.91679, 59.47524]),
                fromLonLat([17.91671, 59.47566]),
                fromLonLat([17.91661, 59.47577]),
                fromLonLat([17.91591, 59.47579]),
            ],
        ]),
    });
    // Configure the vector layer without style
    const vectorLayerIIIII = new VectorLayer({
        source: new VectorSource({
            features: [newPolygonFeatureIIIII],
        }),
    });

    // Add the new Vector Layer to the map
    map3.addLayer(vectorLayerIIIII);


    // Staffans väg/ Rotevägen 9029
    // Create a new Polygon feature
    const newPolygonFeatureIIIIII = new Feature({
        geometry: new Polygon([
            [
                fromLonLat([17.91599, 59.47932]),
                fromLonLat([17.91486, 59.4793]),
                fromLonLat([17.91486, 59.47925]),
                fromLonLat([17.91599, 59.47928]),
                fromLonLat([17.91599, 59.47932]),
            ],
        ]),
    });
    // Configure the vector layer without style
    const vectorLayerIIIIII = new VectorLayer({
        source: new VectorSource({
            features: [newPolygonFeatureIIIIII],
        }),
    });

    // Add the new Vector Layer to the map
    map3.addLayer(vectorLayerIIIIII);

    // Staffans väg/ Rotevägen (andra delen närmast spåret) 9029
    // Create a new Polygon feature
    const newPolygonFeatureIIIIIII = new Feature({
        geometry: new Polygon([
            [
                fromLonLat([17.91393, 59.47916]),
                fromLonLat([17.9127, 59.47885]),
                fromLonLat([17.91283, 59.4787]),
                fromLonLat([17.91403, 59.47899]),
                fromLonLat([17.91393, 59.47916]),
            ],
        ]),
    });
    // Configure the vector layer without style
    const vectorLayerIIIIIII = new VectorLayer({
        source: new VectorSource({
            features: [newPolygonFeatureIIIIIII],
        }),
    });


    // Add the new Vector Layer to the map
    map3.addLayer(vectorLayerIIIIIII);



   

    

    


    




    // Configure the same vector layer with a style
    vectorLayer.setStyle(new Style({
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
    vectorLayerIII.setStyle(new Style({
        fill: new Fill({
            color: 'rgba(0, 0, 255, 0.5)', // Red fill with 30% opacity
        }),
    }));

    // Configure the same vector layer with a style
    vectorLayerIIII.setStyle(new Style({
        fill: new Fill({
            color: 'rgba(0, 0, 255, 0.5)', // Red fill with 30% opacity
        }),
    }));
    
    // Configure the same vector layer with a style
    vectorLayerIIIII.setStyle(new Style({
        fill: new Fill({
            color: 'rgba(0, 0, 255, 0.5)', // Red fill with 30% opacity
        }),
    }));
    // Configure the same vector layer with a style
    vectorLayerIIIIII.setStyle(new Style({
        fill: new Fill({
            color: 'rgba(0, 0, 255, 0.5)', // Red fill with 30% opacity
        }),
    }));
    // Configure the same vector layer with a style
    vectorLayerIIIIIII.setStyle(new Style({
        fill: new Fill({
            color: 'rgba(0, 0, 255, 0.5)', // Red fill with 30% opacity
        }),
    }));

});

