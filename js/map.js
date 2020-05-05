class Map {
    constructor(mapId, [lng, lat], zoom, city, apiKey, reservationBtnId, selectedStationInfos, stationNameId, stationAddressId, stationStatusId, stationAvailableBikesId, stationAvailableBikeStandsId) {

        this.map = mapId;
        this.cityMap = L.map(mapId).setView([lng, lat], zoom);
        this.city = city;
        this.apiKey = apiKey

        this.tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
            attribution: "données © OpenStreetMap/ODbL - rendu OSM France",
            maxZoom: 20
        }).addTo(this.cityMap);

        this.reservationBtn = document.getElementById(reservationBtnId)
        this.selectedStationInfos = document.getElementById(selectedStationInfos)
        this.stationName = document.getElementById(stationNameId)
        this.stationAddress = document.getElementById(stationAddressId)
        this.stationStatus = document.getElementById(stationStatusId)
        this.stationAvailableBikes = document.getElementById(stationAvailableBikesId)
        this.stationAvailableBikeStands = document.getElementById(stationAvailableBikeStandsId)
    }

    // Création des marqueurs de la carte via requête Ajax de l'API JC Decaux
    createMarkers() {
        const request = new AjaxGet();
        let apiUrl = 'https://api.jcdecaux.com/vls/v1/stations?contract=' + city + '&apiKey=' + apiKey;

        request.ajaxGet(apiUrl, (response) => {
            // Récupère les infos et les divise en stations
            let stations = JSON.parse(response);
            // Affiche les marqueurs sous forme de markerCluster
            let markers = L.markerClusterGroup();

            //Recherche les éléments des stations et les stocke dans un tableau tant qu'il y en a 
            for (let i = 0; i < stations.length; i++) {
                let station = stations[i];

                let stationLat = station.position.lat;
                let stationLng = station.position.lng;

                let stationName = station.name;
                let stationAddress = station.address;
                let stationStatus = station.status;
                let stationAvailableBikes = station.available_bikes;
                let stationAvailableBikeStands = station.available_bike_stands;

                // Crée une icône pour la station
                var markerColor = L.Icon.extend({
                    options: {
                        //iconUrl: './img/greenMarker.png',
                        iconSize: [65, 55],
                        iconAnchor: [30, 45],
                    }
                });

                var greenIcon = new markerColor({ iconUrl: './img/greenMarker.png' }),
                    redIcon = new markerColor({ iconUrl: './img/redMarker.png' }),
                    orangeIcon = new markerColor({ iconUrl: './img/yellowMarker.png' });

                var marker = L.marker([
                    stationLat,
                    stationLng],
                    { icon: markersColor() }
                )


                function markersColor() {
                    if (station.available_bikes == 0) {
                        return redIcon;
                    } else if (station.available_bikes < 5) {
                        return orangeIcon;
                    } else {
                        return greenIcon;
                    }
                }

                markers.addLayer(marker);

                // Au clic sur un marqueur : affiche les infos de la station cliquée sur l'encart de droite
                marker.addEventListener('click', (e) => {
                    // Fait apparaître l'encart de droite
                    this.selectedStationInfos.style.display = "block";

                    // Récupère les infos des stations
                    this.stationName.innerHTML = stationName;
                    this.stationAddress.innerHTML = stationAddress;
                    this.stationStatus.innerHTML = stationStatus;
                    this.stationAvailableBikes.innerHTML = stationAvailableBikes;
                    this.stationAvailableBikeStands.innerHTML = stationAvailableBikeStands;

                    // Place en session storage le nom de la station et le nombre de vélos disponibles, au clic sur le marqueur
                    sessionStorage.setItem("stationName", stationName);
                    sessionStorage.setItem("stationAvailableBikes", stationAvailableBikes);

                    // Masque le bouton réserver + affiche un message s'il aucun vélo disponible dans la station
                    if (stationAvailableBikes === 0) {
                        this.reservationBtn.style.display = "none";
                        this.stationAvailableBikes.innerHTML =
                            "Aucun vélo disponible";
                    } else {
                        this.reservationBtn.style.display = "inline-block";
                        this.stationAvailableBikes.innerHTML =
                            "Vélos disponibles : " + stationAvailableBikes;
                    }

                    // Affiche un message si aucune place dispo dans la station
                    if (stationAvailableBikeStands === 0) {
                        this.stationAvailableBikeStands.innerHTML =
                            "Aucune place disponible";

                    } else {
                        this.stationAvailableBikeStands.innerHTML =
                            "Places disponibles : " + stationAvailableBikeStands;
                    }

                    // Affiche une alerte si la station sélectionnée est fermée
                    if (stationStatus === "CLOSED") {
                        this.stationStatus.innerHTML = "Statut : fermée";
                    } else {
                        this.stationStatus.innerHTML = "Statut : ouverte";
                    };

                });

            };
            this.cityMap.addLayer(markers);
        });
    };
};
