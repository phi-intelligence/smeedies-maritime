import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ContainerShipBackgroundProps {
  className?: string;
}

const ContainerShipBackground: React.FC<ContainerShipBackgroundProps> = ({ className = "" }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Intersection Observer to detect when section is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(mountRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mountRef.current || !isVisible) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background
    
    const camera = new THREE.PerspectiveCamera(
      75, // Wider field of view for full width coverage
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 3); // Closer to scene for wider coverage

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Very bright lighting setup for maximum visibility
    const ambientLight = new THREE.AmbientLight(0x4a7cba, 1.2); // Very bright blue ambient
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x8bb5ff, 2.0); // Very bright directional
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Additional directional light from opposite side
    const directionalLight2 = new THREE.DirectionalLight(0xa7d7ff, 1.5);
    directionalLight2.position.set(-10, 5, 3);
    scene.add(directionalLight2);

    // Bright white directional light for extra brightness
    const whiteLight = new THREE.DirectionalLight(0xffffff, 1.0);
    whiteLight.position.set(0, 8, 4);
    scene.add(whiteLight);

    // Point light for underwater glow effect
    const pointLight = new THREE.PointLight(0xb8d9ff, 1.2, 60); // Very bright point light
    pointLight.position.set(-5, -2, 3);
    scene.add(pointLight);

    // Additional point light for more illumination
    const pointLight2 = new THREE.PointLight(0xa7d7ff, 0.8, 50);
    pointLight2.position.set(3, 2, 4);
    scene.add(pointLight2);

    // Bright white point light for maximum visibility
    const whitePointLight = new THREE.PointLight(0xffffff, 0.6, 40);
    whitePointLight.position.set(0, 0, 6);
    scene.add(whitePointLight);

    // Load container ship model
    const loader = new GLTFLoader();
    let ship: THREE.Group | null = null;

    loader.load(
      '/src/assets/models/container_ship.glb',
      (gltf) => {
        ship = gltf.scene;
        
        // Scale and position the ship (very small scale)
        ship.scale.set(0.04, 0.04, 0.04);
        ship.position.set(-12, -1.0, 0); // Start from far left side, moved upwards
        ship.rotation.y = Math.PI / 4; // 45 degree rotation
        
        // Enable shadows
        ship.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Adjust materials for maximum brightness
            if (child.material instanceof THREE.MeshStandardMaterial) {
              child.material.color.setHex(0x6a9cd0); // Much brighter blue ship color
              child.material.metalness = 1.0; // Maximum metalness
              child.material.roughness = 0.05; // Very smooth surface
              child.material.envMapIntensity = 2.0; // Very reflective
              child.material.emissive = new THREE.Color(0x001122); // Slight blue glow
              child.material.emissiveIntensity = 0.1; // Subtle emission
            }
          }
        });
        
        scene.add(ship);
        
        // Start animation immediately when model is loaded and section is visible
        if (isVisible) {
          animate();
        }
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error('Error loading ship model:', error);
      }
    );

    // Animation variables for ship movement
    let shipSpeed = 0.015; // Increased speed of horizontal movement
    let shipDirection = 1; // Always moving right
    let animationId: number;
    
    // Animation loop - only runs when section is visible
    const animate = () => {
      if (!isVisible) return; // Stop animation when not visible
      
      animationId = requestAnimationFrame(animate);
      
      if (ship) {
        // Check and reset BEFORE movement to prevent any delay
        if (ship.position.x >= 12) {
          ship.position.x = -12; // Instant reset to left side
        }
        
        // Horizontal movement from left to right only
        ship.position.x += shipSpeed * shipDirection;
        
        // Vertical floating animation (maintaining upward position)
        ship.position.y = -1.0 + Math.sin(Date.now() * 0.001) * 0.2;
        
        // No rotation - ship stays in same orientation
        
        // Gentle swaying motion
        ship.rotation.z = Math.sin(Date.now() * 0.0008) * 0.02;
      }
      
      // Subtle camera movement for parallax effect
      camera.position.x = Math.sin(Date.now() * 0.0005) * 0.1;
      camera.position.y = Math.cos(Date.now() * 0.0003) * 0.05;
      
      renderer.render(scene, camera);
    };

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isVisible]);

  return (
    <div 
      ref={mountRef} 
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ zIndex: -1 }} // Behind content
    />
  );
};

export default ContainerShipBackground;
