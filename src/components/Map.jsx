import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS to override default styles
import React from 'react';
import L from 'leaflet'
import { isBetween } from '../util/util';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css'


function MyComponent(props) {
    const {center, zoom} = props
    const map = useMap();

    React.useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null
}

// import { useMap, useEffect } from 'react-leaflet';

function MapEventHandlers(props) {
    const {setTop, setRight, setBottom, setLeft, setZoom} = props
    const map = useMap();

    React.useEffect(() => {
        const handleMoveEnd = () => {
            const bound = map.getBounds()
            if (bound === null) return
            const top = bound._northEast.lat
            const right = bound._northEast.lng
            const bottom = bound._southWest.lat
            const left = bound._southWest.lng
            // console.log(map.getZoom())
            setTop(top)
            setRight(right)
            setBottom(bottom)
            setLeft(left)
            setZoom(map.getZoom())

            // console.log(map.getZoom())
        };

        map.on("moveend", handleMoveEnd);

        // Cleanup function to remove the event listener when component unmounts
        return () => {
            map.off("moveend", handleMoveEnd);
        };
    }, [map, setTop, setRight, setBottom, setLeft]);
  
    return null;
}

  
function Map(props) {
    
    const {sortedSubset, center, setCenter, setHouseEntry, setSelectedAddr} = props
    const [top, setTop] = React.useState(0)
    const [right, setRight] = React.useState(0)
    const [bottom, setBottom] = React.useState(0)
    const [left, setLeft] = React.useState(0)
    const [zoom, setZoom] = React.useState(18)
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    })
    // console.log(center)
    const biggerIcon = L.icon({
        iconUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconSize: [40, 60], // Set the size of the icon
        iconAnchor: [20, 59], // Set the anchor point of the icon
        popupAnchor: [1, -34] // Set the popup anchor
    });
    
    
    const subsetOnMap = sortedSubset.filter(house => {
        return isBetween(house[2], top, bottom) && isBetween(house[3], left, right)
    })
    .filter(house => {
        return !(house[2] === center[0] && house[3] === center[1])
    })

    const handleMarkerClick = (event) => {
        // console.log('Marker clicked:', event.latlng); // Log marker position when clicked
        setCenter([event.latlng.lat, event.latlng.lng])
        const newHouse = subsetOnMap.filter(house => house[2] === event.latlng.lat && house[3] === event.latlng.lng)[0]
        setHouseEntry(newHouse)
        // console.log(newHouse[0])
        setSelectedAddr(newHouse[0])
    };

    return (
        <div style={{ width: "600px", height: "600px"}}>
            <MapContainer 
            center={center} 
            zoom={18} 
            style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution="(C) Esri"
                />
                <MapEventHandlers 
                setTop={setTop}
                setRight={setRight}
                setBottom={setBottom}
                setLeft={setLeft}
                setZoom={setZoom}
                />
                <MyComponent 
                center={center}
                zoom={18} 
                setTop={setTop}
                />
            
                <Marker position={center}/>

                {/* {zoom === 18 ? 
                subsetOnMap.map((house, idx) => {
                    // console.log(idx);
                    return <Marker 
                    key={idx} 
                    position={[house[2], house[3]]}
                    eventHandlers={{ click: handleMarkerClick }}
                    />
                }) : 
                <MarkerClusterGroup>
                    {subsetOnMap.map((house, idx) => {
                    // console.log(idx);
                    return <Marker 
                    key={idx} 
                    position={[house[2], house[3]]}
                    eventHandlers={{ click: handleMarkerClick }}
                    // icon={biggerIcon} // Apply custom style here
                >
                </Marker>
                })}
                </MarkerClusterGroup>
                } */}

                
            </MapContainer>
        </div>
    );
}

export default Map;
