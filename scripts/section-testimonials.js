const testimonials = [
  {
    name: 'Ignas Bagdonas',
    jobTitle: 'Engineering Manager',
    company: 'AdPlenty',
    img: {
      src: './images/testimonials/ignas-bagdonas.jpg',
      alt: this.name,
    },
    contact: 'https://www.linkedin.com/in/ignasbagdonas',
    quote:
      'Peter was detail-oriented and often spent time thinking through edge cases, testing different scenarios, and looking for ways to keep the code clean and optimized. He would also ask questions to understand the broader context behind a task, rather than only focusing on the immediate implementation.',
  },
  {
    name: 'Miguel Oliveira',
    jobTitle: 'Project Coordinator and Executive Assistant',
    company: 'Boston Consulting Group',
    img: {
      src: './images/testimonials/miguel-oliveira.jpg',
      alt: this.name,
    },
    contact: 'https://www.linkedin.com/in/miguelsoska',
    quote:
      'Peter has always shown high levels of professionalism and enthusiasm. He was always ahead of schedule and that helped tremendously in busy days where many events and meeting were being held. Therefore, it was always a pleasure to work with Peter. I am sure that his organisational skills and structured approach to work definitely add value to any team he joins.',
  },
  {
    name: 'Manuela Sobral',
    jobTitle: 'Project Manager and HR Coordinator',
    company: 'Sustainary',
    img: {
      src: './images/testimonials/manuela-sobral.jpg',
      alt: this.name,
    },
    contact: 'https://www.linkedin.com/in/manuela-sobral',
    quote:
      'Peter is a team-player, ready and willing to help his teammates, and deeply caring for the users. He possesses strong problem-solving skills and is able to solve technical challenges on his own. We could always count on him as he is focused on consistently delivering high-quality work, which is something we have highly appreciated.',
  },
  {
    name: 'Bo Koch-Christensen',
    jobTitle: 'Project and Organisation Coordinator',
    company: 'Sustainary',
    img: {
      src: './images/testimonials/bo-koch-christensen.jpg',
      alt: this.name,
    },
    contact: 'https://www.linkedin.com/in/highperformer',
    quote:
      'Peter played a crucial role in shaping a strong identity and seamless user experience across our websites, making them not only visually appealing but also user-friendly and easy to update in the future. The quality of his work speaks for itself, and his websites are now helping Sustainary fulfil its vision.',
  },
];

let nextTestimonial;
let prevTestimonial;
const currentTestimonial = {
  name: document.querySelector('.testimonial-name'),
  jobTitle: document.querySelector('.testimonial-job-title'),
  img: document.querySelector('.testimonial-img'),
  contact: document.querySelector('.testimonial-contact'),
  quote: document.querySelector('.testimonial-quote'),
};

let nextTestimonialIndex;
let prevTestimonialIndex;
let nextCarouselIndicatorIndex;
let prevCarouselIndicatorIndex;

