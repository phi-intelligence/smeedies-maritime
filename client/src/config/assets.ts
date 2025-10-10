// S3 Assets Configuration
const S3_BASE_URL = 'https://smeedies-maritime-assets.s3.amazonaws.com';

export const ASSETS = {
  // Videos
  videos: {
    backgroundNew: `${S3_BASE_URL}/videos/background-new.mp4`,
    logistics3: `${S3_BASE_URL}/videos/logistics-3.mp4`,
    logistics5: `${S3_BASE_URL}/videos/logistics-5.mp4`,
    ship: `${S3_BASE_URL}/videos/Ship.mp4`,
    services: `${S3_BASE_URL}/videos/Services.mp4`,
    tem2: `${S3_BASE_URL}/videos/tem2.mp4`,
    underwater: `${S3_BASE_URL}/videos/underwater.mp4`,
    logstics4: `${S3_BASE_URL}/videos/logstics4.mp4`,
  },
  
  // Images
  images: {
    // Hero and backgrounds
    hero: `${S3_BASE_URL}/images/hero.jpg`,
    light: `${S3_BASE_URL}/images/light.jpg`,
    earth: `${S3_BASE_URL}/images/earth.jpg`,
    earthJpeg: `${S3_BASE_URL}/images/earth.jpeg`,
    earthb: `${S3_BASE_URL}/images/earthb.jpg`,
    earthc: `${S3_BASE_URL}/images/earthc.jpg`,
    
    // Port and logistics
    cargoShipLoading: `${S3_BASE_URL}/images/cargo_ship_loading_v_b9f8b6f4.jpg`,
    cargoShipMiami: `${S3_BASE_URL}/images/cargo-ship-miami-harbor.jpg`,
    cargoShipsDocked: `${S3_BASE_URL}/images/cargo-ships-docked-port-night.jpg`,
    containerCargoShip: `${S3_BASE_URL}/images/container-cargo-freight-ship-port-twilight.jpg`,
    distantShotPort: `${S3_BASE_URL}/images/distant-shot-port-with-boats-loaded-with-cargo-shipment-nighttime.jpg`,
    exportShipLogistics: `${S3_BASE_URL}/images/export-ship-logistics-industrial-trade.jpg`,
    industrialContainer: `${S3_BASE_URL}/images/industrial-container-cargo-freight-ship-habor-logistic-import-export.jpg`,
    logistics: `${S3_BASE_URL}/images/logistics.jpg`,
    logistics2: `${S3_BASE_URL}/images/logistics-2.jpg`,
    maritimeLogistics: `${S3_BASE_URL}/images/maritime_logistics_w_d9957c6e.jpg`,
    nightTimeIndustrial: `${S3_BASE_URL}/images/night-time-industrial-port-scene-with-shipping-containers-reflective-surfaces.jpg`,
    portCraneOperation: `${S3_BASE_URL}/images/port_crane_operation_01b3e60a.jpg`,
    portOperations5753: `${S3_BASE_URL}/images/port_operations_carg_5753cff0.jpg`,
    portOperationsB8c7: `${S3_BASE_URL}/images/port_operations_carg_b8c76e3c.jpg`,
    shippingContainers: `${S3_BASE_URL}/images/shipping_containers__4ae963ed.jpg`,
    shippingPort47da: `${S3_BASE_URL}/images/shipping_port_cargo__47da743f.jpg`,
    shippingPortC474: `${S3_BASE_URL}/images/shipping_port_cargo__c474df47.jpg`,
    
    // Warehousing
    warehouseB8d9: `${S3_BASE_URL}/images/warehouse_logistics__b8d9236e.jpg`,
    warehouseE80d: `${S3_BASE_URL}/images/warehouse_logistics__e80d910e.jpg`,
    
    // Ghana specific
    ghanaPort: `${S3_BASE_URL}/images/ghana_port_infrastru_7ef9101d.jpg`,
    gh04: `${S3_BASE_URL}/images/gh-04.jpg`,
    westafrica: `${S3_BASE_URL}/images/westafrica.jpg`,
    temaPort: `${S3_BASE_URL}/images/Tema_Port_aerial_view_2afebff1.png`,
    
    // City and aerial
    aerialViewBusiness: `${S3_BASE_URL}/images/aerial-view-business-district-night.jpg`,
    blurredNightlights: `${S3_BASE_URL}/images/blurred-nightlights-city.jpg`,
    
    // Generated images
    maritimePortHero: `${S3_BASE_URL}/images/Maritime_port_hero_background_94b32449.png`,
  }
};

// Helper function to get asset URL
export const getAssetUrl = (type: keyof typeof ASSETS, key: string): string => {
  const assetType = ASSETS[type] as Record<string, string>;
  return assetType[key] || '';
};

// Helper function to get video URL
export const getVideoUrl = (videoKey: keyof typeof ASSETS.videos): string => {
  return ASSETS.videos[videoKey];
};

// Helper function to get image URL
export const getImageUrl = (imageKey: keyof typeof ASSETS.images): string => {
  return ASSETS.images[imageKey];
};
