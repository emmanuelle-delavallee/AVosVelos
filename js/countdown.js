class Countdown {
    constructor(countdownTxt, formId, startCountdownBtn, cancelReservationBtn, stationAvailableBikesId) {

        this.countdownTxt = document.getElementById(countdownTxt);
        this.form = document.getElementById(formId);
        this.startCountdownBtn = document.getElementById(startCountdownBtn)
        this.cancelReservationBtn = document.getElementById(cancelReservationBtn)
        this.currentStationAvailableBikes = document.getElementById(stationAvailableBikesId)

        this.minutes = 0;
        this.seconds = 0;
        this.endTime = 0;


        this.form.addEventListener('submit', (event) => {
            if (event.target.name.value != "" && event.target.firstname.value != "") {
                this.startcountdown(Date.now() + 1000 * (20 * 60)); // saisir nombre de minutes ici (20 mn * 60 sec)
            } else {
                event.preventDefault()
            }
        })

        // Vérifie les données du compte à rebours en session storage
        this.endTime = sessionStorage.getItem("endTime")
        if (this.endTime) this.startcountdown(this.endTime);

        // Annule la réservation en cours au clic
        this.cancelReservationBtn.addEventListener('click', e => this.stopcountdown());
    }

    // Lance le compte à rebours
    startcountdown(date) {
        this.endTime = date;
        this.stopcountdown();
        this.updatecountdown();

        // Met en session storage le temps restant au compte à rebours
        sessionStorage.setItem("endTime", this.endTime);

        // Définit l'interval du compte à rebours
        this.interval = setInterval(e => this.runningTime(), 1000);

        // Affiche le bouton annuler la réservation en cours
        this.cancelReservationBtn.style.display = "inline-block";

        // Effectue la réservation
        this.submitFormReservation()

        // Affiche dans quelle station la réservation a eu lieu
        // Affiche les messages de réservation (nom de la station concernée + nombre de secondes et minutes restant au compte à rebours ; n'affiche pas les minutes si = 0)
        if (this.minutes == 0) {
            this.countdownTxt.innerHTML = "Vous avez réservé un vélo à la station " + this.bookedStation + ", temps restant : " + this.seconds + " seconde(s)";
        } else {
            this.countdownTxt.innerHTML = "Vous avez réservé un vélo à la station " + this.bookedStation + ", temps restant : " + this.minutes + " minute(s) et " + this.seconds + " seconde(s)";
        }
    }

    // Arrête le compte à rebours
    stopcountdown() {
        // Arrête l'interval à la fin du compte à rebours
        clearInterval(this.interval);

        // Affiche le message de fin de compte à rebours
        this.countdownTxt.innerHTML = "Votre réservation a expiré, sélectionnez une station pour réserver à nouveau";

        // Supprime le bouton annuler la réservation en cours
        this.cancelReservationBtn.style.display = "none";

        // Supprime le compte à rebours de session storage si terminé
        sessionStorage.removeItem("endTime");
    }

    // Met à jour le compte à rebours
    updatecountdown() {
        let time = new Date(Math.ceil((this.endTime - Date.now()) / 1000) * 1000); // Pour éviter les bugs d'arrondis des secondes : transforme les millisecondes en secondes, se débarrasse du reste avec math.ceil, repasse le tout en milliseconde avant de le transformer en date

        this.minutes = time.getMinutes();
        this.seconds = time.getSeconds();

        // Ajoute un 0 devant le nombre de minutes ou secondes si inférieur à 10
        if (this.seconds < 10) this.seconds = '0' + this.seconds;
        if (this.minutes < 10) this.minutes = '0' + this.minutes;

        // Met à jour les messages de réservation (nom de la station concernée + nombre de secondes et minutes restant au compte à rebours ; n'affiche pas les minutes si = 0)
        if (this.minutes == 0) {
            this.countdownTxt.innerHTML = "Vous avez réservé un vélo à la station " + this.bookedStation + ", temps restant : " + this.seconds + " seconde(s)";
        } else {
            this.countdownTxt.innerHTML = "Vous avez réservé un vélo à la station " + this.bookedStation + ", temps restant : " + this.minutes + " minute(s) et " + this.seconds + " seconde(s)";
        }
    }

    // Fonctionnement du compte à rebours
    runningTime() {
        this.updatecountdown();

        // met fin à l'interval si les minutes et les secondes sont <= à 0
        if (this.seconds == 0 && this.minutes == 0) this.stopcountdown()
    }

    submitFormReservation() {
        // Récupère le nom de la station qui est en session storage
        this.bookedStation = sessionStorage.getItem("stationName");

        // Décrémente de 1 le nombre de véolos disponibles à la station sélectionnée
        this.currentStationAvailableBikes.innerHTML = "Vélos disponibles : " + (sessionStorage.getItem("stationAvailableBikes") - 1);
    }
}