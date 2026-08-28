import { jsonrepair } from "jsonrepair";

export function formatDate(unformattedDate) {
  const dateStr = unformattedDate.split(" (")[0]; // remove time
  const formattedDate = new Date(dateStr);
  const month = formattedDate.toLocaleString('default', { month: 'long' });
  const day = String(formattedDate.getDate());
  const year = String(formattedDate.getFullYear());
  return `${month} ${day}, ${year}`;
}

export function getAlertsWithinWeek(obj) {
  const today = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 7);
  return Object.keys(obj)
    .filter(key => key.startsWith("DATASET-ALERT"))
    .flatMap(key => obj[key])
    .filter(alert => {
      const dateStr = alert.created.split(" (")[0]; // remove time
      const alertDate = new Date(dateStr);
      return alertDate >= oneWeekAgo && alertDate <= today;
    });
}

export function getfilteredAlertAPIResponse(setAlerts, setAlertsLoading) {
  const runPostRequest = async () => {
      setAlertsLoading(true);
      const response = await fetch(
        `https://orange-salad-19e3.incognito-activist-us.workers.dev/?zip=92104&distance=50`
      );

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
        if (data.error) {
          setAlertsLoading(true);
          setTimeout(runPostRequest, 1500);
        }
        else {
          setAlerts(getAlertsWithinWeek(data));
        }
      }
      catch (jsonError) {
        console.error("Trying to fix JSON", jsonError);
        try {
          const repairedText = jsonrepair(text);
          setAlerts(getAlertsWithinWeek(JSON.parse(repairedText)));
          return;
        }
        catch (repairError) {
          console.error("Repair failed:", repairError.message);
        }
        finally {
          setAlertsLoading(false);
        }
      }
      finally {
        setAlertsLoading(false);
      }
  };

  runPostRequest();
}

export async function sendSightingReport(address, zipCode, description, severity) {
  try {
    const response = await fetch(
      `https://broad-bar-e989.incognito-activist-us.workers.dev/?address=${encodeURIComponent(address)}&zipCode=${encodeURIComponent(zipCode)}&description=${encodeURIComponent(description)}&severity=${encodeURIComponent(severity)}`
    );
    const text = await response.text();

    const data = JSON.parse(text);
    if (data.error) {
      console.error('Something went wrong: ', data.error);
      if (data.error.includes('The specified zipcode')) {
        return 'ErrorZipCode';
      }
      else return 'Error'
    }

    console.log("Alert submitted successfully.");
    return 'Success';
  } catch (err) {
    console.error("Something went wrong: ", err);
    return 'Error';
  }
}

export function getAlertsEveryHour(setAlerts, setAlertsLoading) {
  setInterval(()=> {
    getfilteredAlertAPIResponse(setAlerts, setAlertsLoading);
  }, 3600000);
}
