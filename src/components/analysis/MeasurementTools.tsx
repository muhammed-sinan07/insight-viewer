import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Ruler, RotateCcw, Trash2, MousePointer2 } from "lucide-react";

export type MeasurementMode = "none" | "ruler" | "angle";

interface Measurement {
  id: string;
  type: "ruler" | "angle";
  points: { x: number; y: number }[];
  value: number;
  unit: string;
}

interface MeasurementToolsProps {
  mode: MeasurementMode;
  onModeChange: (mode: MeasurementMode) => void;
  measurements: Measurement[];
  onClearMeasurements: () => void;
  onDeleteMeasurement?: (id: string) => void;
}

export const MeasurementTools = ({
  mode,
  onModeChange,
  measurements,
  onClearMeasurements,
  onDeleteMeasurement,
}: MeasurementToolsProps) => {
  return (
    <div className="space-y-3">
      {/* Tool Selection */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground mr-2">Tools:</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={mode === "none" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => onModeChange("none")}
            >
              <MousePointer2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Select (Esc)</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={mode === "ruler" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => onModeChange("ruler")}
            >
              <Ruler className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Measure Distance (M)</TooltipContent>
        </Tooltip>

        {measurements.length > 0 && (
          <>
            <div className="h-4 w-px bg-border mx-1" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={onClearMeasurements}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Clear All Measurements</TooltipContent>
            </Tooltip>
          </>
        )}
      </div>

      {/* Measurement List */}
      {measurements.length > 0 && (
        <Card className="p-3 bg-muted/50">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Measurements ({measurements.length})
          </p>
          <div className="space-y-1.5 max-h-32 overflow-auto">
            {measurements.map((m, i) => (
              <div
                key={m.id}
                className="flex items-center justify-between text-xs bg-background rounded px-2 py-1.5"
              >
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    {m.type === "ruler" ? "Distance" : "Angle"}
                  </Badge>
                  <span className="font-mono text-foreground">
                    {m.value.toFixed(1)} {m.unit}
                  </span>
                </div>
                {onDeleteMeasurement && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                    onClick={() => onDeleteMeasurement(m.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Instructions */}
      {mode !== "none" && (
        <p className="text-xs text-muted-foreground">
          {mode === "ruler" && "Click two points to measure distance"}
          {mode === "angle" && "Click three points to measure angle"}
        </p>
      )}
    </div>
  );
};
