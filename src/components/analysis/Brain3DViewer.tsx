import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Html } from "@react-three/drei";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Box, RotateCcw } from "lucide-react";
import * as THREE from "three";

interface BrainRegion {
  name: string;
  position: [number, number, number];
  severity: number;
  size: number;
}

interface BrainRegionMeshProps {
  region: BrainRegion;
  onHover: (name: string | null) => void;
}

const BrainRegionMesh = ({ region, onHover }: BrainRegionMeshProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(
        region.size * (1 + Math.sin(state.clock.elapsedTime * 2) * 0.05)
      );
    }
  });

  const getColor = (severity: number) => {
    if (severity > 0.7) return "#ef4444";
    if (severity > 0.4) return "#f97316";
    return "#22c55e";
  };

  return (
    <Sphere
      ref={meshRef}
      args={[1, 32, 32]}
      position={region.position}
      scale={region.size}
      onPointerOver={() => {
        setHovered(true);
        onHover(region.name);
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(null);
      }}
    >
      <meshStandardMaterial
        color={getColor(region.severity)}
        transparent
        opacity={hovered ? 0.9 : 0.6}
        roughness={0.3}
        metalness={0.1}
      />
      {hovered && (
        <Html distanceFactor={10}>
          <div className="bg-popover/95 backdrop-blur-sm border border-border rounded-md px-3 py-2 shadow-lg whitespace-nowrap">
            <p className="font-medium text-sm text-foreground">{region.name}</p>
            <p className="text-xs text-muted-foreground">
              Severity: {Math.round(region.severity * 100)}%
            </p>
          </div>
        </Html>
      )}
    </Sphere>
  );
};

const BrainModel = ({ regions, onHover }: { regions: BrainRegion[]; onHover: (name: string | null) => void }) => {
  const brainRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (brainRef.current) {
      brainRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={brainRef}>
      {/* Brain outline */}
      <Sphere args={[2, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="hsl(220, 20%, 30%)"
          transparent
          opacity={0.15}
          wireframe
        />
      </Sphere>

      {/* Brain regions */}
      {regions.map((region) => (
        <BrainRegionMesh key={region.name} region={region} onHover={onHover} />
      ))}
    </group>
  );
};

interface Brain3DViewerProps {
  regions: Array<{ name: string; severity: number }>;
}

export const Brain3DViewer = ({ regions }: Brain3DViewerProps) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Map regions to 3D positions
  const regionPositions: Record<string, [number, number, number]> = {
    "Hippocampus": [-0.8, -0.3, 0.5],
    "Temporal Lobe": [-1.2, 0, 0],
    "Parietal Lobe": [0, 1, -0.3],
    "Frontal Lobe": [0, 0.5, 1],
    "Substantia Nigra": [0, -0.8, 0],
    "Basal Ganglia": [0.3, -0.2, 0.3],
    "Motor Cortex": [0, 1.2, 0.5],
    "Cerebellum": [0, -1, -0.8],
    "Tumor Core": [1, 0.3, 0],
    "Peritumoral Edema": [1.3, 0.5, 0.2],
    "Adjacent Tissue": [0.8, 0.8, 0.3],
    "Distant Regions": [-0.5, 0.5, -0.5],
    "All Regions": [0, 0, 0],
  };

  const brainRegions: BrainRegion[] = regions.map((r) => ({
    name: r.name,
    position: regionPositions[r.name] || [0, 0, 0],
    severity: r.severity,
    size: 0.3 + r.severity * 0.4,
  }));

  return (
    <Card className="p-4 bg-card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Box className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">3D Brain Visualization</h3>
        </div>
        {hoveredRegion && (
          <span className="text-sm text-muted-foreground">
            Viewing: <span className="text-foreground font-medium">{hoveredRegion}</span>
          </span>
        )}
      </div>

      <div className="aspect-square bg-secondary/30 rounded-lg overflow-hidden relative">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <Suspense fallback={null}>
            <BrainModel regions={brainRegions} onHover={setHoveredRegion} />
          </Suspense>
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={4}
            maxDistance={10}
          />
        </Canvas>

        {/* Instructions overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
          <span className="text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded">
            Drag to rotate • Scroll to zoom
          </span>
          <Button
            size="sm"
            variant="secondary"
            className="gap-1.5 h-7"
            onClick={() => {}}
          >
            <RotateCcw className="h-3 w-3" />
            Reset View
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
          <span className="text-muted-foreground">Low</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#f97316]" />
          <span className="text-muted-foreground">Medium</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
          <span className="text-muted-foreground">High</span>
        </div>
      </div>
    </Card>
  );
};