const transition = {
  // functions for transitioning the testimonials

  next: {
    phase1() {
      // remove event listeners for clicking any buttons and swiping to switch testimonials
      carouselIndicators.forEach((carouselIndicator) =>
        carouselIndicator.removeEventListener('click', handleCarouselIndicatorClick),
      );
      btnTestimonialNext.removeEventListener('click', handleBtnTestimonialNextClick);
      btnTestimonialPrev.removeEventListener('click', handleBtnTestimonialPrevClick);
      testimonialWindow.removeEventListener('pointerdown', handleTestimonialWindowSwipeStart);
      testimonialWindow.removeEventListener('pointerup', handleTestimonialWindowSwipeEnd);
      testimonialAutoSwitchNextEnd();

      testimonialAuthorWrapper.classList.add('testimonial-off-screen-left');
      testimonialQuote.classList.add('testimonial-off-screen-left');
    },
    phase2() {
      testimonialAuthorWrapper.classList.remove('transition-testimonial');
      testimonialQuote.classList.remove('transition-testimonial');

      testimonialAuthorWrapper.classList.remove('testimonial-off-screen-left');
      testimonialQuote.classList.remove('testimonial-off-screen-left');

      testimonialAuthorWrapper.classList.add('testimonial-off-screen-right');
      testimonialQuote.classList.add('testimonial-off-screen-right');
    },
    phase4() {
      testimonialAuthorWrapper.classList.add('transition-testimonial');
      testimonialQuote.classList.add('transition-testimonial');

      testimonialAuthorWrapper.classList.remove('testimonial-off-screen-right');
      testimonialQuote.classList.remove('testimonial-off-screen-right');

      // add event listeners for clicking any buttons and swiping to switch testimonials
      carouselIndicators.forEach((carouselIndicator) =>
        carouselIndicator.addEventListener('click', handleCarouselIndicatorClick),
      );
      btnTestimonialNext.addEventListener('click', handleBtnTestimonialNextClick);
      btnTestimonialPrev.addEventListener('click', handleBtnTestimonialPrevClick);
      testimonialWindow.addEventListener('pointerdown', handleTestimonialWindowSwipeStart);
      testimonialWindow.addEventListener('pointerup', handleTestimonialWindowSwipeEnd);
      testimonialAutoSwitchNextStart();
    },
  },
  prev: {
    phase1() {
      // remove event listeners for clicking any buttons and swiping to switch testimonials
      carouselIndicators.forEach((carouselIndicator) =>
        carouselIndicator.removeEventListener('click', handleCarouselIndicatorClick),
      );
      btnTestimonialNext.removeEventListener('click', handleBtnTestimonialNextClick);
      btnTestimonialPrev.removeEventListener('click', handleBtnTestimonialPrevClick);
      testimonialWindow.removeEventListener('pointerdown', handleTestimonialWindowSwipeStart);
      testimonialWindow.removeEventListener('pointerup', handleTestimonialWindowSwipeEnd);
      testimonialAutoSwitchNextEnd();

      testimonialAuthorWrapper.classList.add('testimonial-off-screen-right');
      testimonialQuote.classList.add('testimonial-off-screen-right');
    },
    phase2() {
      testimonialAuthorWrapper.classList.remove('transition-testimonial');
      testimonialQuote.classList.remove('transition-testimonial');

      testimonialAuthorWrapper.classList.remove('testimonial-off-screen-right');
      testimonialQuote.classList.remove('testimonial-off-screen-right');

      testimonialAuthorWrapper.classList.add('testimonial-off-screen-left');
      testimonialQuote.classList.add('testimonial-off-screen-left');
    },
    phase4() {
      testimonialAuthorWrapper.classList.add('transition-testimonial');
      testimonialQuote.classList.add('transition-testimonial');

      testimonialAuthorWrapper.classList.remove('testimonial-off-screen-left');
      testimonialQuote.classList.remove('testimonial-off-screen-left');

      // add event listeners for clicking any buttons and swiping to switch testimonials
      carouselIndicators.forEach((carouselIndicator) =>
        carouselIndicator.addEventListener('click', handleCarouselIndicatorClick),
      );
      btnTestimonialNext.addEventListener('click', handleBtnTestimonialNextClick);
      btnTestimonialPrev.addEventListener('click', handleBtnTestimonialPrevClick);
      testimonialWindow.addEventListener('pointerdown', handleTestimonialWindowSwipeStart);
      testimonialWindow.addEventListener('pointerup', handleTestimonialWindowSwipeEnd);
      testimonialAutoSwitchNextStart();
    },
  },
};

const TRANSITION_DELAY_TESTIMONIAL_AUTO_SWITCH = 20000;

const transitionDelayTestimonial = Object.freeze({
  // ms for each phase of the testimonial transition
  PHASE_01: 0,
  PHASE_02: 250,
  PHASE_03: 300,
  PHASE_04: 350,
});

