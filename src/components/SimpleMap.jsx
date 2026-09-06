import './SimpleMap.css';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl, CircleMarker } from 'react-leaflet'
import { useScreenResolution } from '../utils/ScreenSize.tsx';
import { severityDescriptionEN, severityDescriptionES, severityIcon, severityLevel, severityTitleEN, severityTitleES } from '../utils/utils.js';
import { Card, IconButton, Tooltip, Typography, Switch, FormControlLabel } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const SimpleMap = ({
    language,
    alerts,
    cameras,
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

    const [formats, setFormats] = useState(() => []);

    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
    };

    const [flockMapOn, setFlockMapOn] = useState(true);

    const handleFlockToggle = (event) => {
        setFlockMapOn(event.target.checked);
    };
    
  return (
    <div className='map'>
        <Card elevation={3} className="mapToggle">
          <FormControlLabel
            control={
                <Switch checked={flockMapOn} onChange={handleFlockToggle} name="FlockMap" />
            }
            slotProps={{
                typography: { sx: { fontWeight: flockMapOn ? 'bold' : 'unset' } }
            }}
            label={language === 'EN' ? flockMapOn ? 'Flock Camera Map On' : 'Flock Camera Map Off' : flockMapOn ? 'Mapa de Cámaras Flock Activado' : 'Mapa de Cámaras Flock Desactivado'}
        />
        </Card>
        <MapContainer center={[33.0093, -117.0421]} zoom={10} scrollWheelZoom={false} zoomControl={false} style={{height: '100%'}}>
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
            {flockMapOn && cameras && cameras.length && cameras.map(camera => (
                <CircleMarker
                    key={`cameraPin-${camera.id}`}
                    center={[Number(camera.lat), Number(camera.lon)]}
                    radius={4}
                    weight={2}
                    color='#000000'
                    fillColor='#ff0000'
                    fillOpacity={1}
                    interactive={false}
                    >
                </CircleMarker>
            ))}
            <ZoomControl position="bottomleft" />
            <ResizeMap center={focusedCenter} zoom={focusedZoom} trigger={[alerts, isXLarge, isLarge, isSmall, isMedium, isXSmall]} />
        </MapContainer>
        <Card elevation={3} className="mapLegend">
            <Typography variant='subtitle2' fontWeight={700} sx={{gridColumn: {xs: 'span 2', sm: 'span 2'}}}>{language === 'EN' ? 'Severity' : 'Gravedad'}</Typography>
            {severityTitleEN.map((item, i) => (
                <div className="legendItem" key={i}>
                    <img src={severityIcon[i].options.iconUrl} alt="" className="legendIcon" />
                    <Typography variant='caption' sx={{textAlign: 'left'}} color={`${severityLevel[i]}.dark`}>{language === 'EN' ? severityTitleEN[i] : severityTitleES[i]}</Typography>
                    <Tooltip title={language === 'EN' ? severityDescriptionEN[i] : severityDescriptionES[i]}>
                        <IconButton>
                            <InfoOutlinedIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
            ))}
            <div className="legendItem" key={5}>
                <div className="legendCameraIcon" />
                <Typography variant='caption' sx={{textAlign: 'left'}}>{language === 'EN' ? 'Flock Camera' : 'Cámara Flock'}</Typography>
                <Tooltip title={language === 'EN' ? 'The Flock Camera map is updated every week. The map shows Flock cameras within a 50 mile radius of the center of zipcode 92116.' : 'El mapa de cámaras Flock se actualiza cada semana. El mapa muestra las cámaras Flock situadas en un radio de 50 millas desde el centro del código postal 92116.'}>
                    <IconButton>
                        <InfoOutlinedIcon/>
                    </IconButton>
                </Tooltip>
            </div>
        </Card>
    </div>
  );
}