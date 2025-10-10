import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ScrollDrivenModelYukaProps {
  className?: string;
  modelPath?: string;
  scale?: number;
  onError?: () => void;
  onLoad?: () => void;
  onProgress?: (progress: number) => void;
  onModelAnalysis?: (analysis: { 
    totalMeshes: number; 
    shipMeshes: number;
    containerMeshes: number;
    otherMeshes: number;
    shipBreakdown: { [key: string]: number };
    materialTypes: string[] 
  }) => void;
}

// Define camera path points for positive-axis world tour: Asia → Australia → Europe → Africa → Americas
const CAMERA_PATH_POINTS = [
  // 1. ASIA - Start point (Eastern Asia, elevated view)
  new THREE.Vector3(5, 25, 5),
  
  // 2. AUSTRALIA - Move to Australia
  new THREE.Vector3(15, 22, 10),
  new THREE.Vector3(25, 20, 15),
  
  // 3. EUROPE - Move to Europe
  new THREE.Vector3(35, 18, 20),
  new THREE.Vector3(40, 16, 25),
  
  // 4. AFRICA - Move to Africa
  new THREE.Vector3(35, 16, 30),
  new THREE.Vector3(30, 14, 35),
  new THREE.Vector3(25, 12, 40),
  
  // 5. SOUTH AMERICA - Move to South America
  new THREE.Vector3(20, 12, 35),
  new THREE.Vector3(15, 10, 30),
  
  // 6. NORTH AMERICA - Final destination
  new THREE.Vector3(10, 8, 25),
  new THREE.Vector3(5, 6, 20)
];

// FOV values corresponding to each path point (13 points total)
const CAMERA_FOV_VALUES = [25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 50];

