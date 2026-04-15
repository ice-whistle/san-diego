import './Pages.css';
import { Grid, Typography } from '@mui/material';
import { Resource } from '../components/Resource.jsx';

export const YourRights = ({language, setFocusedCenter, setFocusedZoom, setFocusedAlertId}) => {
    setFocusedCenter(null);
    setFocusedZoom(null);
    setFocusedAlertId(null);

    const library = [
        {
            chipEN: 'ACLU',
            chipES: 'ACLU',
            titleEN: 'Recording and Documenting Police and Federal Agents',
            titleES: 'Grabación y documentación de agentes policiales y federales',
            detailsEN: 'The First Amendment protects your right to record and document law enforcement and federal agents performing their duties in public.',
            detailsES: 'La Primera Enmienda protege su derecho a grabar y documentar a los agentes policiales y federales desempeñando sus funciones en público.',
            buttonLabelEN: 'Read more',
            buttonLabelES: 'Leer más',
            linkEN: 'https://www.aclu.org/know-your-rights/recording-and-documenting-police-and-federal-agents',
            linkES: 'https://www.aclu.org/know-your-rights/recording-and-documenting-police-and-federal-agents'
        },
        {
            chipEN: 'ACLU',
            chipES: 'ACLU',
            titleEN: 'Immigrants\' Rights',
            titleES: 'Derechos de los Inmigrantes',
            detailsEN: 'Regardless of your immigration status, you have guaranteed rights under the Constitution.',
            detailsES: 'Independientemente de su estatus migratorio, usted tiene derechos garantizados por la Constitución.',
            buttonLabelEN: 'Read more',
            buttonLabelES: 'Leer más',
            linkEN: 'https://www.aclu.org/know-your-rights/immigrants-rights',
            linkES: 'https://www.aclu.org/know-your-rights/derechos-de-los-inmigrantes'},
        {
            chipEN: 'ACLU',
            chipES: 'ACLU',
            titleEN: 'Protesters\' Rights',
            titleES: 'Derechos de los Manifestantes',
            detailsEN: 'The First Amendment protects your right to assemble and express your views through protest.',
            detailsES: 'La Primera Enmienda protege su derecho a reunirse y expresar su opinión a través de las protestas.',
            buttonLabelEN: 'Read more',
            buttonLabelES: 'Leer más',
            linkEN: 'https://www.aclu.org/know-your-rights/protesters-rights',
            linkES: 'https://www.aclu.org/know-your-rights/derechos-de-los-manifestantes'
        },
        {
            chipEN: 'ACLU',
            chipES: 'ACLU',
            titleEN: 'Stopped by Police',
            titleES: '¿Qué Debe Hacer Si la Policía?',
            detailsEN: 'Learn about your rights when stopped by the police, and how to stay safe.',
            detailsES: 'Esta tarjeta da consejos en caso de tener contacto con la policía y le ayuda a entender sus derechos.',
            buttonLabelEN: 'Read more',
            buttonLabelES: 'Leer más',
            linkEN: 'https://www.aclu.org/know-your-rights/stopped-by-police',
            linkES: 'https://www.aclu.org/know-your-rights/que-debe-hacer-si-la-policia'},
        {
            chipEN: 'ACLU',
            chipES: 'ACLU',
            titleEN: 'Encountering Law Enforcement and Military Troops',
            titleES: 'Encuentro con fuerzas del orden y tropas militares',
            detailsEN: 'No matter what uniform they wear, law enforcement and military troops are bound by the Constitution.',
            detailsES: 'Independientemente del uniforme que usen, las fuerzas del orden y las tropas militares están sujetas a la Constitución.',
            buttonLabelEN: 'Read more',
            buttonLabelES: 'Leer más',
            linkEN: 'https://www.aclu.org/know-your-rights/encountering-law-enforcement-and-military-troops',
            linkES: 'https://www.aclu.org/know-your-rights/encountering-law-enforcement-and-military-troops'
        },
        {
            chipEN: 'ACLU',
            chipES: 'ACLU',
            titleEN: 'Enforcement at the Airport',
            titleES: 'Aplicación de la ley en el aeropuerto',
            detailsEN: 'Learn about your rights when encountering law enforcement at the airport.',
            detailsES: 'Infórmese sobre sus derechos cuando se encuentre con la policía en el aeropuerto.',
            buttonLabelEN: 'Read more',
            buttonLabelES: 'Leer más',
            linkEN: 'https://www.aclu.org/know-your-rights/what-do-when-encountering-law-enforcement-airports-and-other-ports-entry-us',
            linkES: 'https://www.aclu.org/know-your-rights/what-do-when-encountering-law-enforcement-airports-and-other-ports-entry-us'
        },
        {
            chipEN: 'ACLU',
            chipES: 'ACLU',
            titleEN: '100 Mile Border Zone',
            titleES: 'Zona fronteriza de 100 millas',
            detailsEN: 'Know your rights within the 100-mile border zone.​',
            detailsES: 'Conozca sus derechos dentro de la zona fronteriza de 100 millas.',
            buttonLabelEN: 'Read more',
            buttonLabelES: 'Leer más',
            linkEN: 'https://www.aclu.org/know-your-rights/border-zone',
            linkES: 'https://www.aclu.org/know-your-rights/border-zone'
        },
        {
            chipEN: 'ACLU',
            chipES: 'ACLU',
            titleEN: 'Federal Agents at the Polls',
            titleES: 'Agentes Federales en los Centros de Votación',
            detailsEN: 'Every eligible citizen has the right to cast a ballot freely, fairly, and accessibly — without fear of deception or intimidation.',
            detailsES: 'Todo ciudadano elegible tiene derecho a emitir su voto de manera libre, justa y accesible, sin miedo al engaño ni a la intimidación.',
            buttonLabelEN: 'Read more',
            buttonLabelES: 'Leer más',
            linkEN: 'https://www.aclu.org/know-your-rights/federal-agents-at-the-polls',
            linkES: 'https://www.aclu.org/know-your-rights/agentes-federales-en-los-centros-de-votacion'
        },
        {
            chipEN: 'ACLU',
            chipES: 'ACLU',
            titleEN: 'Dreamers (DACA)',
            titleES: 'Soñadores (DACA)',
            detailsEN: 'Understanding your rights under and eligibility for DACA.',
            detailsES: 'Entendiendo sus derechos y elegibilidad bajo DACA.',
            buttonLabelEN: 'Read more',
            buttonLabelES: 'Leer más',
            linkEN: 'https://www.aclu.org/know-your-rights/know-your-rights-about-daca',
            linkES: 'https://www.aclu.org/know-your-rights/know-your-rights-about-daca'
        },
    ]
    
  return (
    <div className='pageContainer'>
        <Typography variant='h4'>{language === 'EN' ? 'Your Rights' : 'Sus derechos'}</Typography>
        <Grid container spacing={2}>
            {library.map(article => (
                <Grid size={{lg: 4, md: 6, sm: 12, xs: 12}}><Resource resourceDetail={article} language={language} className='articleCard'/></Grid>
            ))}
        </Grid>
    </div>
  );
}