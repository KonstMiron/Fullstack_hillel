
const initSlider = function (selector) {
    const sliderWrap = document.querySelector(selector);
    const slides = initSliderItems(sliderWrap);
    const [prevBtn, nextBtn] = initSliderArrows(sliderWrap);
    const bulletsList = initSliderBullets(sliderWrap, slides);

    sliderWrap.classList.add('slider');

    let interval = startAutoScroll(slides);
    prevBtn.onclick = () => {
        prevSlide(slides);
        clearInterval(interval);

        setTimeout(() => {
            interval = startAutoScroll(slides);
        }, 5000)
    }
    nextBtn.onclick = () => {
        nextSlide(slides);
        clearInterval(interval);

        setTimeout(() => {
            interval = startAutoScroll(slides);
        }, 5000)
    }
    bulletsList.addEventListener('click', () => {
        if(event.target.tagName === 'BUTTON'){
            const id = event.target.getAttribute('data-slider-bullet-id');
            sliderWrap.querySelector(`.slider__slide.--active`).classList.remove('--active');
            sliderWrap.querySelector(`[data-slider-item-id="${id}"]`).classList.add('--active');
            clearInterval(interval);

            setTimeout(() => {
                interval = startAutoScroll(slides);
            }, 5000)
        }
    })
    return sliderWrap
}
const initSliderItems = function(slider) {
    const slides =  Array.from(slider.children)
    slides.forEach((slide, index) => {
        if(index === 0){
            slide.classList.add('--active');
        }
        slide.classList.add('slider__slide');
        slide.setAttribute('data-slider-item-id', index);
    })

    return slides
}

const initSliderArrows = function(slider){
    let next = document.createElement('button');
    next.innerText = 'Next slide';
    let prev = document.createElement('button');
    prev.innerText = 'Prev slide';
    slider.appendChild(prev);
    slider.appendChild(next);
    return [next, prev]
}

const nextSlide = function(slides){
    let activeSlide

    slides.forEach((slide, index, slidesArr) => {
        if(index <= slides.length - 1 && slide.classList.contains('--active')){
           slide.classList.remove('--active');
           activeSlide = index;
       }
    })
    if(activeSlide < slides.length - 1){
        slides[activeSlide + 1].classList.add('--active');
    } else {
        slides[0].classList.add('--active');
    }
}

const prevSlide = function(slides){
    let prevSlide

    slides.forEach((slide, index, slidesArr) => {
        if(index >= 0 && slide.classList.contains('--active')){
           slide.classList.remove('--active');
           prevSlide = index;
       }
    })
    if(prevSlide > 0 ){
        slides[prevSlide - 1].classList.add('--active');
    } else {
        slides[slides.length - 1].classList.add('--active');
    }
}

const startAutoScroll = function(slides){
    return setInterval(() => {
        nextSlide(slides);
    }, 1000)
}

// const autoScrollDelay = function(intervalId, slides){
//    clearInterval(interval);
    
 //   setTimeout(() => {
 //       interval = startAutoScroll(slides);
//    }, 5000)

 //   return interval
//}
const initSliderBullets = function(slider, slides){
    const bulletsList = document.createElement('ul');
    
    slides.forEach((slide, index) => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.innerText = index+1;
        btn.setAttribute('data-slider-bullet-id', index);
        li.append(btn);
        bulletsList.append(li);
    })
    slider.append(bulletsList);
    return bulletsList
}
export {initSlider}