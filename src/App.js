import { useState, useEffect, useRef } from 'react';
import './App.css';
import { NavBar } from './components/NavBar';
import { KnowYourRights } from './pages/KnowYourRights';
import { LiveMap } from './pages/LiveMap';
import { Resources } from './pages/Resources';
import { getAlertsEveryHour, getfilteredAlertAPIResponse } from './utils/getAPIResults';

function App() {
  const [tab, setTab] = useState('LiveMap');
  const [language, setLanguage] = useState('EN');
  const [alerts, setAlerts] = useState([]);
  const [focusedCenter, setFocusedCenter] = useState(null);
  const [focusedZoom, setFocusedZoom] = useState(null);
  const [focusedAlertId, setFocusedAlertId] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    getfilteredAlertAPIResponse(setAlerts);
  }, []);

  getAlertsEveryHour(setAlerts);

  return (
    <div className="App">
      <NavBar setTab={setTab} tab={tab} setLanguage={setLanguage} language={language}/>
      {tab === 'LiveMap' &&
        <LiveMap
          language={language}
          alerts={alerts}
          setFocusedCenter={setFocusedCenter}
          focusedCenter={focusedCenter}
          setFocusedZoom={setFocusedZoom}
          focusedZoom={focusedZoom}
          setFocusedAlertId={setFocusedAlertId}
          focusedAlertId={focusedAlertId}/>
      }
      {tab === 'KnowYourRights' &&
        <KnowYourRights language={language}/>
      }
      {tab === 'Resources' &&
        <Resources language={language}/>
      }
    </div>
  );
}

export default App;
