import {
    AppBar,
    Button,
    IconButton,
    MenuItem,
    Toolbar,
    Drawer,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useScreenResolution } from '../utils/ScreenSize.tsx';
import { useState } from 'react';
import { LanguageToggle } from './LanguageToggle.jsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const NavBar = ({setLanguage, language, setModal}) => {
    const { isXSmall, isSmall } = useScreenResolution();
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const location = useLocation();
    const navigate = useNavigate();
    const handleHomeClick = () => {
        navigate('/');
    };
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <div style={{padding: '8px 16px'}}><LanguageToggle setLanguage={setLanguage} language={language}/></div>
                <ListItem key={'LiveMap'} disablePadding>
                    <ListItemButton component={Link} to="/">
                        <ListItemText primary={language === 'EN' ? 'Live Map' : 'Mapa en vivo'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'Hotlines'} disablePadding>
                    <ListItemButton component={Link} to="/hotlines">
                        <ListItemText primary={language === 'EN' ? 'Hotlines' : 'Líneas de ayuda'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'YourRights'} disablePadding>
                    <ListItemButton component={Link} to="/your-rights">
                        <ListItemText primary={language === 'EN' ? 'Your Rights' : 'Sus derechos'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'Resources'} disablePadding>
                    <ListItemButton component={Link} to="/resources">
                        <ListItemText primary={language === 'EN' ? 'Resources' : 'Recursos'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'Emergency'} >
                    <Button startIcon={<LocalPhoneIcon />} onClick={()=>setModal('callEmergency')} color='secondary' target="_blank" variant="contained" sx={{width: '100%'}}>{language === 'EN' ? 'Emergency' : 'Emergencia'}</Button>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <AppBar position="absolute">
            <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                <div className='navBarHomeLogo' onClick={()=> handleHomeClick()}>
                    <Typography variant='h5' sx={{textAlign: 'left', fontWeight: 'bold', color: 'white'}}>ICE Whistle</Typography>
                    <Typography variant='h6' sx={{textAlign: 'left', color: 'white'}}>San Diego</Typography>
                </div>
                {(isXSmall || isSmall) && <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>}
                {!isXSmall && !isSmall && <div style={{display: 'flex', alignItems: 'center'}}>
                    <MenuItem key={'home'} component={Link} to="/" sx={{padding: '12px'}}>
                        <p style={{fontWeight: location.pathname === '/' ?'bold':'unset', color: 'white'}}>{language === 'EN' ? 'Live Map' : 'Mapa en vivo'}</p>
                    </MenuItem>
                    <MenuItem key={'hotlines'} component={Link} to="/hotlines" sx={{padding: '12px'}}>
                        <p style={{fontWeight: location.pathname === '/hotlines'?'bold':'unset', color: 'white'}}>{language === 'EN' ? 'Hotlines' : 'Líneas de ayuda'}</p>
                    </MenuItem>
                    <MenuItem key={'your-rights'} component={Link} to="/your-rights" sx={{padding: '12px'}}>
                        <p style={{fontWeight: location.pathname === '/your-rights'?'bold':'unset', color: 'white'}}>{language === 'EN' ? 'Your Rights' : 'Sus derechos'}</p>
                    </MenuItem>
                    <MenuItem key={'resources'} component={Link} to="/resources" sx={{padding: '12px'}}>
                        <p style={{fontWeight: location.pathname === '/resources' ?'bold':'unset', color: 'white'}}>{language === 'EN' ? 'Resources' : 'Recursos'}</p>
                    </MenuItem>
                    <MenuItem key={'emergency'} sx={{padding: '12px'}}>
                        <Button startIcon={<LocalPhoneIcon />} onClick={()=>setModal('callEmergency')} color='secondary' target="_blank" variant="contained" >{language === 'EN' ? 'Emergency' : 'Emergencia'}</Button>
                    </MenuItem>
                    <div style={{marginLeft: '12px'}}><LanguageToggle setLanguage={setLanguage} language={language}/></div>
                </div>}
                <Drawer open={open} anchor='right' onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
            </Toolbar>
        </AppBar>
    )
}