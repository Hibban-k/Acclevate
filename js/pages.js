/* ==========================================================================
   PAGES - HTML Templates for Each Page
   ========================================================================== */

const Pages = {

    /* ========================================================================
       HOME PAGE
       ======================================================================== */
    home: () => `
        <div class="page-content">
            <!-- Hero Section - Centered & Eye-catching -->
            <section class="hero hero-centered section">
                <div class="hero-bg-effects">
                    <div class="hero-gradient-orb orb-1"></div>
                    <div class="hero-gradient-orb orb-2"></div>
                    <div class="hero-gradient-orb orb-3"></div>
                    <div class="hero-grid-pattern"></div>
                </div>
                <div class="container">
                    <div class="hero-content hero-content-centered">
                        <span class="hero-badge hero-badge-animated">
                            <span class="badge-dot"></span>
                            <span>Trusted by Fortune 500 companies</span>
                        </span>
                        <h1 class="hero-title hero-title-large">
                            Transforming businesses
                            <span class="hero-title-gradient">for tomorrow</span>
                        </h1>
                        <p class="hero-subtitle">
                            We partner with visionary leaders to solve their most complex challenges 
                            and create lasting impact through strategic insight and operational excellence.
                        </p>
                        <div class="hero-actions hero-actions-centered">
                            <a href="/services" class="btn btn-accent btn-lg btn-glow" data-link>
                                <span>Explore Our Services</span>
                                <span class="btn-arrow">→</span>
                            </a>
                            <a href="/contact" class="btn btn-secondary btn-lg" data-link>Get in Touch</a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Section Divider -->
            <div class="section-divider">
                <div class="divider-line"></div>
            </div>

            <!-- Our Work & Why Us Grid Section -->
            <section class="section work-why-section">
                <div class="container">
                    <div class="work-why-grid">
                        <!-- Our Work -->
                        <div class="work-why-card our-work-card">
                            <div class="work-why-header">
                                <span class="badge badge-primary">Portfolio</span>
                                <h2>Our Work</h2>
                                <p>Delivering transformative results across industries and geographies.</p>
                            </div>
                            <div class="work-showcase">
                                <div class="work-item">
                                    <div class="work-item-icon">🏦</div>
                                    <div class="work-item-content">
                                        <h4>Global Bank Transformation</h4>
                                        <p>$2.3B cost savings through digital transformation</p>
                                    </div>
                                </div>
                                <div class="work-item">
                                    <div class="work-item-icon">🏭</div>
                                    <div class="work-item-content">
                                        <h4>Manufacturing Excellence</h4>
                                        <p>45% improvement in operational efficiency</p>
                                    </div>
                                </div>
                                <div class="work-item">
                                    <div class="work-item-icon">🛒</div>
                                    <div class="work-item-content">
                                        <h4>Retail Reinvention</h4>
                                        <p>3x increase in e-commerce revenue</p>
                                    </div>
                                </div>
                            </div>
                            <a href="/services" class="btn btn-secondary" data-link>
                                View All Case Studies →
                            </a>
                        </div>

                        <!-- Why Us -->
                        <div class="work-why-card why-us-card">
                            <div class="work-why-header">
                                <span class="badge badge-primary">Difference</span>
                                <h2>Why Us</h2>
                                <p>What sets us apart from traditional consulting firms.</p>
                            </div>
                            <div class="why-us-list">
                                <div class="why-us-item">
                                    <div class="why-us-number">01</div>
                                    <div class="why-us-content">
                                        <h4>Results-Driven Partnership</h4>
                                        <p>We're invested in your success, not just deliverables.</p>
                                    </div>
                                </div>
                                <div class="why-us-item">
                                    <div class="why-us-number">02</div>
                                    <div class="why-us-content">
                                        <h4>Deep Industry Expertise</h4>
                                        <p>Our consultants have lived your challenges firsthand.</p>
                                    </div>
                                </div>
                                <div class="why-us-item">
                                    <div class="why-us-number">03</div>
                                    <div class="why-us-content">
                                        <h4>Lasting Capability Building</h4>
                                        <p>We transfer knowledge, not just recommendations.</p>
                                    </div>
                                </div>
                                <div class="why-us-item">
                                    <div class="why-us-number">04</div>
                                    <div class="why-us-content">
                                        <h4>Global Reach, Local Touch</h4>
                                        <p>35+ countries with deep local market understanding.</p>
                                    </div>
                                </div>
                            </div>
                            <a href="/about" class="btn btn-secondary" data-link>
                                Learn More About Us →
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Services Carousel Section -->
            <section class="section">
                <div class="container">
                    <div class="features-header">
                        <span class="badge badge-primary">What We Do</span>
                        <h2>Strategic solutions for complex challenges</h2>
                        <p>Our integrated approach combines deep industry expertise with cutting-edge methodologies.</p>
                    </div>
                    <div class="carousel-container">
                        <button class="carousel-btn carousel-btn-prev" id="carousel-prev" aria-label="Previous">
                            <span>←</span>
                        </button>
                        <div class="carousel-viewport">
                            <div class="services-carousel" id="services-carousel">
                                <!-- Carousel items loaded dynamically -->
                            </div>
                        </div>
                        <button class="carousel-btn carousel-btn-next" id="carousel-next" aria-label="Next">
                            <span>→</span>
                        </button>
                    </div>
                    <div class="carousel-indicators" id="carousel-indicators">
                        <!-- Indicators loaded dynamically -->
                    </div>
                </div>
            </section>

            <!-- Features Section -->
            <section class="section" style="background: var(--bg-secondary);">
                <div class="container">
                    <div class="features-header">
                        <span class="badge badge-primary">Capabilities</span>
                        <h2>A different kind of consultancy</h2>
                        <p>We don't just advise—we partner with you to implement solutions that create measurable impact.</p>
                    </div>
                    <div class="features-grid">
                        <div class="card">
                            <div class="card-icon">🎯</div>
                            <h3 class="card-title">Results-Driven</h3>
                            <p class="card-description">Our success is measured by your outcomes. We set clear metrics and deliver on our promises.</p>
                        </div>
                        <div class="card">
                            <div class="card-icon">🤝</div>
                            <h3 class="card-title">True Partnership</h3>
                            <p class="card-description">We embed with your teams, transfer knowledge, and build lasting capabilities within your organization.</p>
                        </div>
                        <div class="card">
                            <div class="card-icon">💡</div>
                            <h3 class="card-title">Innovation Focus</h3>
                            <p class="card-description">We bring fresh perspectives and cutting-edge approaches to solve your most pressing challenges.</p>
                        </div>
                        <div class="card">
                            <div class="card-icon">🌍</div>
                            <h3 class="card-title">Global Reach</h3>
                            <p class="card-description">With experts across 35 countries, we combine global best practices with local market insights.</p>
                        </div>
                        <div class="card">
                            <div class="card-icon">📊</div>
                            <h3 class="card-title">Data-Informed</h3>
                            <p class="card-description">Every recommendation is backed by rigorous analysis and industry-leading research.</p>
                        </div>
                        <div class="card">
                            <div class="card-icon">⚡</div>
                            <h3 class="card-title">Agile Delivery</h3>
                            <p class="card-description">We move fast without sacrificing quality, adapting to your needs in real-time.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CTA Section -->
            <section class="section cta-section">
                <div class="container">
                    <div class="cta-content">
                        <h2>Ready to transform your business?</h2>
                        <p>Let's discuss how we can help you achieve your strategic objectives and drive sustainable growth.</p>
                        <a href="/contact" class="btn btn-accent btn-lg" data-link>Start a Conversation</a>
                    </div>
                </div>
            </section>
        </div>
    `,

    /* ========================================================================
       SERVICES PAGE
       ======================================================================== */
    services: () => `
        <div class="page-content">
            <!-- Page Hero -->
            <section class="page-hero">
                <div class="container">
                    <div class="page-hero-content">
                        <span class="badge badge-primary">Our Expertise</span>
                        <h1 class="page-hero-title">Services</h1>
                        <p class="page-hero-subtitle">
                            Comprehensive solutions designed to address your most complex business challenges 
                            and unlock new opportunities for growth.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Category Filter & Services Grid -->
            <section class="section">
                <div class="container">
                    <!-- Category Filter -->
                    <div class="category-filter" id="category-filter">
                        <!-- Categories loaded dynamically -->
                    </div>
                    
                    <!-- Services Grid -->
                    <div class="services-grid services-grid-4" id="services-page-grid">
                        <!-- Services loaded dynamically -->
                    </div>
                    
                    <!-- Load More Button -->
                    <div class="load-more-wrapper" id="load-more-wrapper" style="display: none;">
                        <button class="btn btn-secondary btn-lg" id="load-more-btn">Load More Services</button>
                    </div>
                </div>
            </section>

            <!-- CTA Section -->
            <section class="section cta-section">
                <div class="container">
                    <div class="cta-content">
                        <h2>Not sure which service is right for you?</h2>
                        <p>Our team can help assess your needs and recommend the best approach for your unique situation.</p>
                        <a href="/contact" class="btn btn-accent btn-lg" data-link>Schedule a Consultation</a>
                    </div>
                </div>
            </section>
        </div>
    `,

    /* ========================================================================
       SERVICE DETAIL PAGE (Dynamic)
       ======================================================================== */
    serviceDetail: (slug) => {
        const service = ServiceData.getServiceBySlug(slug);

        if (!service) {
            return Pages.notFound();
        }

        return `
            <div class="page-content">
                <!-- Service Hero -->
                <section class="service-page-hero">
                    <div class="container">
                        <a href="/services" class="btn btn-ghost" data-link style="margin-bottom: var(--spacing-6);">
                            ← Back to Services
                        </a>
                        <span class="badge badge-primary">${service.title}</span>
                        <h1 class="hero-title" style="max-width: 800px; margin-top: var(--spacing-4);">${service.tagline}</h1>
                        <p class="hero-subtitle">${service.description}</p>
                        <div class="hero-actions">
                            <a href="/contact" class="btn btn-accent btn-lg" data-link>Get Started</a>
                            <a href="/about" class="btn btn-secondary btn-lg" data-link>Learn About Us</a>
                        </div>
                    </div>
                </section>

                <!-- Service Intro -->
                <section class="section">
                    <div class="container">
                        <div class="service-intro">
                            <div class="service-intro-text">
                                <h2>How we can help</h2>
                                <p>Our ${service.title.toLowerCase()} practice brings together industry-leading expertise 
                                and proven methodologies to deliver transformative results. We work alongside your team 
                                to develop sustainable solutions that drive measurable business impact.</p>
                                <ul style="margin-top: var(--spacing-6); color: var(--text-secondary);">
                                    ${service.benefits.map(benefit => `
                                        <li style="padding: var(--spacing-2) 0; display: flex; gap: var(--spacing-3); align-items: flex-start;">
                                            <span style="color: var(--color-purple-600);">✓</span>
                                            ${benefit}
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                            <div class="service-visual">
                                <span style="font-size: 4rem;">📊</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Service Features -->
                <section class="section service-features">
                    <div class="container">
                        <div class="features-header">
                            <span class="badge badge-primary">Capabilities</span>
                            <h2>What we deliver</h2>
                        </div>
                        <div class="service-features-grid">
                            ${service.features.map(feature => `
                                <div class="card">
                                    <div class="card-icon">${feature.icon}</div>
                                    <h4 class="card-title">${feature.title}</h4>
                                    <p class="card-description">${feature.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>

                <!-- Other Services -->
                <section class="section">
                    <div class="container">
                        <div class="features-header">
                            <span class="badge badge-secondary">Related Services</span>
                            <h2>Explore more services</h2>
                        </div>
                        <div class="services-grid" id="related-services-grid" data-exclude="${service.id}">
                            <!-- Related services loaded dynamically -->
                        </div>
                    </div>
                </section>

                <!-- CTA Section -->
                <section class="section cta-section">
                    <div class="container">
                        <div class="cta-content">
                            <h2>Ready to get started?</h2>
                            <p>Connect with our ${service.title} experts to discuss your specific needs.</p>
                            <a href="/contact" class="btn btn-accent btn-lg" data-link>Contact Our Team</a>
                        </div>
                    </div>
                </section>
            </div>
        `;
    },

    /* ========================================================================
       ABOUT PAGE
       ======================================================================== */
    about: () => `
        <div class="page-content">
            <!-- Page Hero -->
            <section class="page-hero">
                <div class="container">
                    <div class="page-hero-content">
                        <span class="badge badge-primary">Our Story</span>
                        <h1 class="page-hero-title">About Elevate</h1>
                        <p class="page-hero-subtitle">
                            For over 25 years, we've been at the forefront of business transformation, 
                            helping organizations navigate complexity and achieve breakthrough results.
                        </p>
                    </div>
                </div>
            </section>

            <!-- About Intro -->
            <section class="section">
                <div class="container">
                    <div class="about-intro">
                        <div class="about-intro-text">
                            <h2>A legacy of impact</h2>
                            <p>
                                Founded in 1998, Elevate began with a simple belief: that the best consulting happens 
                                when you truly understand your client's business, culture, and aspirations.
                            </p>
                            <p>
                                Today, we've grown into a global team of over 500 professionals, serving clients 
                                across industries from technology to healthcare, financial services to manufacturing. 
                                But our founding principle remains unchanged.
                            </p>
                            <p>
                                We don't just deliver recommendations—we partner with you to implement solutions 
                                that create lasting value and build capabilities that endure.
                            </p>
                        </div>
                        <div class="about-image">
                            <span style="font-size: 4rem;">🏢</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Values Section -->
            <section class="section" style="background: var(--bg-secondary);">
                <div class="container">
                    <div class="features-header">
                        <span class="badge badge-primary">Our Values</span>
                        <h2>What guides us</h2>
                    </div>
                    <div class="values-grid">
                        <div class="value-card">
                            <div class="value-icon">🎯</div>
                            <h4>Excellence</h4>
                            <p class="card-description">We hold ourselves to the highest standards in everything we do.</p>
                        </div>
                        <div class="value-card">
                            <div class="value-icon">🤝</div>
                            <h4>Integrity</h4>
                            <p class="card-description">We build trust through transparency, honesty, and ethical conduct.</p>
                        </div>
                        <div class="value-card">
                            <div class="value-icon">💡</div>
                            <h4>Innovation</h4>
                            <p class="card-description">We embrace new ideas and continuously challenge the status quo.</p>
                        </div>
                        <div class="value-card">
                            <div class="value-icon">❤️</div>
                            <h4>People First</h4>
                            <p class="card-description">We invest in our people and prioritize human connection.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Team Section -->
            <section class="section">
                <div class="container">
                    <div class="features-header">
                        <span class="badge badge-primary">Leadership</span>
                        <h2>Meet our team</h2>
                        <p>Experienced leaders who bring decades of industry expertise to every engagement.</p>
                    </div>
                    <div class="team-grid">
                        <div class="team-member">
                            <div class="team-avatar"></div>
                            <h4>Sarah Mitchell</h4>
                            <p>Chief Executive Officer</p>
                        </div>
                        <div class="team-member">
                            <div class="team-avatar"></div>
                            <h4>David Chen</h4>
                            <p>Chief Strategy Officer</p>
                        </div>
                        <div class="team-member">
                            <div class="team-avatar"></div>
                            <h4>Emily Rodriguez</h4>
                            <p>Head of Digital</p>
                        </div>
                        <div class="team-member">
                            <div class="team-avatar"></div>
                            <h4>Michael Thompson</h4>
                            <p>Head of Operations</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CTA Section -->
            <section class="section cta-section">
                <div class="container">
                    <div class="cta-content">
                        <h2>Join our team</h2>
                        <p>We're always looking for talented individuals who share our passion for excellence.</p>
                        <a href="/contact" class="btn btn-accent btn-lg" data-link>View Opportunities</a>
                    </div>
                </div>
            </section>
        </div>
    `,

    /* ========================================================================
       CONTACT PAGE
       ======================================================================== */
    contact: () => `
        <div class="page-content">
            <!-- Page Hero -->
            <section class="page-hero">
                <div class="container">
                    <div class="page-hero-content">
                        <span class="badge badge-primary">Get in Touch</span>
                        <h1 class="page-hero-title">Contact Us</h1>
                        <p class="page-hero-subtitle">
                            Ready to start a conversation? We'd love to hear about your challenges 
                            and explore how we can help.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Contact Grid -->
            <section class="section">
                <div class="container">
                    <div class="contact-grid">
                        <div class="contact-info">
                            <h3>Let's connect</h3>
                            <p style="margin-bottom: var(--spacing-8);">
                                Whether you have a specific project in mind or just want to learn more 
                                about what we do, we're here to help.
                            </p>
                            
                            <div class="contact-item">
                                <div class="contact-item-icon">📧</div>
                                <div class="contact-item-text">
                                    <h5>Email</h5>
                                    <p>hello@elevate.com</p>
                                </div>
                            </div>
                            
                            <div class="contact-item">
                                <div class="contact-item-icon">📞</div>
                                <div class="contact-item-text">
                                    <h5>Phone</h5>
                                    <p>+1 (555) 123-4567</p>
                                </div>
                            </div>
                            
                            <div class="contact-item">
                                <div class="contact-item-icon">📍</div>
                                <div class="contact-item-text">
                                    <h5>Headquarters</h5>
                                    <p>123 Business Avenue<br>San Francisco, CA 94102</p>
                                </div>
                            </div>

                            <div style="margin-top: var(--spacing-8);">
                                <h5 style="margin-bottom: var(--spacing-4);">Global Offices</h5>
                                <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-4); color: var(--text-secondary); font-size: var(--text-sm);">
                                    <span>New York</span>
                                    <span>•</span>
                                    <span>London</span>
                                    <span>•</span>
                                    <span>Singapore</span>
                                    <span>•</span>
                                    <span>Dubai</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="contact-form-wrapper">
                            <h3>Send us a message</h3>
                            <form id="contact-form" onsubmit="handleContactSubmit(event)">
                                <div class="grid grid-2">
                                    <div class="form-group">
                                        <label class="form-label" for="firstName">First Name</label>
                                        <input type="text" id="firstName" class="form-input" placeholder="John" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label" for="lastName">Last Name</label>
                                        <input type="text" id="lastName" class="form-input" placeholder="Doe" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="email">Email</label>
                                    <input type="email" id="email" class="form-input" placeholder="john@company.com" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="company">Company</label>
                                    <input type="text" id="company" class="form-input" placeholder="Your Company">
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="message">Message</label>
                                    <textarea id="message" class="form-textarea" placeholder="Tell us about your project or inquiry..." required></textarea>
                                </div>
                                <button type="submit" class="btn btn-accent btn-lg" style="width: 100%;">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    `,

    /* ========================================================================
       404 NOT FOUND PAGE
       ======================================================================== */
    notFound: () => `
        <div class="page-content">
            <section class="hero section" style="text-align: center;">
                <div class="container">
                    <div class="hero-content" style="max-width: 600px; margin: 0 auto;">
                        <h1 class="hero-title" style="font-size: 8rem; color: var(--color-purple-600); margin-bottom: var(--spacing-4);">404</h1>
                        <h2 style="margin-bottom: var(--spacing-6);">Page not found</h2>
                        <p class="hero-subtitle" style="margin-bottom: var(--spacing-8);">
                            The page you're looking for doesn't exist or has been moved.
                        </p>
                        <a href="/" class="btn btn-accent btn-lg" data-link>Back to Home</a>
                    </div>
                </div>
            </section>
        </div>
    `
};

// Contact form handler
function handleContactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const button = form.querySelector('button[type="submit"]');
    button.textContent = 'Message Sent!';
    button.style.background = '#22c55e';

    setTimeout(() => {
        form.reset();
        button.textContent = 'Send Message';
        button.style.background = '';
    }, 3000);
}

/* ==========================================================================
   SERVICES CAROUSEL (Infinite Loop Slider)
   ========================================================================== */

let carouselInterval = null;
let currentSlide = 0;
let isTransitioning = false;
const ITEMS_PER_SLIDE = 4;
const AUTO_SLIDE_DELAY = 5000; // 5 seconds

function initServicesCarousel() {
    const carousel = document.getElementById('services-carousel');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const indicators = document.getElementById('carousel-indicators');

    if (!carousel) return;

    const services = ServiceData.getMainServices(10);
    const totalSlides = Math.ceil(services.length / ITEMS_PER_SLIDE);

    // Create cards HTML
    const createCards = (serviceList, startIndex = 0) => serviceList.map((service, index) => `
        <a href="/service/${service.id}" class="carousel-slide-item" data-link>
            <div class="carousel-card">
                <span class="carousel-number">0${((startIndex + index) % services.length) + 1}</span>
                <h3>${service.title}</h3>
                <p>${service.tagline}</p>
                <span class="carousel-link">Learn more →</span>
            </div>
        </a>
    `).join('');

    // Duplicate first set at the end for seamless infinite loop
    const firstSetClone = services.slice(0, ITEMS_PER_SLIDE);
    carousel.innerHTML = createCards(services) + createCards(firstSetClone, 0);

    // Reset slide position
    currentSlide = 0;
    updateCarouselPosition(false);

    // Render indicators (for original slides only, not clones)
    if (indicators) {
        indicators.innerHTML = Array.from({ length: totalSlides }, (_, i) => `
            <button class="carousel-dot ${i === 0 ? 'active' : ''}" data-slide="${i}"></button>
        `).join('');

        // Indicator click handlers
        indicators.querySelectorAll('.carousel-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                if (isTransitioning) return;
                goToSlide(parseInt(dot.dataset.slide));
                resetAutoSlide();
            });
        });
    }

    // Navigation button handlers
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            prevSlide();
            resetAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            nextSlide();
            resetAutoSlide();
        });
    }

    // Handle transition end for seamless loop
    carousel.addEventListener('transitionend', handleTransitionEnd);

    // Start auto-slide
    startAutoSlide();

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        if (carouselInterval) {
            clearInterval(carouselInterval);
            carouselInterval = null;
        }
    });

    carousel.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
}

