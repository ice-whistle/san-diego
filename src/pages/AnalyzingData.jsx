import './AnalyzingData.css';
import { useEffect, useMemo, useState } from "react";
import Plotly from "plotly.js-cartesian-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import { getAnalysisAlertAPIResponse, submitPassword } from "../utils/getAnalysisResults";
import { Typography, CircularProgress, CardContent, TextField, CardActions, Button, Alert, FormControl, InputLabel, Select, MenuItem, Box, AlertTitle, Divider } from "@mui/material";
import { DataHeatMap } from '../components/DataHeatMap';

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

const HOURS = [
  { label: "12am-1am", from: 0, to: 1 },
  { label: "1am-2am", from: 1, to: 2 },
  { label: "2am-3am", from: 2, to: 3 },
  { label: "3am-4am", from: 3, to: 4 },
  { label: "4am-5am", from: 4, to: 5 },
  { label: "5am-6am", from: 5, to: 6 },
  { label: "6am-7am", from: 6, to: 7 },
  { label: "7am-8am", from: 7, to: 8 },
  { label: "8am-9am", from: 8, to: 9 },
  { label: "9am-10am", from: 9, to: 10 },
  { label: "10am-11am", from: 10, to: 11 },
  { label: "11am-12pm", from: 11, to: 12 },
  { label: "12pm-1pm", from: 12, to: 13 },
  { label: "1pm-2pm", from: 13, to: 13 },
  { label: "2pm-3pm", from: 14, to: 15 },
  { label: "3pm-4pm", from: 15, to: 16 },
  { label: "4pm-5pm", from: 16, to: 17 },
  { label: "5pm-6pm", from: 17, to: 18 },
  { label: "6pm-7pm", from: 18, to: 19 },
  { label: "7pm-8pm", from: 19, to: 20 },
  { label: "8pm-9pm", from: 20, to: 21 },
  { label: "9pm-10pm", from: 21, to: 22 },
  { label: "10pm-11pm", from: 22, to: 23 },
  { label: "11pm-12pm", from: 23, to: 24 },
];

const bucketIndex = (hour) => BUCKETS.findIndex((bucket) => hour >= bucket.from && hour < bucket.to);

