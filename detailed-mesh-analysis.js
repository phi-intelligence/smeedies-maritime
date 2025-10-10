#!/usr/bin/env node

import * as fs from 'fs';

function detailedMeshAnalysis(filePath) {
    console.log('🔍 DETAILED MESH ANALYSIS - smeediessnew1.glb');
    console.log('===============================================');
    
    try {
        const buffer = fs.readFileSync(filePath);
        const fileName = filePath.split('/').pop();
        
        // Parse GLB
        let offset = 12;
        let jsonChunk = null;
        
        while (offset < buffer.length) {
            const chunkLength = buffer.readUInt32LE(offset);
            const chunkType = buffer.readUInt32LE(offset + 4);
            
            const typeString = String.fromCharCode(
                chunkType & 0xFF,
                (chunkType >> 8) & 0xFF,
                (chunkType >> 16) & 0xFF,
                (chunkType >> 24) & 0xFF
            );
            
            if (typeString === 'JSON') {
                jsonChunk = buffer.slice(offset + 8, offset + 8 + chunkLength);
                break;
            }
            
            offset += 8 + chunkLength;
        }
        
        if (jsonChunk) {
            const jsonData = JSON.parse(jsonChunk.toString('utf8'));
            analyzeDetailedStructure(jsonData);
        }
        
    } catch (error) {
        console.log(`❌ Error: ${error.message}`);
    }
}

function analyzeDetailedStructure(jsonData) {
    console.log('\n🔍 DETAILED STRUCTURE ANALYSIS');
    console.log('==========================================');
    
    // Get all mesh names to understand the structure
    console.log('\n📋 ALL MESH NAMES (first 50):');
    if (jsonData.meshes) {
        jsonData.meshes.slice(0, 50).forEach((mesh, index) => {
            console.log(`   ${index}: "${mesh.name || `Unnamed_${index}`}"`);
        });
        if (jsonData.meshes.length > 50) {
            console.log(`   ... and ${jsonData.meshes.length - 50} more meshes`);
        }
    }
    
    // Analyze materials with colors
    console.log('\n🎨 COLORED MATERIALS ANALYSIS:');
    if (jsonData.materials) {
        const coloredMaterials = [];
        const countryMaterials = [];
        const shipMaterials = [];
        const containerMaterials = [];
        
        jsonData.materials.forEach((material, index) => {
            const materialName = material.name || `Material_${index}`;
            
            if (material.pbrMetallicRoughness && material.pbrMetallicRoughness.baseColorFactor) {
                const color = material.pbrMetallicRoughness.baseColorFactor;
                const rgb = {
                    r: Math.round(color[0] * 255),
                    g: Math.round(color[1] * 255),
                    b: Math.round(color[2] * 255)
                };
                
                const colorTone = getColorTone(rgb);
                
                // Categorize materials
                if (/^[A-Z]{2}$/.test(materialName)) {
                    countryMaterials.push({ index, name: materialName, rgb, tone: colorTone });
                } else if (/ship|vessel|hull|deck|bridge/i.test(materialName)) {
                    shipMaterials.push({ index, name: materialName, rgb, tone: colorTone });
                } else if (/container|cargo|box|crate/i.test(materialName)) {
                    containerMaterials.push({ index, name: materialName, rgb, tone: colorTone });
                } else if (['Red', 'Blue', 'Yellow', 'Green', 'Brown'].includes(colorTone)) {
                    coloredMaterials.push({ index, name: materialName, rgb, tone: colorTone });
                }
            }
        });
        
        console.log(`\n🌍 Country Materials (${countryMaterials.length}):`);
        countryMaterials.slice(0, 20).forEach(mat => {
            console.log(`   ${mat.index}: "${mat.name}" - ${mat.tone} (RGB: ${mat.rgb.r}, ${mat.rgb.g}, ${mat.rgb.b})`);
        });
        
        console.log(`\n🚢 Ship Materials (${shipMaterials.length}):`);
        shipMaterials.forEach(mat => {
            console.log(`   ${mat.index}: "${mat.name}" - ${mat.tone} (RGB: ${mat.rgb.r}, ${mat.rgb.g}, ${mat.rgb.b})`);
        });
        
        console.log(`\n📦 Container Materials (${containerMaterials.length}):`);
        containerMaterials.forEach(mat => {
            console.log(`   ${mat.index}: "${mat.name}" - ${mat.tone} (RGB: ${mat.rgb.r}, ${mat.rgb.g}, ${mat.rgb.b})`);
        });
        
        console.log(`\n🎨 Colored Materials (${coloredMaterials.length}):`);
        coloredMaterials.slice(0, 30).forEach(mat => {
            console.log(`   ${mat.index}: "${mat.name}" - ${mat.tone} (RGB: ${mat.rgb.r}, ${mat.rgb.g}, ${mat.rgb.b})`);
        });
    }
    
    // Analyze nodes to understand stacking relationships
    console.log('\n📍 NODE RELATIONSHIPS ANALYSIS:');
    if (jsonData.nodes) {
        const coloredNodes = [];
        const countryNodes = [];
        const shipNodes = [];
        
        jsonData.nodes.forEach((node, index) => {
            if (node.mesh !== undefined) {
                const meshName = jsonData.meshes[node.mesh]?.name || `Mesh_${node.mesh}`;
                const materialIndex = jsonData.meshes[node.mesh]?.primitives?.[0]?.material;
                
                let nodeInfo = {
                    index,
                    meshIndex: node.mesh,
                    meshName,
                    materialIndex,
                    position: node.translation || [0, 0, 0]
                };
                
                // Check if this node has colored material
                if (materialIndex !== undefined && jsonData.materials[materialIndex]) {
                    const material = jsonData.materials[materialIndex];
                    if (material.pbrMetallicRoughness && material.pbrMetallicRoughness.baseColorFactor) {
                        const color = material.pbrMetallicRoughness.baseColorFactor;
                        const rgb = {
                            r: Math.round(color[0] * 255),
                            g: Math.round(color[1] * 255),
                            b: Math.round(color[2] * 255)
                        };
                        nodeInfo.color = rgb;
                        nodeInfo.colorTone = getColorTone(rgb);
                        
                        if (['Red', 'Blue', 'Yellow', 'Green', 'Brown'].includes(nodeInfo.colorTone)) {
                            coloredNodes.push(nodeInfo);
                        }
                    }
                }
                
                // Categorize by name patterns
                if (/^[A-Z]{2}$/.test(meshName)) {
                    countryNodes.push(nodeInfo);
                } else if (/ship|vessel|hull|deck|bridge/i.test(meshName)) {
                    shipNodes.push(nodeInfo);
                }
            }
        });
        
        console.log(`\n🌍 Country Nodes (${countryNodes.length}):`);
        countryNodes.slice(0, 20).forEach(node => {
            console.log(`   Node ${node.index}: "${node.meshName}" at [${node.position.map(v => v.toFixed(2)).join(', ')}]`);
        });
        
        console.log(`\n🚢 Ship Nodes (${shipNodes.length}):`);
        shipNodes.slice(0, 10).forEach(node => {
            console.log(`   Node ${node.index}: "${node.meshName}" at [${node.position.map(v => v.toFixed(2)).join(', ')}]`);
        });
        
        console.log(`\n🎨 Colored Nodes (${coloredNodes.length}):`);
        coloredNodes.slice(0, 30).forEach(node => {
            const colorStr = node.color ? `RGB(${node.color.r}, ${node.color.g}, ${node.color.b})` : 'No Color';
            console.log(`   Node ${node.index}: "${node.meshName}" - ${node.colorTone} ${colorStr} at [${node.position.map(v => v.toFixed(2)).join(', ')}]`);
        });
        
        // Group colored nodes by position to find stacks
        console.log(`\n📦 CONTAINER STACK ANALYSIS:`);
        const positionGroups = {};
        coloredNodes.forEach(node => {
            const posKey = node.position.map(v => Math.round(v * 100) / 100).join(',');
            if (!positionGroups[posKey]) {
                positionGroups[posKey] = [];
            }
            positionGroups[posKey].push(node);
        });
        
        Object.keys(positionGroups).forEach(posKey => {
            const nodes = positionGroups[posKey];
            if (nodes.length > 1) {
                console.log(`\n📍 Stack at position [${posKey}]:`);
                nodes.forEach(node => {
                    const colorStr = node.color ? `RGB(${node.color.r}, ${node.color.g}, ${node.color.b})` : 'No Color';
                    console.log(`   - "${node.meshName}" - ${node.colorTone} ${colorStr}`);
                });
            }
        });
    }
}

