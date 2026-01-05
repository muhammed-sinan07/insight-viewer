import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Layers, Eye, ZoomIn, ZoomOut, Move, RotateCcw } from "lucide-react";
import { SliceThumbnails } from "./SliceThumbnails";
import { GradCamLegend } from "./GradCamLegend";
import { mockMriSlices } from "@/data/mockData";

interface MriSliceViewerProps {
  showHeatmap: boolean;
}

export const MriSliceViewer = ({ showHeatmap }: MriSliceViewerProps) => {
  const [currentSlice, setCurrentSlice] = useState(10);
  const [heatmapOpacity, setHeatmapOpacity] = useState(0.6);
  const [showOverlay, setShowOverlay] = useState(true);
  const [heatmapThreshold, setHeatmapThreshold] = useState(0.2);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [hoverInfo, setHoverInfo] = useState<{ x: number; y: number; value: number } | null>(null);
  
  const viewerRef = useRef<HTMLDivElement>(null);
  const lastPanPos = useRef({ x: 0, y: 0 });

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsPanning(true);
      lastPanPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning && zoom > 1) {
      const dx = e.clientX - lastPanPos.current.x;
      const dy = e.clientY - lastPanPos.current.y;
      setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
      lastPanPos.current = { x: e.clientX, y: e.clientY };
    }

    // Calculate hover attention value (mock)
    if (showHeatmap && showOverlay && viewerRef.current) {
      const rect = viewerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      // Mock attention value based on position
      const centerDist = Math.sqrt(Math.pow(x - 0.35, 2) + Math.pow(y - 0.35, 2));
      const attention = Math.max(0, 1 - centerDist * 2);
      
      if (attention > heatmapThreshold) {
        setHoverInfo({ x: e.clientX - rect.left, y: e.clientY - rect.top, value: attention });
      } else {
        setHoverInfo(null);
      }
    }
  };

  const handleMouseUp = () => setIsPanning(false);
  const handleMouseLeave = () => {
    setIsPanning(false);
    setHoverInfo(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setCurrentSlice((s) => Math.max(1, s - 1));
      if (e.key === "ArrowRight") setCurrentSlice((s) => Math.min(20, s + 1));
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-") handleZoomOut();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentSliceData = mockMriSlices.find((s) => s.id === currentSlice);

  return (
    <Card className="p-6 bg-card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">MRI Slice Viewer</h3>
          </div>
          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 mr-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleZoomOut}
                disabled={zoom <= 0.5}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-xs font-mono w-12 text-center text-muted-foreground">
                {Math.round(zoom * 100)}%
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleZoomIn}
                disabled={zoom >= 3}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleResetView}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {showHeatmap && (
              <div className="flex items-center gap-2">
                <Switch
                  id="overlay"
                  checked={showOverlay}
                  onCheckedChange={setShowOverlay}
                />
                <Label htmlFor="overlay" className="text-sm text-muted-foreground">
                  <Eye className="h-4 w-4 inline mr-1" />
                  Grad-CAM
                </Label>
              </div>
            )}
          </div>
        </div>

        {/* MRI Display Area */}
        <div 
          ref={viewerRef}
          className="relative aspect-square bg-secondary rounded-lg overflow-hidden cursor-crosshair"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: zoom > 1 ? (isPanning ? "grabbing" : "grab") : "crosshair" }}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: zoom, x: pan.x, y: pan.y }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div 
              className="w-3/4 h-3/4 rounded-full relative overflow-hidden"
              style={{
                background: `
                  radial-gradient(ellipse at 30% 30%, hsl(var(--chart-2) / ${0.2 + currentSlice * 0.01}) 0%, transparent 40%),
                  radial-gradient(ellipse at 70% 60%, hsl(var(--chart-3) / ${0.2 + currentSlice * 0.01}) 0%, transparent 35%),
                  radial-gradient(ellipse at 50% 50%, hsl(var(--secondary)) 0%, hsl(var(--secondary-foreground) / 0.1) 70%)
                `
              }}
            >
              {/* Brain structure patterns */}
              <div className="absolute inset-0 opacity-40">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute border border-chart-1/30 rounded-full"
                    style={{
                      width: `${30 + i * 10}%`,
                      height: `${30 + i * 10}%`,
                      top: `${35 - i * 5}%`,
                      left: `${35 - i * 5}%`,
                    }}
                  />
                ))}
              </div>

              {/* Grad-CAM Heatmap Overlay */}
              <AnimatePresence>
                {showHeatmap && showOverlay && (
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: heatmapOpacity }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className="absolute top-1/4 left-1/4 w-1/3 h-1/3 rounded-full blur-xl"
                      style={{
                        opacity: 0.8 - heatmapThreshold,
                        background: `radial-gradient(circle, 
                          hsl(0 100% 50% / 0.8) 0%, 
                          hsl(30 100% 50% / 0.6) 30%, 
                          hsl(60 100% 50% / 0.4) 60%, 
                          transparent 100%
                        )`,
                      }}
                    />
                    <div
                      className="absolute top-1/2 right-1/4 w-1/4 h-1/4 rounded-full blur-lg"
                      style={{
                        opacity: Math.max(0, 0.6 - heatmapThreshold),
                        background: `radial-gradient(circle, 
                          hsl(30 100% 50% / 0.6) 0%, 
                          hsl(60 100% 50% / 0.3) 50%, 
                          transparent 100%
                        )`,
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Hover tooltip */}
          <AnimatePresence>
            {hoverInfo && (
              <motion.div
                className="absolute pointer-events-none bg-popover/95 backdrop-blur-sm border border-border rounded-md px-2 py-1 shadow-lg"
                style={{ left: hoverInfo.x + 10, top: hoverInfo.y + 10 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <span className="text-xs font-mono text-foreground">
                  Attention: {(hoverInfo.value * 100).toFixed(1)}%
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Slice indicator */}
          <div className="absolute bottom-4 left-4 bg-secondary/80 backdrop-blur-sm rounded-md px-3 py-1.5">
            <span className="text-xs font-mono text-foreground">
              Slice {currentSlice} / 20 | Z: {currentSliceData?.position}mm
            </span>
          </div>

          {/* Pan indicator */}
          {zoom > 1 && (
            <div className="absolute top-4 right-4 bg-secondary/80 backdrop-blur-sm rounded-md px-2 py-1">
              <Move className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Slice Thumbnails */}
        <SliceThumbnails
          currentSlice={currentSlice}
          onSliceChange={setCurrentSlice}
        />

        {/* Slice Slider */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Navigate Slices (← →)</Label>
          <Slider
            value={[currentSlice]}
            onValueChange={([v]) => setCurrentSlice(v)}
            max={20}
            min={1}
            step={1}
            className="w-full"
          />
        </div>

        {/* Heatmap Controls */}
        {showHeatmap && showOverlay && (
          <div className="space-y-4 pt-2 border-t border-border">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">
                Heatmap Intensity
              </Label>
              <Slider
                value={[heatmapOpacity]}
                onValueChange={([v]) => setHeatmapOpacity(v)}
                max={1}
                min={0}
                step={0.1}
                className="w-full"
              />
            </div>
            <GradCamLegend
              threshold={heatmapThreshold}
              onThresholdChange={setHeatmapThreshold}
            />
          </div>
        )}
      </div>
    </Card>
  );
};