function updateCarouselPosition(animate = true) {
    const carousel = document.getElementById('services-carousel');
    const viewport = document.querySelector('.carousel-viewport');

    if (!carousel || !viewport) return;

    const viewportWidth = viewport.offsetWidth;
    const gap = 24; // var(--spacing-6) = 1.5rem = 24px
    const translateX = currentSlide * (viewportWidth + gap);

    if (animate) {
        carousel.style.transition = 'transform 0.5s ease-in-out';
    } else {
        carousel.style.transition = 'none';
    }

    carousel.style.transform = `translateX(-${translateX}px)`;
}

function handleTransitionEnd() {
    const services = ServiceData.getMainServices(10);
    const totalSlides = Math.ceil(services.length / ITEMS_PER_SLIDE);

    isTransitioning = false;

    // If we've slid to the cloned first slide, instantly jump to the real first slide
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
        updateCarouselPosition(false);
    }

    // If we've slid before the first slide (going backwards), jump to the last real slide
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
        updateCarouselPosition(false);
    }

    updateIndicators();
}

function updateIndicators() {
    const indicators = document.getElementById('carousel-indicators');
    const services = ServiceData.getMainServices(10);
    const totalSlides = Math.ceil(services.length / ITEMS_PER_SLIDE);

    if (indicators) {
        const displaySlide = currentSlide % totalSlides;
        indicators.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === displaySlide);
        });
    }
}

