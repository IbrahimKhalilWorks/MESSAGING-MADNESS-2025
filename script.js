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

document.addEventListener("DOMContentLoaded", function () {
  // Scenario tabs functionality
  const tabs = document.querySelectorAll(".me-scenario-tab");
  const indicator = document.querySelector(".me-tab-indicator");
  const emailTrack = document.querySelector(".me-email-track");
  const emails = document.querySelectorAll(".me-email-content");
  const dots = document.querySelectorAll(".me-dot");
  let currentIndex = 0;

  // Scenario data - each scenario has different content
  const scenarios = [
    {
      role: "BUSINESS STRATEGY CONSULTANT",
      details: {
        youAre: "The person from your original scenario",
        targetCompanies: "Your scenario's target companies",
        targetRecipient: "Your scenario's target recipient",
        offering: "The same as your original email",
        purpose: "A follow-up to your first message",
      },
    },
    {
      role: "MARKETING SPECIALIST",
      details: {
        youAre: "A marketing specialist at a SaaS company",
        targetCompanies: "E-commerce businesses with 50+ employees",
        targetRecipient: "Head of Digital Marketing",
        offering: "A platform to optimize conversion rates",
        purpose: "To schedule a demo of your new features",
      },
    },
    {
      role: "SALES REPRESENTATIVE",
      details: {
        youAre: "A sales rep for a cybersecurity firm",
        targetCompanies: "Financial institutions with compliance needs",
        targetRecipient: "Chief Information Security Officer",
        offering: "Security assessment and solutions",
        purpose: "To follow up after a security breach in the industry",
      },
    },
    {
      role: "ACCOUNT EXECUTIVE",
      details: {
        youAre: "An account executive at a consulting firm",
        targetCompanies: "Manufacturing businesses in transition",
        targetRecipient: "Operations Director",
        offering: "Process optimization services",
        purpose: "To check in after sending a proposal",
      },
    },
    {
      role: "CUSTOMER SUCCESS MANAGER",
      details: {
        youAre: "A customer success manager",
        targetCompanies: "Current clients using basic plan",
        targetRecipient: "Product Manager",
        offering: "Premium features and support",
        purpose: "To upsell after positive usage metrics",
      },
    },
    {
      role: "BUSINESS DEVELOPMENT REP",
      details: {
        youAre: "A business development representative",
        targetCompanies: "Healthcare providers needing compliance",
        targetRecipient: "Compliance Officer",
        offering: "HIPAA-compliant software solution",
        purpose: "To reconnect after regulatory changes",
      },
    },
    {
      role: "PARTNERSHIP MANAGER",
      details: {
        youAre: "A partnership manager at a tech platform",
        targetCompanies: "Complementary service providers",
        targetRecipient: "Head of Business Development",
        offering: "Integration and co-marketing opportunity",
        purpose: "To explore potential partnership",
      },
    },
    {
      role: "RECRUITMENT SPECIALIST",
      details: {
        youAre: "A recruitment specialist",
        targetCompanies: "Fast-growing startups",
        targetRecipient: "Head of Talent",
        offering: "Specialized recruitment services",
        purpose: "To follow up after industry hiring announcement",
      },
    },
  ];

  // Follow-up data - different content for each follow-up button
  const followUps = [
    {
      subject: "Solution For [Challenge]",
      content: [
        "Hi James milsom,",
        "In working with other startups and businesses in tech, one of the key issues they're struggling with is creating seamless user experiences that drive engagement and conversions.",
        "This past year, we helped numerous companies improve their digital presence and optimize UI/UX resulting in higher user retention, increased revenue, and improved customer satisfaction.",
        "If this is something you're challenged with too, let's set up a quick call. I have some ideas that might help.",
        "All the best,<br>Tony Wilson",
      ],
    },
    {
      subject: "Quick Follow-up: Our Previous Conversation",
      content: [
        "Hi James,",
        "I hope this email finds you well. I wanted to follow up on our previous conversation about the user experience challenges your team has been facing.",
        "Have you had a chance to discuss with your team the solutions we talked about? I'd be happy to provide more specific examples of how our approach has worked for similar companies in your industry.",
        "Would you be available for a brief call next week to discuss next steps?",
        "Best regards,<br>Tony Wilson",
      ],
    },
  ];

  function updateIndicator(activeTab) {
    indicator.style.width = `${activeTab.offsetWidth}px`;
    indicator.style.transform = `translateX(${activeTab.offsetLeft}px)`;
  }

  function updateScenario(index) {
    // Update role title
    document.querySelector(".me-role").textContent = scenarios[index].role;

    // Update details
    const details = document.querySelectorAll(".me-detail-item p");
    const scenarioDetails = scenarios[index].details;

    details[0].textContent = scenarioDetails.youAre;
    details[1].textContent = scenarioDetails.targetCompanies;
    details[2].textContent = scenarioDetails.targetRecipient;
    details[3].textContent = scenarioDetails.offering;
    details[4].textContent = scenarioDetails.purpose;
  }

  function updateEmailContent(followUpIndex) {
    // Update all email contents with the selected follow-up
    emails.forEach((email) => {
      const subject = email.querySelector(".me-email-subject span");
      const body = email.querySelector(".me-email-body");

      subject.textContent = "Subject: " + followUps[followUpIndex].subject;

      // Clear existing content
      body.innerHTML = "";

      // Add new content
      followUps[followUpIndex].content.forEach((paragraph) => {
        const p = document.createElement("p");
        p.innerHTML = paragraph;
        body.appendChild(p);
      });
    });
  }

  // Email carousel functionality - UPDATED FOR PEEK EFFECT
  function updateCarousel(index) {
    // Calculate the translation
    const emailWidth = emails[0].offsetWidth;
    const gap = 30; // Match the gap from CSS
    const translateX = -(index * (emailWidth + gap));

    // Update active states
    emails.forEach((email, i) => {
      email.classList.remove("active");
      if (i === index) {
        email.classList.add("active");
      }
    });

    // Update dots
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");

    // Animate the track
    emailTrack.style.transform = `translateX(${translateX}px)`;

    currentIndex = index;
  }

  // Scenario tab click
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      updateIndicator(tab);
      updateScenario(index);
    });
  });

  // Navigation buttons
  document.querySelector(".me-nav-btn.prev").addEventListener("click", () => {
    const newIndex = (currentIndex - 1 + emails.length) % emails.length;
    updateCarousel(newIndex);
  });

  document.querySelector(".me-nav-btn.next").addEventListener("click", () => {
    const newIndex = (currentIndex + 1) % emails.length;
    updateCarousel(newIndex);
  });

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      updateCarousel(index);
    });
  });

  // Follow up buttons
  const followBtns = document.querySelectorAll(".me-follow-btn");
  followBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      followBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      updateEmailContent(index);
    });
  });

  const copyBtns = document.querySelectorAll(
    ".me-email-actions button:first-child"
  );
  copyBtns.forEach((copyBtn) => {
    copyBtn.addEventListener("click", () => {
      // Find the email container
      const emailContent = copyBtn.closest(".me-email-content");

      // Get the subject
      const subject = emailContent
        .querySelector(".me-email-subject span")
        .textContent.replace("Subject: ", "");

      // Get all paragraphs from the email body
      const bodyParagraphs = emailContent.querySelectorAll(".me-email-body p");
      let bodyText = "";

      // Combine paragraphs with proper line breaks
      bodyParagraphs.forEach((p) => {
        bodyText += p.innerText + "\n\n";
      });

      // Format the complete email
      const completeEmail = `Subject: ${subject}\n\n${bodyText.trim()}`;

      // Copy to clipboard
      navigator.clipboard.writeText(completeEmail).then(() => {
        copyBtn.style.color = "#ff5722";
        setTimeout(() => {
          copyBtn.style.color = "";
        }, 1000);
      });
    });
  });

  // Initialize
  const activeTab = document.querySelector(".me-scenario-tab.active");
  if (activeTab) {
    updateIndicator(activeTab);
    updateScenario(0);
  }
  updateCarousel(0);

  // Handle window resize
  window.addEventListener("resize", () => {
    const activeTab = document.querySelector(".me-scenario-tab.active");
    if (activeTab) updateIndicator(activeTab);
    updateCarousel(currentIndex); // Recalculate carousel positions on resize
  });
});
