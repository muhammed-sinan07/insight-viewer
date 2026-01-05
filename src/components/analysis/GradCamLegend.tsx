import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface GradCamLegendProps {
  threshold: number;
  onThresholdChange: (value: number) => void;
}

export const GradCamLegend = ({ threshold, onThresholdChange }: GradCamLegendProps) => {
  return (
    <div className="space-y-3">
      {/* Color Legend */}
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Attention Intensity</Label>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Low</span>
          <div 
            className="flex-1 h-3 rounded-full"
            style={{
              background: `linear-gradient(to right, 
                hsl(240 100% 50% / 0.8),
                hsl(180 100% 50% / 0.8),
                hsl(120 100% 50% / 0.8),
                hsl(60 100% 50% / 0.8),
                hsl(30 100% 50% / 0.8),
                hsl(0 100% 50% / 0.8)
              )`,
            }}
          />
          <span className="text-xs text-muted-foreground">High</span>
        </div>
      </div>

      {/* Threshold Control */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-muted-foreground">Visibility Threshold</Label>
          <span className="text-xs font-mono text-foreground">{Math.round(threshold * 100)}%</span>
        </div>
        <Slider
          value={[threshold]}
          onValueChange={([value]) => onThresholdChange(value)}
          max={1}
          min={0}
          step={0.05}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground/70">
          Hide attention values below this threshold
        </p>
      </div>
    </div>
  );
};
