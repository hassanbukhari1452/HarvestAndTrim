# Harvest & Trim Tree Service Website

## Overview

This is a static website for Harvest & Trim Tree Service, a tree care company based in Albuquerque, NM. The website is built as a simple, conversion-focused marketing site with three main pages: homepage, services, and contact. It uses a dark theme design with green accent colors and focuses on local SEO optimization for the Albuquerque market.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Technology Stack**: Plain HTML5, CSS3, and vanilla JavaScript
- **Architecture Pattern**: Static multi-page application (MPA)
- **No Framework**: Built without any frontend frameworks for simplicity and fast loading
- **File Structure**: All files in root directory for easy GitHub deployment (flat structure)

### Design System
- **Dark Theme**: Primary background (#1A1A1A), secondary (#2E2E2E), accents (#2E4F4F)
- **Brand Colors**: Green CTAs (#4CAF50) for conversion optimization
- **Typography**: Roboto font family for clean, professional appearance
- **Responsive Design**: Mobile-first approach with breakpoints at 768px (tablet) and 1024px (desktop)

## Key Components

### Navigation System
- Fixed header with logo and navigation menu
- Hamburger menu for mobile devices
- Active state indicators for current page
- Prominent "Get a Free Quote" CTA button

### Page Structure
1. **Homepage (index.html)**
   - Hero section with compelling headline
   - Booking section for lead generation
   - Service highlights and features
   - Contact information and CTAs

2. **Services Page (services.html)**
   - Detailed service descriptions
   - Professional service categorization
   - Pricing and consultation information

3. **Contact Page (contact.html)**
   - Contact forms for quote requests
   - Business information and hours
   - Service area coverage details

4. **Reviews Page (reviews.html)**
   - Interactive star rating system (1-5 stars)
   - Service selection tracking
   - Smart review funnel: 5 stars → direct Google Business Profile redirect
   - 1-4 stars → Google Form for improvement feedback
   - Customer testimonials showcase

### Interactive Features
- Form validation for lead capture
- Smooth scrolling navigation
- FAQ accordion functionality
- Lazy loading for images
- Mobile-responsive hamburger menu

## Data Flow

### Lead Generation Flow
1. User visits website through SEO or direct traffic
2. User navigates to booking section or contact page
3. User fills out contact form with service details
4. Form validation ensures data quality
5. Form submission captures lead information
6. Business receives lead notification for follow-up

### User Experience Flow
- Landing → Service Discovery → Quote Request → Contact
- Multiple conversion touchpoints throughout the site
- Clear call-to-action buttons on every page

## External Dependencies

### Third-Party Services
- **Google Fonts**: Roboto font family from Google Fonts CDN
- **Font Awesome**: Icon library (v6.0.0) for UI icons
- **Google Analytics**: Website tracking (placeholder implementation)

### CDN Resources
- Font Awesome CSS from cdnjs.cloudflare.com
- Google Fonts API for typography
- Google Tag Manager for analytics tracking

### SEO Integration
- Meta tags optimized for local search
- Keywords targeting Albuquerque tree service market
- Open Graph tags for social media sharing
- Structured markup for local business

## Deployment Strategy

### Static Hosting
- **Deployment Type**: Static file hosting (suitable for services like Netlify, Vercel, or GitHub Pages)
- **Build Process**: No build step required - direct file deployment
- **Performance Optimization**: 
  - Image compression (target <500KB per image)
  - CSS/JS minification for production
  - CDN utilization for external resources

### Local Development
- Simple file server for local testing
- No compilation or bundling required
- Direct browser refresh for development

### SEO Considerations
- Clean URL structure
- Mobile-friendly responsive design
- Fast loading times for better search rankings
- Local business schema markup (to be implemented)

### Analytics and Tracking
- Google Analytics placeholder ready for tracking ID
- Conversion tracking for quote form submissions
- Local business performance metrics

## Notes for Development

- The website uses a conversion-focused design with multiple CTAs
- All forms require JavaScript validation before submission
- Images are currently placeholders - real client images will need optimization
- Google Analytics tracking ID needs to be updated with actual client ID
- The site is optimized for local Albuquerque market SEO
