import './Pages.css';
import { Grid, Typography } from '@mui/material';
import { Resource } from '../components/Resource.jsx';

export const Resources = ({language, setFocusedCenter, setFocusedZoom, setFocusedAlertId}) =>{
  setFocusedCenter(null);
  setFocusedZoom(null);
  setFocusedAlertId(null);

  const resourceDetails = [
    {
      chipEN: 'ILRC',
      chipES: 'ILRC',
      titleEN: 'Red Cards',
      titleES: 'Tarjetas Rojas',
      detailsEN: 'The ILRC\'s red cards give examples of how people can exercise their rights.',
      detailsES: 'Las tarjetas rojas del ILRC dan ejemplos de cómo las personas pueden ejercer sus derechos.',
      buttonLabelEN: 'Download PDF',
      buttonLabelES: 'Descargar PDF',
      linkEN: 'https://www.ilrc.org/sites/default/files/documents/red_card-self_srv-english.pdf',
      linkES: 'https://www.ilrc.org/sites/default/files/2025-01/Artwork%20for%20Printing%20Your%20Own%20Red%20Cards%20-%20Spanish.pdf'
    },
    {
      chipEN: 'ICE Whistle',
      chipES: 'ICE Whistle',
      titleEN: 'Identifying ICE Vehicles',
      titleES: 'Identificación de vehículos de ICE',
      detailsEN: 'A list of attributes to look out for when identifying ICE vehicles.',
      detailsES: 'Una lista de atributos a tener en cuenta al identificar vehículos ICE.',
      buttonLabelEN: 'Read more',
      buttonLabelES: 'Leer más',
      page: '/identifying-ICE-vehicles',
    },
    {
      chipEN: 'ICE Whistle',
      chipES: 'ICE Whistle',
      titleEN: 'Protecting Students',
      titleES: 'Protegiendo a los estudiantes',
      detailsEN: 'How to keep students safe when immigration officers arrive at a school.',
      detailsES: 'Cómo mantener seguros a los estudiantes cuando los agentes de inmigración llegan a una escuela.',
      buttonLabelEN: 'Read more',
      buttonLabelES: 'Leer más',
      page: '/protecting-students',
    },
    {
      chipEN: 'Stop ICE',
      chipES: 'Stop ICE',
      titleEN: 'Rapid Response Teams',
      titleES: 'Los Equipos de Respuesta Rápida',
      detailsEN: 'Rapid Response Teams are local groups of volunteers on the ground that respond to reported ICE activity and help notify others nearby.',
      detailsES: 'Los Equipos de Respuesta Rápida son grupos locales de voluntarios que responden a las denuncias de ICE y ayudan a notificar a otras personas cercanas.',
      buttonLabelEN: 'Find Rapid Response Teams',
      buttonLabelES: 'Encuentre equipos de respuesta rápida',
      linkEN: 'https://www.stopice.net/?rapidresponseteams=1',
      linkES: 'https://www.stopice.net/?rapidresponseteams=1'
    },
    {
      chipEN: 'Stop ICE',
      chipES: 'Stop ICE',
      titleEN: 'ICE Plate Tracker',
      titleES: 'El Rastreo De Placas ICE',
      detailsEN: 'National database of confirmed vehicles used in ICE kidnappings.',
      detailsES: 'Base de datos nacional de vehículos confirmados utilizados en secuestros por parte de ICE.',
      buttonLabelEN: 'Search or report a plate',
      buttonLabelES: 'Buscar o reportar una placa',
      linkEN: 'https://www.stopice.net/platetracker/',
      linkES: 'https://www.stopice.net/platetracker/'
    },
    {
      chipEN: 'ICE Whistle',
      chipES: 'ICE Whistle',
      titleEN: 'Protest Posters',
      titleES: 'Carteles de Protesta',
      detailsEN: 'Printable posters for protests.',
      detailsES: 'Carteles imprimibles para protestas.',
      buttonLabelEN: 'View posters',
      buttonLabelES: 'Ver pósteres',
      page: '/posters',
    }
  ]
  return (
    <div className='pageContainer'>
        <Typography variant='h4'>{language === 'EN' ? 'Resources' : 'Recursos'}</Typography>
        <Grid container spacing={2}>
            {resourceDetails.map(resourceDetail => (
                <Grid size={{lg: 4, md: 6, sm: 12, xs: 12}}><Resource resourceDetail={resourceDetail} language={language} priority='low' className='resourceCard'/></Grid>
            ))}
        </Grid>
    </div>
  );
}