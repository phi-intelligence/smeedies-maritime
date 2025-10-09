import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ScrollDrivenModelOriginalProps {
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

// Define camera positions for scroll-driven animation with dramatic distances
const CAMERA_POSITIONS = {
  // Starting position - extremely distant and elevated view
  start: { 
    position: new THREE.Vector3(50, 40, 50), // Very far back and high
    lookAt: new THREE.Vector3(0, 0, 0),
    fov: 25 // Very narrow FOV for dramatic effect
  },
  
  // Middle position - still quite distant view
  middle: { 
    position: new THREE.Vector3(25, 15, 25), // Still far but closer than start
    lookAt: new THREE.Vector3(0, 0, 0),
    fov: 35 // Narrow FOV
  },
  
  // Final position - much closer but still with perspective
  end: { 
    position: new THREE.Vector3(8, 4, 8), // Closer but not too intimate
    lookAt: new THREE.Vector3(0, 0, 0),
    fov: 50 // Medium FOV for balanced view
  }
};

const ScrollDrivenModelOriginal: React.FC<ScrollDrivenModelOriginalProps> = ({ 
  className = "", 
  modelPath = "/src/assets/models/smeediessnew1.glb",
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
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Load GLB model with proper texture handling
    const loader = new GLTFLoader();
    
    console.log('Loading GLB model from:', modelPath);
    loader.load(
      modelPath,
      (gltf) => {
        console.log('GLB model loaded successfully:', gltf);
        const model = gltf.scene;
        modelRef.current = model;

        // Analyze model components and structure
        console.log('=== MODEL ANALYSIS (ORIGINAL COLORS) ===');
        console.log('Model children count:', model.children.length);
        console.log('Model position:', model.position);
        console.log('Model rotation:', model.rotation);
        console.log('Model scale:', model.scale);

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
        
        console.log('=== MODEL ANALYSIS RESULTS (ORIGINAL COLORS) ===');
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
        
        console.log('=== END ANALYSIS (ORIGINAL COLORS) ===');
        
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
        model.scale.setScalar(scale);

        // Enable shadows
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

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

    // Scroll-driven camera animation - SAME AS ORIGINAL
    const handleScroll = () => {
      // Always run scroll animation, even if model isn't loaded yet
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Fix: Ensure we have a minimum scrollable height
      const minScrollHeight = Math.max(documentHeight, window.innerHeight * 2);
      const progress = Math.min(scrollTop / minScrollHeight, 1);
      
      console.log('Scroll Debug:', {
        scrollTop,
        documentHeight,
        minScrollHeight,
        progress,
        isModelLoaded
      });
      
      setScrollProgress(progress);
      
      // Three-stage camera animation
      const startPos = CAMERA_POSITIONS.start.position;
      const middlePos = CAMERA_POSITIONS.middle.position;
      const endPos = CAMERA_POSITIONS.end.position;
      
      // Smooth interpolation using easing function
      const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const easedProgress = easeInOutCubic(progress);
      
      let currentPos: THREE.Vector3;
      let currentFov: number;
      
      // Determine which stage we're in and interpolate accordingly
      if (progress <= 0.5) {
        // First half: Start to Middle
        const stageProgress = progress * 2; // 0 to 1 for first half
        const easedStageProgress = easeInOutCubic(stageProgress);
        currentPos = new THREE.Vector3().lerpVectors(startPos, middlePos, easedStageProgress);
        currentFov = THREE.MathUtils.lerp(CAMERA_POSITIONS.start.fov, CAMERA_POSITIONS.middle.fov, easedStageProgress);
      } else {
        // Second half: Middle to End
        const stageProgress = (progress - 0.5) * 2; // 0 to 1 for second half
        const easedStageProgress = easeInOutCubic(stageProgress);
        currentPos = new THREE.Vector3().lerpVectors(middlePos, endPos, easedStageProgress);
        currentFov = THREE.MathUtils.lerp(CAMERA_POSITIONS.middle.fov, CAMERA_POSITIONS.end.fov, easedStageProgress);
      }
      
      // Apply the calculated position and FOV
      camera.position.copy(currentPos);
      
      // Calculate look-at target for surface-level viewing
      // Look at the center of the model (0, 0, 0) for better surface viewing
      const lookAtTarget = new THREE.Vector3(0, 0, 0);
      camera.lookAt(lookAtTarget);
      
      // Apply FOV
      camera.fov = currentFov;
      camera.updateProjectionMatrix();
      
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
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyPress);
      
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
      {!isModelLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p className="text-sm">Loading 3D Model...</p>
          </div>
        </div>
      )}
      
      {/* Debug display for scroll progress and model analysis */}
      <div className="absolute top-4 left-4 z-50 bg-black/80 text-white p-3 rounded text-xs">
        <div>Scroll Progress: {Math.round(scrollProgress * 100)}%</div>
        <div>Camera Position: ({cameraRef.current?.position.x.toFixed(2)}, {cameraRef.current?.position.y.toFixed(2)}, {cameraRef.current?.position.z.toFixed(2)})</div>
        <div>FOV: {cameraRef.current?.fov.toFixed(1)}°</div>
        <div>Model Loaded: {isModelLoaded ? 'Yes' : 'No'}</div>
        <div className="mt-2 text-yellow-300">
          <div>Start: (50, 40, 50) → Middle: (25, 15, 25) → End: (8, 4, 8)</div>
          <div>FOV: 25° → 35° → 50°</div>
          <div>Stage: {scrollProgress <= 0.5 ? 'Start→Middle' : 'Middle→End'}</div>
        </div>
        {isModelLoaded && (
          <div className="mt-2 text-blue-300 text-xs">
            <div>🚢 4 Cargo Ships (Original Colors)</div>
            <div>📦 41 Colored Containers (Original Colors)</div>
            <div>🌍 All Continents (Original Colors)</div>
            <div className="text-green-300">
              <div>Ship.001, Ship.002, Ship.003, Ship.004</div>
              <div>Red, Blue, Yellow containers</div>
            </div>
            <div className="text-yellow-300 mt-1">
              <div>🎨 NO COLOR CHANGES - ORIGINAL MODEL</div>
              <div>📹 SAME SCROLL ANIMATION</div>
              <div>🎯 Only Camera Movement Modified</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollDrivenModelOriginal;
