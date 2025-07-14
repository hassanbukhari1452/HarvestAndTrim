// Reviews Page JavaScript - Review Funnel System
document.addEventListener('DOMContentLoaded', function() {
    initializeReviewSystem();
});

let selectedRating = 0;
let selectedService = '';

function initializeReviewSystem() {
    const stars = document.querySelectorAll('.star');
    const submitButton = document.getElementById('submit-rating');
    const serviceOptions = document.querySelectorAll('input[name="service"]');
    
    // Initialize star rating system
    initStarRating(stars);
    
    // Initialize service selection
    initServiceSelection(serviceOptions);
    
    // Initialize submit button
    initSubmitButton(submitButton);
    
    // Initialize navigation buttons
    initNavigationButtons();
    
    console.log('Review system initialized');
}

function initStarRating(stars) {
    stars.forEach((star, index) => {
        // Hover effects
        star.addEventListener('mouseenter', function() {
            highlightStars(index + 1);
            updateRatingText(index + 1);
        });
        
        // Click and touch events for iOS compatibility
        const handleStarSelect = function(e) {
            e.preventDefault();
            selectedRating = index + 1;
            selectStars(selectedRating);
            updateRatingText(selectedRating);
            checkFormCompletion();
            
            // Track rating selection
            if (typeof gtag !== 'undefined') {
                gtag('event', 'rating_selected', {
                    'event_category': 'review',
                    'event_label': `${selectedRating}_stars`
                });
            }
        };
        
        star.addEventListener('click', handleStarSelect);
        star.addEventListener('touchend', handleStarSelect);
    });
    
    // Reset on mouse leave
    const starsContainer = document.querySelector('.stars-container');
    starsContainer.addEventListener('mouseleave', function() {
        if (selectedRating > 0) {
            selectStars(selectedRating);
            updateRatingText(selectedRating);
        } else {
            resetStars();
            updateRatingText(0);
        }
    });
}

function initServiceSelection(serviceOptions) {
    serviceOptions.forEach(option => {
        option.addEventListener('change', function() {
            selectedService = this.value;
            checkFormCompletion();
            
            // Track service selection
            if (typeof gtag !== 'undefined') {
                gtag('event', 'service_selected', {
                    'event_category': 'review',
                    'event_label': selectedService
                });
            }
        });
    });
}

function initSubmitButton(submitButton) {
    // Handle both click and touchend for iOS compatibility
    const handleSubmit = function(e) {
        e.preventDefault();
        if (selectedRating > 0 && selectedService) {
            handleRatingSubmission();
        }
    };
    
    submitButton.addEventListener('click', handleSubmit);
    submitButton.addEventListener('touchend', handleSubmit);
}

function initNavigationButtons() {
    const backButton = document.getElementById('back-to-rating');
    const maybeLaterButton = document.getElementById('maybe-later');
    
    if (backButton) {
        backButton.addEventListener('click', function() {
            showSection('review-form-section');
            resetForm();
        });
    }
    
    if (maybeLaterButton) {
        maybeLaterButton.addEventListener('click', function() {
            // Track "maybe later" click
            if (typeof gtag !== 'undefined') {
                gtag('event', 'google_review_declined', {
                    'event_category': 'review',
                    'event_label': 'maybe_later'
                });
            }
            
            // Show thank you message and redirect to home
            showThankYouMessage();
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        });
    }
}

function highlightStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('hovered');
            star.classList.remove('selected');
        } else {
            star.classList.remove('hovered', 'selected');
        }
    });
}

function selectStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('selected');
            star.classList.remove('hovered');
        } else {
            star.classList.remove('selected', 'hovered');
        }
    });
}

function resetStars() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.classList.remove('selected', 'hovered');
    });
}

function updateRatingText(rating) {
    const ratingText = document.querySelector('.rating-text');
    const ratingLabels = [
        'Click a star to rate',
        'Poor - We need to improve',
        'Fair - Below expectations', 
        'Good - Met expectations',
        'Very Good - Above expectations',
        'Excellent - Exceeded expectations!'
    ];
    
    ratingText.textContent = ratingLabels[rating];
    
    // Update text color based on rating
    if (rating === 0) {
        ratingText.className = 'rating-text';
    } else if (rating <= 2) {
        ratingText.className = 'rating-text rating-poor';
    } else if (rating <= 3) {
        ratingText.className = 'rating-text rating-fair';
    } else if (rating === 4) {
        ratingText.className = 'rating-text rating-good';
    } else {
        ratingText.className = 'rating-text rating-excellent';
    }
}

function checkFormCompletion() {
    const submitButton = document.getElementById('submit-rating');
    if (selectedRating > 0 && selectedService) {
        submitButton.disabled = false;
        submitButton.classList.add('enabled');
    } else {
        submitButton.disabled = true;
        submitButton.classList.remove('enabled');
    }
}

