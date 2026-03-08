import './Pages.css';
import { Grid } from '@mui/material';
import { Resource } from '../components/Resource';

export const Resources = ({language}) =>{

  const accordionDetails = [
    {
      chipEN: 'ILRC',
      chipES: 'ILRC',
      titleEN: 'Red Cards',
      titleES: 'Tarjetas Rojas',
      detailsEN: 'All people in the United States, regardless of immigration status, have certain rights and protections under the U.S. Constitution. The ILRC\'s red cards give examples of how people can exercise these rights. However, they do not provide individualized legal advice. Community members are encouraged to check in with a trusted legal service provider for questions about their situation.',
      detailsES: 'Todas las personas en los Estados Unidos, independientemente de su estatus migratorio, tienen ciertos derechos y protecciones bajo la Constitución de los Estados Unidos. Las tarjetas rojas del ILRC dan ejemplos de cómo las personas pueden ejercer estos derechos. Sin embargo, no dan consejo legal individualizado. Les avisamos a los miembros de la comunidad que consulten con un proveedor de servicios legales de confianza si tienen preguntas sobre su situación.',
      buttonLabelEN: 'Download PDF',
      buttonLabelES: 'Descargar PDF',
      linkEN: 'https://www.ilrc.org/sites/default/files/documents/red_card-self_srv-english.pdf',
      linkES: 'https://www.ilrc.org/sites/default/files/2025-01/Artwork%20for%20Printing%20Your%20Own%20Red%20Cards%20-%20Spanish.pdf'
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
    }
  ]
  return (
    <div className='pageContainer'>
        <h1>{language === 'EN' ? 'Resources' : 'Recursos'}</h1>
        <Grid container spacing={2}>
            {accordionDetails.map(accordionDetail => (
                <Grid size={{lg: 4, md: 6, sm: 12, xs: 12}}><Resource accordionDetail={accordionDetail} language={language}/></Grid>
            ))}
        </Grid>
    </div>
  );
}