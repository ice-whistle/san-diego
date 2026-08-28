import { useState, useEffect, useRef } from 'react';
import './App.css';
import { NavBar } from './components/NavBar.jsx';
import { YourRights } from './pages/YourRights.jsx';
import { LiveMap } from './pages/LiveMap.jsx';
import { Resources } from './pages/Resources.jsx';
import { getAlertsEveryHour, getfilteredAlertAPIResponse } from './utils/getAPIResults';
import { Footer } from './components/Footer.jsx';
import { Posters } from './pages/Posters.jsx';
import { IdentifyingICEVehicles } from './pages/IdentifyingICEVehicles.jsx';
import { Routes, Route } from 'react-router-dom';
import { ProtectingStudents } from './pages/ProtectingStudents.jsx';
import { Hotlines } from './pages/Hotlines.jsx';
import { FullModal } from './components/FullModal.jsx';
import { Fab } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { useScreenResolution } from './utils/ScreenSize.tsx';

function App() {
  const [language, setLanguage] = useState('EN');
  const [alerts, setAlerts] = useState([]);
  const [alertsLoading, setAlertsLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [focusedCenter, setFocusedCenter] = useState(null);
  const [focusedZoom, setFocusedZoom] = useState(null);
  const [focusedAlertId, setFocusedAlertId] = useState(null);
  const hasFetched = useRef(false);
  const { isXSmall, isSmall } = useScreenResolution();
  const isMobile = isXSmall || isSmall;

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    getfilteredAlertAPIResponse(setAlerts, setAlertsLoading);
  }, []);

  // getAlertsEveryHour(setAlerts, setAlertsLoading);

  return (
    <div className="App">
      <NavBar setLanguage={setLanguage} language={language} setModal={setModal}/>
      <div className='bodyContainer'>
        {modal &&
          <FullModal
            modal={modal}
            setModal={setModal}
            language={language}
            setModalContent={setModalContent}
            modalContent={modalContent}
            />}
        <Routes>
          <Route path="/" element={<LiveMap
            language={language}
            alerts={alerts}
            alertsLoading={alertsLoading}
            setFocusedCenter={setFocusedCenter}
            focusedCenter={focusedCenter}
            setFocusedZoom={setFocusedZoom}
            focusedZoom={focusedZoom}
            setFocusedAlertId={setFocusedAlertId}
            focusedAlertId={focusedAlertId}
            setModal={setModal}
            setModalContent={setModalContent}
            />} />
          <Route path="/your-rights" element={<YourRights
            language={language}
            setFocusedCenter={setFocusedCenter}
            setFocusedZoom={setFocusedZoom}
            setFocusedAlertId={setFocusedAlertId}/>} />
          <Route path="/resources" element={<Resources
            language={language}
            setFocusedCenter={setFocusedCenter}
            setFocusedZoom={setFocusedZoom}
            setFocusedAlertId={setFocusedAlertId}/>} />
          <Route path="/hotlines" element={<Hotlines
            language={language}
            setFocusedCenter={setFocusedCenter}
            setFocusedZoom={setFocusedZoom}
            setFocusedAlertId={setFocusedAlertId}
            setModal={setModal}
            />} />
          <Route path="/posters" element={<Posters
            language={language}
            setFocusedCenter={setFocusedCenter}
            setFocusedZoom={setFocusedZoom}
            setFocusedAlertId={setFocusedAlertId}/>} />
          <Route path="/identifying-ICE-vehicles" element={<IdentifyingICEVehicles
            language={language}
            setFocusedCenter={setFocusedCenter}
            setFocusedZoom={setFocusedZoom}
            setFocusedAlertId={setFocusedAlertId}/>} />
          <Route path="/protecting-students" element={<ProtectingStudents
            language={language}
            setFocusedCenter={setFocusedCenter}
            setFocusedZoom={setFocusedZoom}
            setFocusedAlertId={setFocusedAlertId}/>} />
        </Routes>
        <Fab variant={isMobile ? 'circular' : 'extended'} color="primary" aria-label="add" className='createNewSighting' onClick={()=>{setModal('reportSighting');}}>
          <Visibility sx={{ mr: {sm: 0, md: 1} }}/>
          {!isMobile && language === 'EN' && 'Report a sighting'}
          {!isMobile && language === 'ES' && 'Reportar un avistamiento'}
        </Fab>
      </div>
      <Footer language={language}/>
    </div>
  );
}

export default App;
