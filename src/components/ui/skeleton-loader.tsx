import { cn } from "@/lib/utils";

interface SkeletonLoaderProps {
  className?: string;
  variant?: "default" | "circular" | "card" | "text" | "image";
  count?: number;
}

export const SkeletonLoader = ({ 
  className, 
  variant = "default",
  count = 1 
}: SkeletonLoaderProps) => {
  const baseClasses = "animate-pulse bg-muted rounded";
  
  const variants = {
    default: "h-4 w-full",
    circular: "h-12 w-12 rounded-full",
    card: "h-32 w-full rounded-lg",
    text: "h-4 w-3/4",
    image: "aspect-square w-full rounded-lg",
  };

  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={cn(baseClasses, variants[variant])} />
      ))}
    </div>
  );
};

export const AnalysisSkeleton = () => (
  <div className="space-y-6">
    {/* MRI Viewer Skeleton */}
    <div className="p-6 bg-card rounded-lg border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-muted rounded animate-pulse" />
          <div className="h-5 w-32 bg-muted rounded animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-muted rounded animate-pulse" />
          <div className="h-8 w-8 bg-muted rounded animate-pulse" />
          <div className="h-8 w-8 bg-muted rounded animate-pulse" />
        </div>
      </div>
      <div className="aspect-square bg-muted rounded-lg animate-pulse" />
      <div className="flex gap-2 mt-4 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-16 w-16 bg-muted rounded-lg animate-pulse flex-shrink-0" />
        ))}
      </div>
    </div>

    {/* 3D Viewer Skeleton */}
    <div className="p-6 bg-card rounded-lg border border-border">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-5 w-5 bg-muted rounded animate-pulse" />
        <div className="h-5 w-40 bg-muted rounded animate-pulse" />
      </div>
      <div className="h-[300px] bg-muted rounded-lg animate-pulse" />
    </div>

    {/* Results Skeleton */}
    <div className="p-6 bg-card rounded-lg border border-border">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-5 w-5 bg-muted rounded animate-pulse" />
        <div className="h-5 w-36 bg-muted rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-4 bg-muted/50 rounded-lg">
            <div className="h-8 w-16 bg-muted rounded animate-pulse mx-auto mb-2" />
            <div className="h-4 w-20 bg-muted rounded animate-pulse mx-auto" />
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <div className="h-12 bg-muted rounded-lg animate-pulse" />
        <div className="h-12 bg-muted rounded-lg animate-pulse" />
        <div className="h-12 bg-muted rounded-lg animate-pulse" />
      </div>
    </div>
  </div>
);

export const HistorySkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="p-5 bg-card rounded-lg border border-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-6 w-24 bg-muted rounded-full animate-pulse" />
              <div className="h-6 w-20 bg-muted rounded-full animate-pulse" />
            </div>
            <div className="h-5 w-48 bg-muted rounded animate-pulse" />
            <div className="flex gap-4">
              <div className="h-4 w-32 bg-muted rounded animate-pulse" />
              <div className="h-4 w-28 bg-muted rounded animate-pulse" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right mr-4">
              <div className="h-3 w-16 bg-muted rounded animate-pulse mb-1" />
              <div className="h-8 w-16 bg-muted rounded animate-pulse" />
            </div>
            <div className="h-9 w-20 bg-muted rounded animate-pulse" />
            <div className="h-9 w-9 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    ))}
  </div>
);
