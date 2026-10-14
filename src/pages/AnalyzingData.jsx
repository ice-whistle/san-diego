import './AnalyzingData.css';
import { useEffect, useMemo, useState } from "react";
import Plotly from "plotly.js-cartesian-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import { getAnalysisAlertAPIResponse, submitPassword } from "../utils/getAnalysisResults";
import { Typography, CircularProgress, CardContent, TextField, CardActions, Button, Alert, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

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

const HOURS = [...Array(24).keys()];
const bucketIndex = (hour) => BUCKETS.findIndex((bucket) => hour >= bucket.from && hour < bucket.to);

export const AnalyzingData = ({}) => {
  const [analysisAlerts, setAnalysisAlerts] = useState(null);
  const [analysisAlertsLoading, setAnalysisAlertsLoading] = useState(true);
  const [analysisAlertsError, setAnalysisAlertsError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordResponse, setPasswordResponse] = useState('NeedsToSubmitPassword');
  const [selectTime, setSelectTime] = useState("buckets");
  const [selectZipTime, setSelectZipTime] = useState("buckets");

  const handleSubmitClick = async (password) => {
      setPasswordResponse('Loading');
      const response = await submitPassword(password);
      setPasswordResponse(response);
    };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSelectTime = (event) => {
    setSelectTime(event.target.value);
  };

  const handleSelectZipTime = (event) => {
    setSelectZipTime(event.target.value);
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
    const zipIdx = Object.fromEntries(zipCodes.map((z, i) => [z, i]));
    const height = Math.max(350, zipCodes.length * 22 + 120);

    // 1. zip x time of day
    const colsZipTime = selectZipTime === "hours" ? HOURS.map((h) => `${h}:00-${h + 1}:00`) : BUCKETS.map((b) => b.label);
    const colOfZipTime = (a) => (selectZipTime === "hours" ? a.hour : bucketIndex(a.hour));
    const timeGrid = zipCodes.map(() => Array(colsZipTime.length).fill(0));
    analysisAlerts.forEach((a) => timeGrid[zipIdx[a.zipCode]][colOfZipTime(a)]++);

    // 2. zip x day
    const dayOf = (a) => a.date.split("T")[0];
    const days = [...new Set(analysisAlerts.map(dayOf))].sort();
    const dayIdx = Object.fromEntries(days.map((d, i) => [d, i]));
    const dayGrid = zipCodes.map(() => Array(days.length).fill(0));
    analysisAlerts.forEach((alert) => dayGrid[zipIdx[alert.zipCode]][dayIdx[dayOf(alert)]]++);

    // 3. by time of day
    const colsTime = selectTime === "hours" ? HOURS.map((h) => `${h}:00-${h + 1}:00`) : BUCKETS.map((b) => b.label);
    const labels = colsTime;
    const colOfTime = (a) => (selectTime === "hours" ? a.hour : bucketIndex(a.hour));
    const counts = Array(labels.length).fill(0);
    analysisAlerts.forEach((a) => counts[colOfTime(a)]++);
    const mostActiveTime = colsTime[counts.indexOf(Math.max(...counts))];

    const heatLayout = (title) => ({
      title,
      yaxis: { type: "category", autorange: "reversed" },
      xaxis: { type: "category" },
      margin: { l: 50, r: 0, t: 50, b: 80 },
      height,
    });

    const colorbar = { thickness: 12 };

    return {
      mostActiveZipCodes: zipCodes.slice(0,5),
      mostActiveTime,
      zipTime: {
        data: [{ type: "heatmap", x: colsZipTime, y: zipCodes, z: timeGrid, colorscale: "Turbo", colorbar,
          hovertemplate: "Zip code: %{y}<br>%{x}<br>%{z} alerts<extra></extra>" }],
        layout: heatLayout("Alerts by zip code and time of day"),
      },
      zipDay: {
        data: [{ type: "heatmap", x: days, y: zipCodes, z: dayGrid, colorscale: "Turbo", colorbar,
          hovertemplate: "Zip code: %{y}<br>%{x}<br>%{z} alerts<extra></extra>" }],
        layout: heatLayout("Alerts by zip code and day"),
      },
      byTime: {
        data: [{ type: "bar", x: colsTime, y: counts, text: counts, textposition: "outside" }],
        layout: {
          title: "Alerts by time of day",
          xaxis: { type: "category", title: "Time of day" },
          yaxis: { title: "Total alerts" },
          height: 500,
          margin: { l: 20, r: 0, t: 50, b: 80 },
        },
      },
    };
  }, [analysisAlerts, selectTime, selectZipTime]);

  if (passwordResponse === 'NeedsToSubmitPassword' || passwordResponse === 'Error')
    return (
        <div className="analyzingData-pageContainer">
            <Typography variant="h4">Analyzing data</Typography>
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
            <Typography variant="h4">Analyzing data</Typography>
            <Typography variant="body1">An error occurred. Please try again later.</Typography>
        </div>
    );

  if ((!analysisAlerts || analysisAlertsLoading) && passwordResponse === 'Success')
    return (
    <div className="analyzingData-pageContainer">
        <Typography variant="h4">Analyzing data</Typography>
        <div className="analyzingData-loading">
            <CircularProgress />
        </div>
    </div>
    );

    if (passwordResponse === 'Success' && !analysisAlertsLoading && analysisAlerts)
        return (
            <div className="analyzingData-pageContainer">
                <Typography variant="h4">Analyzing data</Typography>
                <Typography variant="h5">Daily ICE Sightings by ZIP Code</Typography>
                <Alert variant='filled' severity='warning'>
                    <Typography variant='subtitle2' sx={{display: 'flex', textAlign: 'left', whiteSpace: 'pre-wrap'}}>
                        {`This graph is based on sighting data sourced from StopICE.net betweeen ${analysisAlerts[analysisAlerts.length - 1].date.split("T")[0]} and ${analysisAlerts[0].date.split("T")[0]}.\nAccording to this data, ICE seems most active in the following ZIP codes: ${charts.mostActiveZipCodes.join(", ")}.`}
                    </Typography>
                </Alert>
                <ResponsivePlot data={charts.zipDay.data} layout={charts.zipDay.layout} />
                <Typography variant="h5">ICE Sightings by Time of Day</Typography>
                <Box className="analyzingData-alertAndFilter">
                  <Alert variant='filled' severity='warning' sx={{width: 'stretch'}}>
                    <Typography variant='subtitle2' sx={{display: 'flex', textAlign: 'left', whiteSpace: 'pre-wrap'}}>
                        {`This graph is based on sighting data sourced from StopICE.net betweeen ${analysisAlerts[analysisAlerts.length - 1].date.split("T")[0]} and ${analysisAlerts[0].date.split("T")[0]}.\nAccording to this data, ICE seems most active from ${charts.mostActiveTime}.`}
                    </Typography>
                  </Alert>
                  <FormControl sx={{width: '200px'}}>
                    <InputLabel id="demo-simple-select-label">Time buckets</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectTime}
                      label="Time bucket"
                      onChange={handleSelectTime}
                    >
                      <MenuItem value={'buckets'}>6 time buckets</MenuItem>
                      <MenuItem value={'hours'}>Hourly</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <ResponsivePlot data={charts.byTime.data} layout={charts.byTime.layout} />
                <Typography variant="h5">ICE sightings by ZIP code and Time of Day</Typography>
                <Box className="analyzingData-alertAndFilter">
                  <Alert variant='filled' severity='warning' sx={{width: 'stretch'}}>
                    <Typography variant='subtitle2' sx={{display: 'flex', textAlign: 'left', whiteSpace: 'pre-wrap'}}>
                        {`This graph is based on sighting data sourced from StopICE.net betweeen ${analysisAlerts[analysisAlerts.length - 1].date.split("T")[0]} and ${analysisAlerts[0].date.split("T")[0]}.`}
                    </Typography>
                  </Alert>
                  <FormControl sx={{width: '200px'}}>
                    <InputLabel id="demo-simple-select-label">Time buckets</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectZipTime}
                      label="Time bucket"
                      onChange={handleSelectZipTime}
                    >
                      <MenuItem value={'buckets'}>6 time buckets</MenuItem>
                      <MenuItem value={'hours'}>Hourly</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <ResponsivePlot data={charts.zipTime.data} layout={charts.zipTime.layout} />
            </div>
        );
};
