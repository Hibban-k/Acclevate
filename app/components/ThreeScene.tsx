'use client';

import { useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global {
    interface Window {
        THREE: any;
    }
}

export default function ThreeScene() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Dynamically load Three.js
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.async = true;

        script.onload = () => {
            const THREE = window.THREE;
            if (!THREE || !containerRef.current) return;

            // Scene setup
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 50;

            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            containerRef.current.appendChild(renderer.domElement);

            // Create dots - Navy Blue color
            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 100;
            const posArray = new Float32Array(particlesCount * 3);

            for (let i = 0; i < particlesCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 100;
            }

            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.12,
                color: 0x2B3674, // Navy blue
                transparent: true,
                opacity: 0.25,
                sizeAttenuation: true,
            });

            const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particlesMesh);

            // Mouse interaction
            let mouseX = 0;
            let mouseY = 0;
            let targetX = 0;
            let targetY = 0;

            const windowHalfX = window.innerWidth / 2;
            const windowHalfY = window.innerHeight / 2;

            const handleMouseMove = (event: MouseEvent) => {
                mouseX = (event.clientX - windowHalfX) / 150;
                mouseY = (event.clientY - windowHalfY) / 150;
            };

            document.addEventListener('mousemove', handleMouseMove);

            // Animation
            let animationId: number;

            const animate = () => {
                animationId = requestAnimationFrame(animate);

                targetX += (mouseX - targetX) * 0.02;
                targetY += (mouseY - targetY) * 0.02;

                particlesMesh.rotation.y = targetX * 0.05;
                particlesMesh.rotation.x = targetY * 0.05;
                particlesMesh.rotation.z += 0.0001;

                renderer.render(scene, camera);
            };

            animate();

            // Resize handler
            const handleResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };

            window.addEventListener('resize', handleResize);

            // Cleanup
            return () => {
                cancelAnimationFrame(animationId);
                window.removeEventListener('resize', handleResize);
                document.removeEventListener('mousemove', handleMouseMove);
                particlesGeometry.dispose();
                particlesMaterial.dispose();
                renderer.dispose();
                if (containerRef.current && renderer.domElement) {
                    containerRef.current.removeChild(renderer.domElement);
                }
            };
        };

        document.head.appendChild(script);

        return () => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none opacity-40"
        />
    );
}
