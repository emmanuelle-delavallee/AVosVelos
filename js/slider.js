// Crée la class Slider
class Slider {
  constructor(sliderId, imgs, txts) {
    this.idSlide = sliderId;
    this.imgs = imgs;
    this.txts = txts;

    this.slide = document.getElementById(this.idSlide);
    this.img = this.slide.querySelector('img');
    this.txt = this.slide.querySelector('figcaption')

    this.prev = this.slide.querySelector('div .prevBtn');
    this.next = this.slide.querySelector('div .nextBtn');
    this.pause = this.slide.querySelector('div .pauseBtn');

    this.prev.innerHTML = '<i class="fas fa-chevron-left"></i>'
    this.pause.innerHTML = '<i class="fas fa-pause"></i>'
    this.next.innerHTML = '<i class="fas fa-chevron-right"></i>'


    // Initialise image + texte
    this.imgNumber = 0;
    this.img.src = this.imgs[this.imgNumber];
    this.txt.textContent = this.txts[this.imgNumber];


    // Ecoute les événements (play/pause et flèches du slider + actions via les touches du clavier)
    document.addEventListener('keydown', (event) => this.keyboard(event));
    this.prev.addEventListener('click', () => this.prevImage());
    this.next.addEventListener('click', () => this.nextImage());
    this.pause.addEventListener('click', () => this.playPause());

    // Initialise le timer
    this.sliderTimer = null;
    this.playPause();
  }

  // Affiche l'image précédente
  prevImage() {
    this.prev.blur(); // supprime le carré bleu qui reste autour des boutons du slider au clic
    this.imgNumber--;
    if (this.imgNumber < 0) {
      this.imgNumber = this.imgs.length - 1;
    }
    this.img.src = this.imgs[this.imgNumber];
    this.txt.textContent = this.txts[this.imgNumber];
  }

  // Affiche l'image suivante
  nextImage() {
    this.next.blur(); // supprime le carré bleu qui reste autour des boutons du slider au clic
    this.imgNumber++;
    if (this.imgNumber > (this.imgs.length - 1)) {
      this.imgNumber = 0;
    }
    this.img.src = this.imgs[this.imgNumber];
    this.txt.textContent = this.txts[this.imgNumber];
  }

  // Actions liées aux touches du clavier
  keyboard(e) {
    switch (e.keyCode) {
      case 37: // flèche droite, image précédente
        this.prevImage();
        break;
      case 39: // flèche gauche, image suivante
        this.nextImage();
        break;
      case 80: // touche P, play/pause
        this.playPause();
        break;
    }
  }

  // Timer du slider (5 sec) + bouton play/pause et changement d'icône
  playPause() {
    this.pause.blur(); // supprime le carré bleu qui reste autour des boutons du slider au clic
    if (this.sliderTimer) {
      clearInterval(this.sliderTimer);
      this.sliderTimer = null;
      this.pause.className = "playBtn sliderbtn";
      this.pause.innerHTML = '<i class="fas fa-play"></i>'

    } else {
      this.sliderTimer = setInterval(() => this.nextImage(), 5000);
      this.pause.innerHTML = '<i class="fas fa-pause"></i>'

    }
  }
}