export const AnalyzingData = ({}) => {
  const [analysisAlerts, setAnalysisAlerts] = useState(null);
  const [analysisAlertsLoading, setAnalysisAlertsLoading] = useState(true);
  const [analysisAlertsError, setAnalysisAlertsError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordResponse, setPasswordResponse] = useState('NeedsToSubmitPassword');
  const [selectTime, setSelectTime] = useState("hours");
  const [selectZipTime, setSelectZipTime] = useState("hours");

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

  const zipCounts = useMemo(() => {
    if (!analysisAlerts) return null;
    const totals = {};
    analysisAlerts.forEach((a) => {
      if (a.zipCode !== "unknown") totals[a.zipCode] = (totals[a.zipCode] || 0) + 1;
    });
    return totals;
  }, [analysisAlerts]);

  const charts = useMemo(() => {
    if (!analysisAlerts) return null;
    const totals = {};
    analysisAlerts.forEach((a) => (totals[a.zipCode] = (totals[a.zipCode] || 0) + 1));
    const zipCodes = Object.keys(totals).sort((a, b) => totals[b] - totals[a]);
    const zipIdx = Object.fromEntries(zipCodes.map((z, i) => [z, i]));
    const height = Math.max(350, zipCodes.length * 22 + 120);

    // 1. zip x time of day
    const colsZipTime = selectZipTime === "hours" ? HOURS.map((h) => h.label) : BUCKETS.map((b) => b.label);
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
    const colsTime = selectTime === "hours" ? HOURS.map((h) => h.label) : BUCKETS.map((b) => b.label);
    const labels = colsTime;
    const colOfTime = (a) => (selectTime === "hours" ? a.hour : bucketIndex(a.hour));
    const counts = Array(labels.length).fill(0);
    analysisAlerts.forEach((a) => counts[colOfTime(a)]++);
    const mostActiveTime = colsTime[counts.indexOf(Math.max(...counts))];

    const colorbar = { thickness: 12 };

    return {
      mostActiveZipCodes: zipCodes.slice(0,5),
      mostActiveTime,
      zipTime: {
        data: [{ type: "heatmap", x: colsZipTime, y: zipCodes, z: timeGrid, colorscale: "Turbo", colorbar,
          hovertemplate: "Zip code: %{y}<br>%{x}<br>%{z} alerts<extra></extra>" }],
        layout: {
          title: "Alerts by zip code and time of day",
          yaxis: { type: "category", autorange: "reversed" },
          xaxis: { type: "category" },
          height,
          margin: { l: 60, r: 60, t: 40, b: 100 },
        }
      },
      zipDay: {
        data: [{ type: "heatmap", x: days, y: zipCodes, z: dayGrid, colorscale: "Turbo", colorbar,
          hovertemplate: "Zip code: %{y}<br>%{x}<br>%{z} alerts<extra></extra>" }],
        layout: {
          title: "Alerts by zip code and day",
          yaxis: { type: "category", autorange: "reversed" },
          xaxis: { type: "category" },
          height,
          margin: { l: 60, r: 60, t: 40, b: 60 },
        },
      },
      byTime: {
        data: [{ type: "bar", x: colsTime, y: counts, text: counts, textposition: "outside" }],
        layout: {
          title: "Alerts by time of day",
          xaxis: { type: "category", title: "Time of day" },
          yaxis: { title: "Total alerts" },
          height: 500,
          margin: { l: 20, r: 60, t: 50, b: 80 },
        },
      },
    };
  }, [analysisAlerts, selectTime, selectZipTime, ]);

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
                <div className="analyzingData-section">
                  <Typography variant='h5' sx={{fontWeight: 'bold'}}>{'ICE Sighting Heat Map by ZIP Code'}</Typography>
                  <Alert severity='info'>
                    <Typography variant='subtitle2' sx={{display: 'flex', textAlign: 'left', whiteSpace: 'pre-wrap'}}>
                        {`This map is based on sighting data sourced from StopICE.net betweeen ${analysisAlerts[analysisAlerts.length - 1].date.split("T")[0]} and ${analysisAlerts[0].date.split("T")[0]}. According to this data, ICE seems most active in the following ZIP codes: ${charts.mostActiveZipCodes.join(", ")}.`}
                    </Typography>
                  </Alert>
                  <DataHeatMap analysisAlerts={analysisAlerts} zipCounts={zipCounts} startDate={analysisAlerts[analysisAlerts.length - 1].date.split("T")[0]} endDate={analysisAlerts[0].date.split("T")[0]}/>
                </div>
                <Divider />
                <div className="analyzingData-section">
                  <Typography variant='h5' sx={{fontWeight: 'bold'}}>{'Daily ICE Sightings by ZIP Code'}</Typography>
                  <Alert severity='info'>
                    <Typography variant='subtitle2' sx={{display: 'flex', textAlign: 'left', whiteSpace: 'pre-wrap'}}>
                        {`This graph is based on sighting data sourced from StopICE.net betweeen ${analysisAlerts[analysisAlerts.length - 1].date.split("T")[0]} and ${analysisAlerts[0].date.split("T")[0]}. According to this data, ICE seems most active in the following ZIP codes: ${charts.mostActiveZipCodes.join(", ")}.`}
                    </Typography>
                  </Alert>
                  <ResponsivePlot data={charts.zipDay.data} layout={charts.zipDay.layout} />
                </div>
                <Divider />
                <div className="analyzingData-section">
                  <Typography variant='h5' sx={{fontWeight: 'bold'}}>{'ICE Sightings by Time of Day'}</Typography>
                  <div className="analyzingData-alertAndFilter">
                    <Alert severity='info' sx={{width: 'stretch'}}>
                      <Typography variant='subtitle2' sx={{display: 'flex', textAlign: 'left', whiteSpace: 'pre-wrap'}}>
                          {`This graph is based on sighting data sourced from StopICE.net betweeen ${analysisAlerts[analysisAlerts.length - 1].date.split("T")[0]} and ${analysisAlerts[0].date.split("T")[0]}. According to this data, ICE seems most active from ${charts.mostActiveTime}.`}
                      </Typography>
                    </Alert>
                    <FormControl className='analyzingData-filter'>
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
                  </div>
                  <ResponsivePlot data={charts.byTime.data} layout={charts.byTime.layout} />
                </div>
                <Divider />
                <div className="analyzingData-section">
                  <Typography variant='h5' sx={{fontWeight: 'bold'}}>{'ICE sightings by ZIP code and Time of Day'}</Typography>
                  <div className="analyzingData-alertAndFilter">
                    <Alert severity='info' sx={{width: 'stretch'}}>
                      <Typography variant='subtitle2' sx={{display: 'flex', textAlign: 'left', whiteSpace: 'pre-wrap'}}>
                          {`This graph is based on sighting data sourced from StopICE.net betweeen ${analysisAlerts[analysisAlerts.length - 1].date.split("T")[0]} and ${analysisAlerts[0].date.split("T")[0]}. This graph shows what times of day ICE is active per ZIP code.`}
                      </Typography>
                    </Alert>
                    <FormControl className='analyzingData-filter'>
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
                  </div>
                  <ResponsivePlot data={charts.zipTime.data} layout={charts.zipTime.layout} />
                </div>
            </div>
        );
};
