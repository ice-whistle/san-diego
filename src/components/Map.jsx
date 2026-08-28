import './Map.css';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet'
import { useScreenResolution } from '../utils/ScreenSize.tsx';
import { severityDescriptionEN, severityDescriptionES, severityIcon, severityLevel, severityTitleEN, severityTitleES } from '../utils/utils.js';
import { Alert, Card, IconButton, Tooltip, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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
        <Alert variant='filled' severity='info' className='mapInfo'>
            <Typography variant='subtitle2' sx={{display: 'flex', textAlign: 'left'}}>
            {language === 'EN' ?
                'This is a list of community reported ICE sightings within the greater San Diego area from the last 7 days. Please note that this is not an exhaustive list and that there may be more sightings not reported. Map data is sourced from StopICE.net.':
                'Esta es una lista de avistamientos de ICE reportados por la comunidad dentro del área metropolitana de San Diego durante los últimos 7 días. Tenga en cuenta que esta no es una lista exhaustiva y que podría haber más avistamientos que no han sido reportados. Los datos del mapa provienen de StopICE.net.'}
            </Typography>
        </Alert>
        <MapContainer center={[33.0093, -117.0421]} zoom={9} scrollWheelZoom={false} zoomControl={false} style={{height: '100%'}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {alerts && alerts.length && alerts.map(alert => (
                <Marker
                    key={`alertPin-${alert.id}`}
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
            <ZoomControl position="bottomleft" />
            <ResizeMap center={focusedCenter} zoom={focusedZoom} trigger={[alerts, isXLarge, isLarge, isSmall, isMedium, isXSmall]} />
        </MapContainer>
        <Card elevation={3} className="mapLegend">
            <Typography variant='subtitle2' fontWeight={700} sx={{gridColumn: {xs: 'span 2', sm: 'span 2'}}}>{language === 'EN' ? 'Severity' : 'Gravedad'}</Typography>
            {severityTitleEN.map((item, i) => (
                <div className="legendItem" key={i}>
                    <img src={severityIcon[i].options.iconUrl} alt="" className="legendIcon" />
                    <Typography variant='caption' color={`${severityLevel[i]}.dark`}>{language === 'EN' ? severityTitleEN[i] : severityTitleES[i]}</Typography>
                    <Tooltip title={language === 'EN' ? severityDescriptionEN[i] : severityDescriptionES[i]}>
                        <IconButton>
                            <InfoOutlinedIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
            ))}
        </Card>
    </div>
  );
}