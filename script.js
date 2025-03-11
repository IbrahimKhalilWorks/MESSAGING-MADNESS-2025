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

document.addEventListener("DOMContentLoaded", function() {
  // Scenario tabs functionality
  const tabs = document.querySelectorAll(".me-scenario-tab");
  const indicator = document.querySelector(".me-tab-indicator");

  function updateIndicator(activeTab) {
    if (!indicator) return;
    indicator.style.width = `${activeTab.offsetWidth}px`;
    indicator.style.transform = `translateX(${activeTab.offsetLeft}px)`;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      updateIndicator(tab);
    });
  });

  // Initialize indicator
  const activeTab = document.querySelector(".me-scenario-tab.active");
  if (activeTab && indicator) {
    updateIndicator(activeTab);
  }

  // Email navigation
  const prevBtn = document.querySelector(".me-nav-btn.prev");
  const nextBtn = document.querySelector(".me-nav-btn.next");
  const dots = document.querySelectorAll(".me-dot");
  const emails = document.querySelectorAll(".me-email-content");
  let currentEmailIndex = 0;

  function showEmail(index) {
    // Hide all emails
    emails.forEach(email => {
      email.style.display = "none";
    });
    
    // Show the selected email
    emails[index].style.display = "block";
    
    // Update dots
    dots.forEach(dot => {
      dot.classList.remove("active");
    });
    dots[index].classList.add("active");
    
    // Update current index
    currentEmailIndex = index;
  }

  // Next button click
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      let nextIndex = currentEmailIndex + 1;
      if (nextIndex >= emails.length) {
        nextIndex = 0;
      }
      showEmail(nextIndex);
    });
  }

  // Previous button click
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      let prevIndex = currentEmailIndex - 1;
      if (prevIndex < 0) {
        prevIndex = emails.length - 1;
      }
      showEmail(prevIndex);
    });
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showEmail(index);
    });
  });

  // Follow up buttons
  const followBtns = document.querySelectorAll(".me-follow-btn");
  followBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      followBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // Copy to clipboard functionality
  const copyBtns = document.querySelectorAll(".me-email-actions button:first-child");
  copyBtns.forEach((copyBtn) => {
    copyBtn.addEventListener("click", () => {
      const subject = copyBtn.closest(".me-email-subject").querySelector("span").textContent;
      navigator.clipboard.writeText(subject.replace("Subject: ", "")).then(() => {
        copyBtn.style.color = "#ff5722";
        setTimeout(() => {
          copyBtn.style.color = "";
        }, 1000);
      });
    });
  });

  // Initialize on load with a slight delay to ensure DOM is fully loaded
  setTimeout(() => {
    if (activeTab && indicator) {
      updateIndicator(activeTab);
    }
    // Show the first email by default
    showEmail(0);
  }, 100);
});
 
window.addEventListener('resize', function() {
  const activeTab = document.querySelector('.me-scenario-tab.active');
  const indicator = document.querySelector(".me-tab-indicator");
  
  if (activeTab && indicator) {
    indicator.style.width = `${activeTab.offsetWidth}px`;
    indicator.style.transform = `translateX(${activeTab.offsetLeft}px)`;
  }
});
