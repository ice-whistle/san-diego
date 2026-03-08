import './Map.css';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { useScreenResolution } from '../utils/ScreenSize.tsx';
import { severityIcon, severityTitleEN, severityTitleES } from '../utils/utils.js';

export const SimpleMap = ({
    language,
    alerts,
    focusedCenter,
    focusedZoom,
    handleClickAlert}) =>{
    const { isXSmall, isSmall, isMedium, isLarge, isXLarge } = useScreenResolution();

    function ResizeMap({ center, zoom, trigger }) {
        const map = useMap();

    useEffect(() => {
        if (!map || !map._loaded) return;

        const resizeTimer = setTimeout(() => {
            map.invalidateSize();
            if (center && zoom) {
                map.setView(center, zoom, { animate: false });
            }
            }, 100);
            return () => clearTimeout(resizeTimer);
        }, [map, center, zoom, trigger]);
        return null;
    }

    
    
  return (
    <div className='map'>
        <MapContainer center={[32.7157, -117.1611]} zoom={9} scrollWheelZoom={false} style={{height: '100%'}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {alerts && alerts.length && alerts.map(alert => (
                <Marker
                    position={[Number(alert.lat), Number(alert.long)]}
                    icon={severityIcon[alert.priority - 1]}
                    eventHandlers={{
                        click: () => {
                        handleClickAlert(alert);
                        },
                    }}>
                    <Popup>
                    {language === 'EN' ?
                        severityTitleEN[alert.priority - 1]:
                        severityTitleES[alert.priority - 1]}
                    <br/>
                    {alert.address}
                    </Popup>
                </Marker>
            ))}
            <ResizeMap center={focusedCenter} zoom={focusedZoom} trigger={[alerts, isXLarge, isLarge, isSmall, isMedium, isXSmall]} />
        </MapContainer>
    </div>
  );
}