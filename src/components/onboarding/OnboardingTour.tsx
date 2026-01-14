import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface TourStep {
  id: string;
  title: string;
  description: string;
  target?: string; // CSS selector for element to highlight
}

const tourSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Welcome to NeuroScan AI",
    description: "This research tool uses deep learning to analyze MRI scans for neurological conditions. Let's take a quick tour!",
  },
  {
    id: "upload",
    title: "Upload Your Scan",
    description: "Start by uploading an MRI or fMRI scan in DICOM or NIfTI format. Click 'Start Analysis' to begin.",
    target: "[data-tour='upload']",
  },
  {
    id: "select",
    title: "Select a Condition",
    description: "Choose which neurological condition to analyze: Alzheimer's, Parkinson's, or Brain Tumor.",
    target: "[data-tour='condition']",
  },
  {
    id: "results",
    title: "View Results",
    description: "After analysis, you'll see detailed results including probability scores, Grad-CAM visualizations, and 3D brain models.",
  },
  {
    id: "export",
    title: "Export Reports",
    description: "Generate PDF reports of your analysis to save or share with colleagues. Check your history to review past analyses.",
  },
  {
    id: "finish",
    title: "You're Ready!",
    description: "Remember, this is for research purposes only. Always consult healthcare professionals for clinical decisions.",
  },
];

interface OnboardingTourProps {
  onComplete?: () => void;
}

export const OnboardingTour = ({ onComplete }: OnboardingTourProps) => {
  const [hasSeenTour, setHasSeenTour] = useLocalStorage("neuroscan-tour-complete", false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!hasSeenTour) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [hasSeenTour]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleComplete = () => {
    setHasSeenTour(true);
    setIsVisible(false);
    onComplete?.();
  };

  const handleSkip = () => {
    setHasSeenTour(true);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const step = tourSteps[currentStep];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleSkip}
          />

          {/* Tour Card */}
          <motion.div
            className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            <Card className="p-6 bg-card w-[90vw] max-w-md shadow-2xl border-primary/20">
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={handleSkip}
              >
                <X className="h-4 w-4" />
              </Button>

              {/* Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Step {currentStep + 1} of {tourSteps.length}
                  </p>
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                </div>
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6">{step.description}</p>

              {/* Progress dots */}
              <div className="flex justify-center gap-1.5 mb-4">
                {tourSteps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentStep
                        ? "w-6 bg-primary"
                        : i < currentStep
                        ? "w-1.5 bg-primary/50"
                        : "w-1.5 bg-muted"
                    }`}
                  />
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <Button
                  variant="ghost"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleSkip}>
                    Skip Tour
                  </Button>
                  <Button onClick={handleNext} className="gap-1">
                    {currentStep === tourSteps.length - 1 ? "Get Started" : "Next"}
                    {currentStep < tourSteps.length - 1 && (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Hook to manually trigger tour
export const useOnboardingTour = () => {
  const [, setHasSeenTour] = useLocalStorage("neuroscan-tour-complete", false);
  
  const resetTour = () => setHasSeenTour(false);
  
  return { resetTour };
};
