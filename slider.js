class Slider {
  constructor(config) {
    this.selector = config.selector;
    this.interval = config.interval || 3000;
    this.showIndicators = config.showIndicators !== false;
    this.pauseOnHover = config.pauseOnHover || false;
    this.carousel = document.querySelector(this.selector);
    this.currentIndex = 0;
    this.isPaused = false;

    this.images = [
      'img/1.jpg',
      'img/2.jpg',
      'img/3.jpg',
    ];

    this.init();
  }

  init() {
    this.createStructure();
    this.goToSlide(this.currentIndex);
    this.attachEvents();
    this.startAutoSlide();
  }

  createStructure() {
    const inner = document.createElement('div');
    inner.className = 'carousel-inner';

    this.images.forEach(src => {
      const item = document.createElement('div');
      item.className = 'carousel-item';
      const img = document.createElement('img');
      img.src = src;
      item.appendChild(img);
      inner.appendChild(item);
    });

    this.carousel.appendChild(inner);
    this.inner = inner;
    this.slides = this.carousel.querySelectorAll('.carousel-item');

    this.prevBtn = document.createElement('button');
    this.prevBtn.className = 'carousel-control prev';
    this.prevBtn.textContent = '‹';

    this.nextBtn = document.createElement('button');
    this.nextBtn.className = 'carousel-control next';
    this.nextBtn.textContent = '›';

    this.carousel.appendChild(this.prevBtn);
    this.carousel.appendChild(this.nextBtn);

    if (this.showIndicators) {
      const indicators = document.createElement('div');
      indicators.className = 'carousel-indicators';
      this.indicatorElems = [];

      this.images.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'indicator';
        dot.dataset.index = i;
        indicators.appendChild(dot);
        this.indicatorElems.push(dot);
      });

      this.carousel.appendChild(indicators);
    }
  }

  goToSlide(index) {
    this.slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    if (this.showIndicators) {
      this.indicatorElems.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    this.currentIndex = index;
  }

  nextSlide() {
    let next = this.currentIndex + 1;
    if (next >= this.slides.length) next = 0;
    this.goToSlide(next);
  }

  prevSlide() {
    let prev = this.currentIndex - 1;
    if (prev < 0) prev = this.slides.length - 1;
    this.goToSlide(prev);
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      if (!this.isPaused) this.nextSlide();
    }, this.interval);
  }

  stopAutoSlide() {
    clearInterval(this.intervalId);
  }

  togglePause() {
    this.isPaused = !this.isPaused;
  }

  resetAuto() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  attachEvents() {
    this.nextBtn.addEventListener('click', () => {
      this.nextSlide();
      this.resetAuto();
    });

    this.prevBtn.addEventListener('click', () => {
      this.prevSlide();
      this.resetAuto();
    });

    if (this.showIndicators) {
      this.indicatorElems.forEach((dot, i) => {
        dot.addEventListener('click', () => {
          this.goToSlide(i);
          this.resetAuto();
        });
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
      if (e.key === ' ') {
        e.preventDefault();
        this.togglePause();
      }
      this.resetAuto();
    });

    let touchStartX = 0;

    this.carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    });

    this.carousel.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].clientX - touchStartX;
      if (diff > 50) this.prevSlide();
      else if (diff < -50) this.nextSlide();
      this.resetAuto();
    });

    if (this.pauseOnHover) {
      this.carousel.addEventListener('mouseenter', () => this.isPaused = true);
      this.carousel.addEventListener('mouseleave', () => this.isPaused = false);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Slider({
    selector: '.carousel',
    interval: 3000,
    showIndicators: true,
    pauseOnHover: true
  });
});