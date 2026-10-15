import './DataHeatMap.css';
import { MapContainer, TileLayer, Popup, ZoomControl, Polygon } from 'react-leaflet'
import { zipCodePolygons } from '../utils/zipCodePolygons.js';

export const DataHeatMap = ({
    analysisAlerts,
    zipCounts,
    startDate,
    endDate
}) =>{

    const maxZipCodeCount = Math.max(1, ...Object.values(zipCounts || {}));
    const zipCodesToKeep = new Set(
        analysisAlerts.map(alert => alert.zipCode)
    );
    const filteredZipCodePolygons = {
        ...zipCodePolygons,
        features: zipCodePolygons.features.filter(feature =>
            zipCodesToKeep.has(feature.properties.ZCTA5CE20)
        )
    };
    const COLORS = ["#ffffb2", "#fed976", "#feb24c", "#fd8d3c", "#f03b20", "#bd0026"];
    const colorFor = (count, max) => {
    if (!count) return '#ffffff';
    const t = Math.sqrt(count / max);
    return COLORS[Math.min(COLORS.length - 1, Math.floor(t * COLORS.length))];
    };
    
  return (
    <div className='dataHeat-map'>
        <MapContainer center={[33.0093, -117.0421]} zoom={9} scrollWheelZoom={false} zoomControl={false} style={{height: '100%'}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredZipCodePolygons.features
            .map(polygon => (
                <Polygon fillOpacity={0.5} color={colorFor(zipCounts?.[polygon.properties.ZCTA5CE20], maxZipCodeCount)} positions={polygon.geometry.coordinates[0]}>
                    <Popup>{`${polygon.properties.ZCTA5CE20}: ${zipCounts?.[polygon.properties.ZCTA5CE20]} alerts from ${startDate} to ${endDate}`}</Popup>
                </Polygon>
            ))}
            <ZoomControl position="bottomleft" />
        </MapContainer>
    </div>
  );
}