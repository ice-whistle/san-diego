import './AnalyzingData.css';
import { useEffect, useMemo, useState } from "react";
import Plotly from "plotly.js-cartesian-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import { getAnalysisAlertAPIResponse, submitPassword } from "../utils/getAnalysisResults";
import { Typography, CircularProgress, CardContent, TextField, CardActions, Button, Alert } from "@mui/material";

const Plot = createPlotlyComponent(Plotly);

function ResponsivePlot({ layout, ...props }) {
  return (
    <div  style={{ width: "100%" }}>
      <Plot
        {...props}
        layout={{ ...layout, autosize: true }}
        style={{ width: "100%" }}
        useResizeHandler
      />
    </div>
  );
}

const BUCKETS = [
  { label: "12am-6am", from: 0, to: 6 },
  { label: "6am-9am", from: 6, to: 9 },
  { label: "9am-12pm", from: 9, to: 12 },
  { label: "12pm-4pm", from: 12, to: 16 },
  { label: "4pm-9pm", from: 16, to: 21 },
  { label: "9pm-12am", from: 21, to: 24 },
];
const bucketIndex = (hour) => BUCKETS.findIndex((bucket) => hour >= bucket.from && hour < bucket.to);

export const AnalyzingData = ({}) => {
  const [analysisAlerts, setAnalysisAlerts] = useState(null);
  const [analysisAlertsLoading, setAnalysisAlertsLoading] = useState(true);
  const [analysisAlertsError, setAnalysisAlertsError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordResponse, setPasswordResponse] = useState('NeedsToSubmitPassword');
  const [mostActiveTime, setMostActiveTime] = useState('');
  const [mostActiveZipCodes, setMostActiveZipCodes] = useState('');

  const handleSubmitClick = async (password) => {
      setPasswordResponse('Loading');
      const response = await submitPassword(password);
      setPasswordResponse(response);
    };

    const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    // Return the cancel function so retries/state updates stop on unmount
    return getAnalysisAlertAPIResponse(
      setAnalysisAlerts,
      setAnalysisAlertsLoading,
      setAnalysisAlertsError
    );
  }, []);

  const charts = useMemo(() => {
    if (!analysisAlerts) return null;

    const totals = {};
    analysisAlerts.forEach((a) => (totals[a.zipCode] = (totals[a.zipCode] || 0) + 1));
    const zipCodes = Object.keys(totals).sort((a, b) => totals[b] - totals[a]);
    setMostActiveZipCodes(zipCodes);
    const zipIdx = Object.fromEntries(zipCodes.map((z, i) => [z, i]));
    const height = Math.max(350, zipCodes.length * 22 + 120);

    // 1. zip x time of day
    const cols = BUCKETS.map((b) => b.label);
    const timeGrid = zipCodes.map(() => Array(cols.length).fill(0));
    analysisAlerts.forEach((a) => timeGrid[zipIdx[a.zipCode]][bucketIndex(a.hour)]++);

    // 2. zip x day
    const dayOf = (a) => a.date.split("T")[0];
    const days = [...new Set(analysisAlerts.map(dayOf))].sort();
    const dayIdx = Object.fromEntries(days.map((d, i) => [d, i]));
    const dayGrid = zipCodes.map(() => Array(days.length).fill(0));
    analysisAlerts.forEach((alert) => dayGrid[zipIdx[alert.zipCode]][dayIdx[dayOf(alert)]]++);

    // 3. by time of day
    const labels = cols;
    const counts = Array(labels.length).fill(0);
    analysisAlerts.forEach((a) => counts[bucketIndex(a.hour)]++);
    setMostActiveTime(cols[counts.indexOf(Math.max(...counts))]);

    const heatLayout = (title) => ({
      title,
      yaxis: { type: "category", autorange: "reversed" },
      xaxis: { type: "category" },
      margin: { l: 50, r: 0, t: 50, b: 80 },
      height,
    });

    const colorbar = { thickness: 12 };

    return {
      zipDay: {
        data: [{ type: "heatmap", x: days, y: zipCodes, z: dayGrid, colorscale: "Turbo", colorbar,
          hovertemplate: "Zip code: %{y}<br>%{x}<br>%{z} alerts<extra></extra>" }],
        layout: heatLayout("Alerts by zip code and day"),
      },
      zipTime: {
        data: [{ type: "heatmap", x: cols, y: zipCodes, z: timeGrid, colorscale: "Turbo", colorbar,
          hovertemplate: "Zip code: %{y}<br>%{x}<br>%{z} alerts<extra></extra>" }],
        layout: heatLayout("Alerts by zip code and time of day"),
      },
      byTime: {
        data: [{ type: "bar", x: labels, y: counts, text: counts, textposition: "outside" }],
        layout: {
          title: "Alerts by time of day",
          xaxis: { type: "category", title: "Time of day" },
          yaxis: { title: "Total alerts" },
          height: 500,
          margin: { l: 20, r: 0, t: 50, b: 80 },
        },
      },
    };
  }, [analysisAlerts]);

  if (passwordResponse === 'NeedsToSubmitPassword' || passwordResponse === 'Error')
    return (
        <div className="analyzingData-pageContainer">
            <Typography variant="h4">Analyzing alerts</Typography>
            <div className="analyzingData-passwordContainer">
                <CardContent className='analyzingData-passwordCardContent'>
                    <TextField
                        error={passwordResponse === 'Error'}
                        required
                        id="password"
                        label='Enter password'
                        value={password}
                        onChange={handlePassword}
                        fullWidth
                        helperText={passwordResponse === 'Error' ? 'Incorrect password.' : ''}
                    />
                </CardContent>
                <CardActions sx={{display: 'flex', padding: '16px'}}>
                    <Button target="_blank" onClick={()=>{handleSubmitClick(password)}} variant="contained" size='large' sx={{width: '100%', minWidth: 'auto', whiteSpace: 'nowrap'}}>Submit</Button>
                </CardActions>
            </div>
        </div>
    )

  if (analysisAlertsError && passwordResponse === 'Success')
    return (
        <div className="analyzingData-pageContainer">
            <Typography variant="h4">Analyzing alerts</Typography>
            <Typography variant="body1">An error occurred. Please try again later.</Typography>
        </div>
    );

  if ((!analysisAlerts || analysisAlertsLoading) && passwordResponse === 'Success')
    return (
    <div className="analyzingData-pageContainer">
        <Typography variant="h4">Analyzing alerts</Typography>
        <div className="analyzingData-loading">
            <CircularProgress />
        </div>
    </div>
    );

    if (passwordResponse === 'Success' && !analysisAlertsLoading && analysisAlerts)
        return (
            <div className="analyzingData-pageContainer">
                <Typography variant="h4">Analyzing alerts</Typography>
                <Typography variant="h5">ICE Sightings by Time of Day</Typography>
                <Alert variant='filled' severity='info'>
                    <Typography variant='subtitle2' sx={{display: 'flex', textAlign: 'left', whiteSpace: 'pre-wrap'}}>
                        {`This graph is based on sighting data sourced from StopICE.net betweeen ${analysisAlerts[analysisAlerts.length - 1].date.split("T")[0]} and ${analysisAlerts[0].date.split("T")[0]}.\nAccording to this data, ICE seems most active from ${mostActiveTime}.`}
                    </Typography>
                </Alert>
                <ResponsivePlot data={charts.byTime.data} layout={charts.byTime.layout} />
                <Typography variant="h5">Daily ICE Sightings by ZIP Code</Typography>
                <Alert variant='filled' severity='info'>
                    <Typography variant='subtitle2' sx={{display: 'flex', textAlign: 'left', whiteSpace: 'pre-wrap'}}>
                        {`This graph is based on sighting data sourced from StopICE.net betweeen ${analysisAlerts[analysisAlerts.length - 1].date.split("T")[0]} and ${analysisAlerts[0].date.split("T")[0]}.\nAccording to this data, ICE seems most active in the following ZIP codes: ${mostActiveZipCodes[0]}, ${mostActiveZipCodes[1]}, ${mostActiveZipCodes[2]}, ${mostActiveZipCodes[3]}, and ${mostActiveZipCodes[4]}.`}
                    </Typography>
                </Alert>
                <ResponsivePlot data={charts.zipDay.data} layout={charts.zipDay.layout} />
                {/* <Typography variant="h5">Hourly ICE sightings by ZIP code</Typography>
                <Alert variant='filled' severity='info'>
                    <Typography variant='subtitle2' sx={{display: 'flex', textAlign: 'left', whiteSpace: 'pre-wrap'}}>
                        {`This graph is based on sighting data sourced from StopICE.net betweeen ${analysisAlerts[analysisAlerts.length - 1].date.split("T")[0]} and ${analysisAlerts[0].date.split("T")[0]}.\nAccording to this data, ICE seems most active from ${mostActiveTime}.`}
                    </Typography>
                </Alert>
                <ResponsivePlot data={charts.zipTime.data} layout={charts.zipTime.layout} /> */}
            </div>
        );
};
