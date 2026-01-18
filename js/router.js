/* ==========================================================================
   ROUTER - Client-Side Routing with History API
   ========================================================================== */

class Router {
    constructor() {
        this.routes = [];
        this.currentPath = '';
        this.appContainer = null;
        this.servicesLoaded = false;

        // Bind methods
        this.handleClick = this.handleClick.bind(this);
        this.handlePopState = this.handlePopState.bind(this);
    }

    /**
     * Initialize the router
     */
    async init() {
        this.appContainer = document.getElementById('app');

        // Load services data first
        await ServiceData.initServices();
        this.servicesLoaded = true;

        // Add event listeners
        document.addEventListener('click', this.handleClick);
        window.addEventListener('popstate', this.handlePopState);

        // Initial route
        await this.navigate(window.location.pathname, false);
    }

    /**
     * Register a route
     * @param {string} path - Route path (supports :param for dynamic segments)
     * @param {Function} handler - Function that returns HTML content
     */
    addRoute(path, handler) {
        // Convert path pattern to regex
        const paramNames = [];
        const regexPath = path.replace(/:([^/]+)/g, (_, paramName) => {
            paramNames.push(paramName);
            return '([^/]+)';
        });

        this.routes.push({
            path,
            regex: new RegExp(`^${regexPath}$`),
            paramNames,
            handler
        });
    }

    /**
     * Match a path to a route
     * @param {string} path - URL path to match
     * @returns {Object|null} - Matched route with params or null
     */
    matchRoute(path) {
        for (const route of this.routes) {
            const match = path.match(route.regex);
            if (match) {
                const params = {};
                route.paramNames.forEach((name, index) => {
                    params[name] = match[index + 1];
                });
                return { route, params };
            }
        }
        return null;
    }

    /**
     * Navigate to a path
     * @param {string} path - URL path to navigate to
     * @param {boolean} pushState - Whether to push to browser history
     */
    async navigate(path, pushState = true) {
        // Normalize path
        path = path || '/';
        if (path !== '/' && path.endsWith('/')) {
            path = path.slice(0, -1);
        }

        // Skip if same path
        if (path === this.currentPath) return;

        this.currentPath = path;

        // Update browser history
        if (pushState) {
            window.history.pushState({ path }, '', path);
        }

        // Find matching route
        const matched = this.matchRoute(path);

        if (matched) {
            await this.render(matched.route.handler, matched.params);
            this.updateActiveNav(path);
            this.updateTitle(path);
        } else {
            // 404 handler
            await this.render(Pages.notFound, {});
            this.updateTitle('/404');
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Render content to the app container
     * @param {Function} handler - Page handler function
     * @param {Object} params - Route parameters
     */
    async render(handler, params) {
        // Add fade out effect
        this.appContainer.classList.add('fade-out');

        await new Promise(resolve => setTimeout(resolve, 150));

        // Render new content
        const content = handler(params);
        this.appContainer.innerHTML = content;

        // Remove fade out, add fade in
        this.appContainer.classList.remove('fade-out');

        // After render, populate service grids
        this.populateServiceGrids();
    }

    /**
     * Populate service grids after page render
     */
    populateServiceGrids() {
        // Home page services carousel
        const carousel = document.getElementById('services-carousel');
        if (carousel && typeof initServicesCarousel === 'function') {
            initServicesCarousel();
        }

        // Services page - category filter and grid
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter && typeof initCategoryFilter === 'function') {
            initCategoryFilter();
            loadServicesPage(true);
        }

        // Related services grid (on service detail page)
        const relatedGrid = document.getElementById('related-services-grid');
        if (relatedGrid) {
            const excludeId = relatedGrid.dataset.exclude;
            renderServicesGrid('related-services-grid', excludeId, 3);
        }
    }

    /**
     * Update active navigation state
     * @param {string} path - Current path
     */
    updateActiveNav(path) {
        // Remove all active states
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        // Add active state to matching nav item
        const basePath = '/' + path.split('/')[1];
        document.querySelectorAll('.nav-item').forEach(item => {
            const href = new URL(item.href).pathname;
            if (href === path || (basePath !== '/' && href === basePath)) {
                item.classList.add('active');
            } else if (path === '/' && href === '/') {
                item.classList.add('active');
            }
        });
    }

    /**
     * Update page title
     * @param {string} path - Current path
     */
    updateTitle(path) {
        const titles = {
            '/': 'Home',
            '/services': 'Services',
            '/about': 'About',
            '/contact': 'Contact',
            '/404': 'Page Not Found'
        };

        let title = titles[path];

        // Check for dynamic service page
        if (!title && path.startsWith('/service/')) {
            const slug = path.split('/')[2];
            const service = ServiceData.getServiceBySlug(slug);
            title = service ? service.title : 'Service';
        }

        document.title = `${title || 'Page'} | Elevate Consulting`;
    }

    /**
     * Handle click events for navigation
     * @param {Event} e - Click event
     */
    handleClick(e) {
        const link = e.target.closest('[data-link]');
        if (!link) return;

        e.preventDefault();

        const href = link.getAttribute('href') || link.href;
        const url = new URL(href, window.location.origin);

        // Only handle internal links
        if (url.origin === window.location.origin) {
            this.navigate(url.pathname);
        }
    }

    /**
     * Handle browser back/forward navigation
     * @param {PopStateEvent} e - PopState event
     */
    handlePopState(e) {
        this.navigate(window.location.pathname, false);
    }
}

// Create router instance
const router = new Router();

// Register routes
router.addRoute('/', () => Pages.home());
router.addRoute('/services', () => Pages.services());
router.addRoute('/service/:slug', (params) => Pages.serviceDetail(params.slug));
router.addRoute('/about', () => Pages.about());
router.addRoute('/contact', () => Pages.contact());

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    await router.init();

    // Initialize Three.js if available
    if (typeof initThreeScene === 'function') {
        initThreeScene();
    }

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileToggle.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu on nav click
        mobileMenu.querySelectorAll('[data-link]').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileToggle.textContent = '☰';
            });
        });
    }
});

// Export router globally
window.AppRouter = router;
