class BookingForm {
    constructor(formId, closeReservationId, reservationBtnId, replaceCurrentReservationBtnId, formResultId) {

        this.form = document.getElementById(formId);
        this.closeReservationModalBtn = document.getElementById(closeReservationId)
        this.replaceCurrentReservationBtn = document.getElementById(replaceCurrentReservationBtnId)
        this.formResult = document.getElementById(formResultId);
        this.reservationBtn = document.getElementById(reservationBtnId);

        this.reservationBtn.addEventListener('click', (event) => {
            // Récupère nom et prénom en storage s'il y en a pour pré-compléter le formulaire
            document.getElementById('name').value = localStorage.getItem('name');
            document.getElementById('firstname').value = localStorage.getItem('firstname');
            // Vérifie s'il y a déjà une réservation en cours
            if (sessionStorage.getItem("endTime") === null) {
                // Ouvre le modal de réservation
                $('#reservationModal').modal('show')
            } else {
                // Ouvre le modal de seconde réservation
                $('#secondReservationModal').modal('show')
            }
        })


        // Affiche le message de bienvenue personnalisé s'il y a un nom en local storage
        if (localStorage.getItem('name') === null) {
            this.formResult.innerText = 'Bonjour';
        } else {
            this.formResult.innerText = 'Bonjour ' + localStorage.getItem('firstname') + ' ' + localStorage.getItem('name')
        }

        // Récupère le nom de la station dans le session storage
        this.bookedStation = sessionStorage.getItem("stationName")

        // Récupère le nombre de vélos dispos à la station dans le session storage
        this.stationAvailableBikes = sessionStorage.getItem('stationAvailableBikes')

        // Récupère les données du compte à rebours en session storage
        this.endTime = sessionStorage.getItem("endTime")


        // Evénements au clic sur le bouton de réservation
        this.form.addEventListener('submit', (event) => {

            // Empeche le formulaire de déclencher son action par défaut qui rafraichit la page
            event.preventDefault()

            // Contrôle si nom et prénom ont été saisis, si non : rien ne se passe
            if (event.target.name.value != "" && event.target.firstname.value != "") {
                this.storeName()
                // Ferme le modal de réservation
                $('#reservationModal').modal('hide')
            }
        });


        // Evénements au clic sur le bouton de seconde réservation
        this.replaceCurrentReservationBtn.addEventListener('click', (event) => {
            // Ferme modal de seconde réservation et ouvre modal de réservation
            $('#secondReservationModal').modal('hide')
            $('#reservationModal').modal('show')
        });

    }

    storeName() {
        // Place en local storage le nom et le prénom saisis dans le formulaire
        localStorage.setItem('name', event.target.name.value)
        localStorage.setItem('firstname', event.target.firstname.value)

        // Affiche le message de bienvenue personnalisé
        this.formResult.innerText = 'Bonjour ' + event.target.firstname.value + ' ' + event.target.name.value
    }
}