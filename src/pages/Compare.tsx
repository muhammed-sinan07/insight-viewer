import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { AnalysisSession } from "./History";
import { DiseaseType, mockAnalysisResults } from "@/data/mockData";
import {
  ArrowLeft,
  GitCompare,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  Brain,
} from "lucide-react";

const Compare = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sessions] = useLocalStorage<AnalysisSession[]>("analysis-history", []);
  const [slicePosition, setSlicePosition] = useState(10);

  const scan1Id = searchParams.get("scan1");
  const scan2Id = searchParams.get("scan2");

  const scan1 = sessions.find((s) => s.id === scan1Id);
  const scan2 = sessions.find((s) => s.id === scan2Id);

  if (!scan1 || !scan2) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 py-8 md:py-12">
          <div className="container">
            <Card className="p-8 text-center">
              <GitCompare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                No Scans Selected
              </h2>
              <p className="text-muted-foreground mb-6">
                Please select two scans from your history to compare.
              </p>
              <Button asChild>
                <Link to="/history">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go to History
                </Link>
              </Button>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const probChange = scan2.probability - scan1.probability;
  const probChangePercent = ((probChange / scan1.probability) * 100).toFixed(1);

  const getDiseaseLabel = (type: DiseaseType) => {
    const labels: Record<DiseaseType, string> = {
      alzheimers: "Alzheimer's",
      parkinsons: "Parkinson's",
      brainTumor: "Brain Tumor",
    };
    return labels[type];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderMockScan = (scan: AnalysisSession, intensity: number) => (
    <div
      className="aspect-square rounded-lg relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 30% 30%, hsl(var(--chart-2) / ${0.2 + intensity * 0.3}) 0%, transparent 40%),
          radial-gradient(ellipse at 70% 60%, hsl(var(--chart-3) / ${0.2 + intensity * 0.2}) 0%, transparent 35%),
          radial-gradient(ellipse at 50% 50%, hsl(var(--secondary)) 0%, hsl(var(--secondary-foreground) / 0.1) 70%)
        `,
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3/4 h-3/4 rounded-full border border-chart-1/30">
          {/* Heatmap overlay */}
          <div
            className="absolute top-1/4 left-1/4 w-1/3 h-1/3 rounded-full blur-xl"
            style={{
              opacity: scan.probability * 0.8,
              background: `radial-gradient(circle, 
                hsl(0 100% 50% / ${scan.probability}) 0%, 
                hsl(30 100% 50% / ${scan.probability * 0.7}) 30%, 
                transparent 100%
              )`,
            }}
          />
        </div>
      </div>
      <div className="absolute bottom-2 left-2 bg-background/80 rounded px-2 py-1">
        <span className="text-xs font-mono text-foreground">Slice {slicePosition}/20</span>
      </div>
    </div>
  );

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
            <Button
              variant="ghost"
              size="sm"
              className="mb-4"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3 mb-2">
              <GitCompare className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">
                Scan Comparison
              </h1>
            </div>
            <p className="text-muted-foreground">
              Compare two analyses side by side to track progression
            </p>
          </motion.div>

          {/* Comparison Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Scan 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="p-6 bg-card">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">Earlier Scan</Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(scan1.date)}
                  </span>
                </div>
                {renderMockScan(scan1, slicePosition * 0.03)}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {getDiseaseLabel(scan1.diseaseType)}
                    </span>
                    <span className="text-2xl font-bold font-mono text-foreground">
                      {(scan1.probability * 100).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{scan1.fileName}</p>
                </div>
              </Card>
            </motion.div>

            {/* Scan 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="p-6 bg-card">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary">Later Scan</Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(scan2.date)}
                  </span>
                </div>
                {renderMockScan(scan2, slicePosition * 0.03)}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {getDiseaseLabel(scan2.diseaseType)}
                    </span>
                    <span className="text-2xl font-bold font-mono text-foreground">
                      {(scan2.probability * 100).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{scan2.fileName}</p>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Slice Navigation */}
          <Card className="p-4 mb-8">
            <Label className="text-sm text-muted-foreground mb-2 block">
              Navigate Both Scans (Slice Position)
            </Label>
            <Slider
              value={[slicePosition]}
              onValueChange={([v]) => setSlicePosition(v)}
              min={1}
              max={20}
              step={1}
            />
          </Card>

          {/* Change Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Change Summary
              </h3>

              <div className="grid sm:grid-cols-3 gap-6">
                {/* Probability Change */}
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {probChange > 0.01 ? (
                      <TrendingUp className="h-5 w-5 text-destructive" />
                    ) : probChange < -0.01 ? (
                      <TrendingDown className="h-5 w-5 text-chart-4" />
                    ) : (
                      <Minus className="h-5 w-5 text-muted-foreground" />
                    )}
                    <span
                      className={`text-2xl font-bold font-mono ${
                        probChange > 0.01
                          ? "text-destructive"
                          : probChange < -0.01
                          ? "text-chart-4"
                          : "text-muted-foreground"
                      }`}
                    >
                      {probChange > 0 ? "+" : ""}
                      {(probChange * 100).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Probability Change
                  </p>
                </div>

                {/* Time Between */}
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <span className="text-2xl font-bold font-mono text-foreground">
                    {Math.round(
                      (new Date(scan2.date).getTime() -
                        new Date(scan1.date).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}
                  </span>
                  <p className="text-sm text-muted-foreground">Days Apart</p>
                </div>

                {/* Relative Change */}
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <span
                    className={`text-2xl font-bold font-mono ${
                      Number(probChangePercent) > 0
                        ? "text-destructive"
                        : Number(probChangePercent) < 0
                        ? "text-chart-4"
                        : "text-muted-foreground"
                    }`}
                  >
                    {Number(probChangePercent) > 0 ? "+" : ""}
                    {probChangePercent}%
                  </span>
                  <p className="text-sm text-muted-foreground">Relative Change</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-4 text-center">
                {probChange > 0.05
                  ? "⚠️ Significant increase detected. Consider clinical follow-up."
                  : probChange < -0.05
                  ? "✅ Improvement observed. Continue monitoring."
                  : "📊 Relatively stable. Regular monitoring recommended."}
              </p>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Compare;
