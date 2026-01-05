import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { FileUpload } from "@/components/upload/FileUpload";
import { DiseaseSelector } from "@/components/analysis/DiseaseSelector";
import { AnalysisProgress } from "@/components/analysis/AnalysisProgress";
import { MriSliceViewer } from "@/components/analysis/MriSliceViewer";
import { ResultsDashboard } from "@/components/analysis/ResultsDashboard";
import { ExportButton } from "@/components/analysis/ExportButton";
import { Brain3DViewer } from "@/components/analysis/Brain3DViewer";
import { DiseaseType, mockAnalysisResults } from "@/data/mockData";
import { Scan, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { AnalysisSession } from "./History";

type AnalysisState = "idle" | "analyzing" | "complete";

const Analyze = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDisease, setSelectedDisease] = useState<DiseaseType | null>(null);
  const [analysisState, setAnalysisState] = useState<AnalysisState>("idle");
  const [sessions, setSessions] = useLocalStorage<AnalysisSession[]>("analysis-history", []);

  const canStartAnalysis = selectedFile && selectedDisease;

  const handleStartAnalysis = () => {
    if (!canStartAnalysis) {
      toast.error("Please upload a scan and select a condition to analyze");
      return;
    }
    setAnalysisState("analyzing");
    toast.info("Analysis started", {
      description: "Processing your MRI scan...",
    });
  };

  const handleAnalysisComplete = useCallback(() => {
    setAnalysisState("complete");
    
    // Save to history
    if (selectedFile && selectedDisease) {
      const results = mockAnalysisResults[selectedDisease];
      const newSession: AnalysisSession = {
        id: crypto.randomUUID(),
        diseaseType: selectedDisease,
        fileName: selectedFile.name,
        date: new Date().toISOString(),
        probability: results.probability,
        prediction: results.prediction,
      };
      setSessions((prev) => [newSession, ...prev]);
    }

    toast.success("Analysis Complete", {
      description: "Your results are ready to view.",
    });
  }, [selectedFile, selectedDisease, setSessions]);

  const handleReset = () => {
    setSelectedFile(null);
    setSelectedDisease(null);
    setAnalysisState("idle");
  };

  const currentResults = selectedDisease ? mockAnalysisResults[selectedDisease] : null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8 md:py-12">
        <div className="container">
          {/* Page Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">
              MRI Scan Analysis
            </h1>
            <p className="text-muted-foreground">
              Upload your MRI or fMRI scan and select the condition to analyze
            </p>
          </motion.div>

          <Disclaimer variant="full" />

          <div className="mt-8 grid lg:grid-cols-2 gap-8">
            {/* Left Column - Upload & Controls */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 bg-card">
                <h2 className="font-semibold text-foreground mb-4">
                  1. Upload Scan
                </h2>
                <FileUpload
                  selectedFile={selectedFile}
                  onFileSelect={setSelectedFile}
                />
              </Card>

              <Card className="p-6 bg-card">
                <h2 className="font-semibold text-foreground mb-4">
                  2. Select Condition
                </h2>
                <DiseaseSelector
                  value={selectedDisease}
                  onChange={setSelectedDisease}
                />
              </Card>

              {analysisState === "idle" && (
                <motion.div 
                  className="flex gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Button
                    size="lg"
                    className="flex-1 gap-2"
                    onClick={handleStartAnalysis}
                    disabled={!canStartAnalysis}
                  >
                    <Scan className="h-4 w-4" />
                    Start Analysis
                  </Button>
                </motion.div>
              )}

              {analysisState === "analyzing" && (
                <AnalysisProgress
                  isAnalyzing={true}
                  onComplete={handleAnalysisComplete}
                />
              )}

              {analysisState === "complete" && selectedDisease && (
                <motion.div 
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2"
                    onClick={handleReset}
                  >
                    <RotateCcw className="h-4 w-4" />
                    New Analysis
                  </Button>
                  <ExportButton diseaseType={selectedDisease} />
                </motion.div>
              )}
            </motion.div>

            {/* Right Column - Results */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {analysisState === "complete" && selectedDisease && currentResults && (
                <>
                  <MriSliceViewer showHeatmap={true} />
                  <Brain3DViewer regions={currentResults.regions} />
                  <ResultsDashboard diseaseType={selectedDisease} />
                </>
              )}

              {analysisState !== "complete" && (
                <Card className="p-12 bg-card flex flex-col items-center justify-center min-h-[400px] text-center">
                  <motion.div 
                    className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Scan className="h-8 w-8 text-muted-foreground" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No Results Yet
                  </h3>
                  <p className="text-muted-foreground max-w-sm">
                    Upload an MRI scan and select a condition to analyze. Results
                    will appear here once the analysis is complete.
                  </p>
                </Card>
              )}
            </motion.div>
          </div>

          {/* Limitations Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="mt-8 p-6 bg-muted/30">
              <h3 className="font-semibold text-foreground mb-3">
                Important Limitations
              </h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  This is a research demonstration and should not be used for clinical diagnosis.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Results are generated from mock data for demonstration purposes only.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Actual model performance may vary based on scan quality and patient demographics.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Always consult qualified healthcare professionals for medical decisions.
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Analyze;
