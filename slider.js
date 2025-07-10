document.addEventListener("DOMContentLoaded", initSlider);

function initSlider() {
  const slider = document.querySelector(".carousel");
  const slides = document.querySelectorAll(".carousel-item");
  const nextBtn = document.querySelector(".carousel-control.next");
  const prevBtn = document.querySelector(".carousel-control.prev");
  const indicators = document.querySelectorAll(".indicator");

  let currentIndex = 0;
  let intervalId = null;
  let isPaused = false;

  goToSlide(currentIndex);
  startAutoSlide();

  // Клік кнопками
  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
  });

  // Клік по індикаторах
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentIndex = index;
      goToSlide(currentIndex);
      resetAutoSlide();
    });
  });

  // Клавіатура
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
      resetAutoSlide();
    }
    if (e.key === "ArrowRight") {
      nextSlide();
      resetAutoSlide();
    }
    if (e.key === " ") {
      e.preventDefault();
      togglePause();
    }
  });

  // Swipe
  let touchStartX = 0;

  slider.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", (e) => {
    let diff = e.changedTouches[0].clientX - touchStartX;
    if (diff > 50) prevSlide();
    else if (diff < -50) nextSlide();
    resetAutoSlide();
  });

  // Автоматичне переключення

  function startAutoSlide() {
    intervalId = setInterval(() => {
      if (!isPaused) nextSlide();
    }, 3000); 
  }

  function stopAutoSlide() {
    clearInterval(intervalId);
  }

  function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  function togglePause() {
    isPaused = !isPaused;
  }

  // Перемикання слайдів

  function nextSlide() {
    currentIndex++;
    if (currentIndex >= slides.length) currentIndex = 0;
    goToSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) currentIndex = slides.length - 1;
    goToSlide(currentIndex);
  }

  function goToSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === index);
    });
  }
}