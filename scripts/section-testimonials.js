const testimonialMiguelOliveira = {
	name: "Miguel Oliveira",
	jobTitle: "Project Coordinator and Executive Assistant",
	company: "Boston Consulting Group",
	img: {
		src: "./images/testimonials/miguel-oliveira.png",
		alt: this.name
	},
	contact: "https://www.linkedin.com/in/miguelsoska",
	quote: "Peter has always shown high levels of professionalism and enthusiasm. He was always ahead of schedule and that helped tremendously in busy days where many events and meeting were being held. Therefore, it was always a pleasure to work with Peter. I am sure that his organisational skills and structured approach to work definitely add value to any team he joins."
};

const testimonialManuelaSobral = {
	name: "Manuela Sobral",
	jobTitle: "Project Manager and HR Coordinator",
	company: "Sustainary",
	img: {
		src: "./images/testimonials/manuela-sobral.png",
		alt: this.name
	},
	contact: "https://www.linkedin.com/in/manuela-sobral",
	quote: "Peter is a team-player, ready and willing to help his teammates, and deeply caring for the users. He possesses strong problem-solving skills and is able to solve technical challenges on his own. We could always count on him as he is focused on consistently delivering high-quality work, which is something we have highly appreciated."
};

const testimonialBoKochChristensen = {
	name: "Bo Koch-Christensen",
	jobTitle: "Project and Organisation Coordinator",
	company: "Sustainary",
	img: {
		src: "./images/testimonials/bo-koch-christensen.png",
		alt: this.name
	},
	contact: "https://www.linkedin.com/in/highperformer",
	quote: "Peter played a crucial role in shaping a strong identity and seamless user experience across our websites, making them not only visually appealing but also user-friendly and easy to update in the future. The quality of his work speaks for itself, and his websites are now helping Sustainary fulfil its vision."
};

const testimonials = [
	testimonialMiguelOliveira,
	testimonialManuelaSobral,
	testimonialBoKochChristensen
];

let nextTestimonial;
let prevTestimonial;
const currentTestimonial = {
	name: document.querySelector(".testimonial-name"),
	jobTitle: document.querySelector(".testimonial-job-title"),
	img: document.querySelector(".testimonial-img"),
	contact: document.querySelector(".testimonial-contact"),
	quote: document.querySelector(".testimonial-quote")
};

let nextTestimonialIndex;
let prevTestimonialIndex;
let nextCarouselIndicatorIndex;
let prevCarouselIndicatorIndex;

const testimonialAuthorWrapper = document.querySelector(".testimonial-author-wrapper");
const testimonialQuote = document.querySelector(".testimonial-quote-p");
const btnTestimonialPrev = document.querySelector(".btn-testimonial-prev");
const btnTestimonialNext = document.querySelector(".btn-testimonial-next");
const carouselIndicators = Array.from(document.querySelectorAll(".carousel-indicator"));

