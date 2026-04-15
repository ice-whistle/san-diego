import { Grid, Card, CardContent, CardActionArea, Typography, Alert, AlertTitle, Divider } from "@mui/material";
import { severityLevel, severityTitleEN, severityTitleES } from '../utils/utils.js';
import { formatDate } from '../utils/getAPIResults.js';

export const AlertList = ({
    alerts,
    language,
    handleClickAlert,
    focusedAlertId
}) =>{
  return (
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
                    <CardActionArea id='one' onClick={()=>handleClickAlert(alert)} sx={{width: 'stretch'}}>
                        <Alert id='two' severity={severityLevel[alert.priority - 1]} variant={alert.id === focusedAlertId ? 'filled' : 'standard'} sx={{"& .MuiAlert-message": {width: '100%'}}}>
                            <AlertTitle id='three' sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 'stretch'}}>
                                <Typography variant='body1' sx={{textAlign: 'left', fontWeight: 'bold'}} color={alert.id === focusedAlertId ? 'white' : `${severityLevel[alert.priority - 1]}.dark`}>
                                    {language === 'EN' ?
                                    severityTitleEN[alert.priority - 1]:
                                    severityTitleES[alert.priority - 1]
                                    }
                                </Typography>
                                <Typography variant='caption' sx={{textAlign: 'right', whiteSpace: 'nowrap'}} color={alert.id === focusedAlertId ? 'white' : `${severityLevel[alert.priority - 1]}.dark`}>{formatDate(alert.created)}</Typography>
                            </AlertTitle>
                            <Divider sx={{marginTop: '8px', marginBottom: '8px', width: 'stretch'}}/>
                            <Typography variant='subtitle2' sx={{display: 'flex', textAlign: 'left', fontWeight: 'bold', width: 'stretch'}}>{alert.address.toUpperCase()}</Typography>
                            <Typography variant='subtitle2' sx={{display: 'flex', textAlign: 'left', width: 'stretch'}}>{alert.description}</Typography>
                        </Alert>
                    </CardActionArea>
                </Grid>
                ))}
            </Grid>
            </CardContent>
        </Card>
    </Grid>
  );
}