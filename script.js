// ========== Mobile Navigation Toggle ==========
// Selects the hamburger menu icon element
const hamburger = document.querySelector(".hamburger");
// Selects the navigation menu list element
const navMenu = document.querySelector(".nav-menu");
// Selects all navigation links
const navLinks = document.querySelectorAll(".nav-link");

// Adds a click event listener to the hamburger icon
// Explanation: Toggles the mobile menu visibility when the icon is clicked
if (hamburger) {
  hamburger.addEventListener("click", () => {
    // Toggles the 'active' class on the nav menu
    // Explanation: CSS uses this class to show/hide the menu
    navMenu.classList.toggle("active");

    // Animate hamburger to X
    // Selects the three span lines inside the hamburger
    const spans = hamburger.querySelectorAll("span");

    // Checks if the menu is now open (has 'active' class)
    if (navMenu.classList.contains("active")) {
      // Rotates top line 45 degrees
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      // Hides the middle line
      spans[1].style.opacity = "0";
      // Rotates bottom line -45 degrees
      spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
    } else {
      // Resets lines to original position (parallel)
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });
}

// Close mobile menu when clicking on a link
// Explanation: Iterates through each link and adds a click listener
if (navMenu) {
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Removes 'active' class to hide menu
      navMenu.classList.remove("active");

      // Resets hamburger icon animation
      if (hamburger) {
        const spans = hamburger.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });
  });
}

// ========== Navbar Scroll Effect ==========
// Variable to store the previous scroll position
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

// Adds a scroll event listener to the window
// Explanation: Detects when the user scrolls the page
window.addEventListener("scroll", () => {
  // Gets the current vertical scroll position
  const currentScroll = window.pageYOffset;

  // If at the top of the page, show navbar normally
  if (currentScroll <= 0) {
    navbar.style.transform = "translateY(0)";
    return;
  }

  // Check if scrolling down and past the initial 100px
  if (currentScroll > lastScroll && currentScroll > 100) {
    // Scrolling down: Hide navbar by moving it up
    // Explanation: 'translateY(-100%)' moves it completely out of view
    navbar.style.transform = "translateY(-100%)";
  } else {
    // Scrolling up: Show navbar
    navbar.style.transform = "translateY(0)";
  }

  // Update last scroll position for next check
  lastScroll = currentScroll;
});

// ========== Skill Bars Animation ==========
// Selects all skill progress bars
const skillBars = document.querySelectorAll(".skill-progress");

// Function to animate skill bars
const animateSkills = () => {
  skillBars.forEach((bar) => {
    // Gets the position of the bar relative to the viewport
    const barPosition = bar.getBoundingClientRect().top;
    // Gets the height of the viewport
    const screenPosition = window.innerHeight;

    // If the bar is within the visible screen area
    if (barPosition < screenPosition) {
      // Store the target width (defined in inline style)
      const width = bar.style.width;
      // Reset width to 0 for animation start
      bar.style.width = "0";
      // After a short delay, set width to target to trigger CSS transition
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    }
  });
};

// Intersection Observer for skill bars animation
// Explanation: Efficiently detects when the skills section enters the viewport
const skillsSection = document.querySelector(".skills");
let skillsAnimated = false; // Flag to ensure animation runs only once

const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // If section is visible and hasn't animated yet
      if (entry.isIntersecting && !skillsAnimated) {
        animateSkills();
        skillsAnimated = true;
      }
    });
  },
  { threshold: 0.3 } // Trigger when 30% of section is visible
);

// Start observing the skills section if it exists
if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// ========== Form Submission Handling ==========
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    // Prevent default form submission (page reload)
    e.preventDefault();

    // Get values from form inputs
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Log data to console (simulating server send)
    // Explanation: In a real app, you would use fetch() here
    console.log("Form submitted:", { name, email, subject, message });

    // Show success message to user
    alert("Thank you for your message! I will get back to you soon.");

    // Clear the form fields
    contactForm.reset();
  });
}

// ========== Smooth Scroll for Anchor Links ==========
// Selects all links starting with '#'
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    // Prevent default jump behavior
    e.preventDefault();
    // Find the target element by ID
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      // Calculate position, accounting for fixed navbar height (80px)
      const offsetTop = target.offsetTop - 80;
      // Smoothly scroll to the calculated position
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// ========== Page Loading Animation ==========
// Runs when all page resources (images, styles) are loaded
window.addEventListener("load", () => {
  // Start with body hidden (opacity 0) - handled in CSS or previous script
  document.body.style.opacity = "0";
  // Fade in content
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// ========== Scroll Fade-In Animations ==========
// Configuration for the Intersection Observer
const observerOptions = {
  threshold: 0.1, // Trigger when 10% of element is visible
  rootMargin: "0px 0px -100px 0px", // Trigger slightly before element enters view
};

// Create observer to handle fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Make element visible and move to original position
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Select elements to animate: project cards, stats, skill categories
document
  .querySelectorAll(".project-card, .stat-item, .skill-category")
  .forEach((el) => {
    // Set initial state: hidden and moved down
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    // Add transition for smooth animation
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    // Start observing the element
    observer.observe(el);
  });

// ========== Active Navigation Highlight ==========
// Selects all sections that have an ID
const sections = document.querySelectorAll("section[id]");

const highlightNavigation = () => {
  // Get current scroll position, adding offset for better UX
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    // Get section dimensions and position
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    // Check if current scroll position is within this section
    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      // Update navigation links
      navLinks.forEach((link) => {
        link.classList.remove("active");
        // Add 'active' class to the link corresponding to this section
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
};

// Run highlight function on scroll
window.addEventListener("scroll", highlightNavigation);

// ========== Parallax Effect for Hero Section ==========
const heroSection = document.querySelector(".hero");
if (heroSection) {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallax = heroSection.querySelector(".hero-content");
    if (parallax) {
      // Move content at a different speed than scroll (0.3x)
      // Explanation: Creates a depth effect
      parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });
}

console.log("Portfolio loaded successfully!");