function goToSlide(slideIndex) {
    if (isTransitioning) return;

    currentSlide = slideIndex;
    isTransitioning = true;
    updateCarouselPosition(true);
    updateIndicators();
}

function nextSlide() {
    if (isTransitioning) return;

    currentSlide++;
    isTransitioning = true;
    updateCarouselPosition(true);
    updateIndicators();
}

function prevSlide() {
    if (isTransitioning) return;

    const services = ServiceData.getMainServices(10);
    const totalSlides = Math.ceil(services.length / ITEMS_PER_SLIDE);

    if (currentSlide === 0) {
        // Jump to cloned position at the end (without animation), then slide back
        currentSlide = totalSlides;
        updateCarouselPosition(false);

        // Force reflow then animate back
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                currentSlide = totalSlides - 1;
                isTransitioning = true;
                updateCarouselPosition(true);
                updateIndicators();
            });
        });
    } else {
        currentSlide--;
        isTransitioning = true;
        updateCarouselPosition(true);
        updateIndicators();
    }
}

function startAutoSlide() {
    if (carouselInterval) clearInterval(carouselInterval);

    carouselInterval = setInterval(() => {
        nextSlide();
    }, AUTO_SLIDE_DELAY);
}

function resetAutoSlide() {
    startAutoSlide();
}

