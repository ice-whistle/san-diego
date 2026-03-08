import './Pages.css';
import { Grid } from '@mui/material';
import { Article } from '../components/Article';

export const KnowYourRights = ({language}) => {

    const library = [
        {
            titleEN: 'Recording and Documenting Police and Federal Agents',
            titleES: 'Grabación y documentación de agentes policiales y federales',
            textEN: 'The First Amendment protects your right to record and document law enforcement and federal agents performing their duties in public.',
            textES: 'La Primera Enmienda protege su derecho a grabar y documentar a los agentes policiales y federales desempeñando sus funciones en público.',
            linkEN: 'https://www.aclu.org/know-your-rights/recording-and-documenting-police-and-federal-agents',
            linkES: 'https://www.aclu.org/know-your-rights/recording-and-documenting-police-and-federal-agents'
        },
        {
            titleEN: 'Immigrants\' Rights',
            titleES: 'Derechos de los Inmigrantes',
            textEN: 'Regardless of your immigration status, you have guaranteed rights under the Constitution.',
            textES: 'Independientemente de su estatus migratorio, usted tiene derechos garantizados por la Constitución.',
            linkEN: 'https://www.aclu.org/know-your-rights/immigrants-rights',
            linkES: 'https://www.aclu.org/know-your-rights/derechos-de-los-inmigrantes'},
        {
            titleEN: 'Protesters\' Rights',
            titleES: 'Derechos de los Manifestantes',
            textEN: 'The First Amendment protects your right to assemble and express your views through protest.',
            textES: 'La Primera Enmienda protege su derecho a reunirse y expresar su opinión a través de las protestas.',
            linkEN: 'https://www.aclu.org/know-your-rights/protesters-rights',
            linkES: 'https://www.aclu.org/know-your-rights/derechos-de-los-manifestantes'
        },
        {
            titleEN: 'Stopped by Police',
            titleES: '¿Qué Debe Hacer Si la Policía?',
            textEN: 'Learn about your rights when stopped by the police, and how to stay safe.',
            textES: 'Esta tarjeta da consejos en caso de tener contacto con la policía y le ayuda a entender sus derechos.',
            linkEN: 'https://www.aclu.org/know-your-rights/stopped-by-police',
            linkES: 'https://www.aclu.org/know-your-rights/que-debe-hacer-si-la-policia'},
        {
            titleEN: 'Encountering Law Enforcement and Military Troops',
            titleES: 'Encuentro con fuerzas del orden y tropas militares',
            textEN: 'No matter what uniform they wear, law enforcement and military troops are bound by the Constitution.',
            textES: 'Independientemente del uniforme que usen, las fuerzas del orden y las tropas militares están sujetas a la Constitución.',
            linkEN: 'https://www.aclu.org/know-your-rights/encountering-law-enforcement-and-military-troops',
            linkES: 'https://www.aclu.org/know-your-rights/encountering-law-enforcement-and-military-troops'
        },
        {
            titleEN: 'Enforcement at the Airport',
            titleES: 'Aplicación de la ley en el aeropuerto',
            textEN: 'Learn about your rights when encountering law enforcement at the airport.',
            textES: 'Infórmese sobre sus derechos cuando se encuentre con la policía en el aeropuerto.',
            linkEN: 'https://www.aclu.org/know-your-rights/what-do-when-encountering-law-enforcement-airports-and-other-ports-entry-us',
            linkES: 'https://www.aclu.org/know-your-rights/what-do-when-encountering-law-enforcement-airports-and-other-ports-entry-us'
        },
        {
            titleEN: '100 Mile Border Zone',
            titleES: 'Zona fronteriza de 100 millas',
            textEN: 'Know your rights within the 100-mile border zone.​',
            textES: 'Conozca sus derechos dentro de la zona fronteriza de 100 millas.',
            linkEN: 'https://www.aclu.org/know-your-rights/border-zone',
            linkES: 'https://www.aclu.org/know-your-rights/border-zone'
        },
        {
            titleEN: 'Federal Agents at the Polls',
            titleES: 'Agentes Federales en los Centros de Votación',
            textEN: 'Every eligible citizen has the right to cast a ballot freely, fairly, and accessibly — without fear of deception or intimidation.',
            textES: 'Todo ciudadano elegible tiene derecho a emitir su voto de manera libre, justa y accesible, sin miedo al engaño ni a la intimidación.',
            linkEN: 'https://www.aclu.org/know-your-rights/federal-agents-at-the-polls',
            linkES: 'https://www.aclu.org/know-your-rights/agentes-federales-en-los-centros-de-votacion'
        },
        {
            titleEN: 'Dreamers (DACA)',
            titleES: 'Soñadores (DACA)',
            textEN: 'Understanding your rights under and eligibility for DACA.',
            textES: 'Entendiendo sus derechos y elegibilidad bajo DACA.',
            linkEN: 'https://www.aclu.org/know-your-rights/know-your-rights-about-daca',
            linkES: 'https://www.aclu.org/know-your-rights/know-your-rights-about-daca'
        },
    ]
    
  return (
    <div className='pageContainer'>
        <h1>{language === 'EN' ? 'Know Your Rights' : 'Conozca sus derechos'}</h1>
        <Grid container spacing={2}>
            {library.map(article => (
                <Grid size={{lg: 4, md: 6, sm: 12, xs: 12}}><Article article={article} language={language}/></Grid>
            ))}
        </Grid>
    </div>
  );
}