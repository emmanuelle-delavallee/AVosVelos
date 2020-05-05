// Slider de présentation + images qui le composent
var slide = new Slider(
    'slider',
    ["./img/Image_1.jpg",
        "./img/Image_2.jpg",
        "./img/Image_3.jpg"],
    ["Vélos en libre service",
        "Disponibles 24h/24 et 7j/7",
        "Venez les essayer !"]
);


// Création de la carte : ville de Nantes
let city = 'Nantes';
let apiKey = 'ed9af4a49309cde54451c73afcf4b96e6e89d058';
const nantesMap = new Map('map', [47.2173, -1.5534], 13, city, apiKey, 'reservationBtn', 'selectedStationInfos', 'stationName', 'stationAddress', 'stationStatus', 'stationAvailableBikes', 'stationAvailableBikeStands');
nantesMap.createMarkers();


// Formulaire de réservation
var nantesBooking = new BookingForm('nantesBookingForm', 'closeReservationModalBtn', 'reservationBtn', 'replaceCurrentReservationBtn', 'formResult')


// Lance le compte à rebours de réservation
let bookingCountdown = new Countdown('countdown', 'nantesBookingForm', 'submitFormBtn', 'cancelReservationBtn', 'stationAvailableBikes');

// Canvas pour la signature du formulaire de réservation
var nantesCanvas = new Canvas('canvas', 'closeReservationModalBtn', 'submitFormBtn', 'removeSignatureBtn');
nantesCanvas.signature();