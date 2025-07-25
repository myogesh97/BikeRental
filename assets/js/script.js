AOS.init({
  // disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  // startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  // initClassName: 'aos-init', // class applied after initialization
  // animatedClassName: 'aos-animate', // class applied on animation
  // useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  // disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  // debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  // throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // offset: 120, // offset (in px) from the original trigger point
  // delay: 0, // values from 0 to 3000, with step 50ms
  // duration: 400, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  once: true, // whether animation should happen only once - while scrolling down
  // mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const dropdowns = document.querySelectorAll(".has-dropdown");

  navToggle.addEventListener("click", () => {
    navbar.classList.toggle("nav-active");
    const isNavActive = navbar.classList.contains("nav-active");
    document.body.style.overflow = isNavActive ? "hidden" : "";
    document.body.classList.toggle("nav-open", isNavActive);
  });

  document.addEventListener("click", (e) => {
    const isClickOutside =
      !navbar.contains(e.target) && !navToggle.contains(e.target);
    if (isClickOutside && navbar.classList.contains("nav-active")) {
      navbar.classList.remove("nav-active");
      document.body.style.overflow = "";
      document.body.classList.remove("nav-open");
    }
  });

  dropdowns.forEach((dropdown) => {
    const link = dropdown.querySelector(".nav-link");
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 968) {
        e.preventDefault();
        dropdown.classList.toggle("active");

        dropdowns.forEach((other) => {
          if (other !== dropdown && other.classList.contains("active")) {
            other.classList.remove("active");
            const otherDropdown = other.querySelector(".dropdown");
            otherDropdown.style.animation = "slideUp 0.3s forwards";
            setTimeout(() => {
              otherDropdown.style.animation = "";
            }, 300);
          }
        });

        const currentDropdown = dropdown.querySelector(".dropdown");
        if (dropdown.classList.contains("active")) {
          currentDropdown.style.animation = "slideDown 0.3s forwards";
        } else {
          currentDropdown.style.animation = "slideUp 0.3s forwards";
          setTimeout(() => {
            currentDropdown.style.animation = "";
          }, 300);
        }
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 968) {
      navbar.classList.remove("nav-active");
      dropdowns.forEach((dropdown) => dropdown.classList.remove("active"));
      document.body.style.overflow = "";
    }
  });

  const handleScrollClass = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  };

  window.addEventListener("scroll", handleScrollClass);

  handleScrollClass();

  const style = document.createElement("style");
  style.textContent = `
    .scrolled {
        padding: 0.7rem 2rem;
        background-color: rgba(16, 16, 26, 0.7);
    }

    @media (max-width: 576px) {
        .scrolled {
            padding: 0.7rem 1rem;
        }
    }
  `;
  document.head.appendChild(style);

  // Homepage Banner Slider
  var heroSwiper = new Swiper(".hero-bannerSection", {
    loop: true,
    speed: 1000,
    allowTouchMove: false,
    autoplay: {
      delay: 5000,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    speed: 2000,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // BG Parallax
  document.addEventListener("scroll", function () {
    const slides = document.querySelectorAll(
      ".hero-bannerSection .swiper-slide"
    );

    slides.forEach((slide) => {
      const bg = slide.querySelector(".slide-background-image");
      const text = slide.querySelector(".text-content-shell");
      const rect = slide.getBoundingClientRect();

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        if (bg) {
          const bgTransformValue = rect.top * -0.2;
          bg.style.transform = `translateY(${bgTransformValue}px)`;
        }
        if (text) {
          const textTransformValue = rect.top * -0.4;
          text.style.transform = `translateY(${textTransformValue}px)`;
        }
      }
    });
  });

  // Text Content Parallax
  document.addEventListener("scroll", function () {
    const slides = document.querySelectorAll(
      ".hero-bannerSection .swiper-slide"
    );

    slides.forEach((slide) => {
      const textContent = slide.querySelector(".text-content-shell");

      if (textContent) {
        const rect = slide.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
          const slideCenter = rect.top + rect.height / 2;
          const screenCenter = windowHeight / 2;
          const distanceFromCenter = slideCenter - screenCenter;
          const transformValue = distanceFromCenter * -0.3;

          textContent.style.transform = `translateY(${transformValue}px)`;
        }
      }
    });
  });

  // Bike Slider Section
  var thumbsSwiper = new Swiper(".gallery-thumbs", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });

  var mainSwiper = new Swiper(".gallery-slider", {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: thumbsSwiper,
    },
  });

  // Testimonial Slider
  var testimonialSwiper = new Swiper(".testimonial-slider", {
    loop: true,
    speed: 1000,
    allowTouchMove: false,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    speed: 1000,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

// Owl Slider JS
$("#carousel2").owlCarousel({
  autoplay: true,
  rewind: false,
  responsiveClass: true,
  autoHeight: true,
  autoplayTimeout: 2500,
  smartSpeed: 1500,
  nav: false,
  items: 1,
  lazyLoad: true,
  navSpeed: 1000,
  dots: false,
  loop: true,
  mouseDrag: true,
  pullDrag: false,
  touchDrag: false,
  navText: [
    "<ion-icon name='chevron-back-outline'></ion-icon>",
    "<ion-icon name='chevron-forward-outline'></ion-icon>",
  ],
  responsive: {
    0: {
      items: 2,
    },

    576: {
      items: 2,
    },

    1024: {
      items: 5,
    },

    1366: {
      items: 6,
    },
  },
});

// Stats Js
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-number");
  const speed = 200; // The lower the number, the faster the count

  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const updateCount = () => {
      const count = +counter.innerText.replace(/,/g, "");
      const increment = target / speed;

      if (count < target) {
        const newCount = Math.ceil(count + increment);
        counter.innerText = newCount.toLocaleString("en-IN");
        setTimeout(updateCount, 15);
      } else {
        counter.innerText = target.toLocaleString("en-IN");
      }
    };
    updateCount();
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
});