const transition = {
	// functions for transitioning the testimonials

	next: {
		phase1() {
			// remove event listeners for clicking any buttons to switch testimonials
			carouselIndicators.forEach((carouselIndicator) => carouselIndicator.removeEventListener("click", handleCarouselIndicatorClick));
			btnTestimonialNext.removeEventListener("click", handleBtnTestimonialNextClick);
			btnTestimonialPrev.removeEventListener("click", handleBtnTestimonialPrevClick);

			testimonialAuthorWrapper.classList.add("testimonial-off-screen-left");
			testimonialQuote.classList.add("testimonial-off-screen-left");
		},
		phase2() {
			testimonialAuthorWrapper.classList.remove("transition-testimonial");
			testimonialQuote.classList.remove("transition-testimonial");

			testimonialAuthorWrapper.classList.remove("testimonial-off-screen-left");
			testimonialQuote.classList.remove("testimonial-off-screen-left");

			testimonialAuthorWrapper.classList.add("testimonial-off-screen-right");
			testimonialQuote.classList.add("testimonial-off-screen-right");
		},
		phase4() {
			testimonialAuthorWrapper.classList.add("transition-testimonial");
			testimonialQuote.classList.add("transition-testimonial");

			testimonialAuthorWrapper.classList.remove("testimonial-off-screen-right");
			testimonialQuote.classList.remove("testimonial-off-screen-right");

			// add event listeners for clicking any buttons to switch testimonials
			carouselIndicators.forEach((carouselIndicator) => carouselIndicator.addEventListener("click", handleCarouselIndicatorClick));
			btnTestimonialNext.addEventListener("click", handleBtnTestimonialNextClick);
			btnTestimonialPrev.addEventListener("click", handleBtnTestimonialPrevClick);
		}
	},
	prev: {
		phase1() {
			// remove event listeners for clicking any buttons to switch testimonials
			carouselIndicators.forEach((carouselIndicator) => carouselIndicator.removeEventListener("click", handleCarouselIndicatorClick));
			btnTestimonialNext.removeEventListener("click", handleBtnTestimonialNextClick);
			btnTestimonialPrev.removeEventListener("click", handleBtnTestimonialPrevClick);

			testimonialAuthorWrapper.classList.add("testimonial-off-screen-right");
			testimonialQuote.classList.add("testimonial-off-screen-right");
		},
		phase2() {
			testimonialAuthorWrapper.classList.remove("transition-testimonial");
			testimonialQuote.classList.remove("transition-testimonial");

			testimonialAuthorWrapper.classList.remove("testimonial-off-screen-right");
			testimonialQuote.classList.remove("testimonial-off-screen-right");

			testimonialAuthorWrapper.classList.add("testimonial-off-screen-left");
			testimonialQuote.classList.add("testimonial-off-screen-left");
		},
		phase4() {
			testimonialAuthorWrapper.classList.add("transition-testimonial");
			testimonialQuote.classList.add("transition-testimonial");

			testimonialAuthorWrapper.classList.remove("testimonial-off-screen-left");
			testimonialQuote.classList.remove("testimonial-off-screen-left");

			// add event listeners for clicking any buttons to switch testimonials
			carouselIndicators.forEach((carouselIndicator) => carouselIndicator.addEventListener("click", handleCarouselIndicatorClick));
			btnTestimonialNext.addEventListener("click", handleBtnTestimonialNextClick);
			btnTestimonialPrev.addEventListener("click", handleBtnTestimonialPrevClick);
		}
	}
}

const transitionMs = {
	// ms for each phase of the testimonial transition

	phase1: 0,
	phase2: 350,
	phase3: 400,
	phase4: 450,
};





const handleCarouselIndicatorClick = ({ target }) => {
	// a carousel indicator (one of the little dots below the testimonials) is clicked

	// remove highlighing from the previously active carousel indicator
	// highlight the clicked carousel indicator
	const carouselIndicatorActive = document.querySelector(".carousel-indicator-active");
	carouselIndicatorActive?.classList.remove("carousel-indicator-active");
	target.classList.add("carousel-indicator-active");

	// get the index of the next carousel indicator (the one that was clicked and gained the class carousel-indicator-active)
	nextCarouselIndicatorIndex = carouselIndicators.indexOf(target);

	// get the index of the previous carousel indicator (the one that had the class carousel-indicator-active and lost it)
	prevCarouselIndicatorIndex = carouselIndicators.indexOf(carouselIndicatorActive);

	if (nextCarouselIndicatorIndex > prevCarouselIndicatorIndex) {
		setTimeout(() => {
			transition.next.phase1();
		}, transitionMs.phase1);

		setTimeout(() => {
			transition.next.phase2();
		}, transitionMs.phase2);

		setTimeout(() => {
			// make the current testimonial the one that corresponds to the index of the current carousel indicator
			currentTestimonial.name.textContent = testimonials[nextCarouselIndicatorIndex].name;
			currentTestimonial.jobTitle.textContent = `${testimonials[nextCarouselIndicatorIndex].jobTitle} at ${testimonials[nextCarouselIndicatorIndex].company}`;
			currentTestimonial.img.src = testimonials[nextCarouselIndicatorIndex].img.src;
			currentTestimonial.img.alt = testimonials[nextCarouselIndicatorIndex].img.alt;
			currentTestimonial.contact.href = testimonials[nextCarouselIndicatorIndex].contact;
			currentTestimonial.quote.textContent = testimonials[nextCarouselIndicatorIndex].quote;
		}, transitionMs.phase3);

		setTimeout(() => {
			transition.next.phase4();
		}, transitionMs.phase4);
	} else if (nextCarouselIndicatorIndex < prevCarouselIndicatorIndex) {
		setTimeout(() => {
			transition.prev.phase1();
		}, transitionMs.phase1);

		setTimeout(() => {
			transition.prev.phase2();
		}, transitionMs.phase2);

		setTimeout(() => {
			// make the current testimonial the one that corresponds to the index of the current carousel indicator
			currentTestimonial.name.textContent = testimonials[nextCarouselIndicatorIndex].name;
			currentTestimonial.jobTitle.textContent = `${testimonials[nextCarouselIndicatorIndex].jobTitle} at ${testimonials[nextCarouselIndicatorIndex].company}`;
			currentTestimonial.img.src = testimonials[nextCarouselIndicatorIndex].img.src;
			currentTestimonial.img.alt = testimonials[nextCarouselIndicatorIndex].img.alt;
			currentTestimonial.contact.href = testimonials[nextCarouselIndicatorIndex].contact;
			currentTestimonial.quote.textContent = testimonials[nextCarouselIndicatorIndex].quote;
		}, transitionMs.phase3);

		setTimeout(() => {
			transition.prev.phase4();
		}, transitionMs.phase4);
	}
};

