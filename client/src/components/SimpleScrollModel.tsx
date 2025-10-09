import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface SimpleScrollModelProps {
  className?: string;
  onScrollProgress?: (progress: number) => void;
}

// Define camera positions for different countries/sections
const CAMERA_POSITIONS = {
  // Starting position - wide view of West Africa
  start: { 
    position: new THREE.Vector3(30, 20, 30), 
    lookAt: new THREE.Vector3(0, 0, 0),
    fov: 75
  },
  
  // Ghana - Tema Port (Operations section)
  ghana: { 
    position: new THREE.Vector3(12, 8, 12), 
    lookAt: new THREE.Vector3(0, 0, 0),
    fov: 60
  },
  
  // Nigeria - Lagos Port (Services section)  
  nigeria: { 
    position: new THREE.Vector3(-12, 8, 12), 
    lookAt: new THREE.Vector3(-8, 0, 8),
    fov: 60
  },
  
  // Côte d'Ivoire - Abidjan Port (About section)
  ivoryCoast: { 
    position: new THREE.Vector3(-12, 8, -12), 
    lookAt: new THREE.Vector3(-8, 0, -8),
    fov: 60
  },
  
  // Togo - Lomé Port (Why Choose section)
  togo: { 
    position: new THREE.Vector3(12, 8, -12), 
    lookAt: new THREE.Vector3(8, 0, -8),
    fov: 60
  },
  
  // Final position - close up on Ghana
  final: { 
    position: new THREE.Vector3(5, 3, 5), 
    lookAt: new THREE.Vector3(0, 0, 0),
    fov: 45
  }
};

const SimpleScrollModel: React.FC<SimpleScrollModelProps> = ({ 
  className = "", 
  onScrollProgress
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationIdRef = useRef<number>(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a); // Dark blue background
    scene.fog = new THREE.Fog(0x0f172a, 20, 100); // Add fog for depth
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    
    // Start with initial position
    camera.position.copy(CAMERA_POSITIONS.start.position);
    camera.lookAt(CAMERA_POSITIONS.start.lookAt);

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

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Create a simple geometric representation of West Africa
    const createWestAfricaShape = () => {
      const group = new THREE.Group();

      // Create a simplified map shape using multiple geometries
      const geometries = [
        // Ghana - Main focus
        new THREE.BoxGeometry(6, 4, 6),
        // Nigeria - Large
        new THREE.BoxGeometry(8, 4, 6),
        // Côte d'Ivoire
        new THREE.BoxGeometry(5, 4, 5),
        // Togo
        new THREE.BoxGeometry(3, 4, 3),
        // Burkina Faso
        new THREE.BoxGeometry(5, 4, 5),
        // Mali
        new THREE.BoxGeometry(6, 4, 6),
        // Niger
        new THREE.BoxGeometry(6, 4, 6),
        // Benin
        new THREE.BoxGeometry(3, 4, 3)
      ];

      const positions = [
        { x: 0, y: 0, z: 0 },      // Ghana
        { x: -10, y: 0, z: 3 },    // Nigeria
        { x: -8, y: 0, z: -5 },    // Côte d'Ivoire
        { x: 3, y: 0, z: -3 },     // Togo
        { x: -3, y: 0, z: 5 },     // Burkina Faso
        { x: -6, y: 0, z: 8 },     // Mali
        { x: -8, y: 0, z: 10 },    // Niger
        { x: 5, y: 0, z: 0 }       // Benin
      ];

      const colors = [
        0x3b82f6, // Ghana - Bright blue
        0x1e40af, // Nigeria - Dark blue
        0x1d4ed8, // Côte d'Ivoire - Medium blue
        0x2563eb, // Togo - Blue
        0x1e3a8a, // Burkina Faso - Dark blue
        0x1e40af, // Mali - Dark blue
        0x1e3a8a, // Niger - Dark blue
        0x2563eb  // Benin - Blue
      ];

      geometries.forEach((geometry, index) => {
        const material = new THREE.MeshLambertMaterial({
          color: colors[index],
          transparent: true,
          opacity: 0.9
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(positions[index].x, positions[index].y, positions[index].z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        // Add wireframe for better visibility
        const wireframe = new THREE.WireframeGeometry(geometry);
        const wireframeMaterial = new THREE.LineBasicMaterial({ 
          color: 0xffffff, 
          transparent: true, 
          opacity: 0.3 
        });
        const wireframeMesh = new THREE.LineSegments(wireframe, wireframeMaterial);
        wireframeMesh.position.copy(mesh.position);
        
        group.add(mesh);
        group.add(wireframeMesh);
      });

      return group;
    };

    // Create the model
    const model = createWestAfricaShape();
    scene.add(model);
    setIsModelLoaded(true);

    // Scroll-driven camera animation
    const handleScroll = () => {
      if (!isModelLoaded) return;
      
      const scrollTop = window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / documentHeight, 1);
      
      setScrollProgress(progress);
      onScrollProgress?.(progress);

      // Interpolate between camera positions based on scroll progress
      const positions = Object.values(CAMERA_POSITIONS);
      const totalSections = positions.length - 1;
      const sectionProgress = progress * totalSections;
      const currentSection = Math.floor(sectionProgress);
      const sectionT = sectionProgress - currentSection;

      if (currentSection < totalSections) {
        const currentPos = positions[currentSection];
        const nextPos = positions[currentSection + 1];
        
        // Smooth interpolation between positions
        const currentPosition = new THREE.Vector3().copy(currentPos.position);
        const nextPosition = new THREE.Vector3().copy(nextPos.position);
        const currentLookAt = new THREE.Vector3().copy(currentPos.lookAt);
        const nextLookAt = new THREE.Vector3().copy(nextPos.lookAt);

        // Interpolate position
        camera.position.lerpVectors(currentPosition, nextPosition, sectionT);
        camera.lookAt(
          currentLookAt.lerpVectors(currentLookAt, nextLookAt, sectionT)
        );
        
        // Interpolate FOV for zoom effect
        const currentFOV = currentPos.fov;
        const nextFOV = nextPos.fov;
        const interpolatedFOV = currentFOV + (nextFOV - currentFOV) * sectionT;
        camera.fov = interpolatedFOV;
        camera.updateProjectionMatrix();
      } else {
        // Final position
        const finalPos = positions[positions.length - 1];
        camera.position.copy(finalPos.position);
        camera.lookAt(finalPos.lookAt);
        camera.fov = finalPos.fov;
        camera.updateProjectionMatrix();
      }

      // Add subtle rotation based on scroll
      const rotationY = progress * Math.PI * 0.5; // 90 degree rotation over full scroll
      model.rotation.y = rotationY;
    };

    // Throttled scroll handler for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    // Animation loop
    const animate = () => {
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      animationIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    mountRef.current.appendChild(renderer.domElement);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', handleResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      // Dispose of Three.js objects
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
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
        sceneRef.current.clear();
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [onScrollProgress]);

  return (
    <div 
      ref={mountRef} 
      className={`w-full h-full fixed inset-0 pointer-events-none ${className}`}
      style={{ 
        background: 'transparent',
        zIndex: 0
      }}
    >
      {!isModelLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p className="text-sm">Loading 3D Map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleScrollModel;
