import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDown, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { pdf } from "@react-pdf/renderer";
import { AnalysisReport } from "./AnalysisReport";
import { mockAnalysisResults, DiseaseType } from "@/data/mockData";

interface ExportButtonProps {
  disabled?: boolean;
  diseaseType?: DiseaseType;
}

export const ExportButton = ({ disabled, diseaseType = "alzheimers" }: ExportButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleExport = async () => {
    setIsGenerating(true);
    
    try {
      const results = mockAnalysisResults[diseaseType];
      const patientId = "DEMO-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      const blob = await pdf(
        <AnalysisReport 
          results={results} 
          diseaseType={diseaseType}
          scanDate={new Date().toLocaleDateString()}
          patientId={patientId}
        />
      ).toBlob();
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `neuroscan-report-${diseaseType}-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success("PDF Report Downloaded", {
        description: "Your analysis report has been saved.",
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF", {
        description: "Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={disabled || isGenerating}
      className="gap-2"
      variant="outline"
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <FileDown className="h-4 w-4" />
          Export PDF Report
        </>
      )}
    </Button>
  );
};
