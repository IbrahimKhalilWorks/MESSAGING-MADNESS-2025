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
      emails: [
        {
          from: "James Wilson (james@strategyconsult.com)",
          subject: "Strategic Growth Opportunities",
          content: [
            "Hi [Recipient],",
            "I've been analyzing the market trends in your industry and noticed several opportunities for strategic growth that align with your company's strengths.",
            "My team recently helped a similar organization increase their market share by 27% through targeted strategic initiatives and operational improvements.",
            "Would you be open to a brief conversation to discuss how these approaches might benefit your business?",
            "Best regards,<br>James Wilson<br>Senior Strategy Consultant",
          ],
        },
        {
          from: "Sarah Parker (sarah@strategyconsult.com)",
          subject: "Operational Efficiency Analysis",
          content: [
            "Hello [Recipient],",
            "After reviewing your company's public information, I've identified several areas where operational efficiencies could potentially reduce costs by 15-20%.",
            "We've implemented similar strategies with clients in your industry, resulting in significant improvements to their bottom line while maintaining service quality.",
            "I'd be happy to share some specific insights in a quick call next week. Would Tuesday or Thursday work for you?",
            "Regards,<br>Sarah Parker<br>Operations Strategy Consultant",
          ],
        },
        {
          from: "Michael Thompson (michael@strategyconsult.com)",
          subject: "Digital Transformation Strategy",
          content: [
            "Dear [Recipient],",
            "I noticed your recent announcement about expanding your digital initiatives. Having led similar transformations for companies in your sector, I wanted to reach out.",
            "Our approach focuses on practical, ROI-driven digital strategies that can be implemented in phases to minimize disruption while maximizing impact.",
            "Would you be interested in discussing how we might support your digital transformation goals?",
            "Sincerely,<br>Michael Thompson<br>Digital Strategy Consultant",
          ],
        },
        {
          from: "Emma Davis (emma@strategyconsult.com)",
          subject: "Market Expansion Opportunity",
          content: [
            "Hi [Recipient],",
            "I've been researching emerging markets that align with your company's strengths and identified three high-potential regions for expansion.",
            "My team specializes in developing market entry strategies that minimize risk while accelerating growth. We recently helped a client achieve 40% year-over-year growth in a new market segment.",
            "I'd love to share our approach and discuss if it might be valuable for your expansion plans. Are you available for a brief call next week?",
            "Best,<br>Emma Davis<br>Market Strategy Consultant",
          ],
        },
      ],
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
      emails: [
        {
          from: "Alex Morgan (alex@conversionpro.com)",
          subject: "Boost Your E-commerce Conversion Rates",
          content: [
            "Hi [Recipient],",
            "I noticed your company has been expanding its online presence, and I thought you might be interested in how our platform has helped similar e-commerce businesses increase conversion rates by an average of 32%.",
            "Our solution integrates seamlessly with your existing tech stack and provides actionable insights through real-time analytics and A/B testing capabilities.",
            "Would you be open to a 20-minute demo to see how it could work specifically for your business?",
            "Best regards,<br>Alex Morgan<br>Senior Marketing Specialist",
          ],
        },
        {
          from: "Jordan Lee (jordan@conversionpro.com)",
          subject: "Personalization Features for Your E-commerce Store",
          content: [
            "Hello [Recipient],",
            "I wanted to reach out about our new AI-powered personalization engine that's helping e-commerce businesses like yours increase average order value by 24%.",
            "The system analyzes customer behavior in real-time to deliver personalized product recommendations and dynamic content that resonates with each visitor.",
            "I'd love to show you a quick demo of how it works. Would you have 15 minutes this week for a virtual meeting?",
            "Cheers,<br>Jordan Lee<br>E-commerce Marketing Specialist",
          ],
        },
        {
          from: "Taylor Kim (taylor@conversionpro.com)",
          subject: "Cart Abandonment Solution for [Company]",
          content: [
            "Hi [Recipient],",
            "Cart abandonment is costing e-commerce businesses billions each year, and I noticed your company might benefit from our specialized recovery solution.",
            "Our platform has helped companies reduce cart abandonment rates by up to 45% through intelligent email sequences, retargeting, and on-site messaging.",
            "Would you be interested in seeing how it works? I can share a case study from a company similar to yours and arrange a brief demo.",
            "Regards,<br>Taylor Kim<br>Conversion Optimization Specialist",
          ],
        },
        {
          from: "Casey Rivera (casey@conversionpro.com)",
          subject: "Mobile Conversion Optimization for [Company]",
          content: [
            "Hello [Recipient],",
            "With mobile commerce growing rapidly, I wanted to introduce our mobile optimization suite that's specifically designed to improve conversion rates on smartphones and tablets.",
            "Our clients typically see a 35% increase in mobile conversions within the first 60 days of implementation, with minimal development resources required.",
            "I'd be happy to show you a quick demo of how it could work for your store. Would you have time for a brief call this week?",
            "Best,<br>Casey Rivera<br>Mobile Marketing Specialist",
          ],
        },
      ],
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
      emails: [
        {
          from: "Chris Morgan (chris@secureshield.com)",
          subject: "Regarding Recent Financial Sector Security Breaches",
          content: [
            "Dear [Recipient],",
            "In light of the recent security incidents affecting several financial institutions, I wanted to reach out to discuss how your organization can strengthen its security posture.",
            "Our team specializes in comprehensive security assessments and compliance solutions designed specifically for the financial sector, helping organizations like yours prevent similar breaches.",
            "Would you be available for a brief call to discuss how we might support your security initiatives?",
            "Best regards,<br>Chris Morgan<br>Senior Security Consultant",
          ],
        },
        {
          from: "Pat Johnson (pat@secureshield.com)",
          subject: "GDPR and PCI Compliance Solutions",
          content: [
            "Hello [Recipient],",
            "With regulatory requirements becoming increasingly stringent, I wanted to introduce our compliance automation platform that helps financial institutions streamline GDPR and PCI DSS compliance.",
            "Our solution has helped similar organizations reduce compliance-related workloads by 60% while improving their security posture and avoiding potential penalties.",
            "I'd be happy to arrange a demonstration focused on your specific compliance challenges. Would you have time for a brief discussion this week?",
            "Regards,<br>Pat Johnson<br>Compliance Solutions Specialist",
          ],
        },
        {
          from: "Morgan Lee (morgan@secureshield.com)",
          subject: "Threat Intelligence Briefing Invitation",
          content: [
            "Dear [Recipient],",
            "Our threat research team has compiled a detailed analysis of the recent attacks targeting financial institutions, including tactics used and recommended countermeasures.",
            "I'd like to invite you to a private briefing where we'll share this intelligence and discuss specific strategies to protect your organization from similar threats.",
            "Would you be interested in attending? I can arrange a session at your convenience.",
            "Sincerely,<br>Morgan Lee<br>Threat Intelligence Analyst",
          ],
        },
        {
          from: "Jamie Wilson (jamie@secureshield.com)",
          subject: "Zero-Day Vulnerability Protection",
          content: [
            "Hi [Recipient],",
            "In the wake of recent zero-day exploits targeting financial services infrastructure, I wanted to introduce our advanced threat protection platform.",
            "Our solution provides proactive defense against unknown threats through behavioral analysis and machine learning, offering protection even before official patches are available.",
            "I'd value the opportunity to discuss how this approach could strengthen your security strategy. Would you have time for a brief conversation?",
            "Best,<br>Jamie Wilson<br>Advanced Threat Protection Specialist",
          ],
        },
      ],
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
      emails: [
        {
          from: "Riley Johnson (riley@optimizegroup.com)",
          subject: "Following Up: Process Optimization Proposal",
          content: [
            "Hi [Recipient],",
            "I wanted to follow up on the proposal I sent last week regarding our process optimization services for your manufacturing operations.",
            "Have you had a chance to review it with your team? I'm happy to address any questions or provide additional information that might help with your decision-making process.",
            "Would you be available for a quick call this week to discuss next steps?",
            "Best regards,<br>Riley Johnson<br>Senior Account Executive",
          ],
        },
        {
          from: "Avery Martinez (avery@optimizegroup.com)",
          subject: "Additional Case Study: Manufacturing Optimization",
          content: [
            "Hello [Recipient],",
            "Following our previous conversation, I wanted to share an additional case study that closely aligns with your current challenges in transitioning to more automated processes.",
            "This client achieved a 28% reduction in production costs and a 35% increase in output capacity within the first six months of implementing our recommendations.",
            "I thought this might provide helpful context as you consider our proposal. Would you like to schedule a brief call to discuss how we achieved these results?",
            "Regards,<br>Avery Martinez<br>Manufacturing Solutions Executive",
          ],
        },
        {
          from: "Jordan Smith (jordan@optimizegroup.com)",
          subject: "Implementation Timeline Questions",
          content: [
            "Dear [Recipient],",
            "I hope this email finds you well. I wanted to check in regarding the implementation timeline outlined in our proposal and see if you have any concerns about the project schedule.",
            "We understand that minimizing disruption to your operations is critical, and I'd be happy to discuss how we can adjust our approach to better align with your production cycles.",
            "Would you have time for a quick conversation to address any timeline questions?",
            "Best,<br>Jordan Smith<br>Implementation Specialist",
          ],
        },
        {
          from: "Taylor Wilson (taylor@optimizegroup.com)",
          subject: "ROI Analysis for Your Consideration",
          content: [
            "Hi [Recipient],",
            "Based on the information you shared about your current operations, I've prepared a detailed ROI analysis for the process optimization project we proposed.",
            "The analysis shows an expected payback period of 7-9 months, with ongoing annual savings of approximately $450,000 based on your current production volume.",
            "I'd be happy to walk you through the calculations and assumptions. Would you be available for a brief review session this week?",
            "Regards,<br>Taylor Wilson<br>Financial Analysis Executive",
          ],
        },
      ],
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
      emails: [
        {
          from: "Sam Rivera (sam@productplus.com)",
          subject: "Your Success with Our Platform + Premium Features",
          content: [
            "Hi [Recipient],",
            "I've been monitoring your team's usage of our platform, and I'm thrilled to see you're consistently achieving great results! Your adoption rate is among the highest in our client base.",
            "Based on your current usage patterns, I believe you could benefit significantly from some of our premium features, particularly the advanced analytics dashboard and automated workflow tools.",
            "Would you be open to a quick call to discuss how these features could help you achieve even better results?",
            "Best regards,<br>Sam Rivera<br>Customer Success Manager",
          ],
        },
        {
          from: "Alex Morgan (alex@productplus.com)",
          subject: "Exclusive Premium Feature Preview",
          content: [
            "Hello [Recipient],",
            "As a valued customer, I'd like to offer you an exclusive preview of our new premium features before they're widely released next month.",
            "These include AI-powered insights, custom integration capabilities, and priority support that I believe would address several of the enhancement requests your team has submitted.",
            "Would you be interested in a personalized demo? I can show you specifically how these features would work with your existing setup.",
            "Cheers,<br>Alex Morgan<br>Senior Success Manager",
          ],
        },
        {
          from: "Jordan Lee (jordan@productplus.com)",
          subject: "Your ROI Potential with Premium Plan",
          content: [
            "Hi [Recipient],",
            "I've analyzed your current usage patterns and created a custom ROI projection for upgrading to our premium plan.",
            "Based on your specific use cases, we estimate you could increase productivity by 32% and reduce manual work by approximately 15 hours per week with the additional automation features.",
            "I'd be happy to share this analysis and discuss how we calculated these figures. Would you have time for a brief call this week?",
            "Best,<br>Jordan Lee<br>ROI Specialist",
          ],
        },
        {
          from: "Casey Kim (casey@productplus.com)",
          subject: "Premium Support Package Information",
          content: [
            "Hello [Recipient],",
            "I noticed your team has been submitting more advanced support requests recently, and I wanted to introduce our premium support package that might better serve your needs.",
            "The package includes dedicated support, 2-hour response times, and monthly strategy sessions with a technical account manager who would become deeply familiar with your specific implementation.",
            "Would you be interested in learning more about how this could help accelerate your team's progress?",
            "Regards,<br>Casey Kim<br>Technical Account Manager",
          ],
        },
      ],
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
      emails: [
        {
          from: "Morgan Chen (morgan@healthcompliance.com)",
          subject: "Recent HIPAA Regulatory Changes - Compliance Solution",
          content: [
            "Dear [Recipient],",
            "I'm reaching out regarding the recent updates to HIPAA regulations that will impact healthcare providers like yours beginning next quarter.",
            "Our compliance platform has already been updated to address these changes, helping organizations like yours maintain compliance without disrupting clinical workflows.",
            "Would you be interested in a brief overview of how our solution can help you adapt to these new requirements?",
            "Best regards,<br>Morgan Chen<br>Healthcare Compliance Specialist",
          ],
        },
        {
          from: "Jamie Rodriguez (jamie@healthcompliance.com)",
          subject: "Compliance Audit Preparation Tools",
          content: [
            "Hello [Recipient],",
            "With the increased focus on compliance audits in the healthcare sector, I wanted to reconnect about our audit preparation toolkit that helps organizations like yours prepare with confidence.",
            "Our system provides comprehensive audit trails, automated documentation, and pre-built reports that align with the latest regulatory requirements.",
            "Would you have time for a quick demonstration of how these tools could streamline your audit preparation process?",
            "Regards,<br>Jamie Rodriguez<br>Audit Solutions Specialist",
          ],
        },
        {
          from: "Taylor Smith (taylor@healthcompliance.com)",
          subject: "Patient Data Security Enhancement",
          content: [
            "Hi [Recipient],",
            "In light of the recent healthcare data breaches making headlines, I wanted to reach out about our enhanced security features designed specifically for patient data protection.",
            "Our solution includes advanced encryption, access controls, and real-time monitoring that exceed HIPAA requirements while remaining user-friendly for clinical staff.",
            "Would you be interested in discussing how these features could strengthen your data protection strategy?",
            "Best,<br>Taylor Smith<br>Healthcare Security Specialist",
          ],
        },
        {
          from: "Jordan Wilson (jordan@healthcompliance.com)",
          subject: "Compliance Training Program Updates",
          content: [
            "Dear [Recipient],",
            "I wanted to reconnect regarding our updated compliance training program that addresses the latest HIPAA requirements and best practices for healthcare staff.",
            "The program includes role-specific modules, automated tracking, and certification management to ensure your team stays current with minimal administrative burden.",
            "Would you be available for a brief conversation about how this could complement your existing compliance efforts?",
            "Sincerely,<br>Jordan Wilson<br>Training Solutions Manager",
          ],
        },
      ],
    },
  ];

  // Follow-up data - different content for each follow-up button
  const followUps = [
    {
      subject: "Solution For [Challenge]",
      content: [
        "Hi [Recipient],",
        "In working with other organizations in your industry, one of the key issues they're struggling with is creating seamless user experiences that drive engagement and conversions.",
        "This past year, we helped numerous companies improve their digital presence and optimize UI/UX resulting in higher user retention, increased revenue, and improved customer satisfaction.",
        "If this is something you're challenged with too, let's set up a quick call. I have some ideas that might help.",
        "All the best,<br>Tony Wilson",
      ],
    },
    {
      subject: "Quick Follow-up: Our Previous Conversation",
      content: [
        "Hi [Recipient],",
        "I hope this email finds you well. I wanted to follow up on our previous conversation about the challenges your team has been facing.",
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

    // Update emails for this scenario
    updateScenarioEmails(index);
  }

  function updateScenarioEmails(scenarioIndex) {
    // Get the emails for this scenario
    const scenarioEmails = scenarios[scenarioIndex].emails;

    // Update each email in the carousel
    emails.forEach((email, index) => {
      if (index < scenarioEmails.length) {
        const emailData = scenarioEmails[index];

        // Update from
        const fromElement = email.querySelector(".me-avatar-span span");
        if (fromElement) {
          fromElement.textContent = "From: " + emailData.from;
        }

        // Update subject
        const subjectElement = email.querySelector(".me-email-subject span");
        if (subjectElement) {
          subjectElement.textContent = "Subject: " + emailData.subject;
        }

        // Update body
        const bodyElement = email.querySelector(".me-email-body");
        if (bodyElement) {
          bodyElement.innerHTML = "";

          // Add content paragraphs
          emailData.content.forEach((paragraph) => {
            const p = document.createElement("p");
            p.innerHTML = paragraph;
            bodyElement.appendChild(p);
          });
        }
      }
    });
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

  // Copy to clipboard functionality
  const copyBtns = document.querySelectorAll(
    ".me-email-actions button:first-child"
  );
  copyBtns.forEach((copyBtn) => {
    copyBtn.addEventListener("click", () => {
      // Find the email container
      const emailContent = copyBtn.closest(".me-email-content");

      if (!emailContent) {
        console.error("Could not find email content container");
        return;
      }

      // Get the subject
      const subjectElement = emailContent.querySelector(
        ".me-email-subject span"
      );
      const subject = subjectElement
        ? subjectElement.textContent.replace("Subject: ", "")
        : "";

      // Get the sender
      const fromElement = emailContent.querySelector(".me-avatar-span span");
      const from = fromElement ? fromElement.textContent : "";

      // Get all paragraphs from the email body
      const bodyParagraphs = emailContent.querySelectorAll(".me-email-body p");
      let bodyText = "";

      // Combine paragraphs with proper line breaks
      bodyParagraphs.forEach((p) => {
        bodyText += p.innerText + "\n\n";
      });

      // Format the complete email
      const completeEmail = `${from}\n\nSubject: ${subject}\n\n${bodyText.trim()}`;

      // Copy to clipboard
      navigator.clipboard
        .writeText(completeEmail)
        .then(() => {
          // Add animation class
          copyBtn.classList.add("copying");

          // Remove animation class after animation completes
          setTimeout(() => {
            copyBtn.classList.remove("copying");
          }, 1000);
        })
        .catch((err) => {
          console.error("Failed to copy email:", err);
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
