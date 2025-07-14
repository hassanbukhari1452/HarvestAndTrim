// Main JavaScript for Harvest & Trim Website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initHamburgerMenu();
    initSmoothScrolling();
    initFormValidation();
    initFAQAccordion();
    initLazyLoading();
    
    console.log('Harvest & Trim website initialized successfully');
});

// Hamburger Menu Toggle
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Validation
function initFormValidation() {
    // Booking Form Validation
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateBookingForm()) {
                submitBookingForm();
            }
        });
    }
    
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateContactForm()) {
                submitContactForm();
            }
        });
    }
}

// Validate Booking Form
function validateBookingForm() {
    let isValid = true;
    
    // Clear previous errors
    clearErrors();
    
    // Validate Name
    const name = document.getElementById('name');
    if (!name.value.trim()) {
        showError('nameError', 'Name is required');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError('nameError', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate Phone
    const phone = document.getElementById('phone');
    const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
    if (!phone.value.trim()) {
        showError('phoneError', 'Phone number is required');
        isValid = false;
    } else if (!phoneRegex.test(phone.value.replace(/\s/g, ''))) {
        showError('phoneError', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Validate Service
    const service = document.getElementById('service');
    if (!service.value) {
        showError('serviceError', 'Please select a service');
        isValid = false;
    }
    
    return isValid;
}

// Validate Contact Form
function validateContactForm() {
    let isValid = true;
    
    // Clear previous errors
    clearErrors();
    
    // Validate Name
    const name = document.getElementById('contact-name');
    if (!name.value.trim()) {
        showError('contactNameError', 'Name is required');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError('contactNameError', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate Phone
    const phone = document.getElementById('contact-phone');
    const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
    if (!phone.value.trim()) {
        showError('contactPhoneError', 'Phone number is required');
        isValid = false;
    } else if (!phoneRegex.test(phone.value.replace(/\s/g, ''))) {
        showError('contactPhoneError', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Validate Email (if provided)
    const email = document.getElementById('contact-email');
    if (email.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            showError('contactEmailError', 'Please enter a valid email address');
            isValid = false;
        }
    }
    
    // Validate Service
    const service = document.getElementById('contact-service');
    if (!service.value) {
        showError('contactServiceError', 'Please select a service');
        isValid = false;
    }
    
    return isValid;
}

// Show Error Message
function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Clear All Error Messages
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

// Submit Booking Form
function submitBookingForm() {
    const form = document.getElementById('bookingForm');
    const formData = new FormData(form);
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual backend integration)
    setTimeout(() => {
        console.log('Booking form submitted:', Object.fromEntries(formData));
        
        // Show success message
        showSuccessMessage('Thank you for your booking request! We\'ll contact you within 24 hours to confirm your appointment.');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Track conversion for analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'UA-XXXXX-X/XXXXXXX',
                'value': 1.0,
                'currency': 'USD'
            });
        }
    }, 1500);
}

// Submit Contact Form
function submitContactForm() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual backend integration)
    setTimeout(() => {
        console.log('Contact form submitted:', Object.fromEntries(formData));
        
        // Hide form and show success message
        form.style.display = 'none';
        const successElement = document.getElementById('form-success');
        if (successElement) {
            successElement.style.display = 'block';
            successElement.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Track conversion for analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'UA-XXXXX-X/XXXXXXX',
                'value': 1.0,
                'currency': 'USD'
            });
        }
    }, 1500);
}

// Show Success Message (for booking form)
function showSuccessMessage(message) {
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message fade-in';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <h3>Success!</h3>
        <p>${message}</p>
    `;
    
    // Insert after the form
    const form = document.getElementById('bookingForm');
    form.parentNode.insertBefore(successDiv, form.nextSibling);
    
    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth' });
    
    // Remove success message after 10 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 10000);
}

// FAQ Accordion Functionality
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = this.querySelector('i');
            
            // Close other open FAQ items
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    const otherItem = otherQuestion.parentElement;
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherQuestion.querySelector('i');
                    
                    otherQuestion.classList.remove('active');
                    otherAnswer.classList.remove('active');
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current FAQ item
            this.classList.toggle('active');
            answer.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Scroll to Top Functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Phone Number Formatting
function formatPhoneNumber(input) {
    // Remove all non-numeric characters
    let phoneNumber = input.value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length >= 6) {
        phoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    } else if (phoneNumber.length >= 3) {
        phoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    
    input.value = phoneNumber;
}

// Add phone formatting to phone inputs
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    });
});

// Handle Active Navigation State
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === '#home')) {
            link.classList.add('active');
        }
    });
}

// Initialize active navigation on page load
document.addEventListener('DOMContentLoaded', setActiveNavigation);

// Scroll Animation
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .testimonial-card, .badge');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => observer.observe(element));
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Emergency Call Tracking
function trackEmergencyCall() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'emergency_call', {
            'event_category': 'engagement',
            'event_label': 'emergency_phone_click'
        });
    }
    console.log('Emergency call tracked');
}

// Add emergency call tracking to emergency phone links
document.addEventListener('DOMContentLoaded', function() {
    const emergencyLinks = document.querySelectorAll('a[href="tel:+15053823822"]');
    emergencyLinks.forEach(link => {
        if (link.classList.contains('btn-emergency') || link.closest('.emergency-cta')) {
            link.addEventListener('click', trackEmergencyCall);
        }
    });
});

// Form Analytics Tracking
function trackFormStart(formType) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_start', {
            'event_category': 'engagement',
            'event_label': formType
        });
    }
}

function trackFormComplete(formType) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_complete', {
            'event_category': 'conversion',
            'event_label': formType
        });
    }
}

// Add form tracking
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const contactForm = document.getElementById('contactForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('focus', () => trackFormStart('booking'), { once: true });
    }
    
    if (contactForm) {
        contactForm.addEventListener('focus', () => trackFormStart('contact'), { once: true });
    }
});

// Service Link Tracking
function trackServiceClick(serviceName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'service_click', {
            'event_category': 'engagement',
            'event_label': serviceName
        });
    }
}

// Add service tracking
document.addEventListener('DOMContentLoaded', function() {
    const serviceLinks = document.querySelectorAll('.service-link');
    serviceLinks.forEach(link => {
        link.addEventListener('click', function() {
            const serviceName = this.closest('.service-card').querySelector('h3').textContent;
            trackServiceClick(serviceName);
        });
    });
});
