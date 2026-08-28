import L  from 'leaflet';
export const severityLevel = [
    "error",
    "warning",
    "info",
    "info",
    "success"
]

export const severityTitleEN = [
    "Confirmed ICE Alert",
    "ICE Sighting",
    "Unconfirmed Sighting",
    "Prior Sighting",
    "Mutual Aid"
]

export const severityDescriptionEN = [
    "There is confirmed ICE activity at this location and the situation is urgent. Those who can come help support and document are urged to show up. Those who are at-risk should shelter in place.",
    "ICE is in the area. ICE agents or vehicles may have been spotted. If you are in the area be aware and stay vigilant.",
    "You saw something worth reporting, but there isn't enough information to verify the report yet.",
    "Something happened in this location either earlier today, or prior to today, and the incident was reported to notify people of recent activity in the area.",
    "Mutual Aid"
]

export const severityTitleES = [
    "Alerta de ICE Confirmada",
    "Avistamiento de ICE",
    "Avistamiento No Confirmado",
    "Avistamiento Previo",
    "Ayuda Mutua"
]

export const severityDescriptionES = [
    "Se ha confirmado actividad de ICE en esta ubicación y la situación es urgente. Se insta a quienes puedan acudir para brindar apoyo y documentar los hechos a que se presenten. Aquellas personas en situación de riesgo deben permanecer a resguardo.",
    "ICE se encuentra en la zona. Es posible que se hayan visto agentes o vehículos de ICE. Si se encuentra en el área, manténgase alerta y vigilante.",
    "Ha visto algo que merece ser reportado, pero aún no hay información suficiente para verificar el reporte.",
    "Ha ocurrido algo en esta ubicación, ya sea hoy mismo o con anterioridad, y se ha reportado el incidente para informar a las personas sobre la actividad reciente en la zona.",
    "Ayuda mutua"
]

const redIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const yellowIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const blueIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const greenIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export const severityIcon = [
    redIcon,
    yellowIcon,
    blueIcon,
    blueIcon,
    greenIcon
]