const handleBtnTestimonialNextClick = () => {
	// the button with the arrow pointing to the right is clicked

	setTimeout(() => {
		transition.next.phase1();
	}, transitionMs.phase1);

	setTimeout(() => {
		transition.next.phase2();
	}, transitionMs.phase2);

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
						jobTitle: `${testimonials[nextIndex].jobTitle} at ${testimonials[nextIndex].company}`,
						img: {
							src: testimonials[nextIndex].img.src,
							alt: testimonials[nextIndex].img.alt,
						},
						contact: testimonials[nextIndex].contact,
						quote: testimonials[nextIndex].quote
					};

					// get the index of the next testimonial
					nextTestimonialIndex = testimonials.indexOf(testimonials[nextIndex]);
				} else {
					// if testimonials[nextIndex] is falsy (is undefined), assign the nextTestimonial to the first testimonial
					nextTestimonial = {
						name: testimonials[firstIndex].name,
						jobTitle: `${testimonials[firstIndex].jobTitle} at ${testimonials[firstIndex].company}`,
						img: {
							src: testimonials[firstIndex].img.src,
							alt: testimonials[firstIndex].img.alt,
						},
						contact: testimonials[firstIndex].contact,
						quote: testimonials[firstIndex].quote
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
				const carouselIndicatorActive = document.querySelector(".carousel-indicator-active");
				carouselIndicatorActive?.classList.remove("carousel-indicator-active");
				carouselIndicators[nextTestimonialIndex]?.classList.add("carousel-indicator-active");

				// stop executing the loop when a testimonial changes
				break;
			}
		}
	}, transitionMs.phase3);

	setTimeout(() => {
		transition.next.phase4();
	}, transitionMs.phase4);
};

const handleBtnTestimonialPrevClick = () => {
	// the button with the arrow pointing to the left is clicked

	setTimeout(() => {
		transition.prev.phase1();
	}, transitionMs.phase1);

	setTimeout(() => {
		transition.prev.phase2();
	}, transitionMs.phase2);

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
						jobTitle: `${testimonials[prevIndex].jobTitle} at ${testimonials[prevIndex].company}`,
						img: {
							src: testimonials[prevIndex].img.src,
							alt: testimonials[prevIndex].img.alt,
						},
						contact: testimonials[prevIndex].contact,
						quote: testimonials[prevIndex].quote
					};

					// get the index of the previous testimonial
					prevTestimonialIndex = testimonials.indexOf(testimonials[prevIndex]);
				} else {
					// if testimonials[prevIndex] is falsy (is undefined), assign the nextTestimonial to the last testimonial
					prevTestimonial = {
						name: testimonials[lastIndex].name,
						jobTitle: `${testimonials[lastIndex].jobTitle} at ${testimonials[lastIndex].company}`,
						img: {
							src: testimonials[lastIndex].img.src,
							alt: testimonials[lastIndex].img.alt,
						},
						contact: testimonials[lastIndex].contact,
						quote: testimonials[lastIndex].quote
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
				const carouselIndicatorActive = document.querySelector(".carousel-indicator-active");
				carouselIndicatorActive?.classList.remove("carousel-indicator-active");
				carouselIndicators[prevTestimonialIndex]?.classList.add("carousel-indicator-active");

				// stop executing the loop when a testimonial changes
				break;
			}
		}
	}, transitionMs.phase3);

	setTimeout(() => {
		transition.prev.phase4();
	}, transitionMs.phase4);

};





// add event listeners for clicking any buttons to switch testimonials
carouselIndicators.forEach((carouselIndicator) => carouselIndicator.addEventListener("click", handleCarouselIndicatorClick));
btnTestimonialNext.addEventListener("click", handleBtnTestimonialNextClick);
btnTestimonialPrev.addEventListener("click", handleBtnTestimonialPrevClick);