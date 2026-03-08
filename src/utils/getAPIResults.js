import { jsonrepair } from "jsonrepair";

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

export function getfilteredAlertAPIResponse(setAlerts) {
  const runPostRequest = async () => {
      const response = await fetch(
        `https://orange-salad-19e3.incognito-activist-us.workers.dev/?zip=92116&distance=50`
      );

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
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
          // setTimeout(runPostRequest, 5000);
        }
      }
  };

  runPostRequest();
}

export function getAlertsEveryHour(setAlerts) {
  setInterval(()=> {
    getfilteredAlertAPIResponse(setAlerts);
  }, 3600000);
}
