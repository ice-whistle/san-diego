import {
    AppBar,
    IconButton,
    MenuItem,
    Toolbar,
    Drawer,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './NavBar.js';
import { useScreenResolution } from '../utils/ScreenSize.tsx';
import { useState } from 'react';
import { LanguageToggle } from './LanguageToggle.js';

export const NavBar = ({setTab, tab, setLanguage, language}) => {
    const { isXSmall, isSmall } = useScreenResolution();
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const knowYourRightsOnClick = () => {
        setTab('KnowYourRights');
    }
    const liveMapOnClick = () => {
        setTab('LiveMap');
    }
    const resourcesOnClick = () => {
        setTab('Resources');
    }

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <div style={{padding: '16px'}}><LanguageToggle setLanguage={setLanguage} language={language}/></div>
                <ListItem key={'LiveMap'} disablePadding>
                    <ListItemButton onClick={liveMapOnClick}>
                        <ListItemText primary={language === 'EN' ? 'Live Map' : 'Mapa en vivo'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'KnowYourRights'} disablePadding>
                    <ListItemButton onClick={knowYourRightsOnClick}>
                        <ListItemText primary={language === 'EN' ? 'Know Your Rights' : 'Conozca sus derechos'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'Resources'} disablePadding>
                    <ListItemButton onClick={resourcesOnClick}>
                        <ListItemText primary={language === 'EN' ? 'Resources' : 'Recursos'} />
                    </ListItemButton>
                </ListItem>
                
            </List>
        </Box>
    );

    return (
        <AppBar position="absolute">
            <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '4px', margin: '16px 0px'}}>
                    <h1 style={{textAlign: 'left', padding: '0px', margin: '0px'}}>ICE Whistle</h1>
                    <h3 style={{textAlign: 'left', padding: '0px', margin: '0px'}}>San Diego</h3>
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
                    <MenuItem key={'Home'} onClick={liveMapOnClick}>
                        <p style={{fontWeight: tab==='LiveMap'?'bold':'unset'}}>{language === 'EN' ? 'Live Map' : 'Mapa en vivo'}</p>
                    </MenuItem>
                    <MenuItem key={'KnowYourRights'} onClick={knowYourRightsOnClick}>
                        <p style={{fontWeight: tab==='KnowYourRights'?'bold':'unset'}}>{language === 'EN' ? 'Know Your Rights' : 'Conozca sus derechos'}</p>
                    </MenuItem>
                    <MenuItem key={'Resources'} onClick={resourcesOnClick}>
                        <p style={{fontWeight: tab==='Resources'?'bold':'unset'}}>{language === 'EN' ? 'Resources' : 'Recursos'}</p>
                    </MenuItem>
                    <LanguageToggle setLanguage={setLanguage} language={language}/>
                </div>}
                <Drawer open={open} anchor='right' onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
            </Toolbar>
        </AppBar>
    )
}