import './Pages.css';
import { Alert, AlertTitle, Card, CardActionArea, CardContent, Grid } from '@mui/material';
import { SimpleMap } from '../components/Map';
import { useScreenResolution } from '../utils/ScreenSize.tsx';
import { severityLevel, severityTitle } from '../utils/utils.js';

export const LiveMap = ({
          language,
          alerts,
          setFocusedCenter,
          focusedCenter,
          setFocusedZoom,
          focusedZoom,
          setFocusedAlertId,
          focusedAlertId}) =>{

  const { isXSmall, isSmall, isMedium } = useScreenResolution();

  const handleClickAlert = (alert) => {
    setFocusedCenter([Number(alert.lat), Number(alert.long)]);
    setFocusedZoom(12);
    setFocusedAlertId(alert.id);
  };
    
  return (
    <div className='pageContainer'>
        <h1>{language === 'EN' ? 'Live Map' : 'Mapa en vivo'}</h1>
        <Grid container spacing={2}>
          {(isSmall || isXSmall) &&
            <Grid size={12}>
              <SimpleMap
                alerts={alerts}
                focusedCenter={focusedCenter}
                focusedZoom={focusedZoom}
                handleClickAlert={handleClickAlert}/>
            </Grid>
          }
          <Grid size={{lg: 4, md: 4, sm: 12, xs: 12}} sx={{maxHeight: '795px'}}>
            <Card elevation={3} sx={{height: '100%', overflowY: 'scroll'}}>
              <CardContent>
                {alerts.length === 0 && <Alert severity='info'>
                  <AlertTitle>No updates</AlertTitle>
                  There have been no sightings in the last 7 days.
                </Alert>}
                <Grid container spacing={2}>
                  {alerts.map(alert => (
                    <Grid size={12}>
                      <CardActionArea onClick={()=>handleClickAlert(alert)}>
                        <Alert severity={severityLevel[alert.priority - 1]} variant={alert.id === focusedAlertId ? 'filled' : 'standard'}>
                          <AlertTitle sx={{textAlign: 'left', fontWeight: 'bold'}}>{severityTitle[alert.priority - 1]}</AlertTitle>
                          <AlertTitle sx={{textAlign: 'left'}}>{alert.address}</AlertTitle>
                          <div style={{display: 'flex', textAlign: 'left'}}>{alert.description}</div>
                        </Alert>
                      </CardActionArea>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {!isSmall && !isXSmall && 
            <Grid size={8}>
              <SimpleMap
                alerts={alerts}
                focusedCenter={focusedCenter}
                focusedZoom={focusedZoom}
                handleClickAlert={handleClickAlert}/>
            </Grid>
          }
        </Grid>
    </div>
  );
}