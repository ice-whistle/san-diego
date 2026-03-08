import './Pages.css';
import { Alert, AlertTitle, Card, CardActionArea, CardContent, Divider, Grid, Typography } from '@mui/material';
import { SimpleMap } from '../components/Map';
import { useScreenResolution } from '../utils/ScreenSize.tsx';
import { severityLevel, severityTitleEN, severityTitleES } from '../utils/utils.js';
import { formatDate } from '../utils/getAPIResults.js';

export const LiveMap = ({
          language,
          alerts,
          setFocusedCenter,
          focusedCenter,
          setFocusedZoom,
          focusedZoom,
          setFocusedAlertId,
          focusedAlertId}) =>{

  const { isXSmall, isSmall } = useScreenResolution();

  const handleClickAlert = (alert) => {
    setFocusedCenter([Number(alert.lat), Number(alert.long)]);
    setFocusedZoom(12);
    setFocusedAlertId(alert.id);
  };
    
  return (
    <div className='pageContainer'>
        <h1>{language === 'EN' ? 'Live Map' : 'Mapa en vivo'}</h1>
        <Alert variant='outlined' severity='info' >
          <Typography variant='subtitle2' sx={{display: 'flex', textAlign: 'left'}}>
            {language === 'EN' ?
              'This is a list of community reported ICE sightings within the greater San Diego area from the last 7 days. Please note that this is not an exhaustive list and that there may be more sightings not reported.':
              'Esta es una lista de avistamientos de ICE reportados por la comunidad en el área metropolitana de San Diego durante los últimos 7 días. Tenga en cuenta que esta lista no es exhaustiva y que podría haber más avistamientos no reportados.'}
          </Typography>
        </Alert>
        <Grid container spacing={2}>
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
                          <AlertTitle sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Typography variant='body1' sx={{textAlign: 'left', fontWeight: 'bold'}}>
                              {language === 'EN' ?
                                severityTitleEN[alert.priority - 1]:
                                severityTitleES[alert.priority - 1]
                              }
                            </Typography>
                            <Typography variant='caption' sx={{textAlign: 'right', whiteSpace: 'nowrap'}}>{formatDate(alert.created)}</Typography>
                          </AlertTitle>
                          <Divider sx={{marginTop: '8px', marginBottom: '8px'}}/>
                          <Typography variant='subtitle2' sx={{display: 'flex', textAlign: 'left', fontWeight: 'bold'}}>{alert.address}</Typography>
                          <Typography variant='subtitle2' sx={{display: 'flex', textAlign: 'left'}}>{alert.description}</Typography>
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
                language={language}
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