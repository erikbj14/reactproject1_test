





// ragnar lundqvistvag
// Create a new Polygon feature
const newPolygonFeatureIII = new Feature({
    geometry: new Polygon([
        [


            fromLonLat([17.91173, 59.47829]),
            fromLonLat([17.91167, 59.47825]),
            fromLonLat([17.91258, 59.47728]),
            fromLonLat([17.91266, 59.47732]),
            fromLonLat([17.91173, 59.47829]),

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
map3.addLayer(newVectorLayerIII);












