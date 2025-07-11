function Slider(config) {
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

Slider.prototype.init = function () {
  this.createStructure();
  this.goToSlide(this.currentIndex);
  this.attachEvents();
  this.startAutoSlide();
};

Slider.prototype.createStructure = function () {
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

  const btnPrev = document.createElement('button');
  btnPrev.className = 'carousel-control prev';
  btnPrev.textContent = '‹';

  const btnNext = document.createElement('button');
  btnNext.className = 'carousel-control next';
  btnNext.textContent = '›';

  this.carousel.appendChild(btnPrev);
  this.carousel.appendChild(btnNext);

  this.prevBtn = btnPrev;
  this.nextBtn = btnNext;

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
};

Slider.prototype.goToSlide = function (index) {
  this.slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  if (this.showIndicators) {
    this.indicatorElems.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  this.currentIndex = index;
};

Slider.prototype.nextSlide = function () {
  let next = this.currentIndex + 1;
  if (next >= this.slides.length) next = 0;
  this.goToSlide(next);
};

Slider.prototype.prevSlide = function () {
  let prev = this.currentIndex - 1;
  if (prev < 0) prev = this.slides.length - 1;
  this.goToSlide(prev);
};

Slider.prototype.startAutoSlide = function () {
  const self = this;
  this.intervalId = setInterval(function () {
    if (!self.isPaused) self.nextSlide();
  }, this.interval);
};

Slider.prototype.stopAutoSlide = function () {
  clearInterval(this.intervalId);
};

Slider.prototype.togglePause = function () {
  this.isPaused = !this.isPaused;
};

Slider.prototype.attachEvents = function () {
  const self = this;

  this.nextBtn.addEventListener('click', function () {
    self.nextSlide();
    self.resetAuto();
  });

  this.prevBtn.addEventListener('click', function () {
    self.prevSlide();
    self.resetAuto();
  });

  if (this.showIndicators) {
    this.indicatorElems.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        self.goToSlide(i);
        self.resetAuto();
      });
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') self.prevSlide();
    if (e.key === 'ArrowRight') self.nextSlide();
    if (e.key === ' ') {
      e.preventDefault();
      self.togglePause();
    }
    self.resetAuto();
  });

  let touchStartX = 0;

  this.carousel.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  });

  this.carousel.addEventListener('touchend', function (e) {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (diff > 50) self.prevSlide();
    else if (diff < -50) self.nextSlide();
    self.resetAuto();
  });

  if (this.pauseOnHover) {
    this.carousel.addEventListener('mouseenter', () => self.isPaused = true);
    this.carousel.addEventListener('mouseleave', () => self.isPaused = false);
  }
};

Slider.prototype.resetAuto = function () {
  this.stopAutoSlide();
  this.startAutoSlide();
};

document.addEventListener('DOMContentLoaded', function () {
  new Slider({
    selector: '.carousel',
    interval: 3000,
    showIndicators: true,
    pauseOnHover: true,
  });
});