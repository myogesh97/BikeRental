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
});

// Owl Slider JS

$("#carousel").owlCarousel({
  autoplay: false,
  rewind: false,
  animateOut: "fadeOut",
  animateIn: "fadeIn",
  responsiveClass: true,
  autoHeight: true,
  autoplayTimeout: 5000,
  smartSpeed: 1000,
  nav: true,
  items: 1,
  navSpeed: 1000,
  loop: true,
  dots: false,
  mouseDrag: false,
  pullDrag: false,
  touchDrag: false,
  navText: [
    "<ion-icon name='chevron-back-outline'></ion-icon>",
    "<ion-icon name='chevron-forward-outline'></ion-icon>",
  ],
  responsive: {
    0: {
      items: 1,
    },

    600: {
      items: 1,
    },

    1024: {
      items: 1,
    },

    1366: {
      items: 1,
    },
  },
});

document.addEventListener("scroll", () => {
  const items = document.querySelectorAll(
    ".hero-bannerSection-Box .owl-carousel .item"
  );

  items.forEach((item) => {
    const img = item.querySelector("img");
    if (img) {
      const scrollY = window.scrollY;
      const offsetTop = item.offsetTop;
      const height = item.offsetHeight;
      const inView =
        scrollY + window.innerHeight > offsetTop &&
        scrollY < offsetTop + height;

      if (inView) {
        const percent = (scrollY - offsetTop) / height;
        img.style.transform = `translateY(${percent * 150}px)`; // adjust strength here
      }
    }
  });
});

$("#carousel1").owlCarousel({
  autoplay: false,
  rewind: false,
  responsiveClass: true,
  autoHeight: true,
  autoplayTimeout: 5000,
  smartSpeed: 3000,
  nav: true,
  items: 1,
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
      items: 1,
      autoplay: true,
      mouseDrag: true,
      pullDrag: true,
      touchDrag: true,
    },

    576: {
      items: 1,
      autoplay: true,
      mouseDrag: true,
      pullDrag: true,
      touchDrag: true,
    },

    1024: {
      items: 1,
      autoplay: true,
    },

    1366: {
      items: 1,
    },
  },
});

$("#carousel2").owlCarousel({
  autoplay: true,
  rewind: false,
  responsiveClass: true,
  autoHeight: true,
  autoplayTimeout: 2500,
  smartSpeed: 1500,
  nav: false,
  items: 1,
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
    // wait for reset to apply
    setTimeout(() => {
      bikeCards.forEach((card) => {
        card.parentElement.style.display = "";
      });
    }, 0);
  });
});

function updateListingToolbar(currentPage = 1, perPage = 8) {
  const bikes = document.querySelectorAll(".motorcycle-card");
  const totalResults = bikes.length;
  const start = (currentPage - 1) * perPage + 1;
  let end = currentPage * perPage;
  if (end > totalResults) end = totalResults;

  // Update text
  const resultsText = `Displaying ${start} - ${end} of ${totalResults}`;
  const pageText = `Page ${currentPage}`;

  document.getElementById("resultsCount").textContent = resultsText;
  document.getElementById("viewPage").textContent = pageText;

  // Optionally: hide/show cards
  bikes.forEach((bike, index) => {
    if (index >= start - 1 && index < end) {
      bike.closest(".col-lg-3").style.display = "block";
    } else {
      bike.closest(".col-lg-3").style.display = "none";
    }
  });
}

// Run on load
updateListingToolbar();

// Pagination JS
function renderPagination(totalItems, perPage = 8, currentPage = 1) {
  const paginationContainer = document.getElementById("paginationContainer");
  if (!paginationContainer) return;

  const totalPages = Math.ceil(totalItems / perPage);
  let html = "";

  if (currentPage > 1) {
    html += `<li><a href="#" class="prev page-numbers" data-page="${
      currentPage - 1
    }">&lt; Prev</a></li>`;
  }

  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      html += `<li><span class="page-numbers current">${i}</span></li>`;
    } else {
      html += `<li><a href="#" class="page-numbers" data-page="${i}">${i}</a></li>`;
    }
  }

  // Next Button
  if (currentPage < totalPages) {
    html += `<li><a href="#" class="next page-numbers" data-page="${
      currentPage + 1
    }">Next &gt;</a></li>`;
  }

  paginationContainer.innerHTML = html;

  paginationContainer.querySelectorAll(".page-numbers").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const page = parseInt(el.getAttribute("data-page"));
      updateListingToolbar(page, perPage);
      renderPagination(totalItems, perPage, page);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const bikes = document.querySelectorAll(".motorcycle-card");
  updateListingToolbar(1, 8);
  renderPagination(bikes.length, 8, 1);
});
