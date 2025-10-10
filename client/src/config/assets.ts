/**
 * Asset Loading Utilities for Amplify + S3 Deployment
 * Handles asset URL generation and loading for S3 storage
 */

// Asset base URL for S3 (configured during deployment)
const ASSET_BASE_URL = process.env.NODE_ENV === 'production' 
  ? `https://${process.env.VITE_S3_BUCKET_NAME}.s3.${process.env.VITE_AWS_REGION}.amazonaws.com/public` 
  : '/assets';

/**
 * Generate asset URL for S3 or local development
 */
export const getAssetUrl = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${ASSET_BASE_URL}/${cleanPath}`;
};

/**
 * Asset path constants for organized structure
 */
export const ASSET_PATHS = {
  // Videos
  VIDEOS: {
    BACKGROUND_NEW: 'videos/background-new.mp4',
    LOGISTICS_3: 'videos/logistics-3.mp4',
    LOGISTICS_5: 'videos/logistics-5.mp4',
    SHIP: 'videos/Ship.mp4',
    SERVICES: 'videos/Services.mp4',
    TEM2: 'videos/tem2.mp4',
    UNDERWATER: 'videos/underwater.mp4',
    LOGSTICS4: 'videos/logstics4.mp4',
  },
  
  // 3D Models
  MODELS: {
    MODEL_3D: 'models/3d-model.dae',
    BASE_BASIC_PBR: 'models/base_basic_pbr.glb',
    BASE_BASIC_SHADED: 'models/base_basic_shaded.glb',
    CONTAINER_SHIP: 'models/container_ship.glb',
    SMEEDIES_GLB_NEW: 'models/smeediesglbnew.glb',
    SMEEDIES_NEW_1: 'models/smeediessnew1.glb',
  },
  
  // Images
  IMAGES: {
    // Hero and backgrounds
    HERO: 'images/hero.jpg',
    LIGHT: 'images/light.jpg',
    EARTH: 'images/earth.jpg',
    EARTH_JPEG: 'images/earth.jpeg',
    EARTHB: 'images/earthb.jpg',
    EARTHC: 'images/earthc.jpg',
    
    // Port and logistics
    CARGO_SHIP_LOADING: 'images/cargo_ship_loading_v_b9f8b6f4.jpg',
    CARGO_SHIP_MIAMI: 'images/cargo-ship-miami-harbor.jpg',
    CARGO_SHIPS_DOCKED: 'images/cargo-ships-docked-port-night.jpg',
    CONTAINER_CARGO_SHIP: 'images/container-cargo-freight-ship-port-twilight.jpg',
    DISTANT_SHOT_PORT: 'images/distant-shot-port-with-boats-loaded-with-cargo-shipment-nighttime.jpg',
    EXPORT_SHIP_LOGISTICS: 'images/export-ship-logistics-industrial-trade.jpg',
    INDUSTRIAL_CONTAINER: 'images/industrial-container-cargo-freight-ship-habor-logistic-import-export.jpg',
    LOGISTICS: 'images/logistics.jpg',
    LOGISTICS_2: 'images/logistics-2.jpg',
    MARITIME_LOGISTICS: 'images/maritime_logistics_w_d9957c6e.jpg',
    NIGHT_TIME_INDUSTRIAL: 'images/night-time-industrial-port-scene-with-shipping-containers-reflective-surfaces.jpg',
    PORT_CRANE_OPERATION: 'images/port_crane_operation_01b3e60a.jpg',
    PORT_OPERATIONS_5753: 'images/port_operations_carg_5753cff0.jpg',
    PORT_OPERATIONS_B8C7: 'images/port_operations_carg_b8c76e3c.jpg',
    SHIPPING_CONTAINERS: 'images/shipping_containers__4ae963ed.jpg',
    SHIPPING_PORT_47DA: 'images/shipping_port_cargo__47da743f.jpg',
    SHIPPING_PORT_C474: 'images/shipping_port_cargo__c474df47.jpg',
    
    // Warehousing
    WAREHOUSE_B8D9: 'images/warehouse_logistics__b8d9236e.jpg',
    WAREHOUSE_E80D: 'images/warehouse_logistics__e80d910e.jpg',
    
    // Ghana specific
    GHANA_PORT: 'images/ghana_port_infrastru_7ef9101d.jpg',
    GH_04: 'images/gh-04.jpg',
    WEST_AFRICA: 'images/westafrica.jpg',
    TEMA_PORT: 'images/Tema_Port_aerial_view_2afebff1.png',
    
    // City and aerial
    AERIAL_VIEW_BUSINESS: 'images/aerial-view-business-district-night.jpg',
    BLURRED_NIGHTLIGHTS: 'images/blurred-nightlights-city.jpg',
    
    // Generated images
    MARITIME_PORT_HERO: 'images/Maritime_port_hero_background_94b32449.png',
  }
} as const;

// Helper functions for specific asset types
export const getVideoUrl = (videoKey: keyof typeof ASSET_PATHS.VIDEOS): string => {
  return getAssetUrl(ASSET_PATHS.VIDEOS[videoKey]);
};

export const getImageUrl = (imageKey: keyof typeof ASSET_PATHS.IMAGES): string => {
  return getAssetUrl(ASSET_PATHS.IMAGES[imageKey]);
};

export const getModelUrl = (modelKey: keyof typeof ASSET_PATHS.MODELS): string => {
  return getAssetUrl(ASSET_PATHS.MODELS[modelKey]);
};