const ScrollDrivenModelYuka: React.FC<ScrollDrivenModelYukaProps> = ({ 
  className = "", 
  modelPath = "/assets/models/smeediessnew1.glb",
  scale = 1.5,
  onError,
  onLoad,
  onProgress,
  onModelAnalysis
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationIdRef = useRef<number>(0);
  const pathRef = useRef<THREE.CatmullRomCurve3 | null>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Detect mobile device
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
      return mobile;
    };
    
    const mobile = checkMobile();

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
    camera.position.copy(CAMERA_PATH_POINTS[0]);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Renderer setup with mobile optimizations and WebGL fallback
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: !mobile, // Disable antialiasing on mobile for performance
        powerPreference: mobile ? "low-power" : "high-performance",
        failIfMajorPerformanceCaveat: false // Allow fallback on mobile
      });
    } catch (error) {
      console.warn('WebGL not supported, falling back to basic WebGL renderer');
      renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: false,
        powerPreference: "low-power"
      });
    }
    
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    // Limit pixel ratio on mobile for better performance
    renderer.setPixelRatio(mobile ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio);
    
    // Reduce shadow quality on mobile
    if (renderer.shadowMap) {
      renderer.shadowMap.enabled = !mobile; // Disable shadows on mobile
      if (!mobile) {
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      }
    }
    rendererRef.current = renderer;

    // Enhanced lighting setup with mobile optimizations
    const ambientLight = new THREE.AmbientLight(0xffffff, mobile ? 2.0 : 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, mobile ? 1.0 : 0.8);
    directionalLight.position.set(10, 10, 5);
    
    // Only enable shadows on desktop
    if (!mobile) {
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
    }
    scene.add(directionalLight);

    // Create smooth curve path for camera movement using Three.js CatmullRomCurve3
    const path = new THREE.CatmullRomCurve3(CAMERA_PATH_POINTS, false, 'centripetal');
    pathRef.current = path;


    // Load GLB model with proper texture handling
    const loader = new GLTFLoader();
    
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;

        // Analyze model components and structure

        // Analyze all meshes in the model - NO COLOR CHANGES
        let meshCount = 0;
        let materialCount = 0;
        let shipMeshCount = 0;
        let containerMeshCount = 0;
        let otherMeshCount = 0;
        const materials = new Set();
        
        // Ship materials (for counting only)
        const shipMaterials = ['Ship.001', 'Ship.002', 'Ship.003', 'Ship.004'];
        
        // Container detection patterns (for counting only)
        const containerPatterns = [
          /container/i, /cargo/i, /box/i, /crate/i, /freight/i,
          /shipping/i, /load/i, /stack/i, /unit/i, /teu/i,
          /twenty/i, /forty/i, /dry/i, /refrigerated/i, /reefer/i
        ];
        
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            meshCount++;
            
            const meshName = child.name || 'Unnamed';
            let meshType = 'other';
            let materialName = '';
            
            // Get material name for categorization
            if (child.material) {
              if (Array.isArray(child.material)) {
                materialName = child.material[0]?.name || '';
              } else {
                materialName = child.material.name || '';
              }
            }
            
            // Determine mesh type for counting only - NO COLOR CHANGES
            const isShipMesh = shipMaterials.includes(materialName);
            const isContainerMesh = containerPatterns.some(pattern => pattern.test(meshName));
            
            if (isShipMesh) {
              meshType = 'ship';
              shipMeshCount++;
              console.log(`  → Ship mesh detected: ${meshName} (${materialName}) - keeping original material`);
            } else if (isContainerMesh) {
              meshType = 'container';
              containerMeshCount++;
              console.log(`  → Container mesh detected: ${meshName} - keeping original material`);
            } else {
              meshType = 'other';
              otherMeshCount++;
              console.log(`  → Other mesh detected: ${meshName} - keeping original material`);
            }
            
            // NO MATERIAL CHANGES - keep all original colors
            // Just fix material issues while preserving original appearance
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((material) => {
                  // Keep original material but fix texture issues
                  if (material.map && !material.map.image) {
                    // Create a fallback texture if the original failed to load
                    const fallbackTexture = new THREE.TextureLoader().load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
                    material.map = fallbackTexture;
                  }
                  // Ensure material properties are set
                  material.needsUpdate = true;
                });
              } else {
                if (child.material.map && !child.material.map.image) {
                  // Create a fallback texture if the original failed to load
                  const fallbackTexture = new THREE.TextureLoader().load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
                  child.material.map = fallbackTexture;
                }
                child.material.needsUpdate = true;
              }
            }
            
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((mat) => {
                  materials.add(mat.type);
                  materialCount++;
                });
              } else {
                materials.add(child.material.type);
                materialCount++;
              }
            }
          }
        });
        
        console.log('=== MODEL ANALYSIS RESULTS (YUKA PATH) ===');
        console.log('Total meshes:', meshCount);
        console.log('Ship meshes (original colors):', shipMeshCount);
        console.log('Container meshes (original colors):', containerMeshCount);
        console.log('Other meshes (original colors):', otherMeshCount);
        console.log('Total materials:', materialCount);
        console.log('Material types:', Array.from(materials));
        
        // Ship breakdown
        console.log('=== SHIP BREAKDOWN ===');
        const shipBreakdown: { [key: string]: number } = {
          'Ship.001': 0,
          'Ship.002': 0,
          'Ship.003': 0,
          'Ship.004': 0
        };
        
        model.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            const materialName = Array.isArray(child.material) ? child.material[0]?.name : child.material.name;
            if (materialName && shipBreakdown.hasOwnProperty(materialName)) {
              shipBreakdown[materialName]++;
            }
          }
        });
        
        Object.keys(shipBreakdown).forEach(shipId => {
          console.log(`${shipId}: ${shipBreakdown[shipId]} meshes`);
        });
        
        console.log('=== END ANALYSIS (YUKA PATH) ===');
        
        // Send analysis data to parent component
        onModelAnalysis?.({
          totalMeshes: meshCount,
          shipMeshes: shipMeshCount,
          containerMeshes: containerMeshCount,
          otherMeshes: otherMeshCount,
          shipBreakdown: shipBreakdown,
          materialTypes: Array.from(materials) as string[]
        });

                // Calculate bounding box and center the model
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                model.position.sub(center);
                model.scale.setScalar(mobile ? scale * 0.8 : scale); // Slightly smaller on mobile

                // Enable shadows only on desktop
                if (!mobile) {
                  model.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                      child.castShadow = true;
                      child.receiveShadow = true;
                    }
                  });
                }

        scene.add(model);
        setIsModelLoaded(true); // Mark model as loaded
        onLoad?.(); // Call the load callback
      },
      (progress) => {
        const progressPercent = (progress.loaded / progress.total * 100);
        console.log('Model loading progress:', progressPercent + '%');
        onProgress?.(progressPercent);
      },
      (error) => {
        console.error('Error loading GLB model:', error);
        console.log('Model path was:', modelPath);
        onError?.(); // Call the error callback
      }
    );

    // Yuka-based scroll-driven camera animation with mobile optimizations
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      // Throttle scroll events on mobile for better performance
      if (mobile) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          updateCameraPosition();
        }, 16); // ~60fps
      } else {
        updateCameraPosition();
      }
    };

    const updateCameraPosition = () => {
      // Always run scroll animation, even if model isn't loaded yet
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Fix: Ensure we have a minimum scrollable height
      const minScrollHeight = Math.max(documentHeight, window.innerHeight * 2);
      const progress = Math.min(scrollTop / minScrollHeight, 1);
      
      setScrollProgress(progress);
      
      if (pathRef.current) {
        // Get position along the smooth curve based on scroll progress
        const pathPosition = pathRef.current.getPoint(progress);
        
        if (pathPosition) {
          // Apply the calculated position
          camera.position.set(pathPosition.x, pathPosition.y, pathPosition.z);
          
          // Calculate look-at target for surface-level viewing
          const lookAtTarget = new THREE.Vector3(0, 0, 0);
          camera.lookAt(lookAtTarget);
          
          // Interpolate FOV based on progress (simplified for mobile)
          const fovIndex = Math.floor(progress * (CAMERA_FOV_VALUES.length - 1));
          const nextFovIndex = Math.min(fovIndex + 1, CAMERA_FOV_VALUES.length - 1);
          const fovProgress = (progress * (CAMERA_FOV_VALUES.length - 1)) - fovIndex;
          
          const currentFov = THREE.MathUtils.lerp(
            CAMERA_FOV_VALUES[fovIndex], 
            CAMERA_FOV_VALUES[nextFovIndex], 
            fovProgress
          );
          
          camera.fov = currentFov;
          camera.updateProjectionMatrix();
        }
      }
      
      // Add subtle model rotation based on scroll (only if model is loaded)
      if (modelRef.current && isModelLoaded) {
        modelRef.current.rotation.y = progress * Math.PI * 0.1; // Subtle rotation
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Set initial camera position
    handleScroll();
    
    // Add keyboard controls for testing (WASD keys)
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'w' || event.key === 'W') {
        // Simulate scroll down
        window.scrollBy(0, 100);
      } else if (event.key === 's' || event.key === 'S') {
        // Simulate scroll up
        window.scrollBy(0, -100);
      } else if (event.key === 'r' || event.key === 'R') {
        // Reset scroll
        window.scrollTo(0, 0);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);

    // Animation loop with mobile optimizations
    let lastTime = 0;
    const targetFPS = mobile ? 30 : 60; // Lower FPS on mobile
    const frameInterval = 1000 / targetFPS;
    
    const animate = (currentTime: number) => {
      // Throttle animation on mobile
      if (mobile && currentTime - lastTime < frameInterval) {
        animationIdRef.current = requestAnimationFrame(animate);
        return;
      }
      
      lastTime = currentTime;
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      animationIdRef.current = requestAnimationFrame(animate);
    };
    animate(0);

    // Handle resize with mobile optimizations
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      // Throttle resize events on mobile
      if (mobile) {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          performResize();
        }, 100);
      } else {
        performResize();
      }
    };

    const performResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
      
      // Update mobile detection on resize
      const newMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (newMobile !== mobile) {
        setIsMobile(newMobile);
        // Update renderer settings if mobile status changed
        rendererRef.current.setPixelRatio(newMobile ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio);
      }
    };

    window.addEventListener('resize', handleResize);
    mountRef.current.appendChild(renderer.domElement);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyPress);
      
      // Clear timeouts
      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (resizeTimeout) clearTimeout(resizeTimeout);
      
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
  }, [modelPath, scale]);

  return (
    <div 
      ref={mountRef} 
      className={`w-full h-full fixed inset-0 pointer-events-none ${className}`}
      style={{ 
        background: 'transparent',
        zIndex: 0
      }}
    >
      
      {/* Mobile performance indicator */}
      {isMobile && (
        <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-50">
          Mobile Mode
        </div>
      )}
      
    </div>
  );
};

export default ScrollDrivenModelYuka;
