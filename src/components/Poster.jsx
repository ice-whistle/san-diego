import './Resource.css';
import { Button, Card, CardContent, CardActions, Chip, Typography, CardMedia, CircularProgress } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';

export const Poster = ({accordionDetail, language}) =>{
  const theme = useTheme();
  const [imageLoading, setImageLoading] = useState(true);
  useEffect(() => {
    const img = new Image();
    img.src = accordionDetail.image;
    img.onload = () => setImageLoading(false);
    }, [accordionDetail.image]);
  return (
    <Card elevation={3} sx={{borderRadius: '12px'}} >
        {imageLoading && <div className='posterImage'>
            <CircularProgress />
        </div>}
        {!imageLoading && <CardMedia
            component="img"
            className='posterImage'
            image={accordionDetail.image}
            alt="Paella dish"
        />}
        <CardContent sx={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <div style={{display: 'flex'}}><Chip sx={{backgroundColor: theme.palette.primary.extraLight}} label={language === 'EN' ? accordionDetail.chipEN : accordionDetail.chipES}/></div>
            <Typography variant='h6' sx={{textAlign: 'left', fontWeight: 'bold'}}>{language === 'EN' ? accordionDetail.titleEN : accordionDetail.titleES}</Typography>
        </CardContent>
        <CardActions sx={{display: 'flex', padding: '0 16px 16px 16px'}}>
            <Button href={accordionDetail.link} color='primary' target="_blank" variant="contained" sx={{width: '100%'}}>{language === 'EN' ? accordionDetail.buttonLabelEN : accordionDetail.buttonLabelES}</Button>
        </CardActions>
    </Card>
  );
}