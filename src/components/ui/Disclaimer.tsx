import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface DisclaimerProps {
  variant?: "inline" | "full";
}

export const Disclaimer = ({ variant = "inline" }: DisclaimerProps) => {
  if (variant === "full") {
    return (
      <Alert variant="destructive" className="bg-destructive/5 border-destructive/20">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Research Use Only</AlertTitle>
        <AlertDescription className="text-sm">
          This system is intended for research and educational purposes only. It is{" "}
          <strong>NOT</strong> a substitute for professional medical diagnosis. 
          Results should not be used for clinical decision-making without 
          consultation with qualified healthcare professionals. The accuracy of 
          predictions may vary and should be validated in clinical settings.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-2 rounded-md">
      <AlertTriangle className="h-3 w-3 flex-shrink-0" />
      <span>For research purposes only. Not intended for clinical diagnosis.</span>
    </div>
  );
};
