import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Line } from '@react-three/drei';
import * as THREE from 'three';

const ConcreteStands = () => {
  const numSections = 16;
  const stands = [];
  
  for (let i = 0; i < numSections; i++) {
    const sectionAngle = (i / numSections) * Math.PI * 2;
    const rotY = -sectionAngle + Math.PI / 2;
    stands.push(
      <mesh key={i} rotation={[0, rotY, 0]} position={[Math.cos(sectionAngle)*7.4, 1.8, Math.sin(sectionAngle)*7.4]}>
        <boxGeometry args={[4.8, 3.8, 5]} />
        <meshStandardMaterial color="#1a1c29" roughness={0.7} metalness={0.2} />
      </mesh>
    );
  }
  return <group>{stands}</group>;
};

const StadiumSeatsTier = ({ activeSectionId, baseRadius, rows, seatsPerRow, yOffset, tierName }) => {
  const meshRef = useRef();
  const numSections = 14; 
  const totalSeats = numSections * rows * seatsPerRow;

  useEffect(() => {
    if (!meshRef.current) return;
    
    const tempObject = new THREE.Object3D();
    const color = new THREE.Color();
    let i = 0;
    
    const rowDepth = 0.45;
    const rowHeight = 0.35;

    for (let s = 0; s < numSections; s++) {
      const sectionAngle = (s / numSections) * Math.PI * 2;
      const sectionSpan = (Math.PI * 2) / numSections;
      const sectionId = 101 + s;
      
      const isHighlighted = activeSectionId === sectionId.toString() && tierName === 'Lower';
      const baseHue = (s / numSections); 
      
      for (let r = 0; r < rows; r++) {
        const currentRadius = baseRadius + r * rowDepth;
        const height = yOffset + (r * rowHeight);
        
        const startAngle = sectionAngle - sectionSpan * 0.40;
        const endAngle = sectionAngle + sectionSpan * 0.40;
        
        for (let c = 0; c < seatsPerRow; c++) {
          const t = c / (seatsPerRow - 1 || 1);
          const angle = startAngle + t * (endAngle - startAngle);
          
          const x = Math.cos(angle) * currentRadius;
          const z = Math.sin(angle) * currentRadius;
          
          tempObject.position.set(x, height, z);
          tempObject.rotation.y = -angle + Math.PI / 2;
          tempObject.rotation.x = -0.15; 
          
          tempObject.updateMatrix();
          meshRef.current.setMatrixAt(i, tempObject.matrix);

          if (isHighlighted) {
             if (r === 5 && c === 11) {
                 color.setHex(0xffffff); 
             } else {
                 color.setHex(0xff0055); 
             }
          } else {
             const lightness = tierName === 'Lower' ? 0.4 : 0.6; 
             const rowHueShift = (r / rows) * 0.1;
             const finalHue = (baseHue + rowHueShift) % 1.0;
             color.setHSL(finalHue, 0.8, lightness);
          }
          
          meshRef.current.setColorAt(i, color);
          i++;
        }
      }
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [activeSectionId, baseRadius, rows, seatsPerRow, yOffset, tierName]);

  return (
    <instancedMesh ref={meshRef} args={[null, null, totalSeats]} castShadow receiveShadow>
       <boxGeometry args={[0.22, 0.2, 0.28]} />
       <meshStandardMaterial roughness={0.4} metalness={0.6} />
    </instancedMesh>
  );
};

const Field = () => (
  <group position={[0, -0.5, 0]}>
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[8.5, 5]} />
      <meshStandardMaterial color="#0b381b" roughness={0.9} />
    </mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
      <planeGeometry args={[8.2, 4.7]} />
      <meshBasicMaterial color="#39ff14" wireframe transparent opacity={0.2} />
    </mesh>
    <lineSegments position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <edgesGeometry args={[new THREE.PlaneGeometry(8.2, 4.7)]} />
      <lineBasicMaterial color="#ffffff" opacity={0.8} transparent />
    </lineSegments>
  </group>
);

const Marker = ({ activeSectionId }) => {
  const markerRef = useRef();

  useFrame(({ clock }) => {
    if (markerRef.current) {
      markerRef.current.position.y = 2.5 + Math.sin(clock.elapsedTime * 4) * 0.2;
      markerRef.current.rotation.y = clock.elapsedTime * 2;
    }
  });

  if (!activeSectionId || activeSectionId !== '114') return null;

  const numSections = 14;
  const activeIndex = 114 - 101; 
  const sectionAngle = (activeIndex / numSections) * Math.PI * 2;
  const sectionSpan = (Math.PI * 2) / numSections;
  
  const baseRadius = 5.0;
  const currentRadius = baseRadius + 5 * 0.45; 
  const startAngle = sectionAngle - sectionSpan * 0.40;
  const endAngle = sectionAngle + sectionSpan * 0.40;
  const angle = startAngle + (11 / 17) * (endAngle - startAngle); 

  const posX = Math.cos(angle) * currentRadius;
  const posZ = Math.sin(angle) * currentRadius;

  return (
    <group ref={markerRef} position={[posX, 2.5, posZ]}>
      <mesh position={[0, 0, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.4, 1.2, 4]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
        <pointLight color="#ffffff" intensity={50} distance={5} decay={2} position={[0, 0, 0]} />
      </mesh>
      <Html position={[0, 1.5, 0]} center zIndexRange={[100, 0]}>
        <div style={{ background: 'rgba(255, 255, 255, 0.95)', padding: '6px 12px', borderRadius: '8px', color: '#000', border: '2px solid #ff0055', fontSize: '13px', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '1px', boxShadow: '0 0 20px rgba(255,255,255,0.8)', pointerEvents: 'none', fontWeight: 800 }}>
          <span style={{color: '#ff0055', display: 'block', fontSize: '10px', marginBottom: '2px', fontWeight: 600}}>Your Seat</span>
          Sec 114, Row F, Seat 12
        </div>
      </Html>
    </group>
  );
};

const LEDRing = ({ yPos, radius, speed }) => {
  const ringRef = useRef();
  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} position={[0, yPos, 0]}>
      <torusGeometry args={[radius, 0.15, 16, 100]} />
      <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1} wireframe />
    </mesh>
  );
};

