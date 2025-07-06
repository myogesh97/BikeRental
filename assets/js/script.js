document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const dropdowns = document.querySelectorAll(".has-dropdown");

  navToggle.addEventListener("click", () => {
    navbar.classList.toggle("nav-active");
    document.body.style.overflow = navbar.classList.contains("nav-active")
      ? "hidden"
      : "";
  });

  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target) && navbar.classList.contains("nav-active")) {
      navbar.classList.remove("nav-active");
      document.body.style.overflow = "";
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

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-10px); }
        }

        .scrolled {
            padding: 0.7rem 2rem;
            background-color: #1f1f1f82;
            backdrop-filter: blur(5px);
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
  navText : ["<ion-icon name='chevron-back-outline'></ion-icon>","<ion-icon name='chevron-forward-outline'></ion-icon>"],
});

document.addEventListener("scroll", () => {
  const items = document.querySelectorAll(".hero-bannerSection-Box .owl-carousel .item");

  items.forEach(item => {
    const img = item.querySelector("img");
    if (img) {
      const scrollY = window.scrollY;
      const offsetTop = item.offsetTop;
      const height = item.offsetHeight;
      const inView = scrollY + window.innerHeight > offsetTop && scrollY < offsetTop + height;

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
  navText : ["<ion-icon name='chevron-back-outline'></ion-icon>","<ion-icon name='chevron-forward-outline'></ion-icon>"],
});