const testimonialSwitch = {
  // functions to switch the current testimonial to a different one

  next() {
    // function to switch to the next testimonial
    // if there is no next testimonial, switch to the first testimonial

    setTimeout(() => {
      transition.next.phase1();
    }, transitionDelayTestimonial.PHASE_01);

    setTimeout(() => {
      transition.next.phase2();
    }, transitionDelayTestimonial.PHASE_02);

    setTimeout(() => {
      for (let i = 0; i < testimonials.length; i++) {
        if (currentTestimonial.name.textContent === testimonials[i].name) {
          // if the name of the person providing the testimonial is the same as the name in testimonials[i].name

          const nextIndex = i + 1;
          const firstIndex = 0;

          if (testimonials[nextIndex]) {
            // if testimonials[nextIndex] is truthy (is not undefined), assign the nextTestimonial to the next testimonial in line
            nextTestimonial = {
              name: testimonials[nextIndex].name,
              jobTitle: `${testimonials[nextIndex].jobTitle} @ ${testimonials[nextIndex].company}`,
              img: {
                src: testimonials[nextIndex].img.src,
                alt: testimonials[nextIndex].img.alt,
              },
              contact: testimonials[nextIndex].contact,
              quote: testimonials[nextIndex].quote,
            };

            // get the index of the next testimonial
            nextTestimonialIndex = testimonials.indexOf(testimonials[nextIndex]);
          } else {
            // if testimonials[nextIndex] is falsy (is undefined), assign the nextTestimonial to the first testimonial
            nextTestimonial = {
              name: testimonials[firstIndex].name,
              jobTitle: `${testimonials[firstIndex].jobTitle} @ ${testimonials[firstIndex].company}`,
              img: {
                src: testimonials[firstIndex].img.src,
                alt: testimonials[firstIndex].img.alt,
              },
              contact: testimonials[firstIndex].contact,
              quote: testimonials[firstIndex].quote,
            };

            // get the index of the first testimonial
            nextTestimonialIndex = testimonials.indexOf(testimonials[firstIndex]);
          }

          // make the nextTestimonial the currentTestimonial
          currentTestimonial.name.textContent = nextTestimonial.name;
          currentTestimonial.jobTitle.textContent = nextTestimonial.jobTitle;
          currentTestimonial.img.src = nextTestimonial.img.src;
          currentTestimonial.img.alt = nextTestimonial.img.alt;
          currentTestimonial.contact.href = nextTestimonial.contact;
          currentTestimonial.quote.textContent = nextTestimonial.quote;

          // remove highlighing from the previously active carousel indicator
          // highlight the carousel indicator that has the same nextTesimonialIndex
          const carouselIndicatorActive = document.querySelector('.carousel-indicator-active');
          carouselIndicatorActive?.classList.remove('carousel-indicator-active');
          carouselIndicators[nextTestimonialIndex]?.classList.add('carousel-indicator-active');

          // stop executing the loop when a testimonial changes
          break;
        }
      }
    }, transitionDelayTestimonial.PHASE_03);

    setTimeout(() => {
      transition.next.phase4();
    }, transitionDelayTestimonial.PHASE_04);
  },
  prev() {
    // function to switch to the previous testimonial
    // if there is no next testimonial, switch to the last testimonial

    setTimeout(() => {
      transition.prev.phase1();
    }, transitionDelayTestimonial.PHASE_01);

    setTimeout(() => {
      transition.prev.phase2();
    }, transitionDelayTestimonial.PHASE_02);

    setTimeout(() => {
      for (let i = 0; i < testimonials.length; i++) {
        if (currentTestimonial.name.textContent === testimonials[i].name) {
          // if the name of the person providing the testimonial is the same as the name in testimonials[i].name

          const prevIndex = i - 1;
          const lastIndex = testimonials.length - 1;

          if (testimonials[prevIndex]) {
            // if testimonials[prevIndex] is truthy (is not undefined), assign the nextTestimonial to the previous testimonial in line
            prevTestimonial = {
              name: testimonials[prevIndex].name,
              jobTitle: `${testimonials[prevIndex].jobTitle} @ ${testimonials[prevIndex].company}`,
              img: {
                src: testimonials[prevIndex].img.src,
                alt: testimonials[prevIndex].img.alt,
              },
              contact: testimonials[prevIndex].contact,
              quote: testimonials[prevIndex].quote,
            };

            // get the index of the previous testimonial
            prevTestimonialIndex = testimonials.indexOf(testimonials[prevIndex]);
          } else {
            // if testimonials[prevIndex] is falsy (is undefined), assign the nextTestimonial to the last testimonial
            prevTestimonial = {
              name: testimonials[lastIndex].name,
              jobTitle: `${testimonials[lastIndex].jobTitle} @ ${testimonials[lastIndex].company}`,
              img: {
                src: testimonials[lastIndex].img.src,
                alt: testimonials[lastIndex].img.alt,
              },
              contact: testimonials[lastIndex].contact,
              quote: testimonials[lastIndex].quote,
            };

            // get the index of the last testimonial
            prevTestimonialIndex = testimonials.indexOf(testimonials[lastIndex]);
          }

          // make the prevTestimonial the currentTestimonial
          currentTestimonial.name.textContent = prevTestimonial.name;
          currentTestimonial.jobTitle.textContent = prevTestimonial.jobTitle;
          currentTestimonial.img.src = prevTestimonial.img.src;
          currentTestimonial.img.alt = prevTestimonial.img.alt;
          currentTestimonial.contact.href = prevTestimonial.contact;
          currentTestimonial.quote.textContent = prevTestimonial.quote;

          // remove highlighing from the previously active carousel indicator
          // highlight the carousel indicator that has the same prevTesimonialIndex
          const carouselIndicatorActive = document.querySelector('.carousel-indicator-active');
          carouselIndicatorActive?.classList.remove('carousel-indicator-active');
          carouselIndicators[prevTestimonialIndex]?.classList.add('carousel-indicator-active');

          // stop executing the loop when a testimonial changes
          break;
        }
      }
    }, transitionDelayTestimonial.PHASE_03);

    setTimeout(() => {
      transition.prev.phase4();
    }, transitionDelayTestimonial.PHASE_04);
  },
  clickedCarouselIndicatorNext() {
    // function to switch to the testimonial that is represented by a carousel indicator
    // the clicked carousel indicator comes after the current one

    setTimeout(() => {
      transition.next.phase1();
    }, transitionDelayTestimonial.PHASE_01);

    setTimeout(() => {
      transition.next.phase2();
    }, transitionDelayTestimonial.PHASE_02);

    setTimeout(() => {
      this.clickedCarouselIndicator();
    }, transitionDelayTestimonial.PHASE_03);

    setTimeout(() => {
      transition.next.phase4();
    }, transitionDelayTestimonial.PHASE_04);
  },
  clickedCarouselIndicatorPrev() {
    // function to switch to the testimonial that is represented by a carousel indicator
    // the clicked carousel indicator comes before the current one

    setTimeout(() => {
      transition.prev.phase1();
    }, transitionDelayTestimonial.PHASE_01);

    setTimeout(() => {
      transition.prev.phase2();
    }, transitionDelayTestimonial.PHASE_02);

    setTimeout(() => {
      this.clickedCarouselIndicator();
    }, transitionDelayTestimonial.PHASE_03);

    setTimeout(() => {
      transition.prev.phase4();
    }, transitionDelayTestimonial.PHASE_04);
  },
  clickedCarouselIndicator() {
    // make the current testimonial the one that corresponds to the index of the current carousel indicator

    currentTestimonial.name.textContent = testimonials[nextCarouselIndicatorIndex].name;
    currentTestimonial.jobTitle.textContent = `${testimonials[nextCarouselIndicatorIndex].jobTitle} @ ${testimonials[nextCarouselIndicatorIndex].company}`;
    currentTestimonial.img.src = testimonials[nextCarouselIndicatorIndex].img.src;
    currentTestimonial.img.alt = testimonials[nextCarouselIndicatorIndex].img.alt;
    currentTestimonial.contact.href = testimonials[nextCarouselIndicatorIndex].contact;
    currentTestimonial.quote.textContent = testimonials[nextCarouselIndicatorIndex].quote;
  },
};

