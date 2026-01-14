import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { DiseaseType, mockAnalysisResults } from "@/data/mockData";
import { History as HistoryIcon, Trash2, Eye, Calendar, Brain, FileText, GitCompare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export interface AnalysisSession {
  id: string;
  diseaseType: DiseaseType;
  fileName: string;
  date: string;
  probability: number;
  prediction: string;
}

const History = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useLocalStorage<AnalysisSession[]>("analysis-history", [
    // Demo data
    {
      id: "demo-1",
      diseaseType: "alzheimers",
      fileName: "brain_scan_001.nii",
      date: new Date(Date.now() - 86400000 * 2).toISOString(),
      probability: 0.87,
      prediction: "Alzheimer's Disease Detected",
    },
    {
      id: "demo-2",
      diseaseType: "parkinsons",
      fileName: "mri_scan_002.dcm",
      date: new Date(Date.now() - 86400000 * 5).toISOString(),
      probability: 0.82,
      prediction: "Parkinson's Disease Indicators",
    },
    {
      id: "demo-3",
      diseaseType: "brainTumor",
      fileName: "patient_scan_003.nii",
      date: new Date(Date.now() - 86400000 * 7).toISOString(),
      probability: 0.94,
      prediction: "Tumor Mass Detected",
    },
  ]);

  const [filterType, setFilterType] = useState<string>("all");
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  const filteredSessions = filterType === "all" 
    ? sessions 
    : sessions.filter((s) => s.diseaseType === filterType);

  const deleteSession = (id: string) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  const clearAllSessions = () => {
    setSessions([]);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDiseaseLabel = (type: DiseaseType) => {
    const labels: Record<DiseaseType, string> = {
      alzheimers: "Alzheimer's",
      parkinsons: "Parkinson's",
      brainTumor: "Brain Tumor",
    };
    return labels[type];
  };

  const getRiskBadge = (probability: number) => {
    if (probability > 0.8) {
      return <Badge variant="destructive">High Risk</Badge>;
    }
    if (probability > 0.5) {
      return <Badge variant="secondary">Moderate</Badge>;
    }
    return <Badge variant="outline">Low Risk</Badge>;
  };

  const toggleCompareSelection = (id: string) => {
    setSelectedForCompare((prev) => {
      if (prev.includes(id)) {
        return prev.filter((s) => s !== id);
      }
      if (prev.length >= 2) {
        return [prev[1], id];
      }
      return [...prev, id];
    });
  };

  const handleCompare = () => {
    if (selectedForCompare.length === 2) {
      navigate(`/compare?scan1=${selectedForCompare[0]}&scan2=${selectedForCompare[1]}`);
    }
  };

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
            <div className="flex items-center gap-3 mb-2">
              <HistoryIcon className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Analysis History</h1>
            </div>
            <p className="text-muted-foreground">
              View and manage your past MRI scan analyses
            </p>
          </motion.div>

          {/* Filters and Actions */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Filter by:</span>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All conditions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Conditions</SelectItem>
                  <SelectItem value="alzheimers">Alzheimer's</SelectItem>
                  <SelectItem value="parkinsons">Parkinson's</SelectItem>
                  <SelectItem value="brainTumor">Brain Tumor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3">
              {selectedForCompare.length === 2 && (
                <Button onClick={handleCompare} className="gap-2">
                  <GitCompare className="h-4 w-4" />
                  Compare Selected
                </Button>
              )}
              {selectedForCompare.length === 1 && (
                <span className="text-sm text-muted-foreground">
                  Select 1 more scan to compare
                </span>
              )}
              <Button variant="outline" asChild>
                <Link to="/analyze">
                  <Brain className="h-4 w-4 mr-2" />
                  New Analysis
                </Link>
              </Button>
              {sessions.length > 0 && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={clearAllSessions}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>
          </motion.div>

          {/* Sessions List */}
          {filteredSessions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="p-12 bg-card flex flex-col items-center justify-center text-center">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No Analysis Records
                </h3>
                <p className="text-muted-foreground max-w-sm mb-6">
                  Your analysis history will appear here. Start by uploading an MRI scan.
                </p>
                <Button asChild>
                  <Link to="/analyze">Start First Analysis</Link>
                </Button>
              </Card>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {filteredSessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card 
                      className={`p-5 bg-card hover:bg-secondary/30 transition-colors ${
                        selectedForCompare.includes(session.id) ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={selectedForCompare.includes(session.id)}
                            onCheckedChange={() => toggleCompareSelection(session.id)}
                            className="mt-1"
                            aria-label={`Select ${session.fileName} for comparison`}
                          />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                              <Badge variant="outline">
                                {getDiseaseLabel(session.diseaseType)}
                              </Badge>
                              {getRiskBadge(session.probability)}
                            </div>
                            <h4 className="font-semibold text-foreground">
                            {session.prediction}
                          </h4>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <FileText className="h-4 w-4" />
                              {session.fileName}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(session.date)}
                            </span>
                          </div>
                        </div>

                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right mr-4">
                            <p className="text-xs text-muted-foreground">Probability</p>
                            <p className="text-2xl font-bold text-primary font-mono">
                              {(session.probability * 100).toFixed(1)}%
                            </p>
                          </div>
                          <Button variant="secondary" size="sm" asChild>
                            <Link to="/analyze">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => deleteSession(session.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Summary Stats */}
          {sessions.length > 0 && (
            <motion.div
              className="mt-8 grid sm:grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-4 bg-muted/30 text-center">
                <p className="text-3xl font-bold text-foreground">{sessions.length}</p>
                <p className="text-sm text-muted-foreground">Total Analyses</p>
              </Card>
              <Card className="p-4 bg-muted/30 text-center">
                <p className="text-3xl font-bold text-foreground">
                  {sessions.filter((s) => s.probability > 0.7).length}
                </p>
                <p className="text-sm text-muted-foreground">High Risk Detected</p>
              </Card>
              <Card className="p-4 bg-muted/30 text-center">
                <p className="text-3xl font-bold text-foreground">
                  {new Set(sessions.map((s) => s.diseaseType)).size}
                </p>
                <p className="text-sm text-muted-foreground">Conditions Analyzed</p>
              </Card>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default History;
