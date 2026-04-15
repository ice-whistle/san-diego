import './Resource.css';
import { Button, Card, CardContent, CardActions, Modal, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

export const FullModal = ({modal, setModal, language}) =>{
  const theme = useTheme();
  let index = 0;
  let priority = 'low';

  switch (modal) {
    case 'callEmergency':
        index = 0;
        priority = 'high';
        break;
    case 'ILSC':
        index = 1;
        priority = 'high';
        break;
    case 'immDef':
        index = 2;
        priority = 'high';
        break;
    case 'ACLU':
        index = 3;
        priority = 'high';
        break;
    case 'ACLU-SDIC':
        index = 4;
        priority = 'high';
        break;
    case 'ILDP':
        index = 5;
        priority = 'high';
        break;
    case 'JFSSD':
        index = 6;
        priority = 'high';
        break;
    default:
        break;
  }

  const color = priority === 'high' ? theme.palette.secondary : theme.palette.primary;

  const modalDetail = [
    {
      titleEN: 'Do you want to call an emergency line?',
      titleES: '¿Quieres llamar a una línea de emergencia?',
      detailsEN: 'Calling this number will lead you to Immigration Legal Service Coalition of San Diego who will provide rapid response legal support for community members detained by immigration enforcement agents.',
      detailsES: 'Al llamar a este número, se comunicará con la Immigration Legal Service Coalition of San Diego, la cual brindará apoyo legal de respuesta rápida a los miembros de la comunidad detenidos por agentes de control de inmigración.',
      buttonLabel1EN: 'Call',
      buttonLabel1ES: 'Llame',
      buttonLabel2EN: 'Cancel',
      buttonLabel2ES: 'Cancele',
      iconType: 'start',
      iconName: <LocalPhoneIcon />,
      link1EN: 'tel:+8587517553',
      link1ES: 'tel:+8587517553',
    },
    {
      titleEN: 'Do you want to call ILSC?',
      titleES: '¿Quieres llamar a ILSC?',
      detailsEN: 'Calling this number will lead you to Immigration Legal Service Coalition of San Diego who will provide rapid response legal support for community members detained by immigration enforcement agents.',
      detailsES: 'Al llamar a este número, se comunicará con la Coalición de Servicios Legales de Inmigración de San Diego, la cual brindará apoyo legal de respuesta rápida a los miembros de la comunidad detenidos por agentes de control de inmigración.',
      buttonLabel1EN: 'Call',
      buttonLabel1ES: 'Llame',
      buttonLabel2EN: 'Cancel',
      buttonLabel2ES: 'Cancele',
      iconType: 'start',
      iconName: <LocalPhoneIcon />,
      link1EN: 'tel:+8587517553',
      link1ES: 'tel:+8587517553',
    },
    {
      titleEN: 'Do you want to call ImmDef?',
      titleES: '¿Quieres llamar a ImmDef?',
      detailsEN: 'Calling this number will lead you to Immigrant Defenders Law Center Rapid Response Legal Resource Hotline who will provide rapid response legal support for Southern California community members detained by immigration enforcement agents.',
      detailsES: 'Al llamar a este número, se comunicará con la Línea de Recursos Legales de Respuesta Rápida del Immigrant Defenders Law Center, la cual brindará apoyo legal de respuesta rápida a los miembros de la comunidad del sur de California que hayan sido detenidos por agentes de control de inmigración.',
      buttonLabel1EN: 'Call',
      buttonLabel1ES: 'Llame',
      buttonLabel2EN: 'Cancel',
      buttonLabel2ES: 'Cancele',
      iconType: 'start',
      iconName: <LocalPhoneIcon />,
      link1EN: 'tel:+2138338283',
      link1ES: 'tel:+2138338283',
    },
    {
      titleEN: 'Do you want to call ACLU?',
      titleES: '¿Quieres llamar a ACLU?',
      detailsEN: 'Calling this number will lead you to ACLU of San Diego Legal Intake Line who will handle non-emergency requests for legal assistance.',
      detailsES: 'Al llamar a este número, se comunicará con la Línea de Recepción Legal de la ACLU de San Diego, la cual gestionará las solicitudes de asistencia legal que no sean de emergencia.',
      buttonLabel1EN: 'Call (then press "4")',
      buttonLabel1ES: 'Llame (luego presione "4")',
      buttonLabel2EN: 'Cancel',
      buttonLabel2ES: 'Cancele',
      iconType: 'start',
      iconName: <LocalPhoneIcon />,
      link1EN: 'tel:+6192322121',
      link1ES: 'tel:+6192322121',
    },
    {
      titleEN: 'Do you want to call ACLU-SDIC?',
      titleES: '¿Quieres llamar a ACLU-SDIC?',
      detailsEN: 'Calling this number will lead you to ACLU-SDIC who will tracks and investigate unlawful conduct by federal immigration agents in San Diego and Imperial counties both against people lawfully exercising First Amendment rights and against people otherwise detained by Immigration and Customs Enforcement (ICE), Border Patrol and other federal law enforcement agencies.',
      detailsES: 'Al llamar a este número, se comunicará con la ACLU-SDIC, organización que rastrea e investiga conductas ilícitas por parte de agentes federales de inmigración en los condados de San Diego e Imperial, tanto contra personas que ejercen legítimamente sus derechos amparados por la Primera Enmienda como contra personas detenidas por el Servicio de Inmigración y Control de Aduanas (ICE), la Patrulla Fronteriza y otras agencias federales del orden público.',
      buttonLabel1EN: 'Call',
      buttonLabel1ES: 'Llame',
      buttonLabel2EN: 'Cancel',
      buttonLabel2ES: 'Cancele',
      iconType: 'start',
      iconName: <LocalPhoneIcon />,
      link1EN: 'tel:+6194671663',
      link1ES: 'tel:+6194671663',
    },
    {
      titleEN: 'Do you want to call ILDP?',
      titleES: '¿Quieres llamar a ILDP?',
      detailsEN: 'Calling this number will lead you to San Diego County Immigrant Legal Defense Program who will connect people in deportation proceedings to a free attorney. Available for people who are detained or in "alternative to detention" status in San Diego County or have ties to San Diego County. Number for people detained at Otay Mesa Detention Center: 1157# (free to dial).',
      detailsES: 'Al llamar a este número, se comunicará con el Programa de Defensa Legal para Inmigrantes del Condado de San Diego, el cual conectará a las personas que se encuentren en procesos de deportación con un abogado gratuito. Este servicio está disponible para personas que se encuentren detenidas o bajo el estatus de "alternativas a la detención" en el Condado de San Diego, o que tengan vínculos con dicho condado. Número para personas detenidas en el Centro de Detención de Otay Mesa: 1157# (llamada gratuita).',
      buttonLabel1EN: 'Call',
      buttonLabel1ES: 'Llame',
      buttonLabel2EN: 'Cancel',
      buttonLabel2ES: 'Cancele',
      iconType: 'start',
      iconName: <LocalPhoneIcon />,
      link1EN: 'tel:+6194462883',
      link1ES: 'tel:+6194462883',
    },
    {
      titleEN: 'Do you want to call JFSSD?',
      titleES: '¿Quieres llamar a JFSSD?',
      detailsEN: 'Calling this number will lead you to Jewish Family Service of San Diego who will provide you with an array of services to support asylum seekers, refugees, immigrants and their families in the face of heightened border restrictions and evolving federal policies.',
      detailsES: 'Al llamar a este número, se comunicará con el Servicio Familiar Judío de San Diego, que le ofrecerá una variedad de servicios para apoyar a solicitantes de asilo, refugiados, inmigrantes y sus familias ante las mayores restricciones fronterizas y las políticas federales en constante evolución.',
      buttonLabel1EN: 'Call',
      buttonLabel1ES: 'Llame',
      buttonLabel2EN: 'Cancel',
      buttonLabel2ES: 'Cancele',
      iconType: 'start',
      iconName: <LocalPhoneIcon />,
      link1EN: 'tel:+8586373365',
      link1ES: 'tel:+8586373365',
    }
  ]
    
  return (
    <Modal
        open={modal}
        onClose={()=>setModal(null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Card elevation={3} className='modalCard'>
            <CardContent sx={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                <Typography variant='h5' sx={{textAlign: 'left', fontWeight: 'bold', color: color.main}}>{language === 'EN' ? modalDetail[index].titleEN : modalDetail[index].titleES}</Typography>
                <Typography variant='body1' sx={{textAlign: 'left', whiteSpace: 'pre-wrap', color: color.dark}}>{language === 'EN' ? modalDetail[index].detailsEN : modalDetail[index].detailsES}</Typography>
            </CardContent>
            <CardActions sx={{display: 'flex', padding: '0 16px 16px 16px'}}>
                <Button onClick={()=>setModal(null)} color={priority === 'high' ? 'secondary' : 'primary'} target="_blank" variant="outlined" size='large' sx={{width: '100%', height: '100%'}}>{language === 'EN' ? modalDetail[index].buttonLabel2EN : modalDetail[index].buttonLabel2ES}</Button>
                <Button href={language === 'EN' ? modalDetail[index].link1EN : modalDetail[index].link1ES} color={priority === 'high' ? 'secondary' : 'primary'} startIcon={modalDetail[index]?.iconType === 'start' ? modalDetail[index].iconName : ''} endIcon={modalDetail[index]?.iconType === 'end' ? modalDetail[index].iconName : ''} target="_blank" variant="contained" size='large' sx={{width: '100%', minWidth: 'auto', whiteSpace: 'nowrap'}}>{language === 'EN' ? modalDetail[index].buttonLabel1EN : modalDetail[index].buttonLabel1ES}</Button>
            </CardActions>
        </Card>
    </Modal>
  );
}