const testimonialAuthorWrapper = document.querySelector('.testimonial-author-wrapper');
const testimonialQuote = document.querySelector('.testimonial-quote-p');
const btnTestimonialPrev = document.querySelector('.btn-testimonial-prev');
const btnTestimonialNext = document.querySelector('.btn-testimonial-next');
const testimonialWindow = document.querySelector('.testimonial-window');
const carouselIndicatorWrapper = document.querySelector('.carousel-indicators-wrapper');

// stores references for the carousel indicator DOM elements after the are created and appended to the DOM
const carouselIndicators = [];

const handleCarouselIndicatorClick = ({ target }) => {
  // a carousel indicator (one of the little dots below the testimonials) is clicked

  // remove highlighing from the previously active carousel indicator
  // highlight the clicked carousel indicator
  const carouselIndicatorActive = document.querySelector('.carousel-indicator-active');
  carouselIndicatorActive?.classList.remove('carousel-indicator-active');
  target.classList.add('carousel-indicator-active');

  // get the index of the next carousel indicator (the one that was clicked and gained the class carousel-indicator-active)
  nextCarouselIndicatorIndex = carouselIndicators.indexOf(target);

  // get the index of the previous carousel indicator (the one that had the class carousel-indicator-active and lost it)
  prevCarouselIndicatorIndex = carouselIndicators.indexOf(carouselIndicatorActive);

  if (nextCarouselIndicatorIndex > prevCarouselIndicatorIndex) {
    testimonialSwitch.clickedCarouselIndicatorNext();
  } else if (nextCarouselIndicatorIndex < prevCarouselIndicatorIndex) {
    testimonialSwitch.clickedCarouselIndicatorPrev();
  }
};