function getColorTone(rgb) {
    const { r, g, b } = rgb;
    
    // Convert to HSV
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    
    let h, s, v = max / 255;
    
    if (max === 0) {
        s = 0;
        h = 0;
    } else {
        s = diff / max;
        
        if (diff === 0) {
            h = 0;
        } else if (max === r) {
            h = ((g - b) / diff) % 6;
        } else if (max === g) {
            h = (b - r) / diff + 2;
        } else {
            h = (r - g) / diff + 4;
        }
        
        h = h / 6;
        if (h < 0) h += 1;
    }
    
    // Categorize
    if (s < 0.15 && v > 0.85) return 'White/Ash';
    if (s < 0.15 && v < 0.15) return 'Black';
    if (s < 0.15) return 'Gray';
    
    if (h >= 0.25 && h < 0.42 && s > 0.2 && v > 0.2) return 'Green';
    if ((h >= 0 && h < 0.08 || h >= 0.92 && h <= 1) && s > 0.2 && v > 0.2) return 'Red';
    if (h >= 0.55 && h < 0.67 && s > 0.2 && v > 0.2) return 'Blue';
    if (h >= 0.08 && h < 0.25 && s > 0.2 && v > 0.2) return 'Yellow';
    if (h >= 0.05 && h < 0.17 && s > 0.3 && v > 0.15 && v < 0.7) return 'Brown';
    
    return 'Other';
}

// Run analysis
const glbPath = '/home/phi/Desktop/SeaRouteConnect/client/src/assets/models/smeediessnew1.glb';
detailedMeshAnalysis(glbPath);