// Scroll To Top JS
document.addEventListener("DOMContentLoaded", () => {
  const scrollToTopButton = document.querySelector(".scroll-to-top-button");

  if (scrollToTopButton) {
    const toggleButtonVisibility = () => {
      if (window.scrollY > 300) {
        scrollToTopButton.classList.add("is-visible");
      } else {
        scrollToTopButton.classList.remove("is-visible");
      }
    };

    const scrollToTop = (event) => {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    window.addEventListener("scroll", toggleButtonVisibility);

    scrollToTopButton.addEventListener("click", scrollToTop);

    toggleButtonVisibility();
  }
});

// Bike Sorting
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bikeFilterForm");
  const availability = document.getElementById("filterAvailability");
  const category = document.getElementById("filterCategory");
  const brand = document.getElementById("filterBrand");

  if (!form || !availability || !category || !brand) return;

  const bikeCards = document.querySelectorAll(".motorcycle-card");

  const filterBikes = () => {
    const availValue = availability.value;
    const categoryValue = category.value;
    const brandValue = brand.value;

    bikeCards.forEach((card) => {
      const matchAvail =
        availValue === "all" || card.dataset.availability === availValue;
      const matchCat =
        categoryValue === "all" || card.dataset.category === categoryValue;
      const matchBrand =
        brandValue === "all" || card.dataset.brand === brandValue;

      const visible = matchAvail && matchCat && matchBrand;
      card.parentElement.style.display = visible ? "" : "none";
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    filterBikes();
  });

  form.addEventListener("reset", () => {
    setTimeout(() => {
      bikeCards.forEach((card) => {
        card.parentElement.style.display = "";
      });
    }, 0);
  });
});

function updateListingToolbar() {
  const resultsCount = document.getElementById("resultsCount");
  const viewPage = document.getElementById("viewPage");

  if (!resultsCount || !viewPage) return;

  const allCards = document.querySelectorAll(".motorcycle-card");
  const visibleCards = Array.from(allCards).filter(
    (card) => card.parentElement.style.display !== "none"
  );

  resultsCount.textContent = `Displaying ${visibleCards.length} of ${allCards.length}`;
  viewPage.textContent = `Page 1`;
}

document.addEventListener("DOMContentLoaded", () => {
  const hasCards = document.querySelector(".motorcycle-card");
  const hasResults = document.getElementById("resultsCount");

  if (hasCards && hasResults) {
    updateListingToolbar();
  }
});

// Run on load
updateListingToolbar();
