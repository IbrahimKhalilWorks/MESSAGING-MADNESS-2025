// Set the countdown date (21 days, 15 hours, 19 minutes, 52 seconds from now)
const countdownDate = new Date();
countdownDate.setDate(countdownDate.getDate() + 21);
countdownDate.setHours(countdownDate.getHours() + 15);
countdownDate.setMinutes(countdownDate.getMinutes() + 19);
countdownDate.setSeconds(countdownDate.getSeconds() + 52);

// Update the countdown every second
const countdown = setInterval(function () {
  // Get current date and time
  const now = new Date().getTime();

  // Find the distance between now and the countdown date
  const distance = countdownDate - now;

  // Time calculations for days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result with leading zeros if needed
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent =
    hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").textContent =
    minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("seconds").textContent =
    seconds < 10 ? "0" + seconds : seconds;

  // If the countdown is finished, display a message
  if (distance < 0) {
    clearInterval(countdown);
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
  }
}, 1000);

document.addEventListener("DOMContentLoaded", function () {
  // Get the bracket scroll container
  const scrollContainer = document.querySelector(".bracket-scroll-container");

  if (scrollContainer) {
    // Add visual indicator for scrolling on mobile
    if (window.innerWidth <= 768) {
      // Create and add scroll indicator
      const scrollIndicator = document.createElement("div");
      scrollIndicator.className = "scroll-indicator";
      scrollIndicator.innerHTML = "<span>Scroll to view full bracket →</span>";
      scrollContainer.parentNode.insertBefore(scrollIndicator, scrollContainer);

      // Add some animation to draw attention
      setTimeout(() => {
        scrollIndicator.classList.add("fade-out");
        setTimeout(() => {
          scrollIndicator.remove();
        }, 3000);
      }, 2000);
    }

    // Optional: Add smooth scrolling for touch devices
    let isDown = false;
    let startX;
    let scrollLeft;

    scrollContainer.addEventListener("mousedown", (e) => {
      isDown = true;
      scrollContainer.classList.add("active");
      startX = e.pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
    });

    scrollContainer.addEventListener("mouseleave", () => {
      isDown = false;
      scrollContainer.classList.remove("active");
    });

    scrollContainer.addEventListener("mouseup", () => {
      isDown = false;
      scrollContainer.classList.remove("active");
    });

    scrollContainer.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed
      scrollContainer.scrollLeft = scrollLeft - walk;
    });
  }

  // Add resize handler to adjust for different screen sizes
  window.addEventListener("resize", function () {
    // You can add specific adjustments here if needed
    console.log("Window resized, bracket view adjusted");
  });
});
document.addEventListener("DOMContentLoaded", () => {
  // Carousel functionality
  const track = document.querySelector(".scenarios-track");
  const cards = document.querySelectorAll(".scenario-card");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentIndex = 0;
  const cardWidth = cards[0].offsetWidth + 40; // Card width + margin
  const totalCards = cards.length;

  // Set initial position
  updateCarousel();

  // Update carousel position and dots
  function updateCarousel() {
    // Update track position
    track.style.transform = `translateX(${-currentIndex * cardWidth}px)`;

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  // Next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalCards;
    updateCarousel();
  }

  // Previous slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateCarousel();
  }

  // Event listeners
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
    });
  });

  // Auto-advance slides (optional)
  let slideInterval = setInterval(nextSlide, 5000);

  // Pause auto-advance on hover
  track.addEventListener("mouseenter", () => {
    clearInterval(slideInterval);
  });

  track.addEventListener("mouseleave", () => {
    slideInterval = setInterval(nextSlide, 5000);
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    // Recalculate card width on resize
    const newCardWidth = cards[0].offsetWidth + 40;

    // Update carousel position with new dimensions
    track.style.transform = `translateX(${-currentIndex * newCardWidth}px)`;
  });

  // Add hover effect to option buttons
  const optionBtns = document.querySelectorAll(".option-btn");
  optionBtns.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "translateY(-2px)";
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translateY(0)";
    });
  });

  // Touch swipe functionality for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  track.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    // Detect swipe direction
    if (touchEndX < touchStartX - 50) {
      nextSlide(); // Swipe left, go to next
    } else if (touchEndX > touchStartX + 50) {
      prevSlide(); // Swipe right, go to previous
    }
  }
});
