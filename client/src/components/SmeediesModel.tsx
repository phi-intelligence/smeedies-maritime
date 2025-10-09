import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface SmeediesModelProps {
  className?: string;
  autoRotate?: boolean;
  enableControls?: boolean;
  scale?: number;
  modelPath?: string;
}

const SmeediesModel: React.FC<SmeediesModelProps> = ({ 
  className = "", 
  autoRotate = true, 
  enableControls = false,
  scale = 1,
  modelPath = "/src/assets/models/smeediesglbnew.glb"
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationIdRef = useRef<number>(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x1e293b); // slate-800 - removed background
    sceneRef.current = scene;

    // Camera setup - drone-like positioning
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    // Start with a zoomed out position to see the model from the start
    camera.position.set(25, 15, 25);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Basic lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);


    // Mouse movement animation removed - static camera position
    // const handleMouseMove = (event: MouseEvent) => {
    //   const mouseX = event.clientX / window.innerWidth;
    //   const mouseY = event.clientY / window.innerHeight;
    //   
    //   // Drone-like movement - closer and more natural
    //   const baseRadius = 20;
    //   const baseHeight = 8;
    //   
    //   // Horizontal orbit around the model
    //   const angleX = (mouseX - 0.5) * Math.PI * 0.8; // Wider horizontal range
    //   const angleY = (mouseY - 0.5) * Math.PI * 0.2; // Subtle vertical movement
    //   
    //   // Calculate drone position
    //   camera.position.x = Math.sin(angleX) * baseRadius;
    //   camera.position.z = Math.cos(angleX) * baseRadius;
    //   camera.position.y = baseHeight + (angleY * 8); // Gentle height variation
    //   
    //   // Always look at the model center
    //   camera.lookAt(0, 0, 0);
    // };

    // window.addEventListener('mousemove', handleMouseMove);

    // Load GLB model
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;

        // Debug: Log model information
        console.log('Model loaded successfully!');
        console.log('Model children count:', model.children.length);
        
        // Calculate bounding box
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        console.log('Model size:', size);
        console.log('Model center:', center);
        
        // Center the model at origin
        model.position.sub(center);

        // Scale and position the model using the scale prop
        model.scale.setScalar(scale);

        // Enable shadows and log mesh information
        let meshCount = 0;
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            meshCount++;
            console.log(`Mesh ${meshCount}:`, child.name || 'unnamed', child.geometry.type, child.material);
          }
        });
        console.log(`Total meshes found: ${meshCount}`);

        scene.add(model);

        // Static render (no animation)
        const animate = () => {
          if (controlsRef.current) {
            controlsRef.current.update();
          }
          
          renderer.render(scene, camera);
          animationIdRef.current = requestAnimationFrame(animate);
        };
        animate();
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error('Error loading GLB model:', error);
      }
    );

    // Controls setup - disabled by default to keep model stationary
    if (enableControls) {
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.screenSpacePanning = false;
      controls.minDistance = 5;
      controls.maxDistance = 30;
      controls.enableRotate = false; // Disable rotation to keep model stationary
      controls.enableZoom = true; // Allow zoom for better view
      controls.enablePan = false; // Disable panning
      controlsRef.current = controls;
    }

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
    mountRef.current.appendChild(renderer.domElement);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      // window.removeEventListener('mousemove', handleMouseMove); // Removed mouse movement
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      // Dispose of Three.js objects
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material: THREE.Material) => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      
      scene.clear();
      renderer.dispose();
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [autoRotate, enableControls, scale]);

  return (
    <div 
      ref={mountRef} 
      className={`w-full h-full ${className}`}
      style={{ background: 'transparent' }}
    />
  );
};

export default SmeediesModel;