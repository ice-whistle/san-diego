import './Footer.css';
import { Box, Typography, Grid } from "@mui/material";

export const Footer = ({language}) =>{
    
  return (
    <footer className="footer">
        <Box sx={{bgcolor: 'primary.main'}} className='footerCard'>
            <Grid container spacing={2}>
                <Grid size={{md: 9, sm: 12}}>
                    <Typography variant='subtitle2' sx={{display: 'flex', textAlign: 'left', color: 'white'}}>
                        {language === 'EN' ?
                            'Whistle San Diego is intended for informational and transparency purposes only. The publication of publicly reported information about government activity is protected under the First Amendment of the United States Constitution. This site does not encourage, promote, or condone illegal activity. Users are solely responsible for how they use any information provided here.':
                            'Whistle San Diego tiene fines exclusivamente informativos y de transparencia. La publicación de información pública sobre la actividad gubernamental está protegida por la Primera Enmienda de la Constitución de los Estados Unidos. Este sitio no fomenta, promueve ni aprueba actividades ilegales. Los usuarios son los únicos responsables del uso que hagan de la información aquí proporcionada.'}
                    </Typography>
                </Grid>
                <Grid size={{md: 3, sm: 12}} sx={{alignContent: 'end', justifyItems: 'end', width: 'stretch'}}>
                    <Typography variant='subtitle2' sx={{display: 'flex', textAlign: 'right', color: 'white', whiteSpace: 'nowrap'}}>
                        {language === 'EN' ?
                            'Version 1.10':
                            'Versión 1.10'}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    </footer>
  );
}