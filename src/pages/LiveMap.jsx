import './Pages.css';
import { CircularProgress, Grid, Typography, Button, Alert } from '@mui/material';
import { SimpleMap } from '../components/SimpleMap.jsx';
import { useScreenResolution } from '../utils/ScreenSize.tsx';
import { AlertList } from '../components/AlertList.jsx';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useRef, useEffect, useState } from 'react';

export const LiveMap = ({
          language,
          alerts,
          alertsLoading,
          cameras,
          camerasLoading,
          setFocusedCenter,
          focusedCenter,
          setFocusedZoom,
          focusedZoom,
          setFocusedAlertId,
          focusedAlertId,
          setModal,
          setModalContent
        }) =>{

  const { isXSmall, isSmall } = useScreenResolution();
  const mapRef = useRef(null);
  const [cameraError, setCameraError] = useState(false);

  const handleClickAlert = (alert) => {
    if ((isXSmall || isSmall) && mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setFocusedCenter([Number(alert.lat), Number(alert.long)]);
    setFocusedZoom(12);
    setFocusedAlertId(alert.id);
  };

  useEffect(() => {
      if (!camerasLoading && (cameras === 'Error' || !cameras || cameras.length === 0)) {
          setCameraError(true);
      }
  }, [camerasLoading, cameras]);
    
  return (
    <div className='pageContainer'>
        <Typography variant='h4'>{language === 'EN' ? 'Live Map' : 'Mapa en vivo'}</Typography>
        <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
          <Alert variant='filled' severity='info'>
              <Typography variant='subtitle2' sx={{display: 'flex', textAlign: 'left'}}>
              {language === 'EN' ?
                  'This is a list of community reported ICE sightings within the greater San Diego area from the last 7 days. Please note that this is not an exhaustive list and that there may be more sightings not reported. Sighting data is sourced from StopICE.net. The Flock Camera Map shows a list of Flock cameras received from the Overpass API.':
                  'Esta es una lista de avistamientos de ICE reportados por la comunidad en el área metropolitana de San Diego durante los últimos 7 días. Tenga en cuenta que esta no es una lista exhaustiva y que puede haber más avistamientos que no han sido reportados. Los datos sobre los avistamientos provienen de StopICE.net. El mapa de cámaras Flock muestra una lista de cámaras Flock obtenida a través de la API Overpass.'}
              </Typography>
          </Alert>
          {cameraError && <Alert variant='filled' severity='warning'>
              <Typography variant='subtitle2' sx={{display: 'flex', textAlign: 'left'}}>
              {language === 'EN' ?
                  'The Flock Camera Map is not loading. Please try again later.':
                  'El mapa de cámaras Flock no se está cargando. Por favor, inténtelo de nuevo más tarde.'}
              </Typography>
          </Alert>}
        </div>
        {(isSmall || isXSmall)  && <Button startIcon={<LocalPhoneIcon />} onClick={()=>setModal('callEmergency')} color='secondary' target="_blank" variant="contained" size='large' >{language === 'EN' ? 'Emergency' : 'Emergencia'}</Button>}
        {alertsLoading && <div>
            <CircularProgress />
          </div>}
        {!alertsLoading && <Grid container spacing={2} sx={{height: {md: '70vh'}}}>
          {(isSmall || isXSmall) &&
            <Grid size={12} ref={mapRef}>
              <SimpleMap
                mapRef={mapRef}
                language={language}
                alerts={alerts}
                cameras={cameras}
                cameraError={cameraError}
                camerasLoading={camerasLoading}
                focusedCenter={focusedCenter}
                focusedZoom={focusedZoom}
                handleClickAlert={handleClickAlert}/>
            </Grid>
          }
          <AlertList alerts={alerts} language={language} handleClickAlert={handleClickAlert} focusedAlertId={focusedAlertId} setModal={setModal} setModalContent={setModalContent}/>
          {!isSmall && !isXSmall && 
            <Grid size={8}>
              <SimpleMap
                language={language}
                alerts={alerts}
                cameras={cameras}
                camerasLoading={camerasLoading}
                cameraError={cameraError}
                focusedCenter={focusedCenter}
                focusedZoom={focusedZoom}
                handleClickAlert={handleClickAlert}/>
            </Grid>
          }
        </Grid>}
    </div>
  );
}