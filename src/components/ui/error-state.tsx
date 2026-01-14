import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showBackButton?: boolean;
}

export const ErrorState = ({
  title = "An error occurred",
  message = "Something went wrong. Please try again.",
  onRetry,
  showBackButton = true,
}: ErrorStateProps) => {
  const navigate = useNavigate();

  return (
    <Card className="p-8 bg-card text-center">
      <div className="h-14 w-14 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="h-7 w-7 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-sm mx-auto">{message}</p>
      <div className="flex gap-3 justify-center">
        {showBackButton && (
          <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        )}
        {onRetry && (
          <Button onClick={onRetry} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Retry
          </Button>
        )}
      </div>
    </Card>
  );
};
