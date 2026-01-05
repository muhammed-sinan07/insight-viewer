import { cn } from "@/lib/utils";
import { mockMriSlices } from "@/data/mockData";

interface SliceThumbnailsProps {
  currentSlice: number;
  onSliceChange: (slice: number) => void;
}

export const SliceThumbnails = ({ currentSlice, onSliceChange }: SliceThumbnailsProps) => {
  return (
    <div className="flex gap-1 overflow-x-auto py-2 px-1 scrollbar-thin">
      {mockMriSlices.map((slice) => (
        <button
          key={slice.id}
          onClick={() => onSliceChange(slice.id)}
          className={cn(
            "flex-shrink-0 w-12 h-12 rounded-md border-2 transition-all duration-200",
            "bg-secondary/50 hover:bg-secondary/80",
            "flex items-center justify-center text-xs font-mono",
            currentSlice === slice.id
              ? "border-primary ring-2 ring-primary/30"
              : "border-border/50 hover:border-primary/50"
          )}
        >
          <div
            className="w-8 h-8 rounded-sm"
            style={{
              background: `radial-gradient(ellipse at center, hsl(var(--chart-2) / ${0.2 + slice.id * 0.02}) 0%, hsl(var(--secondary)) 70%)`,
            }}
          />
        </button>
      ))}
    </div>
  );
};
