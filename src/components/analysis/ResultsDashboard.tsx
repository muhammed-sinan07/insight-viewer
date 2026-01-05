import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  TrendingUp,
  Activity,
} from "lucide-react";
import { mockAnalysisResults, DiseaseType } from "@/data/mockData";

interface ResultsDashboardProps {
  diseaseType: DiseaseType;
}

export const ResultsDashboard = ({ diseaseType }: ResultsDashboardProps) => {
  const results = mockAnalysisResults[diseaseType];
  const isHighRisk = results.probability > 0.7;

  const getConfidenceColor = (confidence: string) => {
    switch (confidence.toLowerCase()) {
      case "very high":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "high":
        return "bg-chart-1/10 text-primary border-primary/20";
      case "medium":
        return "bg-chart-3/10 text-muted-foreground border-muted";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <Card className="p-6 bg-card border-l-4 border-l-primary">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {isHighRisk ? (
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                )}
                <h3 className="text-xl font-semibold text-foreground">
                  {results.prediction}
                </h3>
              </div>
              <p className="text-muted-foreground">{results.stage}</p>
            </div>
            <Badge className={`${getConfidenceColor(results.confidence)}`}>
              {results.confidence} Confidence
            </Badge>
          </div>

          {/* Probability Meter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Detection Probability</span>
              <span className="font-mono font-semibold text-foreground">
                {(results.probability * 100).toFixed(1)}%
              </span>
            </div>
            <div className="relative">
              <Progress
                value={results.probability * 100}
                className="h-3"
              />
              <div
                className="absolute top-0 h-3 w-0.5 bg-destructive"
                style={{ left: "70%" }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low Risk</span>
              <span className="text-destructive">Threshold (70%)</span>
              <span>High Risk</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Details Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Findings Card */}
        <Card className="p-5 bg-card">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-foreground">Key Findings</h4>
          </div>
          <div className="space-y-3">
            {Object.entries(results.details).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between items-center text-sm border-b border-border/50 pb-2 last:border-0"
              >
                <span className="text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <span className="font-medium text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Affected Regions Card */}
        <Card className="p-5 bg-card">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-foreground">Affected Regions</h4>
          </div>
          <div className="space-y-3">
            {results.regions.map((region) => (
              <div key={region.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{region.name}</span>
                  <span className="font-mono text-foreground">
                    {(region.severity * 100).toFixed(0)}%
                  </span>
                </div>
                <Progress
                  value={region.severity * 100}
                  className="h-1.5"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Model Info */}
      <Card className="p-4 bg-muted/30">
        <div className="flex items-start gap-3">
          <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground">
              Hybrid CNN Architecture (EfficientNet-B4 + 3D CNN + Xception)
            </p>
            <p className="text-muted-foreground">
              Model trained on 15,000+ validated MRI/fMRI scans with 92.4% validation accuracy.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
