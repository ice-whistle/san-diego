import { jsonrepair } from "jsonrepair";

const getZipCode = (address) =>
  (address.match(/\b9\d{4}\b/g) || []).pop() ?? "unknown";

function getAlertsWithinRange(obj, low, high) {
  return Object.keys(obj)
    .filter((key) => key.startsWith("DATASET-ALERT"))
    .flatMap((key) => obj[key])
    .filter((alert) => {
      const dateString = new Date(alert.created.split(" (")[0]);
      return dateString >= low && dateString < high;
    })
    .map(({ created, priority, address }) => {
      const time = created.split(/[()]/)[1];
      return {
        date: new Date(created.split(" (")[0]).toISOString(),
        created: time,
        hour: parseInt(time.split(":")[0], 10),
        priority,
        zipCode: getZipCode(address),
      };
    });
}

function getAlerts(data) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(today.getDate() - 10);
  return getAlertsWithinRange(data, start, today);
}


export function getAnalysisAlertAPIResponse(setAlerts, setAlertsLoading, setAlertsError) {
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
          setAlerts(getAlerts(data));
        }
      }
      catch (jsonError) {
        console.error("Trying to fix JSON", jsonError);
        try {
          const repairedText = jsonrepair(text);
          setAlerts(getAlerts(JSON.parse(repairedText)));
          return;
        }
        catch (repairError) {
          console.error("Repair failed:", repairError);
          setAlertsError(true);
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

export async function submitPassword(password) {
  try {
    const response = await fetch(
      `https://blue-mode-781f.incognito-activist-us.workers.dev/?password=${password}`
    );
    const text = await response.text();
    const data = JSON.parse(text);
    
    if (data.error || !data) {
      console.error('Something went wrong: ', data);
      return 'Error';
    }
    return 'Success';
  } catch (err) {
    console.error("Something went wrong: ", err);
    return 'Error';
  }
}
