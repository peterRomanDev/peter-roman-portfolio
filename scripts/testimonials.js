const btnTestimonialPrev = document.querySelector(".btn-testimonial-prev");
const btnTestimonialNext = document.querySelector(".btn-testimonial-next");
const carouselIndicators = document.querySelectorAll(".carousel-indicator");

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
	quote: "Peter is a team-player, ready and willing to help his teammates, and deeply caring for the users. He is a very detail-oriented person and puts a great emphasis on making sure the websites are error-free, secure, and run smoothly. He also possesses strong problem-solving skills and is able to tackle and solve technical challenges on his own. We could always count on him as he is focused on consistently delivering high-quality work, which is something we have highly appreciated."
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