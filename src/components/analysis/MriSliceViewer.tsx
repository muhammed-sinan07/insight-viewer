import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Layers, Eye } from "lucide-react";

interface MriSliceViewerProps {
  showHeatmap: boolean;
}

export const MriSliceViewer = ({ showHeatmap }: MriSliceViewerProps) => {
  const [currentSlice, setCurrentSlice] = useState([10]);
  const [heatmapOpacity, setHeatmapOpacity] = useState([0.6]);
  const [showOverlay, setShowOverlay] = useState(true);

  return (
    <Card className="p-6 bg-card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">MRI Slice Viewer</h3>
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

        {/* MRI Display Area */}
        <div className="relative aspect-square bg-secondary rounded-lg overflow-hidden">
          {/* Mock MRI Image - Grid pattern simulating brain scan */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-3/4 h-3/4 rounded-full relative overflow-hidden"
              style={{
                background: `
                  radial-gradient(ellipse at 30% 30%, hsl(var(--chart-2) / 0.3) 0%, transparent 40%),
                  radial-gradient(ellipse at 70% 60%, hsl(var(--chart-3) / 0.3) 0%, transparent 35%),
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
              {showHeatmap && showOverlay && (
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{ opacity: heatmapOpacity[0] }}
                >
                  <div
                    className="absolute top-1/4 left-1/4 w-1/3 h-1/3 rounded-full blur-xl"
                    style={{
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
                      background: `radial-gradient(circle, 
                        hsl(30 100% 50% / 0.6) 0%, 
                        hsl(60 100% 50% / 0.3) 50%, 
                        transparent 100%
                      )`,
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Slice indicator */}
          <div className="absolute bottom-4 left-4 bg-secondary/80 backdrop-blur-sm rounded-md px-3 py-1.5">
            <span className="text-xs font-mono text-foreground">
              Slice {currentSlice[0]} / 20
            </span>
          </div>
        </div>

        {/* Slice Slider */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Navigate Slices</Label>
          <Slider
            value={currentSlice}
            onValueChange={setCurrentSlice}
            max={20}
            min={1}
            step={1}
            className="w-full"
          />
        </div>

        {/* Heatmap Opacity */}
        {showHeatmap && showOverlay && (
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">
              Heatmap Intensity
            </Label>
            <Slider
              value={heatmapOpacity}
              onValueChange={setHeatmapOpacity}
              max={1}
              min={0}
              step={0.1}
              className="w-full"
            />
          </div>
        )}
      </div>
    </Card>
  );
};
