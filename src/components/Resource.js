import './Resource.css';
import { Button, Card, CardContent, CardActions, Chip } from "@mui/material";

export const Resource = ({accordionDetail, language}) =>{
    
  return (
    <Card elevation={3} className="resourceCard">
        <CardContent>
            <div style={{display: 'flex'}}><Chip label={language === 'EN' ? accordionDetail.chipEN : accordionDetail.chipES}/></div>
            <h3 style={{display: 'flex', textAlign: 'left'}}>{language === 'EN' ? accordionDetail.titleEN : accordionDetail.titleES}</h3>
            <p style={{display: 'flex', textAlign: 'left'}}>{language === 'EN' ? accordionDetail.detailsEN : accordionDetail.detailsES}</p>
        </CardContent>
        <CardActions sx={{display: 'flex', padding: '0 16px 16px 16px'}}>
            <Button href={language === 'EN' ? accordionDetail.linkEN : accordionDetail.linkES} target="_blank" variant="contained" sx={{width: '100%'}}>{language === 'EN' ? accordionDetail.buttonLabelEN : accordionDetail.buttonLabelES}</Button>
        </CardActions>
    </Card>
  );
}