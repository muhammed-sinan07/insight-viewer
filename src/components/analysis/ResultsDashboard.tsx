import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  TrendingUp,
  Activity,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { mockAnalysisResults, DiseaseType } from "@/data/mockData";
import { AnimatedCounter } from "./AnimatedCounter";

interface ResultsDashboardProps {
  diseaseType: DiseaseType;
}

export const ResultsDashboard = ({ diseaseType }: ResultsDashboardProps) => {
  const results = mockAnalysisResults[diseaseType];
  const isHighRisk = results.probability > 0.7;
  const [expandedSection, setExpandedSection] = useState<string | null>("findings");

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

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Main Result Card */}
      <Card className="p-6 bg-card border-l-4 border-l-primary overflow-hidden">
        <div className="space-y-4">
          <motion.div 
            className="flex items-start justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {isHighRisk ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </motion.div>
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
          </motion.div>

          {/* Probability Meter */}
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Detection Probability</span>
              <AnimatedCounter 
                value={results.probability * 100} 
                className="font-mono font-semibold text-foreground"
              />
            </div>
            <div className="relative">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ transformOrigin: "left" }}
              >
                <Progress
                  value={results.probability * 100}
                  className="h-3"
                />
              </motion.div>
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
          </motion.div>

          {/* Confidence Interval */}
          <motion.div
            className="pt-3 border-t border-border/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">95% Confidence Interval</span>
              <span className="font-mono text-foreground">
                {((results.probability - 0.05) * 100).toFixed(1)}% - {((results.probability + 0.03) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="relative h-2 bg-secondary rounded-full">
              <div 
                className="absolute h-full bg-primary/30 rounded-full"
                style={{ 
                  left: `${(results.probability - 0.05) * 100}%`,
                  width: `8%`
                }}
              />
              <div 
                className="absolute h-full w-0.5 bg-primary"
                style={{ left: `${results.probability * 100}%` }}
              />
            </div>
          </motion.div>
        </div>
      </Card>

      {/* Expandable Details Grid */}
      <div className="space-y-4">
        {/* Findings Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-card overflow-hidden">
            <Button
              variant="ghost"
              className="w-full p-5 flex items-center justify-between hover:bg-secondary/50"
              onClick={() => toggleSection("findings")}
            >
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                <h4 className="font-semibold text-foreground">Key Findings</h4>
              </div>
              {expandedSection === "findings" ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
            <AnimatePresence>
              {expandedSection === "findings" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 space-y-3">
                    {Object.entries(results.details).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex justify-between items-center text-sm border-b border-border/50 pb-2 last:border-0"
                      >
                        <span className="text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <span className="font-medium text-foreground">{value}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        {/* Affected Regions Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-card overflow-hidden">
            <Button
              variant="ghost"
              className="w-full p-5 flex items-center justify-between hover:bg-secondary/50"
              onClick={() => toggleSection("regions")}
            >
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                <h4 className="font-semibold text-foreground">Affected Regions</h4>
              </div>
              {expandedSection === "regions" ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
            <AnimatePresence>
              {expandedSection === "regions" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 space-y-3">
                    {results.regions.map((region, index) => (
                      <motion.div 
                        key={region.name} 
                        className="space-y-1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{region.name}</span>
                          <AnimatedCounter 
                            value={region.severity * 100} 
                            decimals={0}
                            className="font-mono text-foreground"
                          />
                        </div>
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                          style={{ transformOrigin: "left" }}
                        >
                          <Progress
                            value={region.severity * 100}
                            className="h-1.5"
                          />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>

      {/* Model Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
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
      </motion.div>
    </motion.div>
  );
};
