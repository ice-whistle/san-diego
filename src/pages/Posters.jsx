import './Pages.css';
import { Grid, Typography } from '@mui/material';
import { Poster } from '../components/Poster.jsx';
import {
    ICEWhistlePoster1,
    ICEWhistlePoster2,
    ICEWhistlePoster3,
    ICEWhistlePoster4,
    ICEWhistlePoster5,
    ICEWhistlePoster6
} from '../assets/images'
import {
    ICEWhistlePosterPDF1,
    ICEWhistlePosterPDF2,
    ICEWhistlePosterPDF3,
    ICEWhistlePosterPDF4,
    ICEWhistlePosterPDF5,
    ICEWhistlePosterPDF6
} from '../assets/documents'

export const Posters = ({language, setFocusedCenter, setFocusedZoom, setFocusedAlertId}) =>{
  setFocusedCenter(null);
  setFocusedZoom(null);
  setFocusedAlertId(null);

  const accordionDetails = [
    {
      chipEN: 'Monarch Butterfly Series',
      chipES: 'Serie de la Mariposa Monarca',
      titleEN: 'Abolish ICE #1: 8.5"x11"',
      titleES: 'Abolir el ICE #1: 8.5"x11"',
      image: ICEWhistlePoster1,
      buttonLabelEN: 'Download PDF',
      buttonLabelES: 'Descargar PDF',
      link: ICEWhistlePosterPDF1
    },
    {
      chipEN: 'Monarch Butterfly Series',
      chipES: 'Serie de la Mariposa Monarca',
      titleEN: 'Abolish ICE #2: 8.5"x11"',
      titleES: 'Abolir el ICE #2: 8.5"x11"',
      image: ICEWhistlePoster2,
      buttonLabelEN: 'Download PDF',
      buttonLabelES: 'Descargar PDF',
      link: ICEWhistlePosterPDF2
    },
    {
      chipEN: 'Monarch Butterfly Series',
      chipES: 'Serie de la Mariposa Monarca',
      titleEN: 'Abolish ICE #3: 8.5"x11"',
      titleES: 'Abolir el ICE #3: 8.5"x11"',
      image: ICEWhistlePoster3,
      buttonLabelEN: 'Download PDF',
      buttonLabelES: 'Descargar PDF',
      link: ICEWhistlePosterPDF3
    },
    {
      chipEN: 'Monarch Butterfly Series',
      chipES: 'Serie de la Mariposa Monarca',
      titleEN: 'Abolish ICE #4: 8.5"x11"',
      titleES: 'Abolir el ICE #4: 8.5"x11"',
      image: ICEWhistlePoster4,
      buttonLabelEN: 'Download PDF',
      buttonLabelES: 'Descargar PDF',
      link: ICEWhistlePosterPDF4
    },
    {
      chipEN: 'Monarch Butterfly Series',
      chipES: 'Serie de la Mariposa Monarca',
      titleEN: 'Abolish ICE #5: 8.5"x11"',
      titleES: 'Abolir el ICE #5: 8.5"x11"',
      image: ICEWhistlePoster5,
      buttonLabelEN: 'Download PDF',
      buttonLabelES: 'Descargar PDF',
      link: ICEWhistlePosterPDF5
    },
    {
      chipEN: 'Monarch Butterfly Series',
      chipES: 'Serie de la Mariposa Monarca',
      titleEN: 'Abolish ICE #6: 8.5"x11"',
      titleES: 'Abolir el ICE #6: 8.5"x11"',
      image: ICEWhistlePoster6,
      buttonLabelEN: 'Download PDF',
      buttonLabelES: 'Descargar PDF',
      link: ICEWhistlePosterPDF6
    },
  ]
  return (
    <div className='pageContainer'>
        <Typography variant='h4'>{language === 'EN' ? 'Posters' : 'Carteles'}</Typography>
        <Grid container spacing={2}>
            {accordionDetails.map(accordionDetail => (
                <Grid size={{lg: 4, md: 6, sm: 12, xs: 12}}><Poster accordionDetail={accordionDetail} language={language}/></Grid>
            ))}
        </Grid>
    </div>
  );
}