// 3D Routing & Pathfinding Component
const NavRoute = ({ navigationMode, activeSectionId }) => {
  const lineRef = useRef();

  useFrame((state, delta) => {
    if (lineRef.current && lineRef.current.material) {
      // Animate dashing dots along the line
      lineRef.current.material.dashOffset -= delta * 4;
    }
  });

  if (!navigationMode || activeSectionId !== '114') return null;

  const numSections = 14;
  const activeIndex = 114 - 101; 
  const sectionAngle = (activeIndex / numSections) * Math.PI * 2;
  const sectionSpan = (Math.PI * 2) / numSections;
  
  const baseRadius = 5.0;
  const currentRadius = baseRadius + 5 * 0.45; 
  const height = -0.3 + 5 * 0.35 + 0.3; // Sit just above the seat altitude
  
  const startAngle = sectionAngle - sectionSpan * 0.40;
  const endAngle = sectionAngle + sectionSpan * 0.40;
  const seatAngle = startAngle + (11 / 17) * (endAngle - startAngle);

  // Generate 3D Path
  const p1 = new THREE.Vector3(-14, -0.4, 4); // Fake GPS Mobile Start Node
  const p2 = new THREE.Vector3(Math.cos(sectionAngle + 0.8) * 8.5, -0.4, Math.sin(sectionAngle + 0.8) * 8.5); // Concourse approach
  const p3 = new THREE.Vector3(Math.cos(startAngle) * 8.0, -0.4, Math.sin(startAngle) * 8.0); // Base of Aisle 114
  const p4 = new THREE.Vector3(Math.cos(startAngle) * currentRadius, height, Math.sin(startAngle) * currentRadius); // Up the stairs
  const p5 = new THREE.Vector3(Math.cos(seatAngle) * currentRadius, height, Math.sin(seatAngle) * currentRadius); // At the seat

  // CatmullRom generates a smooth spline interpolating the routing nodes
  const curve = new THREE.CatmullRomCurve3([p1, p2, p3, p4, p5]);
  const points = curve.getPoints(100);

  return (
    <group>
      {/* Mobile Location Marker */}
      <mesh position={[-14, 0.4, 4]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#39ff14" emissive="#39ff14" emissiveIntensity={1} />
        <pointLight color="#39ff14" intensity={20} distance={5} />
        <Html position={[0, 1.2, 0]} center zIndexRange={[100, 0]}>
          <div style={{ background: '#39ff14', color: '#000', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 800, whiteSpace: 'nowrap', boxShadow: '0 0 10px rgba(57,255,20,0.8)' }}>
            YOU ARE HERE
          </div>
        </Html>
      </mesh>
      
      {/* Illuminated Path Tracker */}
      <Line 
        ref={lineRef}
        points={points}
        color="#39ff14"
        lineWidth={8}     // Line width requires specialized WebGL support provided by drei
        dashed={true}
        dashSize={0.5}
        gapSize={0.5}
        dashScale={2}     
      />
    </group>
  );
}

export default function Stadium3D({ activeSection, navigationMode }) {
  const controlsRef = useRef();

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1, background: 'radial-gradient(circle at center, #1b0a29 0%, #03040c 100%)' }}>
      <Canvas camera={{ position: [0, 15, 22], fov: 45 }} shadows>
        <fog attach="fog" args={['#0a0515', 15, 45]} />
        <ambientLight intensity={1.5} color="#ffffff" />
        
        <spotLight position={[0, 30, 0]} angle={0.9} penumbra={0.5} intensity={800} color="#ffffff" castShadow decay={2} distance={60} />
        <pointLight position={[15, 5, 15]} intensity={100} color="#00f0ff" distance={30} decay={2} />
        <pointLight position={[-15, 5, -15]} intensity={100} color="#ff0055" distance={30} decay={2} />
        <pointLight position={[15, 5, -15]} intensity={100} color="#8a2be2" distance={30} decay={2} />
        
        <group position={[0, -2, 0]}>
          <Field />
          <StadiumSeatsTier activeSectionId={activeSection} baseRadius={5.0} rows={12} seatsPerRow={18} yOffset={-0.3} tierName="Lower" />
          <StadiumSeatsTier activeSectionId={activeSection} baseRadius={11.0} rows={8} seatsPerRow={24} yOffset={4.8} tierName="Upper" />
          <LEDRing yPos={-0.8} radius={4.5} speed={0.2} />
          <LEDRing yPos={4.2} radius={10.5} speed={-0.1} />
          <LEDRing yPos={8.5} radius={15.0} speed={0.1} />
          
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0]}>
            <cylinderGeometry args={[16, 15, 10, 64, 1, true]} />
            <meshStandardMaterial color="#020512" roughness={0.8} metalness={0.5} opacity={0.6} transparent side={THREE.DoubleSide} />
          </mesh>

          <Marker activeSectionId={activeSection} />
          <NavRoute navigationMode={navigationMode} activeSectionId={activeSection} />
        </group>

        <OrbitControls 
          ref={controlsRef}
          enablePan={false}
          enableZoom={true}
          minPolarAngle={10 * (Math.PI/180)} 
          maxPolarAngle={Math.PI / 2.2} 
          minDistance={8} 
          maxDistance={35}
          // Slow dramatic pan when navigating for better path visibility
          autoRotate={!activeSection || navigationMode}
          autoRotateSpeed={navigationMode ? 0.3 : 1.5} 
        />
      </Canvas>
    </div>
  );
}