function handleRatingSubmission() {
    // Show loading state
    const submitButton = document.getElementById('submit-rating');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Track submission
    if (typeof gtag !== 'undefined') {
        gtag('event', 'rating_submitted', {
            'event_category': 'review',
            'event_label': `${selectedRating}_stars_${selectedService}`
        });
    }
    
    // Simulate processing time
    setTimeout(() => {
        if (selectedRating === 5) {
            // 5-star review: Direct redirect to Google Business Profile
            redirect5StarToGoogle();
        } else {
            // 1-4 star review: Show improvement form
            showImprovementForm();
        }
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
}

function redirect5StarToGoogle() {
    // Track 5-star conversion
    if (typeof gtag !== 'undefined') {
        gtag('event', 'five_star_review', {
            'event_category': 'conversion',
            'event_label': selectedService
        });
        
        gtag('event', 'google_review_redirect', {
            'event_category': 'conversion',
            'event_label': 'automatic_redirect'
        });
    }
    
    // Show brief loading message
    const submitButton = document.getElementById('submit-rating');
    submitButton.textContent = 'Redirecting to Google...';
    
    // iOS Safari fix: Open immediately without timeout to avoid popup blocking
    const googleUrl = 'https://www.google.com/search?sca_esv=51537aeedf813448&sxsrf=AE3TifNrCcyYXbthzWXCLPTDsRcFWP8CEg:1752503057920&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E8l1H1gPXzpSCWF4wGx0_oSciDi9R34tupGRpwpBp3v2hfygQi6JpQj88gdr_UGb9flf6zsydZGcAFpttk4ioWG9UXLuWm6At_6506k86bSHysCocg%3D%3D&q=Harvest+%26+Trim+-+Tree+Service+Reviews&sa=X&ved=2ahUKEwiyxvDRxryOAxWIVaQEHWQoITsQ0bkNegQIHhAD&biw=1536&bih=695&dpr=1.25';
    
    // Try window.open first (works on most browsers)
    const newWindow = window.open(googleUrl, '_blank');
    
    // Fallback for Safari/iOS if popup was blocked
    if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
        // Show iOS-specific message and redirect
        submitButton.textContent = 'Opening Google Review...';
        showThankYouMessage();
        
        // Fallback: change current window location after brief message
        setTimeout(() => {
            window.location.href = googleUrl;
        }, 1500);
    } else {
        // Show thank you overlay and redirect to home after short delay
        setTimeout(() => {
            showThankYouMessage();
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }, 500);
    }
}

function show5StarThankYou() {
    showSection('thank-you-section');
    
    // Track 5-star conversion
    if (typeof gtag !== 'undefined') {
        gtag('event', 'five_star_review', {
            'event_category': 'conversion',
            'event_label': selectedService
        });
    }
    
    // Add animation to thank you section
    const thankYouCard = document.querySelector('.thank-you-card');
    thankYouCard.classList.add('animate-in');
    
    // Track Google review button clicks
    const googleReviewBtn = document.querySelector('.google-review-btn');
    googleReviewBtn.addEventListener('click', function() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'google_review_clicked', {
                'event_category': 'conversion',
                'event_label': 'five_star_redirect'
            });
        }
    });
}

function showImprovementForm() {
    showSection('improvement-section');
    
    // Show selected rating in improvement section
    displaySelectedRating();
    
    // Track improvement form view
    if (typeof gtag !== 'undefined') {
        gtag('event', 'improvement_form_shown', {
            'event_category': 'feedback',
            'event_label': `${selectedRating}_stars`
        });
    }
    
    // Add animation to improvement section
    const improvementCard = document.querySelector('.improvement-card');
    improvementCard.classList.add('animate-in');
}

function displaySelectedRating() {
    const selectedStarsContainer = document.querySelector('.selected-stars');
    selectedStarsContainer.innerHTML = '';
    
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('i');
        star.className = 'fas fa-star';
        
        if (i < selectedRating) {
            star.classList.add('selected');
        }
        
        selectedStarsContainer.appendChild(star);
    }
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.review-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        
        // Smooth scroll to top of section
        targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function resetForm() {
    selectedRating = 0;
    selectedService = '';
    
    // Reset stars
    resetStars();
    updateRatingText(0);
    
    // Reset service selection
    const serviceOptions = document.querySelectorAll('input[name="service"]');
    serviceOptions.forEach(option => {
        option.checked = false;
    });
    
    // Reset submit button
    checkFormCompletion();
}

function showThankYouMessage() {
    // Create a temporary thank you overlay
    const overlay = document.createElement('div');
    overlay.className = 'thank-you-overlay';
    overlay.innerHTML = `
        <div class="thank-you-popup">
            <i class="fas fa-check-circle"></i>
            <h3>Thank you for your feedback!</h3>
            <p>Redirecting to homepage...</p>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Remove overlay after redirect
    setTimeout(() => {
        if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
        }
    }, 3500);
}

// Utility function to get URL parameters (if needed for tracking)
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Initialize any URL-based tracking
document.addEventListener('DOMContentLoaded', function() {
    const source = getUrlParameter('source');
    if (source && typeof gtag !== 'undefined') {
        gtag('event', 'review_page_visit', {
            'event_category': 'engagement',
            'event_label': source
        });
    }
});
