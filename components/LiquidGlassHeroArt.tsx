/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Layers, RotateCcw, Play, Pause, Eye, Sparkles } from 'lucide-react';

export const LiquidGlassHeroArt: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isExploded, setIsExploded] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isWireframe, setIsWireframe] = useState(false);
  const [activeTier, setActiveTier] = useState<string>('Tier 2: Container Mesh');

  // Mutable animation state references
  const animStateRef = useRef({
    explodedProgress: 0,
    targetExploded: 0,
    autoRotate: true,
    wireframe: false,
    mouseX: 0,
    mouseY: 0,
    targetRotX: 0.35,
    targetRotY: 0.45,
    curRotX: 0.35,
    curRotY: 0.45,
    isDragging: false,
    prevPointerX: 0,
    prevPointerY: 0,
  });

  useEffect(() => {
    animStateRef.current.targetExploded = isExploded ? 1 : 0;
  }, [isExploded]);

  useEffect(() => {
    animStateRef.current.autoRotate = isAutoRotating;
  }, [isAutoRotating]);

  useEffect(() => {
    animStateRef.current.wireframe = isWireframe;
  }, [isWireframe]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL (SwiftShader, llvmpipe) for headless environment stability
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 4.0, 10.4);
    camera.lookAt(0, -0.1, 0);

    // 2. High-performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Studio Environment Map for realistic glass refractions & metallic highlights
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(6, 10, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00d084, 3.2);
    rimLight.position.set(-6, -2, -5);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x2dd4bf, 2.0);
    fillLight.position.set(4, -4, 4);
    scene.add(fillLight);

    // 5. Materials (Spline-style Glass & Dark Carbon PBR)
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.08,
      transmission: isSoftwareGl ? 0 : 0.82,
      transparent: true,
      opacity: isSoftwareGl ? 0.6 : 0.95,
      ior: 1.54,
      thickness: 1.4,
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      attenuationColor: new THREE.Color(0x6ee7b7),
      attenuationDistance: 1.4,
    });

    const darkCarbonMaterial = new THREE.MeshStandardMaterial({
      color: 0x0c1b1f,
      metalness: 0.88,
      roughness: 0.2,
    });

    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.05,
    });

    const mintGreenEmissive = new THREE.MeshStandardMaterial({
      color: 0x00d084,
      emissive: 0x00d084,
      emissiveIntensity: 1.6,
      metalness: 0.15,
      roughness: 0.2,
    });

    const aquaTealMaterial = new THREE.MeshStandardMaterial({
      color: 0x0d9488,
      emissive: 0x0f766e,
      emissiveIntensity: 1.4,
      metalness: 0.1,
      roughness: 0.2,
    });

    const cyanNeonMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.2,
      metalness: 0.1,
      roughness: 0.2,
    });

    // 6. Master Architectural Group (Spline 3D Beacon Model)
    const beaconRoot = new THREE.Group();
    scene.add(beaconRoot);

    // Helper: Rounded Hexagonal/Chamfered Glass Platform
    function createChamferedSlab(radius: number, height: number, segments: number) {
      const shape = new THREE.Shape();
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }
      shape.closePath();

      const extrudeSettings = {
        depth: height,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.12,
        bevelThickness: 0.12,
      };
      const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geom.center();
      return geom;
    }

    // --- TIER 3 (BASE FOUNDATION: Persistence & Databases) ---
    const tier3Group = new THREE.Group();
    beaconRoot.add(tier3Group);

    const baseSlabGeom = createChamferedSlab(2.6, 0.4, 8);
    const baseMesh = new THREE.Mesh(baseSlabGeom, darkCarbonMaterial);
    baseMesh.rotation.x = Math.PI / 2;
    tier3Group.add(baseMesh);

    // Chrome Base Trim Ring
    const baseRingGeom = new THREE.TorusGeometry(2.8, 0.06, 16, 64);
    const baseRing = new THREE.Mesh(baseRingGeom, chromeMaterial);
    baseRing.rotation.x = Math.PI / 2;
    tier3Group.add(baseRing);

    // Database Status Pillars (4 corner pins)
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const pinGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.8, 16);
      const pin = new THREE.Mesh(pinGeom, chromeMaterial);
      pin.position.set(Math.cos(angle) * 2.1, 0.4, Math.sin(angle) * 2.1);
      tier3Group.add(pin);
    }

    // --- TIER 2 (MIDDLE LAYER: Compute & Container Runtime) ---
    const tier2Group = new THREE.Group();
    beaconRoot.add(tier2Group);

    // Translucent Frosted Glass Octagon Plate
    const midGlassGeom = createChamferedSlab(2.2, 0.35, 8);
    const midGlassMesh = new THREE.Mesh(midGlassGeom, glassMaterial);
    midGlassMesh.rotation.x = Math.PI / 2;
    tier2Group.add(midGlassMesh);

    // Central Glowing Reactor Core
    const coreCylinderGeom = new THREE.CylinderGeometry(0.75, 0.75, 0.7, 32);
    const coreCylinder = new THREE.Mesh(coreCylinderGeom, aquaTealMaterial);
    tier2Group.add(coreCylinder);

    // Inner Glowing Core Sphere
    const coreSphereGeom = new THREE.SphereGeometry(0.5, 32, 32);
    const coreSphere = new THREE.Mesh(coreSphereGeom, mintGreenEmissive);
    tier2Group.add(coreSphere);

    // --- TIER 1 (TOP LAYER: Ingress & CI/CD Deployment) ---
    const tier1Group = new THREE.Group();
    beaconRoot.add(tier1Group);

    const topGlassGeom = createChamferedSlab(1.7, 0.3, 8);
    const topGlassMesh = new THREE.Mesh(topGlassGeom, glassMaterial);
    topGlassMesh.rotation.x = Math.PI / 2;
    tier1Group.add(topGlassMesh);

    // Top Chrome Cap & Antenna Emitter
    const topCapGeom = new THREE.CylinderGeometry(0.4, 0.5, 0.25, 32);
    const topCap = new THREE.Mesh(topCapGeom, chromeMaterial);
    topCap.position.y = 0.25;
    tier1Group.add(topCap);

    const beaconPointGeom = new THREE.ConeGeometry(0.2, 0.5, 16);
    const beaconPoint = new THREE.Mesh(beaconPointGeom, mintGreenEmissive);
    beaconPoint.position.y = 0.6;
    tier1Group.add(beaconPoint);

    // --- ORBITING GYROSCOPIC GIMBAL GLASS RINGS (Spline Aesthetic) ---
    const ring1Geom = new THREE.TorusGeometry(3.3, 0.05, 16, 100);
    const ring1 = new THREE.Mesh(ring1Geom, chromeMaterial);
    ring1.rotation.x = 0.6;
    ring1.rotation.y = 0.3;
    beaconRoot.add(ring1);

    const ring2Geom = new THREE.TorusGeometry(3.6, 0.04, 16, 100);
    const ring2 = new THREE.Mesh(ring2Geom, glassMaterial);
    ring2.rotation.x = -0.7;
    ring2.rotation.z = 0.5;
    beaconRoot.add(ring2);

    // --- ORBITING DATA NODES / MICRO-SATELLITES ---
    const satellites: THREE.Mesh[] = [];
    const satMaterials = [aquaTealMaterial, cyanNeonMaterial, mintGreenEmissive, chromeMaterial];

    for (let i = 0; i < 4; i++) {
      const satGeom = new THREE.BoxGeometry(0.24, 0.24, 0.24);
      const sat = new THREE.Mesh(satGeom, satMaterials[i % satMaterials.length]);
      satellites.push(sat);
      beaconRoot.add(sat);
    }

    // --- VERTICAL CENTRAL TELEMETRY BEAM ---
    const beamGeom = new THREE.CylinderGeometry(0.08, 0.08, 5.5, 16);
    const beamMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
    });
    const telemetryBeam = new THREE.Mesh(beamGeom, beamMaterial);
    beaconRoot.add(telemetryBeam);

    // --- CONTACT GROUND SHADOW ---
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 10, 64, 64, 60);
      grad.addColorStop(0, 'rgba(0, 208, 132, 0.45)');
      grad.addColorStop(0.3, 'rgba(13, 148, 136, 0.3)');
      grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.6)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(7.5, 7.5),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.2;
    scene.add(shadowPlane);

    // 7. Interactive Pointer & Drag Controls (Spline-Style Interaction)
    const handlePointerDown = (e: PointerEvent) => {
      animStateRef.current.isDragging = true;
      animStateRef.current.prevPointerX = e.clientX;
      animStateRef.current.prevPointerY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      animStateRef.current.mouseX = nx;
      animStateRef.current.mouseY = ny;

      if (animStateRef.current.isDragging) {
        const deltaX = e.clientX - animStateRef.current.prevPointerX;
        const deltaY = e.clientY - animStateRef.current.prevPointerY;
        animStateRef.current.targetRotY += deltaX * 0.008;
        animStateRef.current.targetRotX += deltaY * 0.008;
        animStateRef.current.targetRotX = Math.max(-0.6, Math.min(0.9, animStateRef.current.targetRotX));
        animStateRef.current.prevPointerX = e.clientX;
        animStateRef.current.prevPointerY = e.clientY;
      }
    };

    const handlePointerUp = () => {
      animStateRef.current.isDragging = false;
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // 8. Animation & Render Loop with Spring Kinematics
    let frameId = 0;
    let clock = new THREE.Clock();

    function renderLoop() {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      const state = animStateRef.current;

      // Smooth damp exploded progress (0 = compact, 1 = exploded layers)
      state.explodedProgress = THREE.MathUtils.damp(
        state.explodedProgress,
        state.targetExploded,
        5.5,
        delta
      );

      // Auto-rotation around Y axis when enabled
      if (state.autoRotate && !state.isDragging) {
        state.targetRotY += delta * 0.45;
      }

      // Parallax mouse damping
      const parallaxX = state.isDragging ? 0 : state.mouseY * 0.25;
      const parallaxY = state.isDragging ? 0 : state.mouseX * 0.35;

      state.curRotX = THREE.MathUtils.damp(state.curRotX, state.targetRotX + parallaxX, 6.0, delta);
      state.curRotY = THREE.MathUtils.damp(state.curRotY, state.targetRotY + parallaxY, 6.0, delta);

      beaconRoot.rotation.x = state.curRotX;
      beaconRoot.rotation.y = state.curRotY;

      // Vertical translation of stack layers based on explodedProgress
      // Default: compact stacked server; Exploded: separated tiers
      const exp = state.explodedProgress;
      tier1Group.position.y = 1.05 + exp * 1.35;
      tier2Group.position.y = 0.0;
      tier3Group.position.y = -1.05 - exp * 1.35;

      // Rotate gyroscopic rings in opposite directions
      ring1.rotation.z += delta * 0.6;
      ring2.rotation.y -= delta * 0.45;

      // Orbit satellites around the stack
      satellites.forEach((sat, idx) => {
        const orbitSpeed = 1.2 + idx * 0.35;
        const orbitRadius = 2.4 + (idx % 2) * 0.7;
        const orbitAngle = elapsed * orbitSpeed + (idx * Math.PI) / 2;
        const orbitY = Math.sin(elapsed * 2 + idx) * 0.6;
        sat.position.set(
          Math.cos(orbitAngle) * orbitRadius,
          orbitY,
          Math.sin(orbitAngle) * orbitRadius
        );
        sat.rotation.x += delta * 2;
        sat.rotation.y += delta * 1.5;
      });

      // Core pulsing
      const corePulse = 1 + Math.sin(elapsed * 3.5) * 0.06;
      coreSphere.scale.set(corePulse, corePulse, corePulse);

      // Wireframe toggle update
      const allMeshes = [baseMesh, midGlassMesh, topGlassMesh, coreCylinder, topCap];
      allMeshes.forEach(mesh => {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(m => (m.wireframe = state.wireframe));
        } else {
          mesh.material.wireframe = state.wireframe;
        }
      });

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        // Pace software WebGL to conserve CPU
        frameId = window.setTimeout(() => {
          frameId = requestAnimationFrame(renderLoop);
        }, 50);
      } else {
        frameId = requestAnimationFrame(renderLoop);
      }
    }

    renderLoop();

    // 9. Resize Listener
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 10. Clean Cleanup on Unmount
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);

      // Dispose Geometries and Materials
      baseSlabGeom.dispose();
      midGlassGeom.dispose();
      topGlassGeom.dispose();
      baseRingGeom.dispose();
      coreCylinderGeom.dispose();
      coreSphereGeom.dispose();
      topCapGeom.dispose();
      beaconPointGeom.dispose();
      ring1Geom.dispose();
      ring2Geom.dispose();
      beamGeom.dispose();
      shadowTex.dispose();

      glassMaterial.dispose();
      darkCarbonMaterial.dispose();
      chromeMaterial.dispose();
      mintGreenEmissive.dispose();
      aquaTealMaterial.dispose();
      cyanNeonMaterial.dispose();
      beamMaterial.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const resetCamera = () => {
    animStateRef.current.targetRotX = 0.35;
    animStateRef.current.targetRotY = 0.45;
  };

  return (
    <div className="relative w-full aspect-square max-w-[550px] mx-auto flex flex-col items-center justify-center select-none">
      {/* Ambient colored spotlight aura that radiates softly into the hero background */}
      <div className="absolute -inset-3 bg-gradient-to-tr from-[#00D084]/25 via-[#0D9488]/20 to-[#38BDF8]/20 rounded-[36px] blur-2xl opacity-70 pointer-events-none" />

      {/* Main 3D Showcase Stage Card with Neo-Brutalist Frame */}
      <div className="relative w-full h-full rounded-[28px] border-2 border-[#091316] shadow-[8px_8px_0px_#091316] bg-[#061114] overflow-hidden flex flex-col items-center justify-center">
        {/* Deep Obsidian Space with Vibrant Mint & Teal Radial Gradient Spotlight */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(0, 208, 132, 0.26) 0%, rgba(13, 148, 136, 0.20) 32%, rgba(6, 17, 20, 0.88) 65%, #04090c 100%)'
          }}
        />

        {/* Precision Cyber Matrix Grid */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 208, 132, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 208, 132, 0.15) 1px, transparent 1px)',
            backgroundSize: '28px 28px'
          }}
        />

        {/* Concentric Telemetry Radar Circles behind the 3D Beacon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[380px] h-[380px] rounded-full border border-[#00D084]/15" />
          <div className="absolute w-[260px] h-[260px] rounded-full border border-[#2DD4BF]/20 border-dashed animate-[spin_60s_linear_infinite]" />
          <div className="absolute w-[130px] h-[130px] rounded-full border border-[#00D084]/15" />
        </div>

        {/* Viewport Corner Crosshairs */}
        <div className="absolute top-3 left-3 text-[#00D084]/40 font-mono text-xs select-none pointer-events-none">+</div>
        <div className="absolute top-3 right-3 text-[#00D084]/40 font-mono text-xs select-none pointer-events-none">+</div>
        <div className="absolute bottom-3 left-3 text-[#00D084]/40 font-mono text-xs select-none pointer-events-none">+</div>
        <div className="absolute bottom-3 right-3 text-[#00D084]/40 font-mono text-xs select-none pointer-events-none">+</div>

        {/* Top Status Bar with Spacing */}
        <div className="absolute top-3.5 inset-x-3.5 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 bg-[#091316]/90 backdrop-blur-md text-[#00D084] px-3 py-1.5 rounded-full border border-[#00D084]/30 text-[10px] sm:text-[11px] font-mono font-bold shadow-lg pointer-events-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#00D084] shrink-0" />
            <span className="truncate">SPLINE 3D BEACON</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] animate-ping inline-block shrink-0" />
          </div>

          <div className="flex items-center gap-1.5 bg-[#091316]/90 backdrop-blur-md text-white/90 px-2.5 py-1.5 rounded-full border border-white/10 text-[10px] font-mono font-bold shadow-lg pointer-events-auto shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] inline-block" />
            <span>READ-ONLY MESH</span>
            <span className="text-[#00D084] font-semibold">· 60 FPS</span>
          </div>
        </div>

        {/* Three.js 3D WebGL Canvas Mount Container */}
        <div
          ref={mountRef}
          className="w-full h-full cursor-grab active:cursor-grabbing touch-none relative z-10"
          title="Click and drag to rotate in 3D"
          aria-label="Interactive 3D Deployment Core"
        />

        {/* HUD Interaction Hint */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold text-[#00D084]/70 uppercase tracking-widest whitespace-nowrap pointer-events-none z-20">
          DRAG TO ROTATE · CLICK EXPLODE TO INSPECT TIERS
        </div>

        {/* Sleek Spline Bottom Control Dock (Explode, Rotate, Wireframe, Reset) */}
        <div className="absolute bottom-3.5 z-20 flex items-center gap-1.5 bg-[#091316]/95 backdrop-blur-xl border border-[#00D084]/30 p-1.5 rounded-full text-white shadow-2xl">
          {/* Explode / Stack Toggle */}
          <button
            onClick={() => setIsExploded(!isExploded)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
              isExploded
                ? 'bg-[#00D084] text-[#091316] shadow-sm'
                : 'text-neutral-300 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Toggle Exploded View"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isExploded ? 'Compact' : 'Explode'}</span>
          </button>

          {/* Orbit Auto-Rotate Toggle */}
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
              isAutoRotating
                ? 'bg-white/15 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
            aria-label="Toggle Auto Rotation"
          >
            {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isAutoRotating ? 'Pause' : 'Orbit'}</span>
          </button>

          {/* Wireframe Toggle */}
          <button
            onClick={() => setIsWireframe(!isWireframe)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
              isWireframe
                ? 'bg-[#2DD4BF] text-[#091316]'
                : 'text-neutral-300 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Toggle Wireframe View"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Topology</span>
          </button>

          {/* Reset View */}
          <button
            onClick={resetCamera}
            className="p-1.5 rounded-full text-neutral-400 hover:text-[#00D084] hover:bg-white/10 transition-colors cursor-pointer"
            title="Reset Camera View"
            aria-label="Reset Camera View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiquidGlassHeroArt;
