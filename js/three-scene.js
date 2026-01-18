/* ==========================================================================
   THREE.JS SCENE - Minimal Dots Background with Cursor Interaction
   ========================================================================== */

function initThreeScene() {
    const container = document.getElementById('three-container');
    if (!container || typeof THREE === 'undefined') return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 50;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Colors
    const primaryColor = 0x7c3aed; // Purple-700

    // Create simple dots
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.12,
        color: primaryColor,
        transparent: true,
        opacity: 0.25,
        sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse interaction - subtle movement with cursor
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) / 150;
        mouseY = (event.clientY - windowHalfY) / 150;
    });

    // Animation loop
    let animationId;

    function animate() {
        animationId = requestAnimationFrame(animate);

        // Smooth cursor following
        targetX += (mouseX - targetX) * 0.02;
        targetY += (mouseY - targetY) * 0.02;

        // Subtle rotation based on cursor position
        particlesMesh.rotation.y = targetX * 0.05;
        particlesMesh.rotation.x = targetY * 0.05;

        // Very slow drift
        particlesMesh.rotation.z += 0.0001;

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    function handleResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    // Cleanup function
    window.cleanupThreeScene = () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        renderer.dispose();
        container.removeChild(renderer.domElement);
    };
}

// Export function globally
window.initThreeScene = initThreeScene;
