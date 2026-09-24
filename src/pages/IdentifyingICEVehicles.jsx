import './Pages.css';
import { Grid, Typography, Box, Divider, CircularProgress } from '@mui/material';
import {
    CBPVehicle,
    ICEVehicle
} from '../assets/images'
import { useEffect, useState } from 'react';

export const IdentifyingICEVehicles = ({language, setFocusedCenter, setFocusedZoom, setFocusedAlertId}) =>{
    setFocusedCenter(null);
    setFocusedZoom(null);
    setFocusedAlertId(null);

    const details = {
        partOne: {
            titleEN: 'Marked Vehicles',
            titleES: 'Vehículos rotulados',
            left: {
                titleEN: 'U.S. Customs and Border Protection (CBP)',
                titleES: 'Oficina de Aduanas y Protección Fronteriza de los EEUU (CBP)',
                textEN: [
                    'White vehicle with blue stripe',
                    'U.S. Customs and Borders logo',
                    'Lights on top of car'
                ],
                textES: [
                    'Vehículo blanco con una franja azul',
                    'Logotipo de Aduanas y Protección Fronteriza de los EEUU',
                    'Luces en el techo del coche'
                ]
            },
            right: {
                titleEN: 'U.S. Immigration and Customs Enforcement (ICE)',
                titleES: 'Servicio de Inmigración y Control de Aduanas de los EEUU (ICE)',
                textEN: [
                    'White vehicle with blue stripe',
                    'U.S. Customs and Borders logo',
                    'Lights on top of car'
                ],
                textES: [
                    'Vehículo blanco con una franja verde',
                    'Logotipo de Aduanas y Protección Fronteriza de los EEUU',
                    'Luces en el techo del coche'
                ]
            }
        },
        partTwo: {
            titleEN: 'Unmarked Vehicles',
            titleES: 'Vehículos sin distintivos',
            left: {
                top: {
                    titleEN: 'Generalizations',
                    titleES: 'Generalizaciones',
                    textEN: [
                        'SUVs (black, white, grey)',
                        'Sedans',
                        'Plain white vans (standard transport type)',
                        'Rental minivans',
                        'Government fleet SUVs with subtle markings'
                    ],
                    textES: [
                        'SUV (negros, blancos, grises)',
                        'Sedanes',
                        'Furgonetas blancas lisas (tipo de transporte estándar)',
                        'Minivans de alquiler',
                        'SUV de flotas gubernamentales con distintivos discretos'
                    ]
                },
                bottom: {
                    titleEN: 'License Plates',
                    titleES: 'Placas de matrícula',
                    textEN: [
                        'Out-of-state plates on vehicles operating in-state',
                        'Government “G” plates (not universal, but sometimes used)',
                        'Fleet-style plates from vehicle dealerships',
                        'Missing front license plates (common on federal SUVs)',
                        'Rental vehicle plates (Enterprise, Hertz, etc.)',
                        'Sometimes regular license plates (not CA Exempt)',
                    ],
                    textES: [
                        'Placas de otros estados en vehículos que circulan dentro del estado',
                        'Placas gubernamentales con la letra "G" (no son universales, pero a veces se utilizan)',
                        'Placas de tipo flota de concesionarios de vehículos',
                        'Falta de placa delantera (común en SUV federales)',
                        'Placas de vehículos de alquiler (Enterprise, Hertz, etc.)',
                        'En ocasiones, placas de matrícula ordinarias (que no indican "CA Exempt")'
                    ]
                },
            },
            right: {
                top: {
                    titleEN: 'Makes & Models',
                    titleES: 'Marcas y modelos',
                    textEN: [
                        'Generally U.S. made cars',
                        'Ford: Edge, Expedition, Explorer',
                        'Dodge: Caravan, Charger, Durango',
                        'Chevrolet: Impala, Silverado, Suburban, Tahoe',
                        'GMC'
                    ],
                    textES: [
                        'Generalmente, automóviles fabricados en EEUU',
                        'Ford: Edge, Expedition, Explorer',
                        'Dodge: Caravan, Charger, Durango',
                        'Chevrolet: Impala, Silverado, Suburban, Tahoe',
                        'GMC'
                    ]
                },
                bottom: {
                    titleEN: 'Features',
                    titleES: 'Características',
                    textEN: [
                        'Ultra dark tinted windows',
                        'Lack of markings (no agency markings, no decals)',
                        'Interior dashboard lights',
                        'Visor-mounted lights',
                        'Rear-window LED flashers'
                    ],
                    textES: [
                        'Ventanas con tintado ultra oscuro',
                        'Ausencia de distintivos (sin marcas de agencia ni calcomanías)',
                        'Luces en el panel de instrumentos',
                        'Luces montadas en la visera',
                        'Luces estroboscópicas LED en la ventana trasera'
                    ]
                },
            }
        },
        partThree: {
            titleEN: 'Recording',
            titleES: 'Grabación',
            subtitleEN: [
                'When taking photos or notes, capture:',
                'Even if you can\'t get all the details, try recording as much as possible.'
            ],
            subtitleES: [
                'Al tomar fotos o notas, captura:',
                'Aunque no logres captar todos los detalles, intenta registrar tanto como sea posible.'
            ],
            textEN: [
                'Full or partial license plates',
                'Make and model',
                'Color',
                'Any visible emergency lights',
                'Any decals (even small ones)',
                'Damage, stickers, or unique features'
            ],
            textES: [
                'Matrículas completas o parciales',
                'Marca y modelo',
                'Color',
                'Cualquier luz de emergencia visible',
                'Cualquier calcomanía (incluso las pequeñas)',
                'Daños, pegatinas o características distintivas'
            ]
        }
    }
    const [imageLoading1, setImageLoading1] = useState(true);
    const [imageLoading2, setImageLoading2] = useState(true);
    useEffect(() => {
        const img = new Image();
        img.src = CBPVehicle;
        img.onload = () => setImageLoading1(false);
        }, [CBPVehicle]);

    useEffect(() => {
        const img = new Image();
        img.src = ICEVehicle;
        img.onload = () => setImageLoading2(false);
        }, [ICEVehicle]);
    
  return (
    <div className='pageContainer'>
        <Typography variant='h4'>{language === 'EN' ? 'Identifying ICE Vehicles' : 'Identificación de vehículos de ICE'}</Typography>
        <Typography variant='h5' sx={{fontWeight: 'bold'}}>{language === 'EN' ? details.partOne.titleEN : details.partOne.titleES}</Typography>
        <Grid container spacing={2}>
            <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} >
                <div>
                    <Typography variant='h6' sx={{fontWeight: 'bold'}}>{language === 'EN' ? details.partOne.left.titleEN :  details.partOne.left.titleES}</Typography>
                    <Typography component="ul" sx={{ textAlign: 'left', listStyleType: 'disc', pl: 2 }}>
                        {language === 'EN' ? details.partOne.left.textEN.map((text) => (<li>{text}</li>)):details.partOne.left.textES.map((text) => (<li>{text}</li>))}
                    </Typography>
                </div>
                {imageLoading1 && <div className='posterImage'>
                    <CircularProgress />
                </div>}
                {!imageLoading1 && <Box
                    component="img"
                    sx={{
                        aspectRatio: 'auto',
                        width: '100%',
                        maxWidth: '100%'
                    }}
                    alt="Marked CBP Vehicle"
                    src={CBPVehicle}
                    />}
            </Grid>
            <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <div>
                    <Typography variant='h6' sx={{fontWeight: 'bold'}}>{language === 'EN' ? details.partOne.right.titleEN :  details.partOne.right.titleES}</Typography>
                    <Typography component="ul" sx={{ textAlign: 'left', listStyleType: 'disc', pl: 2 }}>
                        {language === 'EN' ? details.partOne.right.textEN.map((text) => (<li>{text}</li>)):details.partOne.right.textES.map((text) => (<li>{text}</li>))}
                    </Typography>
                </div>
                {imageLoading2 && <div className='posterImage'>
                    <CircularProgress />
                </div>}
                {!imageLoading2 && <Box
                    component="img"
                    sx={{
                        aspectRatio: 'auto',
                        width: '100%',
                        maxWidth: '100%'
                    }}
                    alt="Marked ICE Vehicle"
                    src={ICEVehicle}
                    />}
            </Grid>  
        </Grid>
        <Divider />
        <Typography variant='h5' sx={{fontWeight: 'bold'}}>{language === 'EN' ? details.partTwo.titleEN : details.partTwo.titleES}</Typography>
        <Grid container spacing={2}>
            <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}} >
                <Typography variant='h6' sx={{fontWeight: 'bold'}}>{language === 'EN' ? details.partTwo.left.top.titleEN : details.partTwo.left.top.titleES}</Typography>
                <Typography component="ul" sx={{ textAlign: 'left', listStyleType: 'disc', pl: 2}}>
                    {language === 'EN' ? details.partTwo.left.top.textEN.map((text) => (<li>{text}</li>)):details.partTwo.left.top.textES.map((text) => (<li>{text}</li>))}
                </Typography>
            </Grid>
            <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}} >
                <Typography variant='h6' sx={{fontWeight: 'bold'}}>{language === 'EN' ? details.partTwo.right.top.titleEN : details.partTwo.right.top.titleES}</Typography>
                <Typography component="ul" sx={{ textAlign: 'left', listStyleType: 'disc', pl: 2}}>
                    {language === 'EN' ? details.partTwo.right.top.textEN.map((text) => (<li>{text}</li>)):details.partTwo.right.top.textES.map((text) => (<li>{text}</li>))}
                </Typography>
            </Grid>  
            <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}} >
                <Typography variant='h6' sx={{fontWeight: 'bold'}}>{language === 'EN' ? details.partTwo.left.bottom.titleEN : details.partTwo.left.bottom.titleES}</Typography>
                <Typography component="ul" sx={{ textAlign: 'left', listStyleType: 'disc', pl: 2}}>
                    {language === 'EN' ? details.partTwo.left.bottom.textEN.map((text) => (<li>{text}</li>)):details.partTwo.left.bottom.textES.map((text) => (<li>{text}</li>))}
                </Typography>
            </Grid>
            <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}} >
                <Typography variant='h6' sx={{fontWeight: 'bold'}}>{language === 'EN' ? details.partTwo.right.bottom.titleEN : details.partTwo.right.bottom.titleES}</Typography>
                <Typography component="ul" sx={{ textAlign: 'left', listStyleType: 'disc', pl: 2}}>
                    {language === 'EN' ? details.partTwo.right.bottom.textEN.map((text) => (<li>{text}</li>)):details.partTwo.right.bottom.textES.map((text) => (<li>{text}</li>))}
                </Typography>
            </Grid>
        </Grid>
        <Divider />
        <Typography variant='h5' sx={{fontWeight: 'bold'}}>{language === 'EN' ? details.partThree.titleEN : details.partThree.titleES}</Typography>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>{language === 'EN' ? details.partThree.subtitleEN[0] : details.partThree.subtitleES[0]}</Typography>
        <Typography component="ul" sx={{ textAlign: 'center', listStyleType: 'none', pl: 0}}>
            {language === 'EN' ? details.partThree.textEN.map((text) => (<li>{text}</li>)):details.partThree.textES.map((text) => (<li>{text}</li>))}
        </Typography>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>{language === 'EN' ? details.partThree.subtitleEN[1] : details.partThree.subtitleES[1]}</Typography>
        <Divider />
        <Typography variant='h5' sx={{fontWeight: 'bold'}}>{language === 'EN' ? 'Sources' : 'Fuentes'}</Typography>
        <Typography component="ul" sx={{ textAlign: 'left', listStyleType: 'disc', pl: 2, wordBreak: 'break-word', overflowWrap: 'break-word'}}>
            <li>Asian Americans Advancing Justice Southern California, and NorCal Resist. “How to Identify ICE & CBP Cars.” Instagram, 2017, www.instagram.com/p/DKzd9smxb9S/. Accessed 24 Mar. 2026.</li>
            <li>“ICE Vehicle Identification.” ICE List Wiki, 2022, wiki.icelist.is/index.php/ICE_Vehicle_Identification. Accessed 24 Mar. 2026.</li>
            <li>Immigrant Defenders Law Center. How to Identify ICE & CBP Vehicles. assets.ctfassets.net/ogxup1whgdad/1BNEhvmo6meeu4rUmO8GGU/14e9a4d71421e5e35265cf37b335cc85/b9e71e_1ea2ad76e1f04affb3b7b544caddb1c1.pdf. Accessed 24 Mar. 2026.</li>
            <li>Inland Coalition for Immigrant Justice. “How to Identify ICE/CBP Undercover Vehicles.” Instagram, 2017, www.instagram.com/p/DK8Lq-jyom5/?img_index=1. Accessed 24 Mar. 2026.</li>
            <li>Unión del Barrio. “How to Identify ICE Vehicles?” June 2025, https://uniondelbarrio.org/main/wp-content/uploads/2025/01/Volante_PatrullasComunitarias_vehiculos_qr_June202025_85x11.pdf. Accessed 24 Mar. 2026.</li>
        </Typography>
    </div>
  );
}