import './Pages.css';
import { CircularProgress, Grid, Typography, Button } from '@mui/material';
import { SimpleMap } from '../components/Map.jsx';
import { useScreenResolution } from '../utils/ScreenSize.tsx';
import { AlertList } from '../components/AlertList.jsx';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useRef } from 'react';

export const LiveMap = ({
          language,
          alerts,
          alertsLoading,
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

  const handleClickAlert = (alert) => {
    if ((isXSmall || isSmall) && mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setFocusedCenter([Number(alert.lat), Number(alert.long)]);
    setFocusedZoom(12);
    setFocusedAlertId(alert.id);
  };
    
  return (
    <div className='pageContainer'>
        <Typography variant='h4'>{language === 'EN' ? 'Live Map' : 'Mapa en vivo'}</Typography>
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
                focusedCenter={focusedCenter}
                focusedZoom={focusedZoom}
                handleClickAlert={handleClickAlert}/>
            </Grid>
          }
        </Grid>}
    </div>
  );
}