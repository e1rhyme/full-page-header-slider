"use strict";

/// SLIDER COMPONENT
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  // Default slide number
  let curSlide = 0;
  // Max slides length set to zero index (-1)
  const maxSlide = slides.length - 1;

  // Create navigation dots
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // Fnx for active slide/ dot
  const activateDot = function (slide) {
    // remove active class from all dot elements
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    // determine which slide is the current slide
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  // Go to slide
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
      // curSlide: 0: 0%, 100%, 200%, 300%
      // curSlide: 1: -100%, 0%, 100%, 200%
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Previous slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Initialize slide position and active slide on first load
  const init = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
  };

  init();

  // Event handlers for left/ right buttons
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  // Event handler for keyboard keys
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    // shortcircuiting
    e.key === "ArrowRight" && nextSlide();
  });
  // Using event delegation to handle dot clicks
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

const navbarNav = document.querySelector(".navbar-nav");
navbarNav.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav-link"))
    document
      .querySelectorAll(".nav-link")
      .forEach((link) => link.classList.remove("active"));

  e.target.classList.add("active");
});
