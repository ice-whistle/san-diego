import './Article.css';
import { Button, Card, CardContent, CardActions, Chip } from "@mui/material";

export const Article = ({article, language}) =>{
    
  return (
    <Card elevation={3} className="articleCard" >
        <CardContent>
            <div style={{display: 'flex'}}><Chip label="ACLU"/></div>
            <h3 style={{display: 'flex', textAlign: 'left'}}>{language === 'EN' ? article.titleEN : article.titleES}</h3>
            <p style={{display: 'flex', textAlign: 'left'}}>{language === 'EN' ? article.textEN : article.textES}</p>
        </CardContent>
        <CardActions sx={{display: 'flex', padding: '0 16px 16px 16px'}}>
            <Button href={language === 'EN' ? article.linkEN : article.linkES} target="_blank" variant="contained" sx={{width: '100%'}}>{language === 'EN' ? 'Read more' : 'Leer más'}</Button>
        </CardActions>
    </Card>
  );
}