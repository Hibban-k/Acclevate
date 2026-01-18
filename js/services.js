/* ==========================================================================
   SERVICES DATA - Fetches Service Data from JSON
   ========================================================================== */

// Service data will be loaded here
let servicesData = [];
let categoriesData = [];
let servicesLoaded = false;

/**
 * Load services from JSON file
 */
async function loadServices() {
    if (servicesLoaded) return servicesData;

    try {
        const response = await fetch('/data/services.json');
        const data = await response.json();
        servicesData = data.services;
        categoriesData = data.categories || [];
        servicesLoaded = true;
        return servicesData;
    } catch (error) {
        console.error('Error loading services:', error);
        return [];
    }
}

/**
 * Get all services
 */
function getAllServices() {
    return servicesData;
}

/**
 * Get all categories
 */
function getAllCategories() {
    return categoriesData;
}

/**
 * Get services by category
 */
function getServicesByCategory(categoryId) {
    if (categoryId === 'all') return servicesData;
    return servicesData.filter(service => service.category === categoryId);
}

/**
 * Get service by slug/id
 */
function getServiceBySlug(slug) {
    return servicesData.find(service => service.id === slug) || null;
}

/**
 * Get list of service slugs
 */
function getServiceSlugs() {
    return servicesData.map(service => service.id);
}

/**
 * Get main services (for carousel, max 10)
 */
function getMainServices(limit = 10) {
    return servicesData.slice(0, limit);
}

/**
 * Initialize services - call this on page load
 */
async function initServices() {
    await loadServices();
    return servicesData;
}

// Export for use in router
window.ServiceData = {
    loadServices,
    getAllServices,
    getAllCategories,
    getServicesByCategory,
    getServiceBySlug,
    getServiceSlugs,
    getMainServices,
    initServices
};
