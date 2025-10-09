import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface Model3DBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
}

const Model3DBackground: React.FC<Model3DBackgroundProps> = ({ className = '', style = {} }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const modelRef = useRef<THREE.Group>();
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // Camera setup - positioned for centered viewing with square aspect ratio
    const camera = new THREE.PerspectiveCamera(
      75,
      1, // Square aspect ratio to match the circle
      0.1,
      1000
    );
    camera.position.set(0, 0, 6);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    // Use the same dimensions as the circle animation
    const containerSize = Math.min(
      Math.min(window.innerWidth, window.innerHeight) * 0.9,
      300
    );
    renderer.setSize(containerSize, containerSize);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8;
    rendererRef.current = renderer;

    // Simple lighting for background
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x4a9eff, 0.4, 100);
    pointLight.position.set(-5, 3, -5);
    scene.add(pointLight);

    // Load the shaded model
    const loader = new GLTFLoader();
    loader.load(
      '/src/assets/models/base_basic_shaded.glb',
      (gltf) => {
        const model = gltf.scene;
        
        // Configure the model for centered display
        model.scale.setScalar(2.0);
        model.position.set(0, 0, 0);
        
        // Enable shadows and configure materials
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Make materials more transparent for background effect
            if (child.material instanceof THREE.MeshStandardMaterial) {
              child.material.transparent = true;
              child.material.opacity = 0.4;
            }
          }
        });

        // Center the model perfectly in the section
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        model.position.y = 0; // Centered vertically
        model.position.x = 0; // Centered horizontally
        model.position.z = 0; // Centered in depth

        modelRef.current = model;
        scene.add(model);
      },
      (progress) => {
        console.log('Model loading progress:', (progress.loaded / progress.total) * 100 + '%');
      },
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    // Add renderer to DOM
    mountRef.current.appendChild(renderer.domElement);

    // Simple animation loop - static model
    const animate = () => {
      // Keep model centered and static - no rotation or movement
      if (modelRef.current) {
        // Ensure model stays centered
        modelRef.current.rotation.y = 0;
        modelRef.current.position.y = 0;
      }

      // Keep camera centered and stable
      camera.position.x = 0;
      camera.position.z = 6;

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      
      // Use the same dimensions as the circle animation
      const containerSize = Math.min(
        Math.min(window.innerWidth, window.innerHeight) * 0.9,
        300
      );
      
      cameraRef.current.aspect = 1; // Square aspect ratio
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerSize, containerSize);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement.parentNode) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`absolute inset-0 w-full h-full flex items-center justify-center ${className}`}
      style={{ 
        background: 'transparent',
        width: '90vmin',
        height: '90vmin',
        maxWidth: '300px',
        maxHeight: '300px',
        ...style 
      }}
    />
  );
};

export default Model3DBackground;