import './NavBar.css';
import {
    FormControl,
    MenuItem,
    Select,
} from '@mui/material';

export const LanguageToggle = ({setLanguage, language}) =>{

    const handleChange = (event) => {
        setLanguage(event.target.value);
    };
    
    return (
        <FormControl sx={{display: 'flex'}}>
            <Select
                labelId="demo-simple-select-label"
                id="languageSelect"
                value={language}
                size='small'
                onChange={handleChange}
                sx={{display: 'inline-flex', flexDirection: 'row', color: 'black', backgroundColor: 'white'}}
            >
                <MenuItem value={'EN'}>
                    <img
                        loading="lazy"
                        width="20"
                        srcSet={`https://flagcdn.com/w40/us.png 2x`}
                        src={`https://flagcdn.com/w20/us.png`}
                        alt=""
                        style={{paddingRight: '4px'}}
                    />
                    EN
                </MenuItem>
                <MenuItem value={'ES'}>
                    <img
                        loading="lazy"
                        width="20"
                        srcSet={`https://flagcdn.com/w40/es.png 2x`}
                        src={`https://flagcdn.com/w20/es.png`}
                        alt=""
                        style={{paddingRight: '4px'}}
                    />
                    ES
                </MenuItem>
            </Select>
        </FormControl>
    )
}