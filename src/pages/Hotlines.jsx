import './Pages.css';
import { Grid, Typography } from '@mui/material';
import { Resource } from '../components/Resource.jsx';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

export const Hotlines = ({language, setFocusedCenter, setFocusedZoom, setFocusedAlertId, setModal}) =>{
  setFocusedCenter(null);
  setFocusedZoom(null);
  setFocusedAlertId(null);

  const hotlineDetails = [
    {
      chipEN: 'ILSC',
      chipES: 'ILSC',
      titleEN: 'Immigration Legal Service Coalition of San Diego',
      titleES: 'Coalición de Servicios Legales de Inmigración de San Diego',
      detailsEN: 'Rapid response legal support for community members detained by immigration enforcement agents.\n\nHours of Operation: M-F 9AM-6PM PST',
      detailsES: 'Apoyo legal de respuesta rápida para miembros de la comunidad detenidos por agentes de control de inmigración.\n\nHorario de atención: L-V, 9AM-6PM PST',
      buttonLabelEN: 'Call (858) 751-7553',
      buttonLabelES: 'Llame al (858) 751-7553',
      iconType: 'start',
      iconName: <LocalPhoneIcon />,
      onClick: ()=>setModal('ILSC')
    },
    {
      chipEN: 'ImmDef',
      chipES: 'ImmDef',
      titleEN: 'Immigrant Defenders Law Center Rapid Response Legal Resource Hotline',
      titleES: 'Línea directa de recursos legales de respuesta rápida del Immigrant Defenders Law Center',
      detailsEN: 'Rapid response legal support for Southern California community members detained by immigration enforcement agents.\n\nHours of Operation: M-F 9AM-4PM PST',
      detailsES: 'Apoyo legal de respuesta rápida para miembros de la comunidad del sur de California detenidos por agentes de inmigración.\n\nHorario de atención: L-V, 9AM-4PM PST',
      buttonLabelEN: 'Call (213) 833-8283',
      buttonLabelES: 'Llame al (213) 833-8283',
      iconType: 'start',
      iconName: <LocalPhoneIcon />,
      onClick: ()=>setModal('immDef')
    },
    {
      chipEN: 'ACLU',
      chipES: 'ACLU',
      titleEN: 'ACLU of San Diego Legal Intake Line',
      titleES: 'Línea de recepción legal de la ACLU de San Diego',
      detailsEN: 'Handles non-emergency requests for legal assistance.',
      detailsES: 'Gestiona solicitudes de asistencia legal que no son de emergencia.',
      buttonLabelEN: 'Call (619) 232-2121 (then press “4”)',
      buttonLabelES: 'Llame al (619) 232-2121 (luego presione "4")',
      iconType: 'start',
      iconName: <LocalPhoneIcon />,
      onClick: ()=>setModal('ACLU')
    },
    {
      chipEN: 'ACLU-SDIC',
      chipES: 'ACLU-SDIC',
      titleEN: 'Report Federal Law Enforcement Abuse to the ACLU-SDIC',
      titleES: 'Reporte el abuso de las fuerzas del orden federales a la ACLU-SDIC.',
      detailsEN: 'Tracks and investigates unlawful conduct by federal immigration agents in San Diego and Imperial counties both against people lawfully exercising First Amendment rights and against people otherwise detained by Immigration and Customs Enforcement (ICE), Border Patrol and other federal law enforcement agencies.',
      detailsES: 'Rastrea e investiga la conducta ilícita de agentes federales de inmigración en los condados de San Diego e Imperial, tanto contra personas que ejercen legítimamente sus derechos amparados por la Primera Enmienda como contra personas detenidas por el Servicio de Inmigración y Control de Aduanas (ICE), la Patrulla Fronteriza y otras agencias federales del orden público.',
      buttonLabelEN: 'Call (619) 467-1663',
      buttonLabelES: 'Llame al (619) 467-1663',
      iconType: 'start',
      iconName: <LocalPhoneIcon />,
      onClick: ()=>setModal('ACLU-SDIC')
    },
    {
      chipEN: 'ILDP',
      chipES: 'ILDP',
      titleEN: 'San Diego County Immigrant Legal Defense Program',
      titleES: 'Programa de Defensa Legal para Inmigrantes del Condado de San Diego',
      detailsEN: 'Connects people in deportation proceedings to a free attorney. Available for people who are detained or in "alternative to detention" status in San Diego County or have ties to San Diego County. Number for people detained at Otay Mesa Detention Center: 1157# (free to dial)',
      detailsES: 'Conecta a personas en procedimientos de deportación con un abogado gratuito. Disponible para personas que se encuentran detenidas o bajo el estatus de "alternativa a la detención" en el condado de San Diego, o que tienen vínculos con dicho condado. Número para personas detenidas en el Centro de Detención de Otay Mesa: 1157# (llamada gratuita)',
      buttonLabelEN: 'Call (619) 446-2883',
      buttonLabelES: 'Llame al (619) 446-2883',
      iconType: 'start',
      iconName: <LocalPhoneIcon />,
      onClick: ()=>setModal('ILDP')
    },
    {
      chipEN: 'JFSSD',
      chipES: 'JFSSD',
      titleEN: 'Jewish Family Service of San Diego',
      titleES: 'Servicio Familiar Judío de San Diego',
      detailsEN: 'Provides an array of services to support asylum seekers, refugees, immigrants and their families in the face of heightened border restrictions and evolving federal policies.',
      detailsES: 'Ofrece una gama de servicios para apoyar a solicitantes de asilo, refugiados, inmigrantes y sus familias ante las mayores restricciones fronterizas y las políticas federales en evolución.',
      buttonLabelEN: 'Call (858) 637-3365',
      buttonLabelES: 'Llame al (858) 637-3365',
      iconType: 'start',
      iconName: <LocalPhoneIcon />,
      onClick: ()=>setModal('JFSSD')
    }
  ]
  return (
    <div className='pageContainer'>
        <Typography variant='h4' color='secondary'>{language === 'EN' ? 'Hotlines' : 'Líneas de ayuda'}</Typography>
        <Grid container spacing={2}>
            {hotlineDetails.map(hotlineDetail => (
                <Grid size={{lg: 4, md: 6, sm: 12, xs: 12}}><Resource resourceDetail={hotlineDetail} language={language} priority='high' className='hotlineCard'/></Grid>
            ))}
        </Grid>
    </div>
  );
}