import './Pages.css';
import { Alert, CircularProgress, Grid, Typography, Button } from '@mui/material';
import { SimpleMap } from '../components/Map.jsx';
import { useScreenResolution } from '../utils/ScreenSize.tsx';
import { AlertList } from '../components/AlertList.jsx';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

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
          setModal
        }) =>{

  const { isXSmall, isSmall } = useScreenResolution();

  const handleClickAlert = (alert) => {
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
        {!alertsLoading && <Alert variant='outlined' severity='info' >
          <Typography variant='subtitle2' sx={{display: 'flex', textAlign: 'left'}}>
            {language === 'EN' ?
              'This is a list of community reported ICE sightings within the greater San Diego area from the last 7 days. Please note that this is not an exhaustive list and that there may be more sightings not reported. Map data is sourced from StopICE.net.':
              'Esta es una lista de avistamientos de ICE reportados por la comunidad dentro del área metropolitana de San Diego durante los últimos 7 días. Tenga en cuenta que esta no es una lista exhaustiva y que podría haber más avistamientos que no han sido reportados. Los datos del mapa provienen de StopICE.net.'}
          </Typography>
        </Alert>}
        {!alertsLoading && <Grid container spacing={2}>
          {(isSmall || isXSmall) &&
            <Grid size={12}>
              <SimpleMap
                language={language}
                alerts={alerts}
                focusedCenter={focusedCenter}
                focusedZoom={focusedZoom}
                handleClickAlert={handleClickAlert}/>
            </Grid>
          }
          <AlertList alerts={alerts} language={language} handleClickAlert={handleClickAlert} focusedAlertId={focusedAlertId}/>
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