const handleBtnTestimonialNextClick = () => {
  // the button with the arrow pointing to the right is clicked

  testimonialSwitch.next();
};

const handleBtnTestimonialPrevClick = () => {
  // the button with the arrow pointing to the left is clicked

  testimonialSwitch.prev();
};

let testimonialWindowSwipeStartX;
let testimonialWindowSwipeEndX;

const handleTestimonialWindowSwipeStart = ({ clientX }) => {
  // function to indicate the starting position of swiping the testimonial window

  testimonialWindowSwipeStartX = clientX;
};

const handleTestimonialWindowSwipeEnd = ({ clientX }) => {
  // function to indicate the ending position of swiping the testimonial window

  testimonialWindowSwipeEndX = clientX;

  if (testimonialWindowSwipeStartX > testimonialWindowSwipeEndX) {
    // swiped left

    testimonialSwitch.next();
  } else {
    // swiped right

    testimonialSwitch.prev();
  }
};

const handleDOMContentLoaded = () => {
  // assign the first testimonial as the current testimonial
  currentTestimonial.name.textContent = testimonials[0].name;
  currentTestimonial.jobTitle.textContent = `${testimonials[0].jobTitle} @ ${testimonials[0].company}`;
  currentTestimonial.img.src = testimonials[0].img.src;
  currentTestimonial.img.alt = testimonials[0].img.alt;
  currentTestimonial.contact.href = testimonials[0].contact;
  currentTestimonial.quote.textContent = testimonials[0].quote;

  // create a carousel indicator for each testimonial and append it to the DOM
  testimonials.forEach((testimonial) => {
    const carouselIndicator = document.createElement('div');
    carouselIndicator.classList.add('carousel-indicator', 'button-outside-project');
    if (currentTestimonial.name.textContent === testimonial.name) {
      carouselIndicator.classList.add('carousel-indicator-active');
    }
    // add event listeners for clicking any buttons to switch testimonials
    carouselIndicator.addEventListener('click', handleCarouselIndicatorClick);
    carouselIndicatorWrapper.append(carouselIndicator);
  });
  // store references to the carousel indicator DOM elements
  carouselIndicators.push(...Array.from(document.querySelectorAll('.carousel-indicator')));

  testimonialAutoSwitchNextStart();
};

let testimonialAutoSwitchNext = null;

const testimonialAutoSwitchNextStart = () => {
  if (!testimonialAutoSwitchNext) {
    testimonialAutoSwitchNext = setInterval(() => {
      testimonialSwitch.next();
    }, TRANSITION_DELAY_TESTIMONIAL_AUTO_SWITCH);
  }
};

const testimonialAutoSwitchNextEnd = () => {
  clearInterval(testimonialAutoSwitchNext);
  testimonialAutoSwitchNext = null;
};

btnTestimonialNext.addEventListener('click', handleBtnTestimonialNextClick);
btnTestimonialPrev.addEventListener('click', handleBtnTestimonialPrevClick);
testimonialWindow.addEventListener('pointerdown', handleTestimonialWindowSwipeStart);
testimonialWindow.addEventListener('pointerup', handleTestimonialWindowSwipeEnd);
document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
