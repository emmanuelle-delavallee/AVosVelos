class Canvas {
    constructor(canvasId, closeReservation, submitFormBtn, removeSignatureBtn) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.painting = false;
        this.finger = false;
        this.canvas.width = 200;
        this.canvas.height = 150;
        this.clearButton = document.getElementById("removeSignatureBtn");
        this.ctx.lineWidth = 5;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = '#5bc0de';
        this.startX = 0;
        this.startY = 0;

        this.closeReservationModalBtn = document.getElementById(closeReservation)
        this.submitFormBtn = document.getElementById(submitFormBtn)
        this.removeSignatureBtn = document.getElementById(removeSignatureBtn)


        this.signature();
        this.clear();

        // Bouton effacer 
        this.clearButton.addEventListener('click', () => {
            this.clear()
        });

        // Au clic sur fermer la fenetre de réservation, vider le canvas
        this.closeReservationModalBtn.addEventListener('click', () => {
            this.clear()
        });

        // Au clic sur fermer la fenetre de réservation, vider le canvas
        this.submitFormBtn.addEventListener('click', () => {
            this.clear()
        });

    }
    // Début du clic ou du mouvement
    startPosition() {
        this.painting = true;
        this.draw(e);
    }

    // Fin du clic ou du mouvement
    finishedPosition() {
        this.painting = false;
        this.ctx.beginPath();
    }

    // Dessin
    draw(e) {
        if (!this.painting) return;

        let mouseX;
        let mouseY;

        if (this.finger === false) {
            mouseX = e.clientX - this.canvas.getBoundingClientRect().left;
            mouseY = e.clientY - this.canvas.getBoundingClientRect().top;
        } else if (e.touches.length == 1) {
            mouseX = e.touches[0].pageX - this.canvas.getBoundingClientRect().left;
            mouseY = e.touches[0].pageY - this.canvas.getBoundingClientRect().top - (e.touches[0].pageY - e.touches[0].clientY);
        }

        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(mouseX, mouseY);
        this.ctx.stroke();
        this.ctx.closePath();

        this.startX = mouseX;
        this.startY = mouseY;
    }


    signature() {
        //signature avec la souris 
        this.canvas.addEventListener('mousedown', (e) => {
            // Affiche les boutons de réservation lorsqu'un clic minimum a été fait dans le canvas
            this.submitFormBtn.style.visibility = "visible";
            this.removeSignatureBtn.style.visibility = "visible";

            this.startX = e.clientX - this.canvas.getBoundingClientRect().left;
            this.startY = e.clientY - this.canvas.getBoundingClientRect().top;
            this.painting = true;
        }, false);

        this.canvas.addEventListener('mouseup', () => {
            this.ctx.closePath();
            this.painting = false;
        }, false);

        this.canvas.addEventListener('mousemove', (e) => {
            e.preventDefault();
            this.draw(e);
        }, false);

        //signature avec le tactile
        this.canvas.addEventListener('touchstart', (e) => {
            // Affiche les boutons de réservation lorsqu'un touché minimum a été fait dans le canvas
            this.submitFormBtn.style.visibility = "visible";
            this.removeSignatureBtn.style.visibility = "visible";

            this.startX = e.touches[0].pageX - this.canvas.getBoundingClientRect().left;
            this.startY = e.touches[0].pageY - this.canvas.getBoundingClientRect().top - (e.touches[0].pageY - e.touches[0].clientY);
            this.painting = true;
            this.finger = true;
        }, false);

        this.canvas.addEventListener('touchend', () => {
            this.ctx.closePath();
            this.painting = false;
            this.finger = false;
        }, false);

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.finger = true;
            this.draw(e);
        }, false);

    }

    // Remise à zéro de la signature
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.submitFormBtn.style.visibility = "hidden";
        this.removeSignatureBtn.style.visibility = "hidden";
    }
}