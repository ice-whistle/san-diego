import './Resource.css';
import { Button, Card, CardContent, CardActions, Chip, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const Resource = ({resourceDetail, language, priority, className}) =>{
  const theme = useTheme();
  const color = priority === 'high' ? theme.palette.secondary : theme.palette.primary;
    
  return (
    <Card elevation={3} className={className}>
        <CardContent sx={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <div style={{display: 'flex'}}><Chip sx={{backgroundColor: color.extraLight}} label={language === 'EN' ? resourceDetail.chipEN : resourceDetail.chipES}/></div>
            <Typography variant='h6' sx={{textAlign: 'left', fontWeight: 'bold', color: color.main}}>{language === 'EN' ? resourceDetail.titleEN : resourceDetail.titleES}</Typography>
            <Typography variant='body1' sx={{textAlign: 'left', whiteSpace: 'pre-wrap', color: color.dark}}>{language === 'EN' ? resourceDetail.detailsEN : resourceDetail.detailsES}</Typography>
        </CardContent>
        <CardActions sx={{display: 'flex', padding: '0 16px 16px 16px'}}>
            {resourceDetail.linkEN &&<Button startIcon={resourceDetail?.iconType === 'start' ? resourceDetail.iconName : ''} endIcon={resourceDetail?.iconType === 'end' ? resourceDetail.iconName : ''} href={language === 'EN' ? resourceDetail.linkEN : resourceDetail.linkES} color={priority === 'high'?'secondary':'primary'} target="_blank" variant="contained" sx={{width: '100%'}}>{language === 'EN' ? resourceDetail.buttonLabelEN : resourceDetail.buttonLabelES}</Button>}
            {resourceDetail.page &&<Button component={Link} to={resourceDetail.page} startIcon={resourceDetail?.iconType === 'start' ? resourceDetail.iconName : ''} endIcon={resourceDetail?.iconType === 'end' ? resourceDetail.iconName : ''} color={priority === 'high'?'secondary':'primary'} variant="contained" sx={{width: '100%'}}>{language === 'EN' ? resourceDetail.buttonLabelEN : resourceDetail.buttonLabelES}</Button>}
            {resourceDetail.onClick &&<Button startIcon={resourceDetail?.iconType === 'start' ? resourceDetail.iconName : ''} endIcon={resourceDetail?.iconType === 'end' ? resourceDetail.iconName : ''} onClick={()=>resourceDetail.onClick()} color={priority === 'high'?'secondary':'primary'} target="_blank" variant="contained" sx={{width: '100%'}}>{language === 'EN' ? resourceDetail.buttonLabelEN : resourceDetail.buttonLabelES}</Button>}
        </CardActions>
    </Card>
  );
}