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

$(document).ready(function () {
  var loop = true;

  function addSiblingClass(event) {
    var index = event.item.index;
    var stage = event.relatedTarget.$stage;

    if (stage) {
      var items = stage.find(".owl-item");
      stage.find(".sibling").removeClass("sibling");
      stage.find(".mirror-active").removeClass("mirror-active");

      items.eq(index - 1).addClass("sibling");
      items.eq(index + 1).addClass("sibling");

      if (loop) {
        var mirrorActive = null;
        var clonedItems = Math.ceil(event.item.count / 2);
        clonedItems = clonedItems < 2 ? 2 : clonedItems;

        if (index === clonedItems - 1) {
          mirrorActive = items.length - (clonedItems + 1);
        } else if (index === items.length - (clonedItems + 1)) {
          mirrorActive = clonedItems - 1;
        }

        if (mirrorActive) {
          items.eq(mirrorActive - 1).addClass("sibling");
          items.eq(mirrorActive).addClass("mirror-active");
          items.eq(mirrorActive + 1).addClass("sibling");
        }
      }
    }
  }

  $("#carousel").owlCarousel({
    items: 1,
    nav: true,
    dots: false,
    mouseDrag: false,
    pullDrag: false,
    autoplay: true,
    responsiveClass: true,
    autoHeight: true,
    autoplayTimeout: 5000,
    smartSpeed: 1000,
    loop: loop,
    navSpeed: 1000,
    animateIn: "fadeIn",
    animateOut: "fadeOut",
    onInitialized: addSiblingClass,
    onChanged: addSiblingClass,
    navText: ["", ""],
  });
});
