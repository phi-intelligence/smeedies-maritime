import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import earthImage from '../assets/images/earth.jpeg';
import earthbImage from '../assets/images/earthb.jpg';
import earthcImage from '../assets/images/earthc.jpg';
import lightImage from '../assets/images/light.jpg';

interface ShippingGlobeProps {
  className?: string;
  showUI?: boolean;
  glassmorphic?: boolean;
}

const ShippingGlobe: React.FC<ShippingGlobeProps> = ({ className = "", showUI = true, glassmorphic = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedShipment, setSelectedShipment] = useState<any>(null);
  const [hoveredPort, setHoveredPort] = useState<any>(null);
  
  // Add refs to track Three.js objects for disposal
  const texturesRef = useRef<THREE.Texture[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background
    
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced lighting for glassmorphic effect
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // Add rim lighting for glass effect
    const rimLight = new THREE.DirectionalLight(0xbfdbfe, 0.3);
    rimLight.position.set(-5, -3, -5);
    scene.add(rimLight);
    
    // Add subtle point light for glow
    const pointLight = new THREE.PointLight(0xffffff, 0.5, 10);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // Load earth texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(earthImage);
    const earthNormalMap = textureLoader.load(earthbImage);
    const earthSpecularMap = textureLoader.load(earthcImage);
    const earthCloudsMap = textureLoader.load(lightImage);
    
    // Track textures for disposal
    texturesRef.current = [earthTexture, earthNormalMap, earthSpecularMap, earthCloudsMap];

    // Create continent outlines with ash/white color (matching country meshes)
    const continentGeometry = new THREE.SphereGeometry(1.0, 64, 64);
    const continentMaterial = new THREE.MeshBasicMaterial({
      color: 0xf5f5f5, // Light ash/white color (same as countries)
      transparent: true,
      opacity: 0.9, // High opacity for solid appearance
      side: THREE.DoubleSide,
      alphaMap: earthTexture, // Use texture for transparency (oceans transparent, land visible)
      alphaTest: 0.5 // Higher alphaTest to show only land masses
    });
    const continentMesh = new THREE.Mesh(continentGeometry, continentMaterial);
    scene.add(continentMesh);

    // Create invisible globe sphere (completely hidden) - only for positioning routes
    const globeGeometry = new THREE.SphereGeometry(1.0, 64, 64);
    const globeMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0, // Completely invisible
      visible: false // Ensure it's not visible
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    globe.visible = false; // Force invisible
    // Don't add to scene - just use for positioning

    // Grid lines removed for cleaner look

    // Convert lat/lon to 3D position on sphere
    const latLonToVector3 = (lat: number, lon: number, radius: number = 1) => {
      const phi = (90 - lat) * Math.PI / 180;
      const theta = (lon + 180) * Math.PI / 180;
      return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    };

    // Major ports with realistic coordinates (comprehensive global coverage)
    const ports = [
      // West African Ports
      { name: 'Tema', lat: 5.6037, lon: -0.0169, color: 0x8b6914 }, // Ghana
      { name: 'Takoradi', lat: 4.9000, lon: -1.7667, color: 0x8b6914 }, // Ghana
      { name: 'Lagos', lat: 6.5244, lon: 3.3792, color: 0xff6b6b }, // Nigeria
      { name: 'Abidjan', lat: 5.3600, lon: -4.0083, color: 0x4ecdc4 }, // Côte d'Ivoire
      { name: 'Dakar', lat: 14.7167, lon: -17.4672, color: 0xffe66d }, // Senegal
      { name: 'Casablanca', lat: 33.5731, lon: -7.5898, color: 0x95e1d3 }, // Morocco
      
      // European Ports
      { name: 'Rotterdam', lat: 51.9244, lon: 4.4777, color: 0xf38181 }, // Netherlands
      { name: 'Hamburg', lat: 53.5511, lon: 9.9937, color: 0x66d9ef }, // Germany
      { name: 'Antwerp', lat: 51.2194, lon: 4.4025, color: 0xfd79a8 }, // Belgium
      { name: 'Le Havre', lat: 49.4944, lon: 0.1075, color: 0xa29bfe }, // France
      { name: 'Southampton', lat: 50.9097, lon: -1.4044, color: 0xff7675 }, // UK
      
      // Asian Ports
      { name: 'Singapore', lat: 1.3521, lon: 103.8198, color: 0xaa96da },
      { name: 'Shanghai', lat: 31.2304, lon: 121.4737, color: 0xff9ff3 },
      { name: 'Hong Kong', lat: 22.3193, lon: 114.1694, color: 0x6c5ce7 },
      { name: 'Shenzhen', lat: 22.5431, lon: 114.0579, color: 0xfd79a8 },
      { name: 'Ningbo', lat: 29.8683, lon: 121.5440, color: 0x00b894 },
      { name: 'Busan', lat: 35.1796, lon: 129.0756, color: 0xfdcb6e },
      { name: 'Tokyo', lat: 35.6762, lon: 139.6503, color: 0xe17055 },
      { name: 'Mumbai', lat: 19.0760, lon: 72.8777, color: 0x00cec9 },
      
      // North American Ports
      { name: 'Los Angeles', lat: 33.7701, lon: -118.1937, color: 0x74b9ff },
      { name: 'Long Beach', lat: 33.7701, lon: -118.1937, color: 0x0984e3 },
      { name: 'New York', lat: 40.7128, lon: -74.0060, color: 0xfd79a8 },
      { name: 'Savannah', lat: 32.0835, lon: -81.0998, color: 0x00b894 },
      { name: 'Vancouver', lat: 49.2827, lon: -123.1207, color: 0x6c5ce7 },
      { name: 'Montreal', lat: 45.5017, lon: -73.5673, color: 0xfdcb6e },
      
      // South American Ports
      { name: 'Santos', lat: -23.9618, lon: -46.3322, color: 0xe17055 },
      { name: 'Buenos Aires', lat: -34.6118, lon: -58.3960, color: 0xfd79a8 },
      { name: 'Valparaiso', lat: -33.0458, lon: -71.6197, color: 0x00cec9 },
      
      // Middle East Ports
      { name: 'Dubai', lat: 25.2048, lon: 55.2708, color: 0xff7675 },
      { name: 'Jebel Ali', lat: 25.0172, lon: 55.0619, color: 0xa29bfe },
      
      // Australian Ports
      { name: 'Sydney', lat: -33.8688, lon: 151.2093, color: 0x00b894 },
      { name: 'Melbourne', lat: -37.8136, lon: 144.9631, color: 0xfdcb6e }
    ];

    const portMeshes: THREE.Group[] = [];

    // Port markers removed - keeping only shipping route lines

    // White route colors for all lines
    const routeColors = [
      0xffffff, // White
      0xffffff, // White
      0xffffff, // White
      0xffffff, // White
      0xffffff, // White
      0xffffff, // White
      0xffffff, // White
      0xffffff, // White
      0xffffff, // White
      0xffffff, // White
    ];

    // Globally distributed shipping routes for even coverage
    const routes = [
      // North America to Europe (Atlantic)
      { from: 'New York', to: 'Rotterdam', containers: 3, color: 0x8b6914 },
      { from: 'Los Angeles', to: 'Hamburg', containers: 2, color: 0x8b6914 },
      
      // North America to Asia (Pacific)
      { from: 'Seattle', to: 'Tokyo', containers: 2, color: 0x8b6914 },
      { from: 'Vancouver', to: 'Shanghai', containers: 3, color: 0x8b6914 },
      
      // Europe to Asia (via Suez)
      { from: 'Rotterdam', to: 'Singapore', containers: 3, color: 0x8b6914 },
      { from: 'Hamburg', to: 'Hong Kong', containers: 2, color: 0x8b6914 },
      
      // Asia to Australia (Pacific)
      { from: 'Singapore', to: 'Sydney', containers: 2, color: 0x8b6914 },
      { from: 'Shanghai', to: 'Melbourne', containers: 2, color: 0x8b6914 },
      
      // Africa to Europe (Mediterranean)
      { from: 'Tema', to: 'Rotterdam', containers: 2, color: 0x8b6914 },
      { from: 'Dakar', to: 'Hamburg', containers: 1, color: 0x8b6914 },
      
      // Africa to Asia (Indian Ocean)
      { from: 'Lagos', to: 'Mumbai', containers: 2, color: 0x8b6914 },
      { from: 'Durban', to: 'Singapore', containers: 1, color: 0x8b6914 },
      
      // South America to North America (Atlantic)
      { from: 'Santos', to: 'New York', containers: 2, color: 0x8b6914 },
      { from: 'Buenos Aires', to: 'Los Angeles', containers: 1, color: 0x8b6914 },
      
      // South America to Europe (Atlantic)
      { from: 'Santos', to: 'Rotterdam', containers: 2, color: 0x8b6914 },
      
      // Middle East connections
      { from: 'Dubai', to: 'Rotterdam', containers: 2, color: 0x8b6914 },
      { from: 'Dubai', to: 'Singapore', containers: 1, color: 0x8b6914 }
    ];

    const shipments: any[] = [];

    routes.forEach((route, idx) => {
      const fromPort = ports.find(p => p.name === route.from);
      const toPort = ports.find(p => p.name === route.to);
      
      if (!fromPort || !toPort) return;

      const start = latLonToVector3(fromPort.lat, fromPort.lon, 1.0);
      const end = latLonToVector3(toPort.lat, toPort.lon, 1.0);
      
      // Create arc between ports
      const distance = start.distanceTo(end);
      const mid = new THREE.Vector3()
        .addVectors(start, end)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(1 + distance * 0.3);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(50);
      
      // Get colorful route color
      const routeColor = routeColors[idx % routeColors.length];
      
      // Route line with white styling and proper visibility
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0xffffff, // White color for visibility
        transparent: true, 
        opacity: 1.0, // Full opacity for visibility
        linewidth: 6, // Increased line width for better visibility
        depthTest: true,
        depthWrite: false
      });
      
      const line = new THREE.Line(lineGeometry, lineMaterial);
      line.userData = { 
        route, 
        totalLength: points.length,
        currentLength: 0,
        animationSpeed: 0.008 + Math.random() * 0.004, // Faster animation
        originalPoints: points.slice(),
        startPoint: points[0],
        endPoint: points[points.length - 1],
        routeColor: routeColor
      };
      
      continentMesh.add(line);

      // Add connection nodes (white circular markers)
      const nodeGeometry = new THREE.SphereGeometry(0.015, 16, 16); // Smaller dots
      const nodeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, // White color for visibility
        transparent: true,
        opacity: 1.0 // Full opacity for better visibility
      });
      
      // Start node
      const startNode = new THREE.Mesh(nodeGeometry, nodeMaterial);
      startNode.position.copy(start);
      continentMesh.add(startNode);
      
      // End node
      const endNode = new THREE.Mesh(nodeGeometry, nodeMaterial);
      endNode.position.copy(end);
      continentMesh.add(endNode);
    });

    // Mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseMove = (event: MouseEvent) => {
      if (!mountRef.current) return;
      
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;
        
        continentMesh.rotation.y += deltaX * 0.005;
        continentMesh.rotation.x += deltaY * 0.005;
        
        continentMesh.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, continentMesh.rotation.x));
      }

      previousMousePosition = { x: event.clientX, y: event.clientY };

      // Raycasting for hover
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(portMeshes, true);
      
      if (intersects.length > 0) {
        const portGroup = intersects[0].object.parent;
        if (portGroup && portGroup.userData && portGroup.userData.port) {
          setHoveredPort(portGroup.userData.port);
          if (renderer.domElement) {
            renderer.domElement.style.cursor = 'pointer';
          }
        }
      } else {
        setHoveredPort(null);
        if (renderer.domElement) {
          renderer.domElement.style.cursor = 'default';
        }
      }
    };

    const onMouseDown = (event: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: event.clientX, y: event.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(portMeshes, true);
      
      if (intersects.length > 0) {
        const portGroup = intersects[0].object.parent;
        if (portGroup && portGroup.userData && portGroup.userData.port) {
          const nearbyShipments = shipments.filter(s => 
            s.route.includes(portGroup.userData.port.name)
          );
          if (nearbyShipments.length > 0) {
            setSelectedShipment({
              port: portGroup.userData.port,
              shipments: nearbyShipments
            });
          }
        }
      }
    };

    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('click', onClick);

    // Enhanced animation variables
    let animationId: number;
    let time = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.016; // ~60fps

      // Enhanced auto-rotation with subtle variations
      if (!isDragging) {
        const baseRotation = glassmorphic ? 0.001 : 0.002;
        const variation = Math.sin(time * 0.5) * 0.0002; // Subtle speed variation
        continentMesh.rotation.y += baseRotation + variation;
        
        // Add subtle bobbing motion
        const bobAmount = Math.sin(time * 0.3) * 0.02;
        continentMesh.position.y = bobAmount;
      }

      // Clouds removed - no animation needed

      // Port rings removed - no port markers

    // Animate route lines continuously emerging and ending
    scene.traverse((object) => {
      if (object instanceof THREE.Line && object.userData.route) {
        const userData = object.userData;
        
        // Initialize animation if not started
        if (userData.animationStart === undefined) {
          userData.animationStart = Date.now() + Math.random() * 1000; // Stagger start times
        }
        
        const elapsed = Date.now() - userData.animationStart;
        if (elapsed > 0) {
          userData.currentLength += userData.animationSpeed;
          
          if (userData.currentLength < 1) {
            // Create progressive line from start point extending toward end point
            const originalPoints = userData.originalPoints || [];
            const totalPoints = originalPoints.length;
            const visiblePoints = Math.max(2, Math.floor(userData.currentLength * totalPoints));
            
            if (visiblePoints <= totalPoints && originalPoints.length > 0) {
              // Create new geometry showing line emerging from start and extending toward end
              const visibleGeometry = new THREE.BufferGeometry();
              const visiblePositions = new Float32Array(visiblePoints * 3);
              
              // Progressively show line from start point to end point
              for (let i = 0; i < visiblePoints; i++) {
                visiblePositions[i * 3] = originalPoints[i].x;
                visiblePositions[i * 3 + 1] = originalPoints[i].y;
                visiblePositions[i * 3 + 2] = originalPoints[i].z;
              }
              
              visibleGeometry.setAttribute('position', new THREE.BufferAttribute(visiblePositions, 3));
              object.geometry = visibleGeometry;
            }
          } else {
            // Line is fully drawn - wait 2 seconds before restarting animation
            if (userData.waitStart === undefined) {
              userData.waitStart = Date.now(); // Start waiting period
            }
            
            const waitElapsed = Date.now() - userData.waitStart;
            if (waitElapsed >= 2000) { // Wait for 2 seconds (2000ms)
              // Reset and restart animation
              userData.currentLength = 0;
              userData.animationStart = Date.now() + Math.random() * 200;
              userData.waitStart = undefined; // Reset wait period
            }
          }
        }
      }
    });

      // Container movement removed - only lines are shown

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Add intersection observer to pause animation when not visible
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Resume animation if not already running
          if (!animationId) {
            animate();
          }
        } else {
          // Pause animation to save resources
          cancelAnimationFrame(animationId);
          animationId = 0;
        }
      },
      { threshold: 0.1 }
    );

    if (mountRef.current) {
      visibilityObserver.observe(mountRef.current);
    }

    // Cleanup
    return () => {
      // Cancel animation loop
      cancelAnimationFrame(animationId);
      
      // Remove event listeners
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement) {
        renderer.domElement.removeEventListener('mousemove', onMouseMove);
        renderer.domElement.removeEventListener('mousedown', onMouseDown);
        renderer.domElement.removeEventListener('mouseup', onMouseUp);
        renderer.domElement.removeEventListener('click', onClick);
      }
      
      // Dispose all Three.js objects
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material: THREE.Material) => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      
      // Dispose textures
      texturesRef.current.forEach(texture => texture.dispose());
      
      // Clear scene and dispose renderer
      scene.clear();
      renderer.dispose();
      
      // Remove DOM element
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Disconnect visibility observer
      visibilityObserver.disconnect();
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div ref={mountRef} className="w-full h-full" />
      
      {showUI && (
        <>
          {/* Title */}
          <div className="absolute top-6 left-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Global Shipping Routes</h1>
            <p className="text-slate-300">Real-time container tracking visualization</p>
          </div>

          {/* Legend */}
          <div className="absolute top-6 right-6 bg-slate-800/90 backdrop-blur-sm p-4 rounded-lg text-white max-w-xs">
            <h3 className="font-bold mb-2">Instructions</h3>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Drag to rotate the globe</li>
              <li>• Click ports to view shipments</li>
              <li>• Watch containers move along routes</li>
              <li>• Hover over ports for details</li>
            </ul>
          </div>

          {/* Port hover info */}
          {hoveredPort && (
            <div className="absolute bottom-24 left-6 bg-slate-800/90 backdrop-blur-sm p-4 rounded-lg text-white">
              <h3 className="font-bold text-lg" style={{ color: `#${hoveredPort.color.toString(16)}` }}>
                {hoveredPort.name}
              </h3>
              <p className="text-slate-300 text-sm">Click to view shipments</p>
            </div>
          )}

          {/* Shipment details */}
          {selectedShipment && (
            <div className="absolute bottom-6 left-6 bg-slate-800/95 backdrop-blur-sm p-6 rounded-lg text-white max-w-md">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-xl" style={{ color: `#${selectedShipment.port.color.toString(16)}` }}>
                  {selectedShipment.port.name}
                </h3>
                <button 
                  onClick={() => setSelectedShipment(null)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-300">Active Shipments:</h4>
                {selectedShipment.shipments.map((shipment: any, idx: number) => (
                  <div key={idx} className="bg-slate-700/50 p-3 rounded">
                    <div className="flex justify-between mb-1">
                      <span className="font-mono text-sm text-cyan-400">{shipment.id}</span>
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                        {shipment.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300">{shipment.route}</p>
                    <div className="mt-2 bg-slate-600 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-cyan-400 h-full transition-all duration-300"
                        style={{ width: `${shipment.progress * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Progress: {Math.round(shipment.progress * 100)}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="absolute bottom-6 right-6 bg-slate-800/90 backdrop-blur-sm p-4 rounded-lg text-white">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div>
                <div className="text-xl font-bold text-cyan-400">60+</div>
                <div className="text-xs text-slate-300">Active Shipments</div>
              </div>
              <div>
                <div className="text-xl font-bold text-green-400">29</div>
                <div className="text-xs text-slate-300">Major Ports</div>
              </div>
              <div>
                <div className="text-xl font-bold text-purple-400">35+</div>
                <div className="text-xs text-slate-300">Global Routes</div>
              </div>
              <div>
                <div className="text-xl font-bold text-orange-400">6</div>
                <div className="text-xs text-slate-300">Continents</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShippingGlobe;