/* ==========================================================================
   SERVICES PAGE - Category Filter & Lazy Loading
   ========================================================================== */

let currentCategory = 'all';
let displayedCount = 0;
const ITEMS_PER_PAGE = 8;

function initCategoryFilter() {
    const filterContainer = document.getElementById('category-filter');
    if (!filterContainer) return;

    const categories = ServiceData.getAllCategories();

    filterContainer.innerHTML = categories.map(cat => `
        <button class="category-btn ${cat.id === 'all' ? 'active' : ''}" 
                data-category="${cat.id}">
            ${cat.name}
        </button>
    `).join('');

    // Add click handlers
    filterContainer.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;

            // Update active state
            filterContainer.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter services
            currentCategory = category;
            displayedCount = 0;
            loadServicesPage(true);
        });
    });
}

function loadServicesPage(reset = false) {
    const grid = document.getElementById('services-page-grid');
    const loadMoreWrapper = document.getElementById('load-more-wrapper');
    const loadMoreBtn = document.getElementById('load-more-btn');

    if (!grid) return;

    const services = ServiceData.getServicesByCategory(currentCategory);

    if (reset) {
        grid.innerHTML = '';
        displayedCount = 0;
    }

    const servicesToShow = services.slice(displayedCount, displayedCount + ITEMS_PER_PAGE);
    displayedCount += servicesToShow.length;

    servicesToShow.forEach((service, index) => {
        const card = document.createElement('a');
        card.href = `/service/${service.id}`;
        card.className = 'card service-card';
        card.setAttribute('data-link', '');
        card.innerHTML = `
            <span class="card-number">0${displayedCount - servicesToShow.length + index + 1}</span>
            <div class="card-content">
                <span class="service-category-tag">${getCategoryName(service.category)}</span>
                <h3 class="card-title">${service.title}</h3>
                <p class="card-description">${service.tagline}</p>
                <span class="card-link">Learn more</span>
            </div>
        `;
        grid.appendChild(card);
    });

    // Show/hide load more button
    if (displayedCount < services.length) {
        loadMoreWrapper.style.display = 'flex';
    } else {
        loadMoreWrapper.style.display = 'none';
    }

    // Setup load more button
    if (loadMoreBtn && !loadMoreBtn.hasListener) {
        loadMoreBtn.addEventListener('click', () => loadServicesPage(false));
        loadMoreBtn.hasListener = true;
    }
}

function getCategoryName(categoryId) {
    const categories = ServiceData.getAllCategories();
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.name : categoryId;
}

/**
 * Render services grid (for home page related services)
 */
function renderServicesGrid(containerId, excludeId = null, limit = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let services = ServiceData.getAllServices();

    if (excludeId) {
        services = services.filter(s => s.id !== excludeId);
    }

    if (limit) {
        services = services.slice(0, limit);
    }

    container.innerHTML = services.map((service, index) => `
        <a href="/service/${service.id}" class="card service-card" data-link>
            <span class="card-number">0${index + 1}</span>
            <div class="card-content">
                <h3 class="card-title">${service.title}</h3>
                <p class="card-description">${service.tagline}</p>
                <span class="card-link">Learn more</span>
            </div>
        </a>
    `).join('');
}

// Export Pages object globally
window.Pages = Pages;
window.renderServicesGrid = renderServicesGrid;
window.initServicesCarousel = initServicesCarousel;
window.initCategoryFilter = initCategoryFilter;
window.loadServicesPage = loadServicesPage;
