// Enhanced Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")
const navLinks = document.querySelectorAll(".nav-link")

// Toggle mobile menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")

  // Prevent body scroll when menu is open
  if (navMenu.classList.contains("active")) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = "auto"
  }
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
    document.body.style.overflow = "auto"
  })
})

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
    document.body.style.overflow = "auto"
  }
})

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 80 // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Enhanced navbar background change on scroll
let lastScrollTop = 0
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  if (scrollTop > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
  }

  // Hide/show navbar on scroll (mobile)
  if (window.innerWidth <= 768) {
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.transform = "translateY(-100%)"
    } else {
      navbar.style.transform = "translateY(0)"
    }
  }

  lastScrollTop = scrollTop
})

// Enhanced intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all feature cards and gallery items
document.querySelectorAll(".feature-card, .gallery-item").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Enhanced contact form handling with better mobile UX
const contactForm = document.querySelector(".contact-form")
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  // Enhanced validation
  if (!name || name.trim().length < 2) {
    showMessage("Please enter a valid name", "error")
    return
  }

  if (!email || !isValidEmail(email)) {
    showMessage("Please enter a valid email address", "error")
    return
  }

  if (!message || message.trim().length < 10) {
    showMessage("Please enter a message with at least 10 characters", "error")
    return
  }

  // Simulate form submission
  const submitBtn = contactForm.querySelector(".btn-primary")
  const originalText = submitBtn.textContent

  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true

  setTimeout(() => {
    showMessage("Thank you for your message! We'll get back to you soon. 💖", "success")
    contactForm.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 2000)
})

// Helper functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function showMessage(message, type) {
  // Create message element
  const messageEl = document.createElement("div")
  messageEl.textContent = message
  messageEl.style.cssText = `
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem 2rem;
    border-radius: 10px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    max-width: 90%;
    text-align: center;
    background: ${type === "success" ? "linear-gradient(135deg, #4CAF50, #45a049)" : "linear-gradient(135deg, #f44336, #d32f2f)"};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: slideInDown 0.3s ease;
  `

  document.body.appendChild(messageEl)

  setTimeout(() => {
    messageEl.style.animation = "slideOutUp 0.3s ease"
    setTimeout(() => {
      document.body.removeChild(messageEl)
    }, 300)
  }, 4000)
}

// Add CSS animations for messages
const messageCSS = `
@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes slideOutUp {
  from {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
}
`

const messageStyle = document.createElement("style")
messageStyle.textContent = messageCSS
document.head.appendChild(messageStyle)

// Enhanced sparkle effect for mobile
function createSparkle(e) {
  const sparkle = document.createElement("div")
  sparkle.className = "sparkle"

  // Use touch coordinates if available
  const clientX = e.touches ? e.touches[0].clientX : e.clientX
  const clientY = e.touches ? e.touches[0].clientY : e.clientY

  sparkle.style.position = "absolute"
  sparkle.style.left = clientX + "px"
  sparkle.style.top = clientY + "px"
  sparkle.style.width = "10px"
  sparkle.style.height = "10px"
  sparkle.style.background = "#ff6b9d"
  sparkle.style.borderRadius = "50%"
  sparkle.style.pointerEvents = "none"
  sparkle.style.animation = "sparkleAnimation 1s ease-out forwards"
  sparkle.style.zIndex = "9999"

  document.body.appendChild(sparkle)

  setTimeout(() => {
    if (document.body.contains(sparkle)) {
      document.body.removeChild(sparkle)
    }
  }, 1000)
}

// Add sparkle animation CSS
const sparkleCSS = `
@keyframes sparkleAnimation {
    0% {
        transform: scale(0) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: scale(1) rotate(180deg);
        opacity: 0;
    }
}
`

const style = document.createElement("style")
style.textContent = sparkleCSS
document.head.appendChild(style)

// Add sparkle effect to primary buttons (both click and touch)
document.querySelectorAll(".btn-primary").forEach((btn) => {
  btn.addEventListener("click", createSparkle)
  btn.addEventListener("touchstart", createSparkle)
})

// Enhanced typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.textContent
    typeWriter(heroTitle, originalText, 80)
  }
})

// Enhanced floating animation for feature icons
document.querySelectorAll(".feature-icon").forEach((icon, index) => {
  icon.style.animationDelay = `${index * 0.2}s`
  icon.classList.add("floating-icon")
})

// Add CSS for floating icons
const floatingIconCSS = `
.floating-icon {
    animation: floatIcon 3s ease-in-out infinite;
}

@keyframes floatIcon {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
}

@media (max-width: 768px) {
    .floating-icon {
        animation: floatIcon 2s ease-in-out infinite;
    }
    
    @keyframes floatIcon {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-5px);
        }
    }
}
`

const floatingStyle = document.createElement("style")
floatingStyle.textContent = floatingIconCSS
document.head.appendChild(floatingStyle)

// Enhanced gallery item interactions
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    item.style.transform = "scale(0.95)"
    setTimeout(() => {
      item.style.transform = "scale(1)"
    }, 150)
  })

  // Add touch feedback
  item.addEventListener("touchstart", () => {
    item.style.transform = "scale(0.98)"
  })

  item.addEventListener("touchend", () => {
    item.style.transform = "scale(1)"
  })
})

// Enhanced parallax effect (disabled on mobile for performance)
if (window.innerWidth > 768) {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallax = document.querySelector(".hero")
    const speed = scrolled * 0.3

    if (parallax) {
      parallax.style.transform = `translateY(${speed}px)`
    }
  })
}

// Enhanced counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  function updateCounter() {
    start += increment
    if (start < target) {
      element.textContent = Math.floor(start) + "+"
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target + "+"
    }
  }

  updateCounter()
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll(".stat h4")
      statNumbers.forEach((stat) => {
        const target = Number.parseInt(stat.textContent.replace(/\D/g, ""))
        animateCounter(stat, target)
      })
      statsObserver.unobserve(entry.target)
    }
  })
})

const statsSection = document.querySelector(".stats")
if (statsSection) {
  statsObserver.observe(statsSection)
}

// Handle orientation change for mobile
window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    // Close mobile menu on orientation change
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
    document.body.style.overflow = "auto"

    // Recalculate viewport height
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`)
  }, 100)
})

// Set initial viewport height for mobile
const vh = window.innerHeight * 0.01
document.documentElement.style.setProperty("--vh", `${vh}px`)

// Performance optimization: Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
  document.documentElement.style.setProperty("--animation-duration", "0.1s")
}
