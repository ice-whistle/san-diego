import { Grid, Card, CardContent, CardActionArea, Typography, Alert, AlertTitle, Divider, Button, Box, CardActions, CircularProgress } from "@mui/material";
import { severityLevel, severityTitleEN, severityTitleES } from '../utils/utils.js';
import { formatDate } from '../utils/getAPIResults.js';
import { CBPVehicle } from "../assets/images/index.js";
import './AlertList.css';
import { useEffect, useState } from "react";

export const AlertList = ({
    alerts,
    language,
    handleClickAlert,
    focusedAlertId,
    setModal,
    setModalContent
}) =>{
    const ImageModal = ({title, src, setModal, language, color}) => {
        const imageSources = src.replaceAll(' ', '').split(",").filter(str => str !== "");
        const [imageLoading, setImageLoading] = useState(true);

        useEffect(() => {
            let isCancelled = false;
            setImageLoading(true);

            const loadImage = (source) =>
                new Promise((resolve) => {
                    const img = new Image();
                    img.src = source;
                    img.onload = resolve;
                    img.onerror = resolve;
                });

            Promise.all(imageSources.map(loadImage)).then(() => {
                if (!isCancelled) setImageLoading(false);
            });

            return () => { isCancelled = true; };
        }, [src]);
        return ( 
            <div className="modalContainer">
                <CardContent sx={{display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', minHeight: 0}}>
                    <Typography variant='h5' sx={{textAlign: 'left', fontWeight: 'bold', color: color}}>{title}</Typography>
                    {imageLoading &&
                    <div className='imageContainer'>
                        <CircularProgress />
                    </div>}
                    {!imageLoading &&
                    <div className="imageContainer">
                        {imageSources.map((imageSource, i) => (
                        <Box key={`image-${i}`} component="img" className="image" alt={`${title} image`} src={imageSource}/>
                        ))}
                    </div>}
                </CardContent>
                <CardActions sx={{display: 'flex', padding: '0 16px 16px 16px'}}>
                    <Button onClick={()=>{setModal(null); setModalContent(null);}} color='secondary' target="_blank" variant="outlined" size='large' sx={{width: '100%', height: '100%'}}>{language === 'EN' ? 'Close' : 'Cerrar'}</Button>
                </CardActions>
            </div>
        );
    }

  return (
    <Grid size={{lg: 4, md: 4, sm: 12, xs: 12}} sx={{height: {md: '100%'}}}>
        <Card elevation={3} sx={{height: '100%', overflowY: 'scroll'}}>
            <CardContent>
                {alerts.length === 0 && <Alert severity='info'>
                    <AlertTitle>No updates</AlertTitle>
                    There have been no sightings in the last 7 days.
                </Alert>}
                <Grid container spacing={2}>
                    {alerts.map((alert, i) => (
                    <Grid size={12} key={`alert-${i}`}>
                        <CardActionArea id='one' component="div" onClick={()=>handleClickAlert(alert)} sx={{width: 'stretch'}}>
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
                                {alert.media && <Button variant="contained" sx={{marginTop: '12px', width: 'stretch', backgroundColor: `${severityLevel[alert.priority - 1]}.light`}} onClick={()=>{setModal('viewImages'); setModalContent(<ImageModal title={alert.address.toUpperCase()} src={alert.media} setModal={setModal} language={language} color={`${severityLevel[alert.priority - 1]}.dark`}/>)}}>{language === 'EN' ? 'View image' : 'Ver imagen'}</Button>}
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