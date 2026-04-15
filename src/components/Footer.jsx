import './Footer.css';
import { Box, Typography, IconButton } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

export const Footer = ({language}) =>{
  return (
    <footer className="footer">
        <Box sx={{bgcolor: 'primary.main'}} className='footerCard'>
            <Typography variant='subtitle2' sx={{display: 'flex', textAlign: 'left', color: 'white'}}>
                {language === 'EN' ?
                    'ICE Whistle San Diego is intended for informational and transparency purposes only. The publication of publicly reported information about government activity is protected under the First Amendment of the United States Constitution. This site does not encourage, promote, or condone illegal activity. Users are solely responsible for how they use any information provided here.':
                    'ICE Whistle San Diego tiene fines exclusivamente informativos y de transparencia. La publicación de información pública sobre la actividad gubernamental está protegida por la Primera Enmienda de la Constitución de los Estados Unidos. Este sitio no fomenta, promueve ni aprueba actividades ilegales. Los usuarios son los únicos responsables del uso que hagan de la información aquí proporcionada.'}
            </Typography>
            <div className='footerButtons'>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <IconButton aria-label="Instagram"  sx={{display: 'flex', textAlign: 'left'}} target='_blank' href='https://www.instagram.com/ice_whistle_sd/'>
                        <InstagramIcon sx={{color: 'white'}} fontSize="large"/>
                    </IconButton>
                    <IconButton aria-label="Email"  sx={{display: 'flex', textAlign: 'left'}} href='mailto:ice_whistle_sd@proton.me'>
                        <EmailIcon sx={{color: 'white'}} fontSize="large"/>
                    </IconButton>
                </div>
                <Typography variant='subtitle2' sx={{textAlign: 'left', color: 'white', whiteSpace: 'nowrap'}}>
                    {language === 'EN' ?
                        'Version 1.40':
                        'Versión 1.40'}
                </Typography>
            </div>            
        </Box>
    </footer>
  );
}