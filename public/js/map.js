//  // TO MAKE THE MAP APPEAR YOU MUST
//  // ADD YOUR ACCESS TOKEN FROM
//  // https://account.mapbox.com



//  mapboxgl.accessToken = mapToken;
//  const map = new mapboxgl.Map({
//      container: 'map', // container ID
//      center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
//      zoom: 9, // starting zoom
//  });

//  const marker = new mapboxgl.Marker({ color: "red" })
//      .setLngLat(listing.geometry.coordinates) //Listing.geometry.coordinates
//      .setPopup(new mapboxgl.Popup({ offset: 25 })
//          .setHTML(`<h4>${listing.title}</h4><p>Exact Location will be provided after booking</p>`))
//      .addTo(map);

//maplibre
// public/js/map.js

// Safely get coords from listing.geometry or use fallback (Delhi)
// const coords = (listing.geometry && listing.geometry.coordinates) ?
//     listing.geometry.coordinates :
//     [77.209, 28.613]; // [lng, lat]

// // Initialize MapLibre map
// const map = new maplibregl.Map({
//     container: "map",
//     style: "https://tiles.stadiamaps.com/styles/osm_bright/style.json", // Free street map style
//     center: coords,
//     zoom: 13,
// });

// // Add zoom/rotation controls
// map.addControl(new maplibregl.NavigationControl(), "top-right");

// // Add marker + popup
// new maplibregl.Marker({ color: "red" })
//     .setLngLat(coords)
//     .setPopup(
//         new maplibregl.Popup({ offset: 25 }).setHTML(`
//             <h5>${listing.title}</h5>
//             <p>${listing.location}</p>
//         `)
//     )
//     .addTo(map);

//new
// public/js/map.js

// Initialize the map// map.js
if (typeof listing !== "undefined" && listing.longitude && listing.latitude) {
    const map = new maplibregl.Map({
        container: 'map',
        style: 'https://demotiles.maplibre.org/style.json',
        center: [listing.longitude, listing.latitude],
        zoom: 12
    });

    // Add zoom in/out controls
    map.addControl(new maplibregl.NavigationControl());

    // Add marker
    new maplibregl.Marker({ color: "red" })
        .setLngLat([listing.longitude, listing.latitude])
        .setPopup(
            new maplibregl.Popup({ offset: 25 })
            .setHTML(`<b>${listing.title}</b><br>₹ ${listing.price}/night`)
        )
        .addTo(map);

    // Fix white blank map issue
    map.on('load', () => {
        map.resize();
    });
}